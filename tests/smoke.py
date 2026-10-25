"""Functional regression checks. Run: python3 tests/smoke.py (requires Playwright + Chromium)."""
import functools
import http.server
import json
from pathlib import Path
import threading
import unittest
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class WebsiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}/'
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def setUp(self):
        self.context = self.browser.new_context(timezone_id='Europe/Oslo', reduced_motion='reduce')
        # No network font requests are necessary for functional tests.
        self.context.route('https://**/*', lambda route: route.abort())
        self.context.add_init_script("const pending=sessionStorage.getItem('testSeed'); if(pending){localStorage.setItem('heinorsk.v1',pending); sessionStorage.removeItem('testSeed');}")
        self.page = self.context.new_page()
        self.errors = []
        self.page.on('pageerror', lambda error: self.errors.append(str(error)))
        self.page.clock.install(time=datetime(2026, 10, 25, 11, tzinfo=timezone.utc))
        self.page.goto(self.url, wait_until='domcontentloaded')
        self.page.locator('#home-start').wait_for()

    def tearDown(self):
        try:
            self.assertEqual(self.errors, [])
        finally:
            self.context.close()

    def route(self, view):
        self.page.evaluate('(v) => location.hash=v', view)
        target = view.split('-')[0]
        self.page.locator('#view-' + target).wait_for(state='visible')

    def state(self):
        return self.page.evaluate('''() => { window.dispatchEvent(new Event('pagehide')); return JSON.parse(localStorage.getItem('heinorsk.v1')); }''')

    def seed(self, js):
        self.page.evaluate('''(body) => {
          const state={v:1,name:'',theme:'auto',rate:0.85,voice:'',done:{},quiz:{},srs:{},log:[],dict:{ok:0,total:0},sess:null,lastPart:'p1'};
          const today = new Date().setHours(0,0,0,0);
          new Function('state','today', body)(state,today);
          sessionStorage.setItem('testSeed',JSON.stringify(state));
        }''', js)
        self.page.reload(wait_until='domcontentloaded')

    def review_answer(self, correct):
        self.page.locator('#rv-card').click()
        self.page.locator('#rv-yes' if correct else '#rv-no').click()

    def test_routes_data_and_anchors(self):
        for view in ['home','review','dictation','exam','progress'] + [f'p{i}' for i in range(1,9)]:
            self.route(view)
        counts = self.page.evaluate('''() => [NORSK.schedule.length, NORSK.schedule.filter(s=>s.kind==='lesson').length, new Set(NORSK.cards.map(c=>c.id)).size === NORSK.cards.length]''')
        self.assertEqual(counts, [52,48,True])
        broken = self.page.evaluate('''() => [...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash.slice(1)).filter(id=>id && !['home','review','dictation','exam','progress',...NORSK.parts.map(p=>p.id)].includes(id) && !document.getElementById(id))''')
        self.assertEqual(broken, [])
        self.page.evaluate("location.hash='p99-missing'")
        self.page.locator('#view-home').wait_for(state='visible')

    def test_all_eighty_quiz_answers_and_exam(self):
        for i in range(1,9):
            part=f'p{i}'; self.route(part)
            answers=self.page.evaluate('(part)=>NORSK[part].QUIZ.map(q=>q.a)',part)
            self.assertEqual(len(answers),10)
            for index,answer in enumerate(answers):
                self.page.locator(f'#{part}-quizbox .q').nth(index).locator('.opt').nth(answer).evaluate('(button)=>button.click()')
            self.assertEqual(self.state()['quiz'][part],10)
        self.route('exam'); self.page.locator('#ex-start').click()
        self.assertEqual(self.page.locator('#ex-box .q').count(),30)
        self.page.evaluate('''() => { for (const el of document.querySelectorAll('#ex-box .q')) {
          const q=NORSK.allQuiz().find(q=>new DOMParser().parseFromString(q.q,'text/html').body.textContent===el.querySelector('.qt').textContent);
          if (!q) throw new Error('Question not found'); el.querySelectorAll('.opt')[q.a].click();
        }}''')
        self.assertEqual(self.state()['quiz']['exam'],30)
        self.assertIn('không chứng nhận',self.page.locator('#ex-score').inner_text())

    def test_flashcards_and_reverse_recall(self):
        self.route('p1'); card=self.page.locator('#p1-card'); front=card.inner_text()
        card.click(); self.assertNotEqual(card.inner_text(),front)
        self.page.locator('#p1-next').click()
        self.assertTrue(self.page.locator('#p1-cardpos').inner_text().startswith('2 /'))
        self.route('review'); self.page.locator('#rv-direction').select_option('vi-no')
        self.page.locator('#rv-start-new').click()
        self.assertEqual(self.page.locator('#rv-card .big').inner_text(),'chào')
        self.page.locator('#rv-card').click()
        self.assertEqual(self.page.locator('#rv-card .big').inner_text(),'hei')

    def test_srs_intervals_and_calendar_day_across_dst(self):
        for stage,expected in [(None,1),(0,3),(1,7),(2,14),(3,30),(4,30)]:
            self.seed("state.srs[NORSK.cards[0].id]={b:"+str(stage if stage is not None else 0)+",d:today,n:"+str(0 if stage is None else 3)+"};")
            self.route('review'); self.page.locator('#rv-start-due').click(); self.review_answer(True)
            delta=self.page.evaluate('''() => { window.dispatchEvent(new Event('pagehide')); const st=JSON.parse(localStorage.getItem('heinorsk.v1')).srs[NORSK.cards[0].id]; const due=new Date(st.d); const now=new Date(); return [Math.round((Date.UTC(due.getFullYear(),due.getMonth(),due.getDate())-Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000),due.getHours()]; }''')
            self.assertEqual(delta,[expected,0])

    def test_failed_card_repeated_but_not_promoted_same_day(self):
        self.seed("state.srs[NORSK.cards[0].id]={b:3,d:today,n:8};")
        self.route('review'); self.page.locator('#rv-start-due').click(); self.review_answer(False)
        self.assertIn('2 / 2',self.page.locator('#rv-pos').inner_text())
        self.review_answer(True)
        st=next(iter(self.state()['srs'].values()))
        self.assertEqual(st['b'],0); self.assertEqual(st['n'],10)
        self.assertIn('Xong 2 thẻ',self.page.locator('#rv-card').inner_text())

    def test_all_due_cards_and_no_future_lessons_auto_added(self):
        self.seed("for (const c of NORSK.cardsFor('p1')) state.srs[c.id]={b:0,d:today,n:1};")
        self.route('review'); self.page.locator('#rv-start-due').click()
        self.assertIn('1 / 40',self.page.locator('#rv-pos').inner_text())
        self.page.locator('#rv-start-new').click()
        self.assertIn('Không còn thẻ mới',self.page.locator('#rv-card').inner_text())
        self.assertEqual(len(self.state()['srs']),40)

    def test_keyboard_button_activation_does_not_flip_next_card(self):
        self.route('review'); self.page.locator('#rv-start-new').click(); self.page.locator('#rv-card').click()
        self.page.locator('#rv-yes').focus(); self.page.keyboard.press('Enter')
        self.assertTrue(self.page.locator('#rv-btns').is_hidden())
        self.assertIn('Thẻ 2 /',self.page.locator('#rv-pos').inner_text())
        self.assertEqual(self.page.locator('#rv-card .big').inner_text(),'takk')

    def test_dictation_counts_once_and_handles_extra_characters(self):
        self.route('dictation'); self.page.locator('#dc-input').fill('zzzz<>&')
        self.page.locator('#dc-check').click()
        self.assertEqual(self.state()['dict']['total'],1)
        self.page.locator('#dc-input').press('Enter')
        self.assertEqual(self.state()['dict']['total'],1)
        self.assertTrue(self.page.locator('#dc-check').is_disabled())
        self.assertIn('<>&',self.page.locator('#dc-diff').inner_text())
        self.assertEqual(self.page.locator('#dc-diff script').count(),0)
        self.page.locator('#dc-next').click()
        self.assertTrue(self.page.locator('#dc-check').is_enabled())

    def test_dictation_next_cancels_pending_automatic_advance(self):
        self.seed("for (const c of NORSK.cards) if(c.part!=='p1') continue; else if(c.id!==NORSK.cards[0].id) state.srs[c.id]={b:0,d:today,n:1};")
        self.route('dictation')
        # Capture spoken text through a mock native speech implementation.
        self.page.evaluate('''() => { window.spoken=[]; window.SpeechSynthesisUtterance=function(text){this.text=text;}; Object.defineProperty(speechSynthesis,'getVoices',{value:()=>[{name:'Test Norwegian',lang:'nb-NO'}]}); speechSynthesis.speak=u=>spoken.push(u.text); speechSynthesis.onvoiceschanged(); }''')
        self.page.clock.run_for(300)
        target=self.page.evaluate('spoken.at(-1)')
        self.page.locator('#dc-input').fill(target); self.page.locator('#dc-check').click()
        self.assertEqual(self.state()['dict']['ok'],1)
        self.page.locator('#dc-next').click(); self.page.clock.run_for(300)
        self.page.locator('#dc-input').fill('do not clear')
        self.page.clock.run_for(1500)
        self.assertEqual(self.page.locator('#dc-input').input_value(),'do not clear')

    def test_no_wrong_language_voice_fallback(self):
        self.page.evaluate('''() => { window.spoken=[]; window.SpeechSynthesisUtterance=function(text){this.text=text;}; Object.defineProperty(speechSynthesis,'getVoices',{value:()=>[{name:'English',lang:'en-US'}]}); speechSynthesis.speak=u=>spoken.push(u.text); speechSynthesis.onvoiceschanged(); say('hei'); }''')
        self.assertEqual(self.page.evaluate('spoken'),[])
        self.assertIn('Chưa có giọng Na Uy',self.page.locator('#toast').inner_text())

    def test_active_session_restores_on_home_and_quit_cancels_timer(self):
        self.page.locator('#home-start').click()
        self.page.evaluate("window.dispatchEvent(new Event('pagehide')); location.hash='home'")
        self.page.reload(wait_until='domcontentloaded')
        self.page.locator('#home-resume').wait_for()
        self.assertTrue(self.page.locator('#sessionbar').is_visible())
        self.page.locator('#home-resume').click()
        self.page.on('dialog',lambda d:d.accept())
        self.page.locator('#sb-quit').click(); self.page.clock.run_for(500)
        self.assertTrue(self.page.locator('#sessionbar').is_hidden())
        self.assertEqual(self.state()['sess'],None)

    def test_import_rejects_bad_shapes_and_accepts_valid_backup(self):
        self.route('progress')
        before=self.state()
        for update in [{'quiz':[]},{'srs':{'__proto__':{'b':99,'d':1,'n':0}}},{'dict':{'total':0,'ok':1}},{'sess':{'id':'missing','step':0}}]:
            bad={**before,**update}
            self.page.locator('#pg-import').set_input_files({'name':'bad.json','mimeType':'application/json','buffer':json.dumps(bad).encode()})
            self.page.wait_for_function("document.getElementById('toast').textContent.includes('File không đúng')")
            self.assertEqual(self.state(),before)
        self.page.on('dialog',lambda d:d.accept())
        valid={**before,'name':'Người học','quiz':{'p1':8},'sess':{'id':'p1-s1','step':1}}
        self.page.locator('#pg-import').set_input_files({'name':'valid.json','mimeType':'application/json','buffer':json.dumps(valid).encode()})
        self.page.wait_for_function("document.getElementById('set-name').value==='Người học'")
        self.assertEqual(self.state()['quiz']['p1'],8)
        self.assertTrue(self.page.locator('#sessionbar').is_visible())
        self.page.reload(wait_until='domcontentloaded')
        self.assertEqual(self.page.locator('#set-name').input_value(),'Người học')

    def test_invalid_stored_progress_keeps_downloadable_original(self):
        self.seed("state.quiz=[];")
        raw=self.page.evaluate("localStorage.getItem('heinorsk.v1.recovery')")
        self.assertEqual(json.loads(raw)['quiz'],[])
        self.route('progress')
        self.assertTrue(self.page.locator('#pg-recovery').is_visible())
        with self.page.expect_download() as info:
            self.page.locator('#pg-recovery').click()
        self.assertEqual(Path(info.value.path()).read_text(),raw)

    def test_all_six_drills_give_feedback_and_advance(self):
        for i in range(3,9):
            part=f'p{i}'; self.route(part)
            opts=self.page.locator(f'#{part}-d-opts .opt')
            self.assertGreaterEqual(opts.count(),2)
            opts.first.click()
            self.assertEqual(self.page.locator(f'#{part}-d-opts .right').count(),1)
            self.assertTrue(all(opts.nth(n).is_disabled() for n in range(opts.count())))
            self.page.locator(f'#{part}-d-next').click()
            self.assertTrue(opts.first.is_enabled())

    def test_mobile_dark_mode(self):
        self.page.set_viewport_size({'width':390,'height':844})
        for view in ['home','review','progress','p1','p6','p8']:
            self.route(view)
            self.assertLessEqual(self.page.evaluate('document.documentElement.scrollWidth'),390)
        self.route('progress'); self.page.locator('#set-theme').select_option('dark')
        self.assertEqual(self.page.locator('html').get_attribute('data-theme'),'dark')
        self.page.screenshot(path='/tmp/nauy-mobile-dark.png',full_page=True)

if __name__ == '__main__':
    unittest.main(verbosity=2)
