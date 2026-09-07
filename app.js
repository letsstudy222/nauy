/* =====================================================================
   Hei, Norsk! — app.js
   1 lõi: tiện ích · lưu tiến độ · giọng đọc · giao diện · điều hướng
   2 máy: flashcard · quiz · máy luyện · SRS · chép chính tả · thi thử
   3 màn hình: trang chủ · phiên học · tiến độ · 8 phần
   ===================================================================== */
(function () {
"use strict";
const N = window.NORSK;
const $ = id => document.getElementById(id);
const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
const DAY = 86400000;
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function attr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
function esc(s) { return String(s).replace(/'/g, "\\'"); }
function startOfDay(t) { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
function today() { return startOfDay(Date.now()); }
/* thứ hai đầu tuần (ISO) */
function weekStart(t) { const d = new Date(startOfDay(t)); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return d.getTime(); }
const PLAY_ICON = '<svg><use href="#i-volume"/></svg>';
function playBtn(text) { return `<button class="play" type="button" data-say="${attr(text)}" aria-label="Nghe">${PLAY_ICON}</button>`; }

/* ---------- LƯU TIẾN ĐỘ ---------- */
const KEY = "heinorsk.v1";
const DEF = () => ({ v: 1, name: "", theme: "auto", rate: 0.85, voice: "", done: {}, quiz: {}, srs: {}, log: [], dict: { ok: 0, total: 0 }, sess: null, lastPart: "p1" });
let S = DEF();
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { S = DEF(); }
}
let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Không lưu được tiến độ (bộ nhớ trình duyệt bị chặn?)"); } }, 120);
}

/* ---------- GIỌNG ĐỌC ---------- */
let voices = [], voice = null, voiceReady = false;
function isNo(v) { return /^n[bno](-|_|$)/i.test(v.lang) || /norsk|norw/i.test(v.name); }
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  voices = speechSynthesis.getVoices();
  if (!voices.length) return;
  voiceReady = true;
  const nor = voices.filter(isNo);
  const chosen = S.voice ? voices.find(v => v.name === S.voice) : null;
  voice = chosen || nor.find(v => /nb/i.test(v.lang) && /online|natural|neural|premium|enhanced/i.test(v.name)) || nor.find(v => /nb/i.test(v.lang)) || nor[0] || null;
  const dot = $("voicedot");
  if (dot) { dot.classList.toggle("ok", !!voice); dot.classList.toggle("bad", !voice); dot.title = voice ? "Giọng: " + voice.name : "Chưa có giọng tiếng Na Uy trên máy này"; }
  const warn = $("voicewarn"); if (warn) warn.hidden = !!voice;
  fillVoiceSelect();
}
function fillVoiceSelect() {
  const sel = $("set-voice"); if (!sel || !voices.length) return;
  const nor = voices.filter(isNo);
  sel.innerHTML = '<option value="">Tự chọn giọng Na Uy tốt nhất</option>' + nor.map(v => `<option value="${attr(v.name)}"${S.voice === v.name ? " selected" : ""}>${attr(v.name)} (${v.lang})</option>`).join("");
  if (!nor.length) sel.innerHTML += '<option value="" disabled>— máy này chưa có giọng Na Uy —</option>';
}
if ("speechSynthesis" in window) { speechSynthesis.onvoiceschanged = pickVoice; setTimeout(pickVoice, 300); setTimeout(pickVoice, 1500); }
function say(text, rate) {
  if (!("speechSynthesis" in window)) { toast("Trình duyệt này không có giọng đọc"); return; }
  if (!voiceReady) pickVoice();
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, " ").trim());
  u.lang = "nb-NO"; if (voice) u.voice = voice;
  u.rate = rate || S.rate || 0.85; u.pitch = 1;
  speechSynthesis.speak(u);
  return u;
}
window.say = say; window.playBtn = playBtn; window.esc = esc;
document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]");
  if (!b) return;
  say(b.dataset.say);
  b.classList.add("speaking"); setTimeout(() => b.classList.remove("speaking"), 900);
});

/* ---------- GIAO DIỆN ---------- */
function applyTheme() {
  const t = S.theme === "auto" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : S.theme;
  document.documentElement.dataset.theme = t;
  const btn = $("themebtn"); if (btn) btn.innerHTML = `<svg><use href="#i-${t === "dark" ? "sun" : "moon"}"/></svg>`;
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === "dark" ? "#0D121C" : "#2B6FE6";
}
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => S.theme === "auto" && applyTheme());
let toastTimer = null;
function toast(msg, ms) {
  const t = $("toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), ms || 2600);
}
function openMenu(open) { $("sidebar").classList.toggle("open", open); $("scrim").classList.toggle("show", open); }

/* ---------- ĐIỀU HƯỚNG ---------- */
const VIEWS = ["home", "review", "dictation", "exam", "progress", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
let currentView = null;
const rendered = {};
function parseHash() {
  const h = (location.hash || "#home").slice(1);
  const m = h.match(/^(p\d)(?:-(.+))?$/);
  if (m) return { view: m[1], anchor: m[2] ? `${m[1]}-${m[2]}` : null };
  return { view: VIEWS.includes(h) ? h : "home", anchor: null };
}
function route() {
  const { view, anchor } = parseHash();
  const isPart = /^p\d$/.test(view);
  if (isPart && !rendered[view]) { renderPart(view); rendered[view] = true; }
  if (currentView !== view) {
    $$(".view").forEach(v => { v.hidden = v.id !== "view-" + view; });
    document.body.dataset.part = isPart ? view : "";
    currentView = view;
    if (isPart) { S.lastPart = view; save(); }
    if (!anchor) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    onViewShown(view);
  }
  if (anchor) {
    const el = $(anchor);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
  const lessonHash = "#" + (isPart ? view : S.lastPart);
  $$("[data-nav]").forEach(a => {
    const nav = a.dataset.nav;
    a.classList.toggle("on", nav === view || (nav === "lesson" && isPart));
    if (nav === "lesson") a.href = lessonHash;
  });
  $$(".navpart").forEach(a => a.classList.toggle("on", a.dataset.part === view));
  openMenu(false);
  if (isPart) updateToc(view);
}
function onViewShown(view) {
  if (view === "home") renderHome();
  if (view === "progress") renderProgress();
  if (view === "review") { Review.refresh(); }
  if (view === "dictation") { Dict.refresh(); }
  if (view === "exam") { Exam.refresh(); }
  if (/^p\d$/.test(view)) { renderPartHead(view); }
  updateDueBadges();
}

/* mục lục chip trong phần: tô đậm mục đang đọc */
let tocObserver = null;
function updateToc(part) {
  if (tocObserver) tocObserver.disconnect();
  const chips = $$(`#${part}-toc a`);
  const secs = chips.map(a => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
  tocObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      chips.forEach(c => c.classList.remove("on"));
      const chip = chips.find(c => c.getAttribute("href") === "#" + en.target.id);
      if (chip) { chip.classList.add("on"); const toc = chip.parentElement; toc.scrollTo({ left: chip.offsetLeft - toc.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" }); }
    });
  }, { rootMargin: "-15% 0px -70% 0px" });
  secs.forEach(s => tocObserver.observe(s));
}


/* =====================================================================
   2. CÁC MÁY
   ===================================================================== */
/* ---------- flashcard trong bài (xem lướt, không chấm) ---------- */
function cardBack(c) {
  return `<div class="big">${c.f}</div><div class="sub">${c.p ? `<span class="vn">${c.p}</span><br>` : ""}${c.x ? `<b>${c.x}</b><br>` : ""}${c.m}</div><div class="hint">Bấm để lật lại · mũi tên → thẻ kế</div>`;
}
function cardFront(c, hint) { return `<div class="big">${c.f}</div><div class="hint">${hint || "Tự đọc to và tự dịch, rồi bấm để kiểm tra"}</div>`; }
function Flash(part, filterTag) {
  const full = N.cardsFor(part);
  const cardEl = $(part + "-card"), posEl = $(part + "-cardpos");
  if (!cardEl) return;
  let deck = full.slice(), idx = 0, flipped = false, only = false;
  const hints = { p3: "Đọc thầm cả bốn dạng, rồi bấm để kiểm tra", p4: "Nói ra dạng hiện tại, rồi bấm để kiểm tra", p6: "Nói ra cả bốn dạng, rồi bấm để kiểm tra", p1: "Tự đọc thành tiếng, rồi bấm để kiểm tra" };
  function draw() {
    const c = deck[idx];
    cardEl.innerHTML = flipped ? cardBack(c) : cardFront(c, hints[part]);
    posEl.textContent = `${idx + 1} / ${deck.length}`;
  }
  function flip() { flipped = !flipped; draw(); if (flipped) say(deck[idx].s); }
  cardEl.addEventListener("click", flip);
  cardEl.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); });
  const next = () => { idx = (idx + 1) % deck.length; flipped = false; draw(); };
  const prev = () => { idx = (idx - 1 + deck.length) % deck.length; flipped = false; draw(); };
  $(part + "-next").onclick = next; $(part + "-prev").onclick = prev;
  $(part + "-shuffle").onclick = () => { deck = shuffle(deck); idx = 0; flipped = false; draw(); };
  const fb = $$(`#view-${part} [id^="${part}-only"]`)[0];
  if (fb && filterTag) {
    const label = fb.textContent;
    fb.onclick = () => { only = !only; deck = only ? full.filter(c => c.tag === filterTag) : full.slice(); fb.textContent = only ? "Tất cả thẻ" : label; idx = 0; flipped = false; draw(); };
  }
  draw();
}

/* ---------- quiz 10 câu ---------- */
function Quiz(boxId, scoreId, questions, onDone) {
  const box = $(boxId), scoreEl = $(scoreId);
  if (!box) return;
  let done = 0, right = 0; const wrongParts = {};
  box.innerHTML = questions.map((q, qi) => `
    <div class="q"><div class="qn">Câu ${qi + 1}${q.part && boxId === "ex-box" ? " · phần " + q.part.slice(1) : ""}</div><div class="qt">${q.q}</div>
      <div class="opts">${q.o.map((o, oi) => `<button class="opt" type="button" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div>
      <p class="why" id="${boxId}-why${qi}">${q.w}</p></div>`).join("");
  scoreEl.hidden = false; scoreEl.className = "score"; scoreEl.innerHTML = "Chưa trả lời câu nào.";
  box.onclick = e => {
    const b = e.target.closest(".opt"); if (!b || b.disabled) return;
    const qi = +b.dataset.q, oi = +b.dataset.o, q = questions[qi];
    $$(".opt", b.parentElement).forEach((btn, i) => { btn.disabled = true; if (i === q.a) btn.classList.add("right"); else if (i === oi) btn.classList.add("wrong"); });
    $(`${boxId}-why${qi}`).classList.add("show");
    done++; if (oi === q.a) right++; else if (q.part) wrongParts[q.part] = (wrongParts[q.part] || 0) + 1;
    if (done < questions.length) { scoreEl.innerHTML = `Đúng ${right} / ${done} câu đã làm`; return; }
    onDone(right, questions.length, wrongParts, scoreEl);
  };
}

/* ---------- máy luyện (chọn đáp án) ---------- */
function Drill(part, next) {
  const opts = $(part + "-d-opts"); if (!opts) return;
  const set = (id, html) => { const el = $(part + "-d-" + id); if (el) el.innerHTML = html == null ? "" : html; };
  let score = 0, total = 0, locked = false, cur = null;
  function go() {
    cur = next();
    set("ask", cur.ask); set("word", cur.word); set("form", cur.form); set("sub", cur.sub); set("fb", "");
    opts.innerHTML = cur.opts.map((o, i) => `<button class="opt" type="button" data-i="${i}">${o}</button>`).join("");
    locked = false;
  }
  opts.onclick = e => {
    const b = e.target.closest(".opt"); if (!b || locked) return;
    locked = true; total++;
    const i = +b.dataset.i, ok = i === cur.a; if (ok) score++;
    $$(".opt", opts).forEach((btn, j) => { btn.disabled = true; if (j === cur.a) btn.classList.add("right"); else if (j === i) btn.classList.add("wrong"); });
    set("fb", cur.fb(ok)); set("score", `${score} / ${total}`);
    say(cur.say);
  };
  $(part + "-d-next").onclick = go;
  go();
}
/* nguồn câu hỏi: xáo trộn cả danh sách, phát hết mới xáo lại */
function cycle(list) { let order = shuffle(list), pos = 0; return () => { if (pos >= order.length) { order = shuffle(list); pos = 0; } return order[pos++]; }; }

/* ---------- SRS (Leitner 5 hộp) ---------- */
const SRS = {
  get(id) { return S.srs[id]; },
  due(part) { const t = today(); return N.cards.filter(c => (!part || part === "all" || c.part === part) && S.srs[c.id] && S.srs[c.id].d <= t); },
  unseen(part) { return N.cards.filter(c => (!part || part === "all" || c.part === part) && !S.srs[c.id]); },
  known() { return N.cards.filter(c => S.srs[c.id] && S.srs[c.id].b >= 2).length; },
  intro(cards) { cards.forEach(c => { if (!S.srs[c.id]) S.srs[c.id] = { b: 0, d: today(), n: 0 }; }); save(); },
  answer(c, ok) {
    const st = S.srs[c.id] || (S.srs[c.id] = { b: 0, d: today(), n: 0 });
    st.n++;
    if (ok) { st.b = Math.min(4, st.b + 1); st.d = today() + N.meta.boxDays[st.b] * DAY; }
    else { st.b = 0; st.d = today() + DAY; }
    save();
  },
  /* phần xa nhất đã có phiên hoàn thành (để chọn thẻ mới) */
  furthestPart() { let f = "p1"; N.parts.forEach(p => { if (p.sessions.some((s, i) => S.done[`${p.id}-s${i + 1}`])) f = p.id; }); return f; }
};
function updateDueBadges() {
  const n = SRS.due("all").length;
  ["nav-due", "bn-due"].forEach(id => { const el = $(id); if (!el) return; el.textContent = n; el.hidden = !n; });
  const rc = $("rv-duecount"); if (rc) rc.textContent = n;
}

/* ---------- màn hình Ôn thẻ ---------- */
const Review = {
  deck: [], idx: 0, flipped: false, mode: "due", onFinish: null, results: { ok: 0, no: 0 },
  refresh() {
    const sel = $("rv-part");
    if (sel.options.length === 1) N.parts.forEach(p => sel.insertAdjacentHTML("beforeend", `<option value="${p.id}">Phần ${p.num} · ${p.short}</option>`));
    this.boxes(); updateDueBadges();
    $("rv-start-new").textContent = `Học ${N.meta.newPerSession} thẻ mới`;
  },
  boxes() {
    const counts = [0, 0, 0, 0, 0]; let seen = 0;
    N.cards.forEach(c => { const st = S.srs[c.id]; if (st) { counts[st.b]++; seen++; } });
    const labels = ["1 ngày", "3 ngày", "7 ngày", "14 ngày", "30 ngày"];
    $("rv-boxes").innerHTML = counts.map((n, i) => `<div class="box"><div class="n">${n}</div><div class="l">Hộp ${i + 1} · ${labels[i]}</div></div>`).join("");
    $("rv-pos").textContent = seen ? `${seen} / ${N.cards.length} thẻ đã vào hệ thống ôn · ${SRS.known()} thẻ thuộc (hộp 3+)` : "Chưa có thẻ nào. Hoàn thành một phiên học hoặc bấm 'Học thẻ mới'.";
  },
  start(mode, part, limit, onFinish) {
    part = part || $("rv-part").value || "all";
    this.mode = mode; this.onFinish = onFinish || null; this.results = { ok: 0, no: 0 };
    if (mode === "due") this.deck = shuffle(SRS.due(part)).slice(0, limit || 25);
    else {
      let pool = SRS.unseen(part === "all" ? SRS.furthestPart() : part);
      if (!pool.length && part === "all") pool = SRS.unseen("all");
      this.deck = pool.slice(0, N.meta.newPerSession); SRS.intro(this.deck);
    }
    this.idx = 0; this.flipped = false;
    if (!this.deck.length) {
      $("rv-card").innerHTML = `<div class="rvempty">${mode === "due" ? "Không có thẻ nào đến hạn. Học thẻ mới hoặc quay lại ngày mai." : "Không còn thẻ mới ở phần này."}</div>`;
      $("rv-btns").hidden = true; if (this.onFinish) this.onFinish(this.results); return;
    }
    $("rv-card").scrollIntoView({ block: "center", behavior: "smooth" });
    this.draw();
  },
  draw() {
    const c = this.deck[this.idx], st = S.srs[c.id] || { b: 0 };
    const p = N.partById(c.part);
    const head = `<span class="tagline">Phần ${p.num} · ${p.short}${c.tag ? " · " + c.tag : ""}</span><span class="badge purple box">Hộp ${st.b + 1}</span>`;
    $("rv-card").innerHTML = head + (this.flipped ? cardBack(c) : `<div class="big">${this.mode === "new" ? c.f : c.f}</div><div class="hint">${this.mode === "new" ? "Thẻ mới — bấm để xem nghĩa và nghe" : "Nói to câu trả lời, rồi bấm để kiểm tra"}</div>`);
    $("rv-btns").hidden = !this.flipped;
    $("rv-pos").textContent = `Thẻ ${this.idx + 1} / ${this.deck.length} · thuộc ${this.results.ok} · chưa ${this.results.no}`;
  },
  flip() { if (!this.deck.length) return; this.flipped = !this.flipped; this.draw(); if (this.flipped) say(this.deck[this.idx].s); },
  answer(ok) {
    if (!this.deck.length || !this.flipped) return;
    const c = this.deck[this.idx];
    SRS.answer(c, ok); this.results[ok ? "ok" : "no"]++;
    if (!ok && this.mode === "due" && !c._again) { c._again = true; this.deck.push(c); }
    this.idx++; this.flipped = false;
    if (this.idx >= this.deck.length) {
      this.deck.forEach(x => delete x._again);
      $("rv-card").innerHTML = `<div class="rvempty">Xong ${this.idx} thẻ · thuộc ${this.results.ok} · chưa ${this.results.no}.<br>Thẻ "chưa" sẽ quay lại ngày mai.</div>`;
      $("rv-btns").hidden = true; this.deck = []; this.boxes(); updateDueBadges();
      if (this.onFinish) { const f = this.onFinish; this.onFinish = null; f(this.results); }
      return;
    }
    this.draw();
  }
};
/* tra từ */
function dictSearch(q) {
  const list = $("dict-list"); q = q.trim().toLowerCase();
  if (q.length < 2) { list.innerHTML = ""; return; }
  const hits = N.cards.filter(c => c.f.toLowerCase().includes(q) || c.m.toLowerCase().includes(q) || c.x.toLowerCase().includes(q)).slice(0, 40);
  list.innerHTML = hits.length ? hits.map(c => `<li>${playBtn(c.s)}<span class="no">${c.f}</span><span class="m">${c.p ? `[${c.p}] ` : ""}${c.m}${c.x ? ` · ${c.x}` : ""}</span><span class="tag">P${c.part.slice(1)}</span></li>`).join("") : '<li class="muted">Không thấy. Thử gõ ngắn hơn.</li>';
}

/* ---------- chép chính tả ---------- */
function norm(s) { return s.toLowerCase().replace(/[.,!?…:;"«»]/g, "").replace(/\s+/g, " ").trim(); }
/* so khớp ký tự (LCS) để tô đỏ chỗ sai */
function diffMark(target, typed) {
  const a = [...target], b = [...typed];
  const m = a.length, n = b.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0, out = "";
  while (i < m && j < n) {
    if (a[i] === b[j]) { out += `<span class="g">${a[i]}</span>`; i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) { out += `<span class="r">${a[i]}</span>`; i++; }
    else j++;
  }
  while (i < m) out += `<span class="r">${a[i++]}</span>`;
  return out;
}
const Dict = {
  cur: null, pool: [], next: null, ok: 0, total: 0, slow: false,
  refresh() {
    const sel = $("dc-part");
    if (!sel.options.length) {
      sel.innerHTML = '<option value="all">Các phần đã học</option>' + N.parts.map(p => `<option value="${p.id}">Phần ${p.num} · ${p.short}</option>`).join("");
      sel.onchange = () => this.build();
    }
    if (!this.cur) this.build();
    $("dc-score").textContent = `${S.dict.ok} / ${S.dict.total} đúng (tổng)`;
  },
  setPart(part) { $("dc-part").value = part; this.build(); },
  build() {
    const v = $("dc-part").value;
    const upto = N.partIndex[SRS.furthestPart()];
    this.pool = N.cards.filter(c => v === "all" ? N.partIndex[c.part] <= upto : c.part === v).filter(c => c.d.length >= 2);
    this.next = cycle(this.pool); this.newItem();
  },
  newItem() {
    this.cur = this.next ? this.next() : null; this.slow = false;
    $("dc-input").value = ""; $("dc-fb").textContent = ""; $("dc-fb").className = "fb"; $("dc-diff").innerHTML = "";
    $("dc-meta").innerHTML = this.cur ? `${$("dc-hint").checked ? `<b>${this.cur.m}</b> · ` : ""}Phần ${this.cur.part.slice(1)} · ${[...this.cur.d].length} ký tự · bấm loa để nghe` : "Chưa có thẻ.";
    if (this.cur) setTimeout(() => say(this.cur.d), 250);
  },
  play() { if (!this.cur) return; say(this.cur.d, this.slow ? 0.6 : undefined); this.slow = !this.slow; },
  check() {
    if (!this.cur) return;
    const typed = norm($("dc-input").value), target = norm(this.cur.d);
    if (!typed) { $("dc-input").focus(); return; }
    const ok = typed === target;
    S.dict.total++; if (ok) S.dict.ok++; save();
    $("dc-fb").className = "fb " + (ok ? "ok" : "no");
    $("dc-fb").innerHTML = ok ? `Đúng: <b>${this.cur.d}</b> — ${this.cur.m}` : `Chưa đúng. Đáp án: <b>${this.cur.d}</b> — ${this.cur.m}${this.cur.p ? ` [${this.cur.p}]` : ""}`;
    $("dc-diff").innerHTML = ok ? "" : diffMark(target, typed);
    $("dc-score").textContent = `${S.dict.ok} / ${S.dict.total} đúng (tổng)`;
    if (ok) setTimeout(() => this.newItem(), 1400);
  }
};

/* ---------- thi thử 30 câu ---------- */
const Exam = {
  refresh() { const b = S.quiz.exam; $("ex-best").textContent = b ? `Kết quả tốt nhất: ${b} / 30` : "Chưa thi lần nào."; },
  start() {
    let qs = []; N.parts.forEach(p => qs.push(...shuffle(N[p.id].QUIZ.map(q => Object.assign({ part: p.id }, q))).slice(0, 4)));
    qs = shuffle(qs).slice(0, 30);
    $("ex-start").textContent = "Làm lại đề khác";
    Quiz("ex-box", "ex-score", qs, (right, total, wrong, el) => {
      S.quiz.exam = Math.max(S.quiz.exam || 0, right); save(); this.refresh();
      const pass = right >= 24;
      el.className = "score " + (pass ? "pass" : "fail");
      const worst = Object.entries(wrong).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([p, n]) => `phần ${p.slice(1)} (${n} sai)`).join(", ");
      el.innerHTML = pass ? `Xong: ${right} / ${total}. Đạt mốc A1. Sang chặng A2 theo hướng dẫn ở trang Lộ trình.` : `Xong: ${right} / ${total}. Chưa đạt 24. Sai nhiều nhất ở ${worst || "—"} — quay lại phần đó, làm lại sau một tuần.`;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    $("ex-box").scrollIntoView({ block: "start", behavior: "smooth" });
  }
};


/* =====================================================================
   DỰNG NỘI DUNG 8 PHẦN (bảng, danh sách, hội thoại) — sinh từ bản gốc, ID đã prefix
   ===================================================================== */

function renderP1() {
  const { ALFA, VOK_EASY, VOK_HARD, LENGDE, KONS, KLYNGER, STUMME, STAVE, TONER, ORD, QUIZ } = window.NORSK.p1;
  // ví dụ dạng "norsk|phiên âm|nghĩa · norsk|phiên âm|nghĩa"
  function renderEx(str){
    return str.split(" · ").map(chunk=>{
      const [n,v,m] = chunk.split("|");
      return `<span class="no">${n}</span> <span class="vn">${v}</span> ${m?m:""} ${playBtn(n)}`;
    }).join("<br>");
  }
  
  // Bảng chữ cái
  document.getElementById("p1-alfa").innerHTML = ALFA.map(([ch,nm,rd,cls])=>
    `<button class="${cls||''}" onclick="say('${ch.split(' ')[0]}')">
       <div class="ch">${ch}</div><div class="nm">${nm}</div><div class="rd">[${rd}]</div>
     </button>`).join("");
  
  // Nguyên âm dễ
  document.getElementById("p1-vok-easy").innerHTML = VOK_EASY.map(([c,v,i,ex])=>
    `<tr><td class="no" style="font-size:18px">${c}</td><td class="vn">${v}</td>
     <td class="ipa">${i}</td><td class="ex">${renderEx(ex)}</td></tr>`).join("");
  
  // Nguyên âm khó
  document.getElementById("p1-vok-hard").innerHTML = VOK_HARD.map(([c,v,i,d])=>{
    const [txt, ...rest] = d.split("Ví dụ: ");
    return `<tr><td class="no" style="font-size:22px">${c}</td><td class="vn">${v}</td>
     <td class="ipa">${i}</td><td>${txt}<div class="ex" style="margin-top:6px">${rest.length?renderEx(rest[0]):""}</div></td></tr>`;
  }).join("");
  
  // Dài / ngắn
  document.getElementById("p1-lengde").innerHTML = LENGDE.map(r=>
    `<tr>${r.map((c,idx)=>{
      if(idx===2) return `<td class="ex">${c}</td>`;
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:17px">${n}</span> ${playBtn(n)}<br><span class="vn">${v}</span> <span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
  
  // Phụ âm
  document.getElementById("p1-kons").innerHTML = KONS.map(([c,v,ex])=>
    `<tr><td class="no" style="font-size:17px">${c}</td><td>${v}</td><td class="ex">${renderEx(ex)}</td></tr>`).join("");
  
  // Tổ hợp
  document.getElementById("p1-klynger").innerHTML = KLYNGER.map(([c,v,ex])=>
    `<tr><td class="no" style="font-size:17px">${c}</td><td class="vn">${v}</td><td class="ex">${renderEx(ex)}</td></tr>`).join("");
  
  // Chữ câm
  document.getElementById("p1-stumme").innerHTML = STUMME.map(([n,r,ex])=>
    `<tr><td class="no" style="font-size:17px">${n}</td><td>${r}</td><td class="ex">${renderEx(ex)}</td></tr>`).join("");
  
  // Máy đánh vần
  document.getElementById("p1-stavemaskin").innerHTML = STAVE.map(s=>`
    <div class="spell">
      <div class="spellrow">
        ${s.parts.map(p=>`<span class="piece">${p}</span>`).join('<span class="plus">+</span>')}
        <span class="arrow">→</span>
        <span class="whole">${s.whole}</span>
        <span class="vn">${s.vn}</span>
        ${playBtn(s.whole)}
      </div>
      <p class="say"><b>${s.mean}.</b> ${s.note}</p>
    </div>`).join("");
  
  // Thanh điệu
  document.getElementById("p1-toner").innerHTML = TONER.map(r=>
    `<tr>${r.map((c,idx)=>{
      if(idx===2) return `<td class="ex">${c}</td>`;
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:17px">${n}</span> ${playBtn(n)}<br><span class="vn">${v}</span> <span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
  
  // 40 từ
  document.getElementById("p1-ordliste").innerHTML = ORD.map(([n,v,m])=>
    `<div class="w">${playBtn(n)}<div class="txt">
       <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
     </div></div>`).join("");
}

function renderP2() {
  const { HILS1, HILS2, HILS3, OMEG, SPORS, BØYING, FLIPS, DIAL1, DIAL2, TALL1, TALL2, TALL3, FELLEN, ALDER, TLF, PRIS, QUIZ } = window.NORSK.p2;
  function frases(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="f">${playBtn(n)}<div class="txt">
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  frases("p2-hils1",HILS1); frases("p2-hils2",HILS2); frases("p2-hils3",HILS3);
  frases("p2-omeg",OMEG); frases("p2-alder",ALDER); frases("p2-tlf",TLF); frases("p2-pris",PRIS);
  
  // hỏi & đáp
  document.getElementById("p2-spors").innerHTML = SPORS.map(pair=>
    `<tr>${pair.map(c=>{
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:16px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span><br><span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
  
  // bảng chia động từ
  document.getElementById("p2-bøying").innerHTML = BØYING.map(row=>{
    const [p,pv,pm] = row[0].split("|");
    const cell = c=>{ const [n,v] = c.split("|"); return `<td><span class="no">${n}</span>${v?`<br><span class="ex">[${v}]</span>`:""}</td>`; };
    return `<tr><td><span class="no" style="font-size:16px">${p}</span>${pv?` <span class="ex">[${pv}] ${pm}</span>`:""}</td>
      ${cell(row[1])}${cell(row[2])}${cell(row[3])}</tr>`;
  }).join("");
  
  // máy đổi câu kể → câu hỏi
  document.getElementById("p2-flipmaskin").innerHTML = FLIPS.map(f=>`
    <div class="flip">
      <div class="row">
        ${f.s.map((p,i)=>`<span class="piece${i===1?' verb':''}">${p}</span>`).join("")}
        <span class="arrow">.</span> ${playBtn(f.s.join(" "))}
      </div>
      <p style="margin-bottom:12px">${f.vs}</p>
      <div class="row">
        ${f.q.map((p,i)=>`<span class="piece${i===0?' verb':''}">${p}</span>`).join("")}
        <span class="arrow">?</span> ${playBtn(f.q.join(" "))}
      </div>
      <p>${f.vq}</p>
    </div>`).join("");
  
  // hội thoại
  function dialog(id, arr){
    document.getElementById(id).innerHTML = arr.map(([w,n,v,m])=>
      `<div class="line"><div class="who">${w}</div>
        <div class="body"><div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div></div>
        ${playBtn(n)}</div>`).join("");
  }
  dialog("p2-dial1",DIAL1); dialog("p2-dial2",DIAL2);
  
  // bàn phím số
  function tall(id, arr, markRound){
    document.getElementById(id).innerHTML = arr.map(([n,o,v])=>
      `<button class="${markRound?'rund':''}" onclick="say('${esc(o)}')">
        <div class="n">${n}</div><div class="o">${o}</div><div class="v">[${v}]</div>
      </button>`).join("");
  }
  tall("p2-tall1",TALL1,false); tall("p2-tall2",TALL2,true); tall("p2-tall3",TALL3,false);
  
  // bảng bẫy
  document.getElementById("p2-fellen").innerHTML = FELLEN.map(r=>
    `<tr>${r.map((c,i)=>{
      if(i===2) return `<td class="ex">${c}</td>`;
      const [num,n,v] = c.split("|");
      return `<td><span class="ex">${num}</span><br><span class="no" style="font-size:17px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span></td>`;
    }).join("")}</tr>`).join("");
}

function renderP3() {
  const { N, UREG, ART, KLASSE, KJONNNAVN, FLERTALLSREGLER, MEDTALL, BRUK, QUIZ } = window.NORSK.p3;
  /* ============ BẢNG BỐN DẠNG ============ */
  const HEAD = `<thead><tr>
    <th style="width:150px">Dạng</th><th style="width:170px">Ví dụ</th><th>Nghĩa</th></tr></thead>`;
  function malTable(id, row){
    const [g,s,ds,p,dp,mean] = row;
    const rows = [
      ["Số ít, không xác định", ART[g]+" "+s, "một "+mean],
      ["Số ít, xác định", ds, mean+" đó"],
      ["Số nhiều, không xác định", p, "những "+mean],
      ["Số nhiều, xác định", dp, "những "+mean+" đó"]
    ];
    document.getElementById(id).innerHTML = HEAD + "<tbody>" + rows.map(([lab,form,vi])=>
      `<tr><td>${lab}</td>
        <td><span class="cell ${KLASSE[g]}">${form}</span></td>
        <td class="ex">${vi} ${playBtn(form)}</td></tr>`).join("") + "</tbody>";
  }
  malTable("p3-mal-m", N[0]);
  malTable("p3-mal-f", N[12]);
  malTable("p3-mal-n", N[20]);
  
  /* ============ QUY TẮC SỐ NHIỀU ============ */
  document.getElementById("p3-flertallsregler").innerHTML = FLERTALLSREGLER.map(([n,r,ex])=>
    `<tr><td class="no" style="font-size:17px">${n}</td><td>${r}</td>
     <td class="ex">${ex.split("|").map(e=>`<span class="no">${e}</span>`).join("<br>")}</td></tr>`).join("");
  
  /* ============ BẢNG DANH TỪ ============ */
  const LISTHEAD = `<thead><tr>
    <th style="width:150px">Cơ bản</th><th style="width:130px">Xác định</th>
    <th style="width:130px">Số nhiều</th><th style="width:140px">SN xác định</th><th>Nghĩa</th></tr></thead>`;
  function listTable(id, data){
    document.getElementById(id).innerHTML = LISTHEAD + "<tbody>" + data.map(([g,s,ds,p,dp,mean,ph])=>
      `<tr>
        <td class="${KLASSE[g]}"><span class="cell">${ART[g]} ${s}</span> ${playBtn(s)}<br><span class="ph">[${ph}]</span></td>
        <td><span class="cell">${ds}</span> ${playBtn(ds)}</td>
        <td><span class="cell">${p}</span> ${playBtn(p)}</td>
        <td><span class="cell">${dp}</span></td>
        <td class="ex">${mean}</td>
      </tr>`).join("") + "</tbody>";
  }
  listTable("p3-ordliste-tab", N.concat(UREG.slice(0,10)));
  listTable("p3-ureg", UREG);
  
  /* ============ ĐI VỚI SỐ ĐẾM ============ */
  document.getElementById("p3-medtall").innerHTML = MEDTALL.map(([n,v,m])=>
    `<div style="background:#fff;padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
      ${playBtn(n)}<div>
        <div style="font-family:var(--serif);font-size:17px;font-weight:600;color:var(--fjord)">${n}</div>
        <div style="font-size:13px;font-weight:600">[${v}]</div>
        <div style="font-size:13px;color:var(--ink-soft)">${m}</div>
      </div></div>`).join("");
  
  /* ============ KHI NÀO XÁC ĐỊNH ============ */
  document.getElementById("p3-bruk").innerHTML = BRUK.map(pair=>
    `<tr>${pair.map(c=>{
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:16px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span><br><span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
}

function renderP4() {
  const { VERB, V2RADER, FEILPAR, SKJEMA, IKKEPAR, IKKELISTE, JASPORS, JONEI, SPORREORD, BISETNING, DRILL, QUIZ } = window.NORSK.p4;
  /* ============ BẢNG HIỆN TẠI ============ */
  const REG = VERB.filter(v=>!v[4]), IRR = VERB.filter(v=>v[4]);
  document.getElementById("p4-presenstabell").innerHTML = REG.slice(0,8).map(([inf,pres,ph,mean])=>
    `<tr><td><span class="no" style="color:var(--ink-soft)">${inf}</span></td>
     <td><span class="no" style="font-size:17px">${pres}</span> ${playBtn(pres)}<br><span class="ex">[${ph}]</span></td>
     <td class="ex">${mean}</td></tr>`).join("");
  document.getElementById("p4-irrtabell").innerHTML = IRR.map(([inf,pres,ph,mean])=>
    `<tr class="irr"><td><span class="inf">${inf}</span></td>
     <td><span class="pres">${pres}</span> ${playBtn(pres)}<br><span class="ph">[${ph}]</span></td>
     <td class="ex">${mean}</td></tr>`).join("");
  
  /* ============ SƠ ĐỒ V2 ============ */
  document.getElementById("p4-v2rader").innerHTML = V2RADER.map(r=>{
    const sent = [r[0],r[1],r[2],r[3]].filter(x=>x!=="—").join(" ");
    return `<tr>
      <td>${r[0]}</td><td>${r[1]}</td><td class="${r[2]==="—"?"tom":""}">${r[2]}</td>
      <td>${r[3]} <span class="ex">· ${r[4]}</span> ${playBtn(sent)}</td></tr>`;
  }).join("");
  
  document.getElementById("p4-skjemarader").innerHTML = SKJEMA.map(r=>{
    const sent = [r[0],r[1],r[2],r[3],r[4]].filter(x=>x!=="—").join(" ");
    return `<tr>
      <td>${r[0]}</td><td>${r[1]}</td><td class="${r[2]==="—"?"tom":""}">${r[2]}</td>
      <td>${r[3]}</td><td class="${r[4]==="—"?"tom":""}">${r[4]} <span class="ex">· ${r[5]}</span> ${playBtn(sent)}</td></tr>`;
  }).join("");
  
  document.getElementById("p4-jaspors").innerHTML = JASPORS.map(r=>{
    const sent = [r[0],r[1],r[2],r[3]].filter(x=>x!=="—").join(" ");
    return `<tr>
      <td>${r[0]}</td><td>${r[1]}</td><td class="${r[2]==="—"?"tom":""}">${r[2]}</td>
      <td>${r[3]} <span class="ex">· ${r[4]}</span> ${playBtn(sent)}</td></tr>`;
  }).join("");
  
  /* ============ CẶP ĐÚNG SAI ============ */
  function pairs(id, data){
    document.getElementById(id).innerHTML = data.map(([bad,good,vi])=>`
      <div class="pair">
        <div class="bad"><div class="tag">Sai</div><div class="sent">${bad}</div><div class="vi">${vi}</div></div>
        <div class="good"><div class="tag">Đúng</div><div class="sent">${good}</div>
          <div class="vi">${vi} ${playBtn(good)}</div></div>
      </div>`).join("");
  }
  pairs("p4-feilpar", FEILPAR);
  pairs("p4-ikkepar", IKKEPAR);
  
  /* ============ DANH SÁCH CỤM ============ */
  function frases(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="f">${playBtn(n)}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  frases("p4-ikkeliste", IKKELISTE);
  frases("p4-jonei", JONEI);
  frases("p4-bisetning", BISETNING);
  
  /* ============ TỪ ĐỂ HỎI ============ */
  document.getElementById("p4-sporreordtab").innerHTML = SPORREORD.map(([w,ph,mean,ex])=>{
    const [n,v,m] = ex.split("|");
    return `<tr><td><span class="no" style="font-size:17px">${w}</span><br><span class="ex">[${ph}]</span></td>
      <td class="ex">${mean}</td>
      <td><span class="no">${n}</span> ${playBtn(n)}<br><span class="vn">${v}</span><br><span class="ex">${m}</span></td></tr>`;
  }).join("");
  
  /* ============ BẢNG 40 ĐỘNG TỪ ============ */
  document.getElementById("p4-verbtabell").innerHTML =
    `<thead><tr><th style="width:170px">Nguyên thể</th><th style="width:190px">Hiện tại</th><th>Nghĩa</th></tr></thead><tbody>` +
    VERB.map(([inf,pres,ph,mean,irr])=>
      `<tr class="${irr?'irr':''}"><td><span class="inf">${inf}</span></td>
       <td><span class="pres">${pres}</span> ${playBtn(pres)} <span class="ph">[${ph}]</span></td>
       <td class="ex">${mean}</td></tr>`).join("") + "</tbody>";
}

function renderP5() {
  const { EIER, EIEPOS, EIEPAR, SIN, FAMILIE, HUS, ROMGIRO, KLOKKEDELER, KLOKKER, KLOKKESPORS, UKEDAGER, MANEDER, ARSTIDER, TIDORD, MALTID, DAGTEKST, DRILL, QUIZ } = window.NORSK.p5;
  function words(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m,g])=>
      `<div class="w ${g||'x'}">${playBtn(n.replace(/^(en|ei|et|å) /,""))}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  words("p5-familieord",FAMILIE); words("p5-husord",HUS); words("p5-romgiro",ROMGIRO);
  words("p5-klokkesporsmal",KLOKKESPORS); words("p5-ukedager",UKEDAGER); words("p5-maneder",MANEDER);
  words("p5-arstider",ARSTIDER); words("p5-tidord",TIDORD); words("p5-maltidord",MALTID);
  
  // bảng sở hữu
  document.getElementById("p5-eiertabell").innerHTML = EIER.map(r=>
    `<tr><td>${r[0]}</td>${r.slice(1).map(f=>`<td><span class="form">${f}</span></td>`).join("")}</tr>`).join("");
  
  // hai vị trí
  document.getElementById("p5-eiepos").innerHTML = EIEPOS.map(pair=>
    `<tr>${pair.map(c=>{
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:17px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span><br><span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
  
  // cặp đúng sai sở hữu
  document.getElementById("p5-eiepar").innerHTML = EIEPAR.map(([bad,good,vi])=>`
    <div class="pair">
      <div class="bad"><div class="tag">Sai</div><div class="sent">${bad}</div><div class="vi">${vi}</div></div>
      <div class="good"><div class="tag">Đúng</div><div class="sent">${good}</div>
        <div class="vi">${vi} ${playBtn(good)}</div></div>
    </div>`).join("");
  
  // sin / hans
  document.getElementById("p5-sintabell").innerHTML = SIN.map(pair=>
    `<tr>${pair.map(c=>{
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:16px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span><br><span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
  
  // mảnh ghép giờ
  document.getElementById("p5-klokkedeler").innerHTML = KLOKKEDELER.map(([w,ph,m])=>
    `<tr><td><span class="no" style="font-size:18px">${w}</span> ${playBtn(w)}</td>
     <td><span class="vn">${ph}</span></td><td class="ex">${m}</td></tr>`).join("");
  
  // lưới giờ
  document.getElementById("p5-klokkegrid").innerHTML = KLOKKER.map(([dig,nor,ph,half])=>
    `<button class="cl ${half?'halv':''}" onclick="say('${esc(nor)}')">
      <div class="dig">${dig}</div><div class="nor">${nor}</div><div class="ph">[${ph}]</div>
    </button>`).join("");
  
  // đoạn văn
  document.getElementById("p5-dagtekst").innerHTML = DAGTEKST.map(([n,v,m])=>
    `<div class="tline"><div class="body">
      <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
    </div>${playBtn(n)}</div>`).join("");
}

function renderP6() {
  const { VERB, FIRE, GRUPPER, PPTAB, FORTIDORD, FRAM1, FRAM2, FRAM3, MODAL, MODALPAR, LEDDRADER, LEDDPAR, LEDDFORST, NARDA, IGAR, DRILL_ORDER, DRILL_FORM, QUIZ } = window.NORSK.p6;
  document.getElementById("p6-firetabell").innerHTML = FIRE.map(([nm,ex,use])=>
    `<tr><td>${nm}</td><td><span class="no" style="font-size:17px">${ex}</span> ${playBtn(ex.replace(/^å /,""))}</td>
     <td class="ex">${use}</td></tr>`).join("");
  
  document.getElementById("p6-gruppene").innerHTML = GRUPPER.map(([n,e,r,ex])=>
    `<div class="gr"><div class="num">${n}</div><div class="end">${e}</div>
     <div class="rule">${r}</div><div class="ex2">${ex}</div></div>`).join("");
  
  const STERK = VERB.filter(v=>v[6]);
  document.getElementById("p6-sterketabell").innerHTML = STERK.map(([inf,pres,pret,perf,ph,mean])=>
    `<tr class="sterk"><td><span class="f1">${inf}</span></td>
     <td><span class="f2">${pret}</span> ${playBtn(pret)}<br><span class="ph">[${ph}]</span></td>
     <td><span class="f3">${perf}</span></td><td class="ex">${mean}</td></tr>`).join("");
  
  function twoCol(id, data){
    document.getElementById(id).innerHTML = data.map(pair=>
      `<tr>${pair.map(c=>{
        const [n,v,m] = c.split("|");
        return `<td><span class="no" style="font-size:16px">${n}</span> ${playBtn(n)}
                <br><span class="vn">${v}</span><br><span class="ex">${m||""}</span></td>`;
      }).join("")}</tr>`).join("");
  }
  twoCol("p6-pptabell", PPTAB);
  twoCol("p6-nardatabell", NARDA);
  
  function words(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="w">${playBtn(n)}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  words("p6-fortidord",FORTIDORD); words("p6-framtid1",FRAM1); words("p6-framtid2",FRAM2);
  words("p6-framtid3",FRAM3); words("p6-leddforst",LEDDFORST);
  
  document.getElementById("p6-modaltabell").innerHTML = MODAL.map(([pres,pret,mean,ex])=>{
    const [n,v,m] = ex.split("|");
    return `<tr><td><span class="f2">${pres}</span></td><td><span class="f3">${pret}</span></td>
      <td class="ex">${mean}</td>
      <td><span class="no">${n}</span> ${playBtn(n)}<br><span class="ex">${m}</span></td></tr>`;
  }).join("");
  
  function pairs(id, data){
    document.getElementById(id).innerHTML = data.map(([bad,good,vi])=>`
      <div class="pair">
        <div class="bad"><div class="tag">Sai</div><div class="sent">${bad}</div><div class="vi">${vi}</div></div>
        <div class="good"><div class="tag">Đúng</div><div class="sent">${good}</div>
          <div class="vi">${vi} ${playBtn(good)}</div></div>
      </div>`).join("");
  }
  pairs("p6-modalpar", MODALPAR);
  pairs("p6-leddpar", LEDDPAR);
  
  document.getElementById("p6-leddrader").innerHTML = LEDDRADER.map(r=>{
    const sent = [r[0],r[1],r[2],r[3],r[4]].filter(x=>x!=="—").join(" ");
    return `<tr><td>${r[0]}</td><td>${r[1]}</td>
      <td class="hl ${r[2]==="—"?"tom":""}">${r[2]}</td><td>${r[3]}</td>
      <td>${r[4]} <span class="ex">· ${r[5]}</span> ${playBtn(sent)}</td></tr>`;
  }).join("");
  
  document.getElementById("p6-igartekst").innerHTML = IGAR.map(([n,v,m])=>
    `<div class="tline"><div class="body">
      <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
    </div>${playBtn(n)}</div>`).join("");
  
  document.getElementById("p6-verbtabell").innerHTML =
    `<thead><tr><th style="width:150px">Nguyên thể</th><th style="width:130px">Hiện tại</th>
     <th style="width:160px">Quá khứ</th><th style="width:160px">Hoàn thành</th><th>Nghĩa</th></tr></thead><tbody>` +
    VERB.map(([inf,pres,pret,perf,ph,mean,st])=>
      `<tr class="${st?'sterk':''}"><td><span class="f1">${inf}</span></td>
       <td><span class="f1">${pres}</span></td>
       <td><span class="f2">${pret}</span> ${playBtn(pret)} <span class="ph">[${ph}]</span></td>
       <td><span class="f3">${perf}</span></td><td class="ex">${mean}</td></tr>`).join("") + "</tbody>";
}

function renderP7() {
  const { PREDIKATIV, UNNTAK, ENDRING, UREGADJ, DOBBEL, DOBBELPAR, EIENDOM, GRAD, MERORD, UREGKOMP, SAMMEN, MOTSATT, FARGER, PREP, BEVEGELSE, IPA, DRILL_FORM, DRILL_KOMP, QUIZ } = window.NORSK.p7;
  function words(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="w">${playBtn(n)}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  words("p7-predikativ",PREDIKATIV); words("p7-eiendomsord",EIENDOM); words("p7-merord",MERORD);
  words("p7-sammenord",SAMMEN); words("p7-preposisjoner",PREP); words("p7-ipaliste",IPA);
  
  document.getElementById("p7-unntakstabell").innerHTML = UNNTAK.map(([n,r,ex])=>
    `<tr><td class="no" style="font-size:17px">${n}</td><td>${r}</td>
     <td class="ex">${ex.split(" · ").map(e=>{
       const [a,b] = e.split("|");
       return `<span class="no">${a}</span> ${b} ${playBtn(a)}`;
     }).join("<br>")}</td></tr>`).join("");
  
  document.getElementById("p7-endringstabell").innerHTML = ENDRING.map(([r,ex])=>
    `<tr><td>${r}</td><td class="ex">${ex.split(" · ").map(e=>{
       const [a,b] = e.split("|");
       return `<span class="no">${a}</span> ${b}`;
     }).join("<br>")}</td></tr>`).join("");
  
  function adjTable(id, data, cols){
    document.getElementById(id).innerHTML = data.map(row=>{
      const irr = row[row.length-1];
      const cells = row.slice(0, cols).map((c,i)=>
        `<td><span class="f ${i===1?'fx':''}">${c}</span></td>`).join("");
      return `<tr class="${irr?'unreg':''}">${cells}<td class="ex">${row[cols]} ${playBtn(row[0])}</td></tr>`;
    }).join("");
  }
  adjTable("p7-uregtabell", UREGADJ, 4);
  adjTable("p7-fargetabell", FARGER, 3);
  adjTable("p7-uregkomptabell", UREGKOMP, 3);
  
  document.getElementById("p7-dobbeltabell").innerHTML = DOBBEL.map(([g,f,m])=>
    `<tr><td class="ex">${g}</td><td><span class="no" style="font-size:17px">${f}</span> ${playBtn(f)}</td>
     <td class="ex">${m}</td></tr>`).join("");
  
  document.getElementById("p7-dobbelpar").innerHTML = DOBBELPAR.map(([bad,good,vi])=>`
    <div class="pair">
      <div class="bad"><div class="tag">Sai</div><div class="sent">${bad}</div><div class="vi">${vi}</div></div>
      <div class="good"><div class="tag">Đúng</div><div class="sent">${good}</div>
        <div class="vi">${vi} ${playBtn(good)}</div></div>
    </div>`).join("");
  
  document.getElementById("p7-gradtabell").innerHTML = GRAD.map(([a,b,c,m])=>
    `<tr><td><span class="no">${a}</span> ${playBtn(a)}</td>
     <td><span class="no" style="color:var(--lamp)">${b}</span> ${playBtn(b)}</td>
     <td><span class="no">${c}</span></td><td class="ex">${m}</td></tr>`).join("");
  
  document.getElementById("p7-motsattliste").innerHTML = MOTSATT.map(([l,r])=>{
    const [ln,lp,lm] = l.split("|"), [rn,rp,rm] = r.split("|");
    return `<div class="mo">
      <div class="side"><div class="n">${ln} ${playBtn(ln)}</div><div class="p">[${lp}]</div><div class="m">${lm}</div></div>
      <div class="sep">↔</div>
      <div class="side"><div class="n">${rn} ${playBtn(rn)}</div><div class="p">[${rp}]</div><div class="m">${rm}</div></div>
    </div>`;
  }).join("");
  
  document.getElementById("p7-bevegelse").innerHTML = BEVEGELSE.map(pair=>
    `<tr>${pair.map(c=>{
      const [n,v,m] = c.split("|");
      return `<td><span class="no" style="font-size:16px">${n}</span> ${playBtn(n)}
              <br><span class="vn">${v}</span><br><span class="ex">${m}</span></td>`;
    }).join("")}</tr>`).join("");
}

function renderP8() {
  const { REDNING, BUTIKK, MAT, KAFE, TRANSPORT, TRANSPORTFRASER, VEI, RETNINGER, TIMEORD, LEGE, KROPP, NOD, DIAL1, DIAL2, DIAL3, DIAL4, DRILL, QUIZ, RECAP } = window.NORSK.p8;
  function frases(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="f">${playBtn(n)}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  frases("p8-redningsord",REDNING); frases("p8-butikkord",BUTIKK); frases("p8-kafeord",KAFE);
  frases("p8-transportfraser",TRANSPORTFRASER); frases("p8-veiord",VEI); frases("p8-timeord",TIMEORD);
  frases("p8-legeord",LEGE); frases("p8-nodord",NOD);
  
  function words(id, arr){
    document.getElementById(id).innerHTML = arr.map(([n,v,m])=>
      `<div class="w">${playBtn(n.replace(/^(en|ei|et) /,""))}<div>
        <div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div>
      </div></div>`).join("");
  }
  words("p8-matord",MAT); words("p8-transportord",TRANSPORT); words("p8-retninger",RETNINGER);
  words("p8-kroppsdeler",KROPP);
  
  function dialog(id, arr){
    document.getElementById(id).innerHTML = arr.map(([w,n,v,m,side])=>
      `<div class="line ${side}"><div class="who">${w}</div>
        <div class="body"><div class="l1">${n}</div><div class="l2">[${v}]</div><div class="l3">${m}</div></div>
        ${playBtn(n)}</div>`).join("");
  }
  dialog("p8-dial1",DIAL1); dialog("p8-dial2",DIAL2); dialog("p8-dial3",DIAL3); dialog("p8-dial4",DIAL4);
  
  document.getElementById("p8-recap").innerHTML = RECAP.map(([n,t,d,href])=>
    `<div class="rc"><div class="n">${n}</div>
     <div class="t">${href==="#" ? t : `<a href="${href}">${t}</a>`}</div>
     <div class="d">${d}</div></div>`).join("");
}


/* ---------- gắn máy cho từng phần ---------- */
const FB = (ok, w) => (ok ? "Đúng. " : "Chưa đúng. ") + w;
const DRILLS = {
  p3(D) {
    const ALL = [...D.N, ...D.UREG], FORMS = [["dạng xác định số ít", 2], ["dạng số nhiều", 3], ["dạng số nhiều xác định", 4]];
    return () => {
      const row = pick(ALL), [label, i] = pick(FORMS), correct = row[i], pool = new Set([correct]);
      [row[1], row[2], row[3], row[4]].forEach(f => { if (pool.size < 4) pool.add(f); });
      [row[1] + "en", row[1] + "a", row[1] + "er", row[1] + "ene", row[1] + "et"].forEach(f => { if (pool.size < 4) pool.add(f); });
      const opts = shuffle([...pool].slice(0, 4)), all4 = `<span class="no">${D.ART[row[0]]} ${row[1]} – ${row[2]} – ${row[3]} – ${row[4]}</span>`;
      return { word: `${D.ART[row[0]]} ${row[1]} <span class="ex" style="font-size:15px">· ${row[5]}</span>`, form: "Cần: " + label, opts, a: opts.indexOf(correct), say: correct,
        fb: ok => ok ? `Đúng. Cả bốn dạng: ${all4}` : `Đúng phải là <span class="no">${correct}</span>. Đây là ${D.KJONNNAVN[row[0]]}: ${all4}` };
    };
  },
  p4(D) { const nx = cycle(D.DRILL); return () => { const d = nx(); return { word: d.vi, opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }; }; },
  p5(D) { const nx = cycle(D.DRILL); return () => { const d = nx(); return { word: d.t, opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }; }; },
  p6(D) {
    const nx = cycle([...D.DRILL_FORM.map(d => ({ type: "form", ...d })), ...D.DRILL_ORDER.map(d => ({ type: "order", ...d }))]);
    return () => { const d = nx(); return d.type === "form"
      ? { ask: "Chia sang thì quá khứ", word: d.inf, sub: d.mean, opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }
      : { ask: "Dịch sang tiếng Na Uy", word: d.vi, sub: "", opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }; };
  },
  p7(D) {
    const nx = cycle([...D.DRILL_FORM.map(d => ({ type: "form", ...d })), ...D.DRILL_KOMP.map(d => ({ type: "komp", ...d }))]);
    return () => { const d = nx(); return d.type === "form"
      ? { ask: "Chọn dạng tính từ đúng", word: d.n, sub: "tính từ gốc: " + d.adj, opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }
      : { ask: d.ask, word: d.base, sub: "", opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }; };
  },
  p8(D) { const nx = cycle(D.DRILL); return () => { const d = nx(); return { word: d.s, opts: d.o, a: d.a, say: d.o[d.a], fb: ok => FB(ok, d.w) }; }; }
};
const FILTER = { p2: "số", p3: "bất quy tắc", p4: "bất quy tắc", p5: "gia đình", p6: "mạnh", p7: "giới từ", p8: "cứu mạng" };
const RENDER = { p1: renderP1, p2: renderP2, p3: renderP3, p4: renderP4, p5: renderP5, p6: renderP6, p7: renderP7, p8: renderP8 };
function startQuiz(part) {
  const n = +part[1];
  Quiz(part + "-quizbox", part + "-score", N[part].QUIZ, (right, total, _, el) => {
    S.quiz[part] = Math.max(S.quiz[part] || 0, right); save();
    const pass = right >= 8;
    el.className = "score " + (pass ? "pass" : "fail");
    el.innerHTML = (pass ? `Xong: ${right}/${total}. Đạt — ${n < 8 ? "sẵn sàng cho phần " + (n + 1) : "làm bài thi thử tổng A1"}.` : `Xong: ${right}/${total}. Dưới 8 — đọc lại các mục vừa sai, rồi làm lại.`)
      + ` <button class="btn sm" type="button" id="${part}-requiz" style="margin-left:8px">Làm lại</button>`;
    $(part + "-requiz").onclick = () => { startQuiz(part); $(part + "-quizbox").scrollIntoView({ block: "start", behavior: "smooth" }); };
    renderPartHead(part); renderNavParts();
  });
}
function renderPart(part) {
  try { RENDER[part](); } catch (e) { console.error("Lỗi dựng " + part, e); }
  Flash(part, FILTER[part]);
  startQuiz(part);
  if (DRILLS[part]) Drill(part, DRILLS[part](N[part]));
}


/* =====================================================================
   3. MÀN HÌNH
   ===================================================================== */
const TOTAL = N.schedule.length;
function tocLabel(sec) { const a = document.querySelector(`.toc a[href="#${sec}"]`); return a ? a.textContent : sec; }
function nextSession() { return N.schedule.find(s => !S.done[s.id]) || null; }
function partSessionsDone(p) { return p.sessions.filter((s, i) => S.done[`${p.id}-s${i + 1}`]).length; }
function weekCount(ws) { return S.log.filter(t => t >= ws && t < ws + 7 * DAY).length; }
function markDone(id) {
  if (S.done[id]) return;
  S.done[id] = Date.now(); S.log.push(Date.now());
  const s = N.schedule.find(x => x.id === id);
  if (s && s.kind === "lesson") SRS.intro(SRS.unseen(s.part).slice(0, N.meta.newPerSession));
  save(); renderNavParts(); updateDueBadges();
}

/* ---------- phiên học có dẫn ---------- */
const Session = {
  cur: null,
  build(id) {
    const s = N.schedule.find(x => x.id === id); if (!s) return null;
    const p = N.partById(s.part), steps = [];
    if (s.kind === "lesson") {
      steps.push({ kind: "srs", label: "Ôn thẻ: thẻ đến hạn (tối đa 25), hoặc thẻ mới của phần nếu chưa có gì đến hạn — 8 phút", hash: "#review", limit: 25 });
      s.secs.forEach(sec => steps.push({ kind: "read", label: "Đọc và bấm nghe: " + tocLabel(sec), hash: "#" + sec }));
      const H = { kort: `#${p.id}-kort`, drill: `#${p.id}-drill`, quiz: `#${p.id}-quiz`, dictation: "#dictation", stave: "#p1-stave" };
      const L = { kort: "Luyện: lật hết bộ thẻ của phần, đọc to — 10 phút", drill: "Luyện: máy luyện, ít nhất 15 câu — 10 phút", quiz: "Quiz 10 câu, mục tiêu ≥ 8. Dưới 8 thì đọc lại mục sai rồi làm lại", dictation: "Chép chính tả 10 câu — 10 phút", stave: "Máy đánh vần: đọc to từng từ trước khi bấm nghe — 10 phút" };
      steps.push({ kind: "practice", label: L[s.practice], hash: H[s.practice], practice: s.practice });
    } else {
      steps.push({ kind: "srs", label: "Ôn toàn bộ thẻ đến hạn, không giới hạn", hash: "#review", limit: 999 });
      steps.push({ kind: "tasks", label: "Làm 4 việc của phiên ôn tổng (danh sách ở trang Lộ trình)", hash: "#home" });
    }
    steps.push({ kind: "done", label: "Đánh dấu hoàn thành phiên", hash: "#home" });
    const idx = N.schedule.indexOf(s);
    return { id, step: 0, steps, part: s.part, title: s.t, kind: s.kind, num: idx + 1 };
  },
  start(id) { this.cur = this.build(id); if (!this.cur) return; S.sess = { id, step: 0 }; save(); this.go(); },
  resume() { if (!S.sess) return; this.cur = this.build(S.sess.id); if (!this.cur) { S.sess = null; return; } this.cur.step = Math.min(S.sess.step, this.cur.steps.length - 1); this.show(); },
  go() {
    const st = this.cur.steps[this.cur.step];
    if (location.hash !== st.hash) location.hash = st.hash; else route();
    if (st.kind === "srs") setTimeout(() => {
      if (SRS.due("all").length) Review.start("due", "all", st.limit);
      else { $("rv-part").value = this.cur.part; Review.start("new", this.cur.part); toast("Không có thẻ đến hạn — học " + N.meta.newPerSession + " thẻ mới của phần này."); }
    }, 350);
    if (st.kind === "practice" && st.practice === "dictation") setTimeout(() => Dict.setPart(this.cur.part), 350);
    this.show();
  },
  next() {
    if (!this.cur) return;
    if (this.cur.steps[this.cur.step].kind === "done") { this.finish(); return; }
    this.cur.step++; S.sess.step = this.cur.step; save(); this.go();
  },
  quit() { this.cur = null; S.sess = null; save(); $("sessionbar").hidden = true; if (currentView === "home") renderHome(); },
  finish() {
    const { id, part, num } = this.cur;
    markDone(id); this.cur = null; S.sess = null; save();
    $("sessionbar").hidden = true;
    const wk = weekCount(weekStart(Date.now()));
    toast(`Xong phiên ${num}/${TOTAL}. Tuần này ${wk}/${N.meta.weeklyGoal} phiên.` + (wk === N.meta.weeklyGoal ? " Tuần đạt!" : ""), 4000);
    location.hash = "#home"; renderHome(); renderPartHead(part);
  },
  show() {
    const bar = $("sessionbar"), c = this.cur; if (!c) { bar.hidden = true; return; }
    bar.hidden = false;
    $("sb-steps").innerHTML = c.steps.map((s, i) => `<i class="${i < c.step ? "done" : i === c.step ? "now" : ""}" title="${attr(s.label)}"></i>`).join("");
    $("sb-kicker").textContent = `Phiên ${c.num}/${TOTAL} · bước ${c.step + 1}/${c.steps.length}`;
    $("sb-title").textContent = c.steps[c.step].label;
    $("sb-next").textContent = c.steps[c.step].kind === "done" ? "Hoàn thành ✓" : "Tiếp →";
  }
};

/* ---------- trang chủ ---------- */
function renderHome() {
  const h = new Date().getHours(), greet = h < 10 ? "God morgen" : h < 17 ? "God dag" : "God kveld";
  $("home-greet").textContent = `${greet}${S.name ? ", " + S.name : ""}! Hôm nay học gì?`;
  const nx = nextSession(), due = SRS.due("all").length, box = $("home-next");
  if (Session.cur) {
    const c = Session.cur, p = N.partById(c.part), s = N.schedule.find(x => x.id === c.id);
    box.innerHTML = `<div class="info"><p class="kicker">Đang trong phiên ${c.num}/${TOTAL} · bước ${c.step + 1}/${c.steps.length}</p><h3>Phần ${p.num} · ${c.title}</h3>
      ${c.kind === "review" ? `<ol class="small" style="margin:6px 0 0;padding-left:18px">${s.tasks.map(t => `<li>${t}</li>`).join("")}</ol>${s.write ? `<p class="small" style="margin:6px 0 0"><a href="#${c.part}-exam">→ Đề viết ${s.write.toUpperCase()} ở Góc Norskprøve phần ${p.num}</a></p>` : ""}` : `<p class="small muted" style="margin:0">${c.steps[c.step].label}</p>`}</div>
      <div class="row"><button class="btn solid big" id="home-resume">Tiếp tục phiên</button><button class="btn" id="home-quit">Thoát</button></div>`;
    $("home-resume").onclick = () => Session.go(); $("home-quit").onclick = () => Session.quit();
  } else if (nx) {
    const p = N.partById(nx.part), i = N.schedule.indexOf(nx) + 1;
    const chips = nx.kind === "lesson"
      ? `<span class="badge purple">8' ôn ${due} thẻ</span><span class="badge">20' · ${nx.secs.length} mục mới</span><span class="badge green">10' ${({ kort: "thẻ", drill: "máy luyện", quiz: "quiz", dictation: "chính tả", stave: "đánh vần" })[nx.practice]}</span>`
      : `<span class="badge purple">ôn hết thẻ đến hạn</span><span class="badge yellow">4 việc + bài viết ${nx.write.toUpperCase()}</span>`;
    box.innerHTML = `<div class="info"><p class="kicker">Phiên tiếp theo · ${i} / ${TOTAL}</p><h3>${nx.kind === "review" ? "" : "Phần " + p.num + " · "}${nx.t}</h3><div class="chips">${chips}</div></div>
      <div class="row"><button class="btn solid big" id="home-start">Bắt đầu phiên</button><a class="btn" href="#${p.id}">Xem phần ${p.num}</a></div>`;
    $("home-start").onclick = () => Session.start(nx.id);
  } else {
    box.innerHTML = `<div class="info"><p class="kicker">Xong 52 / 52 phiên</p><h3>Bạn đã đi hết A1. Giờ là chặng A2.</h3><p class="small muted" style="margin:0">Giữ thói quen ôn thẻ mỗi ngày và bắt đầu NTNU NoW theo mục Chặng dài bên dưới.</p></div><a class="btn solid big" href="#exam">Thi thử lại</a>`;
  }
  const wk = weekCount(weekStart(Date.now())), doneN = Object.keys(S.done).filter(k => N.schedule.some(s => s.id === k)).length;
  $("home-stats").innerHTML = `
    <div class="stat yellow"><div class="lab">Tuần này</div><div class="val">${wk} / ${N.meta.weeklyGoal}</div><div class="sub">phiên · ${wk >= N.meta.weeklyGoal ? "tuần đạt" : "mục tiêu " + N.meta.weeklyGoal}</div></div>
    <div class="stat purple"><div class="lab">Thẻ đến hạn</div><div class="val">${due}</div><div class="sub">${due ? "ôn " + Math.max(2, Math.round(due / 3)) + " phút" : "không có gì đến hạn"}</div></div>
    <div class="stat green"><div class="lab">Từ đã thuộc</div><div class="val">${SRS.known()}</div><div class="sub">/ ${N.cards.length} thẻ</div></div>
    <div class="stat"><div class="lab">Phiên đã xong</div><div class="val">${doneN}</div><div class="sub">/ ${TOTAL} · ${Math.round(doneN / TOTAL * 100)}%</div></div>`;
  $("roadmap").innerHTML = N.parts.map(p => {
    const d = partSessionsDone(p), t = p.sessions.length, q = S.quiz[p.id];
    return `<a class="roadcard${d === t ? " done" : ""}" data-part="${p.id}" href="#${p.id}"><span class="tick">✓</span><div class="num">${p.num}</div><h3>${p.title}</h3><div class="d">${p.desc}</div>
      <div class="progress"><i style="width:${d / t * 100}%"></i></div><div class="meta"><span>${d}/${t} phiên</span><span>${q != null ? "Quiz " + q + "/10" : ""}</span></div></a>`;
  }).join("");
  $("milestones").innerHTML = N.milestones.map(m => { const r = N.reviews.find(r => r.after === m.after); const ok = r && S.done[r.id];
    return `<div class="ms${ok ? " done" : ""}"><div class="when">${m.when}${ok ? " · đã đạt" : ""}</div><h4>${m.title}</h4><p>${m.desc}</p></div>`; }).join("");
  const ob = $("onboard"); if (ob && !S.log.length && !S._ob) { ob.open = true; }
  Session.show();
}

/* ---------- đầu mỗi phần: tiến độ, phiên, Góc Norskprøve ---------- */
function renderPartHead(part) {
  const p = N.partById(part), d = partSessionsDone(p), t = p.sessions.length;
  $(part + "-bar").style.width = (d / t * 100) + "%";
  $(part + "-pct").textContent = `${d} / ${t} phiên${S.quiz[part] != null ? " · quiz " + S.quiz[part] + "/10" : ""}`;
  const qb = $(part + "-quizbadge"); if (qb) qb.hidden = !(S.quiz[part] >= 8);
  const nx = nextSession();
  $(part + "-sessions").innerHTML = p.sessions.map((s, i) => {
    const id = `${p.id}-s${i + 1}`, done = !!S.done[id], isNext = nx && nx.id === id;
    return `<li class="${done ? "done" : isNext ? "next" : ""}"><span class="st">${done ? "✓" : i + 1}</span>
      <span class="txt">${s.t}<small>${s.secs.map(tocLabel).join(" · ")} · luyện: ${({ kort: "thẻ", drill: "máy luyện", quiz: "quiz", dictation: "chính tả", stave: "đánh vần" })[s.practice]}</small></span>
      <button class="btn sm ${done ? "" : "solid"}" data-start="${id}">${done ? "Làm lại" : "Bắt đầu"}</button>${done ? "" : `<button class="btn sm ghost" data-mark="${id}" title="Đã tự học xong, chỉ đánh dấu">✓</button>`}</li>`;
  }).join("");
  const r = N.reviews.find(r => r.after === part);
  if (r) $(part + "-sessions").insertAdjacentHTML("beforeend", `<li class="${S.done[r.id] ? "done" : nx && nx.id === r.id ? "next" : ""}"><span class="st">${S.done[r.id] ? "✓" : "Ô"}</span><span class="txt">${r.t}<small>${r.tasks.join(" · ")}</small></span><button class="btn sm ${S.done[r.id] ? "" : "solid"}" data-start="${r.id}">${S.done[r.id] ? "Làm lại" : "Bắt đầu"}</button></li>`);
  renderExamCorner(part);
}
function renderExamCorner(part) {
  const box = $(part + "-examcorner"); if (!box || box.dataset.ready) return;
  box.dataset.ready = 1;
  const sp = N.exam.speak[part], r = N.reviews.find(r => r.after === part), wr = r ? N.exam.write[r.write] : null;
  const task = (t, kind) => `<div class="task"><p class="kicker">${kind === "speak" ? "Đề nói" : "Đề viết · mốc " + r.write.slice(1)}</p><h3 style="margin:0 0 8px">${t.title}</h3><div class="prompt">${t.prompt}</div>
    <details><summary>Bài mẫu — mở sau khi đã tự ${kind === "speak" ? "nói" : "viết"}</summary><div class="model">${t.model.map(l => { const [no, vi] = l.split("|"); return `<div style="margin-bottom:10px"><div class="l1">${no} ${playBtn(no)}</div><div class="l3">${vi}</div></div>`; }).join("")}</div></details>
    <details><summary>Giám khảo chờ nghe gì?</summary><p class="small">${t.note}</p></details>
    <p class="small" style="margin:10px 0 4px"><b>Tự chấm:</b></p><ul class="checklist">${t.check.map(c => `<li><label><input type="checkbox"> ${c}</label></li>`).join("")}</ul></div>`;
  box.innerHTML = `<div class="tabs"><button class="on" data-tab="speak">Nói</button>${wr ? `<button data-tab="write">Viết</button>` : ""}</div><div data-pane="speak">${task(sp, "speak")}</div>${wr ? `<div data-pane="write" hidden>${task(wr, "write")}</div>` : ""}`;
  box.querySelector(".tabs").onclick = e => { const b = e.target.closest("button"); if (!b) return; $$(".tabs button", box).forEach(x => x.classList.toggle("on", x === b)); $$("[data-pane]", box).forEach(pn => pn.hidden = pn.dataset.pane !== b.dataset.tab); };
}

/* ---------- sidebar: 8 phần ---------- */
function renderNavParts() {
  $("nav-parts").innerHTML = N.parts.map(p => { const d = partSessionsDone(p), t = p.sessions.length, dash = (d / t * 62.8).toFixed(1);
    return `<a class="navpart${d === t ? " done" : ""}" data-part="${p.id}" href="#${p.id}"><span class="dot">${p.num}</span><span class="txt">${p.short}<small>${d} / ${t} phiên</small></span><svg class="ring" viewBox="0 0 26 26"><circle class="bg" cx="13" cy="13" r="10"/>${d ? `<circle class="fg" cx="13" cy="13" r="10" stroke-dasharray="${dash} 62.8" transform="rotate(-90 13 13)"/>` : ""}</svg></a>`; }).join("");
  $$(".navpart").forEach(a => a.classList.toggle("on", a.dataset.part === currentView));
}

/* ---------- tiến độ ---------- */
let settingsBound = false;
function renderProgress() {
  const doneN = Object.keys(S.done).filter(k => N.schedule.some(s => s.id === k)).length;
  const ws = weekStart(Date.now()), weeks = []; for (let i = 7; i >= 0; i--) weeks.push(ws - i * 7 * DAY);
  const good = weeks.filter(w => weekCount(w) >= N.meta.weeklyGoal).length;
  const acc = S.dict.total ? Math.round(S.dict.ok / S.dict.total * 100) + "%" : "—";
  $("pg-stats").innerHTML = `
    <div class="stat"><div class="lab">Phiên đã xong</div><div class="val">${doneN} / ${TOTAL}</div><div class="sub">${S.log.length ? "bắt đầu " + new Date(Math.min(...S.log)).toLocaleDateString("vi-VN") : "chưa bắt đầu"}</div></div>
    <div class="stat yellow"><div class="lab">Tuần đạt</div><div class="val">${good} / 8</div><div class="sub">≥ ${N.meta.weeklyGoal} phiên / tuần</div></div>
    <div class="stat green"><div class="lab">Thẻ thuộc</div><div class="val">${SRS.known()}</div><div class="sub">/ ${Object.keys(S.srs).length} đã học</div></div>
    <div class="stat purple"><div class="lab">Chính tả</div><div class="val">${acc}</div><div class="sub">${S.dict.total} câu</div></div>`;
  $("pg-weeks").innerHTML = weeks.map((w, i) => { const n = weekCount(w), d = new Date(w);
    return `<div class="week${i === 7 ? " now" : ""}"><div class="bar">${Array.from({ length: Math.min(n, 6) }, () => `<i class="${n < N.meta.weeklyGoal ? "short" : ""}" style="height:${100 / 6}%"></i>`).join("")}</div><div class="lab">${d.getDate()}/${d.getMonth() + 1}</div></div>`; }).join("");
  $("pg-parts").innerHTML = N.parts.map(p => { const d = partSessionsDone(p), t = p.sessions.length, known = N.cardsFor(p.id).filter(c => S.srs[c.id] && S.srs[c.id].b >= 2).length;
    return `<div class="pgrow" data-part="${p.id}"><div class="num">${p.num}</div><div class="txt">${p.title}<small>${d}/${t} phiên · ${known}/${N.cardsFor(p.id).length} thẻ thuộc</small></div><div class="right"><span>${S.quiz[p.id] != null ? "quiz " + S.quiz[p.id] + "/10" : "chưa quiz"}</span><div class="progress"><i style="width:${d / t * 100}%"></i></div></div></div>`; }).join("");
  $("set-rate").value = S.rate; $("set-rate-val").textContent = S.rate + "×"; $("set-theme").value = S.theme; $("set-name").value = S.name; fillVoiceSelect();
  if (settingsBound) return; settingsBound = true;
  $("set-rate").oninput = e => { S.rate = +e.target.value; $("set-rate-val").textContent = S.rate + "×"; save(); };
  $("set-rate").onchange = () => say("Hei, hvordan går det?");
  $("set-voice").onchange = e => { S.voice = e.target.value; save(); pickVoice(); say("Hei, hvordan går det?"); };
  $("set-theme").onchange = e => { S.theme = e.target.value; save(); applyTheme(); };
  $("set-name").onchange = e => { S.name = e.target.value.trim(); save(); };
  $("pg-export").onclick = () => {
    const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `hei-norsk-tiendo-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  $("pg-import").onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(txt => { const o = JSON.parse(txt); if (!o || o.v !== 1 || !o.srs) throw 0; S = Object.assign(DEF(), o); save(); applyTheme(); renderProgress(); renderNavParts(); updateDueBadges(); toast("Đã nhập tiến độ."); })
      .catch(() => toast("File không đúng định dạng.")); e.target.value = "";
  };
  $("pg-reset").onclick = () => { if (confirm("Xoá toàn bộ tiến độ (phiên, thẻ, quiz)? Không hoàn tác được.")) { S = DEF(); save(); Session.cur = null; $("sessionbar").hidden = true; applyTheme(); renderProgress(); renderNavParts(); updateDueBadges(); toast("Đã xoá."); } };
}

/* ---------- khởi động ---------- */
function init() {
  load(); applyTheme(); renderNavParts();
  $("themebtn").onclick = () => { S.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; save(); applyTheme(); };
  $("menubtn").onclick = () => openMenu(!$("sidebar").classList.contains("open"));
  $("scrim").onclick = () => openMenu(false);
  $("totop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  window.addEventListener("scroll", () => $("totop").classList.toggle("show", window.scrollY > 700), { passive: true });
  $("ostabs").onclick = e => { const b = e.target.closest("button"); if (!b) return; $$("#ostabs button").forEach(x => x.classList.toggle("on", x === b)); ["win", "mac", "ios", "android"].forEach(os => $("ospane-" + os).hidden = os !== b.dataset.os); };
  $("onboard").addEventListener("toggle", () => { S._ob = true; save(); });
  /* ôn thẻ */
  $("rv-start-due").onclick = () => Review.start("due");
  $("rv-start-new").onclick = () => Review.start("new");
  $("rv-card").onclick = () => Review.flip();
  $("rv-yes").onclick = () => Review.answer(true); $("rv-no").onclick = () => Review.answer(false);
  $("dict-q").oninput = e => dictSearch(e.target.value);
  document.addEventListener("keydown", e => {
    if (currentView !== "review" || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); Review.flip(); }
    if (e.key === "1") Review.answer(false); if (e.key === "2") Review.answer(true);
  });
  /* chính tả */
  $("dc-play").onclick = () => Dict.play(); $("dc-check").onclick = () => Dict.check(); $("dc-next").onclick = () => Dict.newItem();
  $("dc-input").addEventListener("keydown", e => { if (e.key === "Enter") Dict.check(); });
  $("dc-hint").onchange = () => { if (Dict.cur) $("dc-meta").innerHTML = `${$("dc-hint").checked ? `<b>${Dict.cur.m}</b> · ` : ""}Phần ${Dict.cur.part.slice(1)} · ${[...Dict.cur.d].length} ký tự · bấm loa để nghe`; };
  /* thi thử */
  $("ex-start").onclick = () => Exam.start();
  /* thanh phiên */
  $("sb-next").onclick = () => Session.next(); $("sb-quit").onclick = () => { if (confirm("Thoát phiên? Tiến độ bước hiện tại không được tính.")) Session.quit(); };
  /* nút Bắt đầu / đánh dấu trong danh sách phiên */
  document.addEventListener("click", e => {
    const st = e.target.closest("[data-start]"); if (st) { Session.start(st.dataset.start); return; }
    const mk = e.target.closest("[data-mark]"); if (mk) { markDone(mk.dataset.mark); renderPartHead(mk.dataset.mark.split("-")[0]); toast("Đã đánh dấu xong."); }
  });
  window.addEventListener("hashchange", route);
  route();
  Session.resume();
  if (!location.hash) history.replaceState(null, "", "#home");
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
