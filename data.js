/* =====================================================================
   Hei, Norsk! — data.js
   TOÀN BỘ NỘI DUNG nằm ở file này. Muốn sửa chữ, sửa ở đây.
   1. meta / parts (52 phiên) / milestones / exam (Góc Norskprøve)
   2. NORSK.p1 … NORSK.p8 : dữ liệu bài học 8 phần (từ vựng, bảng, quiz, drill)
   3. NORSK.cards : bộ thẻ SRS dựng từ 8 phần
   ===================================================================== */
window.NORSK = {};

NORSK.meta = {
  name: "Hei, Norsk!",
  weeklyGoal: 3,              // số phiên / tuần để tính "tuần đạt"
  boxDays: [1, 3, 7, 14, 30], // khoảng cách ôn của 5 hộp Leitner (ngày)
  newPerSession: 12,          // số thẻ mới đưa vào SRS mỗi phiên
  sessionMinutes: [8, 20, 10] // ôn thẻ · mục mới · luyện
};

/* ---------- 8 PHẦN · 48 PHIÊN ----------
   practice: kort = flashcard của phần · drill = máy luyện · quiz = 10 câu · dictation = chép chính tả · stave = máy đánh vần */
NORSK.parts = [
  { id:"p1", num:1, title:"Phát âm & bảng chữ cái", short:"Phát âm", desc:"29 chữ cái, 9 nguyên âm, tổ hợp kj/skj/rs, chữ câm và thanh điệu — đọc được mọi chữ Na Uy.",
    sessions:[
      { t:"Bảng chữ cái 29 chữ", secs:["p1-alfabet"], practice:"dictation" },
      { t:"Chín nguyên âm — u, y, ø, æ", secs:["p1-vokal"], practice:"dictation" },
      { t:"Phụ âm và tổ hợp phụ âm", secs:["p1-konsonant","p1-klynge"], practice:"dictation" },
      { t:"Chữ câm và máy đánh vần", secs:["p1-stum","p1-stave"], practice:"stave" },
      { t:"Thanh điệu và 40 từ đầu tiên", secs:["p1-tone","p1-ord"], practice:"kort" },
      { t:"Ôn toàn phần: thẻ + chính tả", secs:["p1-kort"], practice:"dictation" },
      { t:"Quiz, mẹo học, Góc Norskprøve", secs:["p1-quiz","p1-rad","p1-exam"], practice:"quiz" }
    ]},
  { id:"p2", num:2, title:"Chào hỏi, giới thiệu, số đếm", short:"Chào hỏi & số", desc:"Chào, xưng hô, tự giới thiệu, hỏi lại, và đếm tới 100 với cái bẫy -ten / -ti.",
    sessions:[
      { t:"Chào hỏi và xưng hô kiểu Na Uy", secs:["p2-hilsen","p2-duform"], practice:"kort" },
      { t:"Tự giới thiệu và hỏi lại", secs:["p2-presenter","p2-sporre"], practice:"kort" },
      { t:"Ngữ pháp tối thiểu và hai hội thoại", secs:["p2-grammatikk","p2-samtale"], practice:"dictation" },
      { t:"Số đếm 0–100 và bẫy -ten / -ti", secs:["p2-tall","p2-felle","p2-brukstall"], practice:"dictation" },
      { t:"Thẻ, quiz, Góc Norskprøve → Mốc 1", secs:["p2-kort","p2-quiz","p2-rad","p2-exam"], practice:"quiz" }
    ]},
  { id:"p3", num:3, title:"Danh từ, giống, số nhiều", short:"Danh từ", desc:"Ba giống en/ei/et, bốn dạng của mỗi danh từ, mạo từ dính đuôi, số nhiều bất quy tắc.",
    sessions:[
      { t:"Mạo từ dính vào đuôi và ba giống", secs:["p3-ide","p3-kjonn"], practice:"kort" },
      { t:"Bốn dạng và quy tắc số nhiều", secs:["p3-fireformer","p3-flertall"], practice:"drill" },
      { t:"Bất quy tắc và danh từ đi với số", secs:["p3-uregelrett","p3-nartall"], practice:"drill" },
      { t:"Khi nào dùng dạng xác định + 40 danh từ", secs:["p3-nar","p3-ordliste"], practice:"kort" },
      { t:"Máy luyện bốn dạng và thẻ", secs:["p3-drill","p3-kort"], practice:"drill" },
      { t:"Quiz, mẹo học, Góc Norskprøve", secs:["p3-quiz","p3-rad","p3-exam"], practice:"quiz" }
    ]},
  { id:"p4", num:4, title:"Động từ & trật tự từ V2", short:"Động từ & V2", desc:"Thì hiện tại thêm -r, quy tắc V2 chi phối mọi câu, vị trí ikke, cách đặt câu hỏi.",
    sessions:[
      { t:"Thì hiện tại và 9 động từ bất quy tắc", secs:["p4-presens","p4-uregelrett"], practice:"kort" },
      { t:"Quy tắc V2 và sơ đồ ô câu", secs:["p4-v2","p4-skjema"], practice:"drill" },
      { t:"Phủ định ikke, câu hỏi, từ để hỏi", secs:["p4-ikke","p4-sporsmal","p4-sporreord"], practice:"drill" },
      { t:"Xem trước fordi và 40 động từ", secs:["p4-fordi","p4-verbliste"], practice:"kort" },
      { t:"Máy luyện trật tự từ và thẻ", secs:["p4-drill","p4-kort"], practice:"drill" },
      { t:"Quiz, mẹo học, Góc Norskprøve → Mốc 2", secs:["p4-quiz","p4-rad","p4-exam"], practice:"quiz" }
    ]},
  { id:"p5", num:5, title:"Gia đình, nhà cửa, giờ giấc", short:"Đời sống", desc:"Sở hữu min/mi/mitt, sin, gia đình, các phòng trong nhà, xem giờ với halv, thứ, tháng, một ngày thường.",
    sessions:[
      { t:"Sở hữu và cái bẫy sin / hans", secs:["p5-eie","p5-sin"], practice:"kort" },
      { t:"Gia đình, nhà cửa, đồ trong phòng", secs:["p5-familie","p5-hjem","p5-irom"], practice:"kort" },
      { t:"Xem giờ — halv là nửa giờ TRƯỚC", secs:["p5-klokka","p5-klokkeliste"], practice:"drill" },
      { t:"Thứ, tháng, mùa và cụm thời gian", secs:["p5-dager","p5-tidsuttrykk"], practice:"dictation" },
      { t:"Một ngày thường, bữa ăn, máy luyện giờ", secs:["p5-vanligdag","p5-maltid","p5-drill"], practice:"drill" },
      { t:"Thẻ, quiz, Góc Norskprøve", secs:["p5-kort","p5-quiz","p5-rad","p5-exam"], practice:"quiz" }
    ]},
  { id:"p6", num:6, title:"Quá khứ, tương lai, mệnh đề phụ", short:"Trục thời gian", desc:"Bốn dạng động từ, bốn nhóm yếu, động từ mạnh, quá khứ vs hoàn thành, skal/vil, mệnh đề phụ với ikke.",
    sessions:[
      { t:"Bốn dạng động từ và bốn nhóm yếu", secs:["p6-fireformer","p6-svake"], practice:"drill" },
      { t:"Động từ mạnh — học thuộc 30 từ", secs:["p6-sterke"], practice:"kort" },
      { t:"Quá khứ hay hoàn thành? + cụm quá khứ", secs:["p6-pretvsperf","p6-fortid"], practice:"drill" },
      { t:"Tương lai và động từ khiếm khuyết", secs:["p6-framtid","p6-modal"], practice:"kort" },
      { t:"Mệnh đề phụ, når / da, kể chuyện", secs:["p6-leddsetning","p6-narda","p6-igar"], practice:"dictation" },
      { t:"Bảng động từ, máy luyện, thẻ", secs:["p6-verbliste","p6-drill","p6-kort"], practice:"drill" },
      { t:"Quiz, mẹo học, Góc Norskprøve → Mốc 3", secs:["p6-quiz","p6-rad","p6-exam"], practice:"quiz" }
    ]},
  { id:"p7", num:7, title:"Tính từ, so sánh, giới từ", short:"Tính từ", desc:"Ba dạng tính từ, xác định kép den store bilen, so sánh -ere/-est, giới từ nơi chốn và cặp i / på.",
    sessions:[
      { t:"Ba dạng tính từ và các ngoại lệ", secs:["p7-treformer","p7-unntak","p7-uregelrett"], practice:"drill" },
      { t:"Xác định kép và tính từ sau sở hữu", secs:["p7-dobbel","p7-eiendom"], practice:"drill" },
      { t:"So sánh hơn, nhất, bất quy tắc", secs:["p7-gradbojning","p7-uregkomp","p7-sammenlikne"], practice:"drill" },
      { t:"40 tính từ và màu sắc", secs:["p7-adjliste","p7-farger"], practice:"kort" },
      { t:"Giới từ, cặp i / på, máy luyện", secs:["p7-preposisjon","p7-ipa","p7-drill"], practice:"drill" },
      { t:"Thẻ, quiz, Góc Norskprøve", secs:["p7-kort","p7-quiz","p7-rad","p7-exam"], practice:"quiz" }
    ]},
  { id:"p8", num:8, title:"Hội thoại thực tế", short:"Hội thoại", desc:"Cụm cứu mạng, mua sắm, quán ăn, đi lại, hỏi đường, đặt lịch, phòng khám, khẩn cấp, văn hoá — 4 hội thoại hoàn chỉnh.",
    sessions:[
      { t:"Cụm cứu mạng, siêu thị, đồ ăn", secs:["p8-redning","p8-butikk","p8-mat"], practice:"kort" },
      { t:"Quán ăn, đi lại, hỏi đường", secs:["p8-kafe","p8-transport","p8-veien"], practice:"dictation" },
      { t:"Đặt lịch, phòng khám, khẩn cấp, văn hoá", secs:["p8-time","p8-lege","p8-nodsituasjon","p8-kultur"], practice:"kort" },
      { t:"Bốn hội thoại và máy luyện tình huống", secs:["p8-samtaler","p8-drill"], practice:"drill" },
      { t:"Thẻ, quiz, tổng kết, Góc Norskprøve → Mốc 4", secs:["p8-kort","p8-quiz","p8-oppsummering","p8-videre","p8-exam"], practice:"quiz" }
    ]}
];

/* ---------- 4 PHIÊN ÔN TỔNG (chèn sau phần 2, 4, 6, 8) ---------- */
NORSK.reviews = [
  { id:"r1", after:"p2", t:"Ôn tổng 1: phần 1–2 → Mốc 1", write:"m1",
    tasks:["Ôn toàn bộ thẻ đến hạn (không giới hạn 25)","Làm lại quiz phần 1 và 2, mục tiêu 9/10","Nói bài tự giới thiệu 60 giây, ghi âm, nghe lại","Viết bài viết Mốc 1 (phiếu đăng ký + 3 câu)"] },
  { id:"r2", after:"p4", t:"Ôn tổng 2: phần 3–4 → Mốc 2", write:"m2",
    tasks:["Ôn thẻ đến hạn","Máy luyện phần 3 và 4: 20 câu mỗi máy, ≥ 16 đúng","Trả lời 8 câu hỏi giám khảo (Góc Norskprøve phần 4) thành tiếng","Viết bài viết Mốc 2 (tin nhắn huỷ hẹn)"] },
  { id:"r3", after:"p6", t:"Ôn tổng 3: phần 5–6 → Mốc 3", write:"m3",
    tasks:["Ôn thẻ đến hạn","Chép chính tả 20 câu phần 5–6","Kể lại ngày hôm qua 8 câu, ghi âm","Viết bài viết Mốc 3 (kể chuyến đi cuối tuần)"] },
  { id:"r4", after:"p8", t:"Ôn tổng 4: thi thử A1 → Mốc 4", write:"m4",
    tasks:["Thi thử tổng 30 câu, mục tiêu ≥ 24","Đóng cả hai vai trong 4 hội thoại phần 8","Viết bài viết Mốc 4 (email cho chủ nhà)","Lập kế hoạch chặng A2 (trang Lộ trình, mục Chặng dài)"] }
];

NORSK.milestones = [
  { id:"m1", after:"p2", when:"Sau phần 2", title:"Tự giới thiệu 60 giây", desc:"Tên, tuổi, quê, nơi ở, ngôn ngữ, nghề — nói liền không nhìn giấy. Ghi âm rồi tự nghe lại." },
  { id:"m2", after:"p4", when:"Sau phần 4", title:"Hỏi–đáp 8 câu, có phủ định", desc:"Trả lời 8 câu hỏi giám khảo với V2 đúng và ikke đúng chỗ. Không trả lời cụt Ja/Nei." },
  { id:"m3", after:"p6", when:"Sau phần 6", title:"Kể lại ngày hôm qua", desc:"8 câu thì quá khứ theo mốc giờ, kết bằng một câu tương lai với skal." },
  { id:"m4", after:"p8", when:"Sau phần 8", title:"Thi thử A1 ≥ 24/30 + 4 hội thoại", desc:"Làm bài thi thử tổng và đóng cả hai vai trong 4 hội thoại phần 8. Xong là sang chặng A2." }
];

/* ---------- GÓC NORSKPRØVE ----------
   speak: 1 đề nói mỗi phần · write: 4 đề viết ở 4 mốc. model: "Na Uy|Việt" từng dòng */
NORSK.exam = {
  speak: {
    p1: { title:"Đánh vần tên và đọc 10 từ",
      prompt:"Giám khảo hỏi: «Hva heter du? Kan du stave det?» Trả lời, rồi đánh vần tên bạn bằng tên chữ cái Na Uy (bảng chữ cái ở đầu phần). Sau đó đọc to 10 từ: kake · kino · kysse · gate · gift · jeg · hva · hjem · skole · ski.",
      model:["Jeg heter Duy.|Tôi tên là Duy.","Det staves D – U – Y.|Đánh vần là D – U – Y (đọc tên chữ: đê – uy – uy — u và y khác nhau ở độ tròn môi).","Jeg kommer fra Vietnam.|Tôi đến từ Việt Nam."],
      note:"Norskprøve muntlig ở mọi mức đều mở đầu bằng vài câu về bản thân; giám khảo có thể yêu cầu đánh vần tên hoặc địa chỉ. Phát âm không cần chuẩn — cần nhất quán: u, y, ø, æ phải nghe khác nhau.",
      check:["Ba chữ æ ø å đọc được khi đứng trong từ","kj (kino, kysse) và skj / sk (skole, ski) không đọc thành k / s","jeg, hva, hjem: chữ câm không đọc"] },
    p2: { title:"Tự giới thiệu 30–60 giây",
      prompt:"Giám khảo nói: «Fortell litt om deg selv.» Nói tên, tuổi, quê, nơi ở, ngôn ngữ, nghề — không nhìn giấy. Ghi âm bằng điện thoại và nghe lại.",
      model:["Hei! Jeg heter Duy.|Chào! Tôi tên là Duy.","Jeg er trettito år gammel.|Tôi 32 tuổi.","Jeg kommer fra Vietnam, fra Hanoi.|Tôi đến từ Việt Nam, từ Hà Nội.","Nå bor jeg i Oslo.|Bây giờ tôi sống ở Oslo.","Jeg snakker vietnamesisk og litt engelsk, og jeg lærer norsk.|Tôi nói tiếng Việt và một chút tiếng Anh, và tôi đang học tiếng Na Uy.","Jeg jobber med netthandel.|Tôi làm về thương mại điện tử.","Hyggelig å hilse på deg!|Rất vui được gặp bạn!"],
      note:"Đây là phần mở đầu của mọi kỳ Norskprøve muntlig. Giám khảo chấm: có nói liên tục không, có hiểu câu hỏi không. Ở A1, sai mạo từ không bị trừ điểm — ngừng quá lâu mới bị.",
      check:["Nói liền 30 giây, không dừng quá 3 giây","Đổi tên, tuổi, thành phố thành của bạn","Có một câu mở đầu bằng trạng từ (Nå bor jeg…) mà động từ vẫn đứng thứ hai"] },
    p3: { title:"Tả căn phòng bạn đang ngồi",
      prompt:"Giám khảo hỏi: «Hva ser du rundt deg?» Kể 6 đồ vật, mỗi đồ nói đúng en / ei / et, rồi nhắc lại ở dạng xác định (bordet, boka…). Dùng «Her er det…», «Det er…».",
      model:["Jeg sitter i stua.|Tôi đang ngồi trong phòng khách.","Her er det et bord og fire stoler.|Ở đây có một cái bàn và bốn cái ghế.","På bordet ligger det ei bok og en telefon.|Trên bàn có một quyển sách và một cái điện thoại.","Boka er på norsk.|Quyển sách bằng tiếng Na Uy.","Ved vinduet står det ei lampe og en plante.|Cạnh cửa sổ có một cái đèn và một cái cây.","Jeg ser ut av vinduet.|Tôi nhìn ra ngoài cửa sổ.","Barna leker på gulvet.|Bọn trẻ đang chơi trên sàn."],
      note:"Muntlig A1–A2 có bài «beskriv bildet»: giám khảo đưa ảnh phòng khách, bếp hoặc công viên và bạn kể thấy gì. Cấu trúc «Det er en/ei/et …» + «Her er …» là đủ điểm ở mức này.",
      check:["Mỗi danh từ nói kèm en / ei / et","Nhắc lại ít nhất 3 từ ở dạng xác định (bordet, boka, vinduet)","Số nhiều đúng đuôi: stoler, barna"] },
    p4: { title:"Trả lời 8 câu hỏi của giám khảo",
      prompt:"Giám khảo hỏi liên tiếp, bạn trả lời mỗi câu 1–2 câu đầy đủ (không «Ja» / «Nei» cụt), chú ý V2 và vị trí ikke: Hvor bor du? · Hva jobber du med? · Hva liker du å gjøre? · Snakker du engelsk? · Hvorfor lærer du norsk? · Har du bil? · Når står du opp? · Hva gjør du i helgen?",
      model:["Jeg bor i Oslo, i en leilighet.|Tôi sống ở Oslo, trong một căn hộ.","Jeg jobber med netthandel. Jeg selger ting på nettet.|Tôi làm thương mại điện tử. Tôi bán đồ trên mạng.","Jeg liker å lese og å gå tur.|Tôi thích đọc sách và đi dạo.","Ja, jeg snakker litt engelsk, men jeg snakker ikke tysk.|Có, tôi nói được chút tiếng Anh, nhưng không nói tiếng Đức.","Jeg lærer norsk fordi jeg vil bo i Norge.|Tôi học tiếng Na Uy vì tôi muốn sống ở Na Uy.","Nei, jeg har ikke bil. Jeg tar bussen.|Không, tôi không có xe. Tôi đi xe buýt.","Jeg står opp klokka sju.|Tôi dậy lúc 7 giờ.","I helgen besøker jeg venner, eller jeg slapper av hjemme.|Cuối tuần tôi thăm bạn bè, hoặc thư giãn ở nhà."],
      note:"Muntlig A1–A2 là hỏi–đáp. Trả lời cụt bị điểm thấp — luôn nối thêm một câu. Sai V2 sau trạng từ («I helgen jeg besøker…») là lỗi giám khảo nghe thấy ngay.",
      check:["Câu mở bằng I helgen / Nå / Om kvelden: động từ đứng ngay sau","ikke đứng sau động từ chia: har ikke, snakker ikke","Có ít nhất một câu với fordi"] },
    p5: { title:"Kể về gia đình và một ngày bình thường",
      prompt:"Hai câu hỏi hay gặp nhất: «Fortell om familien din.» và «Hva gjør du på en vanlig dag?» Nói 5–6 câu cho mỗi câu, có sở hữu (min / mi / mine) và giờ giấc.",
      model:["Jeg har en liten familie.|Tôi có một gia đình nhỏ.","Kona mi heter Linh, og vi har en sønn. Han er fem år.|Vợ tôi tên Linh, và chúng tôi có một con trai. Cháu 5 tuổi.","Foreldrene mine bor i Vietnam. Jeg ringer dem hver søndag.|Bố mẹ tôi sống ở Việt Nam. Tôi gọi cho họ mỗi chủ nhật.","Broren min bor i Oslo også.|Anh trai tôi cũng sống ở Oslo.","På en vanlig dag står jeg opp klokka halv sju.|Ngày thường tôi dậy lúc 6 giờ 30.","Jeg spiser frokost og drikker kaffe. Jeg jobber fra ni til fem.|Tôi ăn sáng và uống cà phê. Tôi làm việc từ 9 đến 5 giờ.","Om kvelden lager jeg middag, og vi spiser klokka seks.|Buổi tối tôi nấu bữa tối, và cả nhà ăn lúc 6 giờ.","Jeg legger meg klokka elleve.|Tôi đi ngủ lúc 11 giờ."],
      note:"«Familie» và «en vanlig dag» là hai đề nói phổ biến nhất ở A1–A2, và cũng là đề viết A2 («Skriv om en vanlig dag»). Giám khảo chờ nghe: sở hữu (kona mi, foreldrene mine), giờ (halv sju), trạng từ thời gian + V2 (Om kvelden lager jeg…).",
      check:["Sở hữu đứng sau danh từ xác định: kona mi, broren min, foreldrene mine","halv sju = 6:30, không phải 7:30","Om kvelden lager jeg… — động từ đứng thứ hai"] },
    p6: { title:"Kể lại ngày hôm qua",
      prompt:"Giám khảo hỏi: «Hva gjorde du i går?» Kể 8 câu theo thứ tự giờ, toàn bộ ở thì quá khứ, kết bằng một câu tương lai («I morgen skal jeg…»).",
      model:["I går var det søndag, så jeg sto opp klokka ni.|Hôm qua là chủ nhật, nên tôi dậy lúc 9 giờ.","Jeg spiste frokost og drakk te.|Tôi ăn sáng và uống trà.","Etterpå gikk jeg en tur i parken.|Sau đó tôi đi dạo trong công viên.","Det var kaldt, men sola skinte.|Trời lạnh, nhưng có nắng.","Om ettermiddagen ringte jeg til foreldrene mine.|Buổi chiều tôi gọi cho bố mẹ.","Vi snakket i en time.|Chúng tôi nói chuyện một tiếng.","Om kvelden så jeg en film, og jeg la meg klokka elleve.|Buổi tối tôi xem một bộ phim, và đi ngủ lúc 11 giờ.","I morgen skal jeg jobbe.|Ngày mai tôi sẽ đi làm."],
      note:"Kể chuyện quá khứ chắc chắn có ở muntlig A2 và là đề viết A2 phổ biến («Fortell om helgen din / en reise»). Giám khảo đếm động từ quá khứ đúng: var, sto, spiste, drakk, gikk, så, la.",
      check:["Không lẫn dạng hiện tại: spiser → spiste, drikker → drakk","Trạng từ mở câu (Etterpå, Om kvelden) → động từ đứng thứ hai","Câu cuối dùng skal + nguyên thể"] },
    p7: { title:"Tả một bức tranh",
      prompt:"Mở một tấm ảnh bất kỳ trên điện thoại (công viên, bếp, phố). Giám khảo nói: «Beskriv bildet.» Nói 8 câu: có gì, ở đâu (til venstre, bak, på), mỗi danh từ đi kèm một tính từ đúng dạng.",
      model:["På bildet ser jeg en stor park.|Trong ảnh tôi thấy một công viên lớn.","Det er sommer, og været er fint.|Trời mùa hè, và thời tiết đẹp.","En gammel mann sitter på en grønn benk.|Một ông già ngồi trên chiếc ghế dài màu xanh lá.","Han har en brun hund. Hunden er liten og søt.|Ông có một con chó nâu. Con chó nhỏ và dễ thương.","Til venstre står det et høyt tre.|Bên trái có một cái cây cao.","Bak treet er det et gult hus med røde vinduer.|Sau cái cây có một ngôi nhà vàng với những cửa sổ đỏ.","To barn spiller fotball på gresset.|Hai đứa trẻ đá bóng trên cỏ.","Jeg liker bildet fordi det er rolig.|Tôi thích bức ảnh vì nó yên bình."],
      note:"Tả tranh có trong Norskprøve muntlig A1–A2 và A2–B1. Giám khảo không cần bạn tả đúng — cần tính từ hợp giống (et høyt tre, et gult hus) và giới từ chỉ vị trí.",
      check:["Tính từ trước danh từ trung tính có -t: et høyt tre, et gult hus","Số nhiều thêm -e: røde vinduer","Ít nhất 3 giới từ vị trí: på, bak, til venstre"] },
    p8: { title:"Đóng hai vai: đặt lịch bác sĩ và hỏi đường",
      prompt:"Tình huống 1: gọi điện đặt lịch khám, nói triệu chứng, chốt giờ. Tình huống 2: bạn lạc ở trung tâm, hỏi đường đến ga tàu. Nói cả hai vai, ghi âm, rồi so với hội thoại mẫu trong phần.",
      model:["Hei, jeg vil gjerne bestille time hos legen.|Chào, tôi muốn đặt lịch khám bác sĩ.","Jeg har vondt i halsen og litt feber.|Tôi đau họng và hơi sốt.","Passer det på torsdag?|Thứ năm có được không?","Klokka ti er fint. Takk skal du ha!|10 giờ thì tốt. Cảm ơn nhiều!","Unnskyld, hvor er togstasjonen?|Xin lỗi, ga tàu ở đâu?","Er det langt? Kan jeg gå?|Có xa không? Đi bộ được không?","Rett fram og så til høyre — ok, takk for hjelpen!|Đi thẳng rồi rẽ phải — ok, cảm ơn đã giúp!"],
      note:"Phần cuối của muntlig A1–A2 là «samtale»: hai thí sinh (hoặc bạn và giám khảo) nói chuyện về một tình huống đời thường. Hỏi và trả lời tự nhiên quan trọng hơn ngữ pháp hoàn hảo.",
      check:["Có câu hỏi có/không: Passer det…? Er det langt?","Có cụm lịch sự: jeg vil gjerne, takk skal du ha","Nói được số và giờ khi chốt lịch"] }
  },
  write: {
    m1: { title:"Điền phiếu đăng ký và viết 3 câu",
      prompt:"Đề dạng Norskprøve A1 skriftlig, phần 1: điền phiếu (Navn / Adresse / Telefon / Land / Språk), rồi viết 3–4 câu giới thiệu để đăng ký lớp tiếng Na Uy. Viết tay hoặc gõ, không tra từ điển.",
      model:["Navn: Duy Nguyen · Adresse: Storgata 12, 0184 Oslo · Telefon: 987 65 432 · Land: Vietnam · Språk: vietnamesisk, engelsk|(phần điền phiếu)","Hei! Jeg heter Duy og kommer fra Vietnam.|Chào! Tôi tên Duy và đến từ Việt Nam.","Jeg bor i Oslo og vil gjerne begynne på norskkurs.|Tôi sống ở Oslo và muốn bắt đầu học lớp tiếng Na Uy.","Jeg snakker vietnamesisk og litt engelsk.|Tôi nói tiếng Việt và một chút tiếng Anh.","Hilsen Duy|Thân, Duy"],
      note:"A1 skriftlig có hai phần: điền thông tin cá nhân và viết một đoạn ngắn 20–40 từ. Viết ngắn mà đúng ăn điểm hơn viết dài.",
      check:["Viết hoa đầu câu, chấm cuối câu","Không dịch từng chữ từ tiếng Việt","Kết thư: Hilsen / Vennlig hilsen + tên"] },
    m2: { title:"Nhắn tin huỷ hẹn và đề nghị giờ khác",
      prompt:"Viết tin nhắn 30–50 từ cho bạn Anna: bạn không đến được buổi cà phê ngày mai, nói lý do, đề nghị ngày giờ khác, hỏi có được không.",
      model:["Hei Anna!|Chào Anna!","Jeg kan dessverre ikke komme på kafé i morgen fordi jeg må jobbe.|Rất tiếc mai mình không đến quán cà phê được vì mình phải đi làm.","Kan vi møtes på lørdag klokka tolv i stedet?|Mình gặp nhau thứ bảy 12 giờ thay vào đó được không?","Passer det for deg?|Bạn có tiện không?","Hilsen Duy|Thân, Duy"],
      note:"Đề «huỷ hẹn / mời / xin lỗi» là kinh điển ở A1–A2 skriftlig. Chấm: đủ 3 ý (không đến được – lý do – đề nghị mới) và câu hỏi có động từ đứng đầu (Kan vi…?).",
      check:["ikke đứng sau động từ khiếm khuyết: kan dessverre ikke komme","Câu hỏi bắt đầu bằng động từ: Kan vi…? Passer det…?","Đủ 3 ý, không quá 50 từ"] },
    m3: { title:"Kể chuyến đi cuối tuần cho một người bạn",
      prompt:"Viết 6–8 câu (50–70 từ) kể cuối tuần vừa rồi bạn đi đâu, đi bằng gì, làm gì, thời tiết ra sao, và hẹn gặp. Toàn bộ ở thì quá khứ.",
      model:["Hei Marta!|Chào Marta!","I helga var jeg i Bergen. Jeg reiste med tog på fredag.|Cuối tuần rồi mình ở Bergen. Mình đi tàu hôm thứ sáu.","Det regnet mye, men byen var fin.|Trời mưa nhiều, nhưng thành phố rất đẹp.","Jeg spiste fisk på en restaurant og kjøpte en varm genser.|Mình ăn cá ở nhà hàng và mua một cái áo len ấm.","På søndag kom jeg hjem. Jeg var veldig trøtt!|Chủ nhật mình về nhà. Mình mệt lắm!","Vi må møtes snart. Har du tid neste uke?|Mình phải gặp nhau sớm nhé. Tuần sau bạn rảnh không?","Hilsen Duy|Thân, Duy"],
      note:"Đề «Fortell om helgen / en reise» xuất hiện ở A2 skriftlig gần như mỗi kỳ. Giám khảo đếm: động từ quá khứ đúng, liên từ (men, og, så), câu kết có hành động (hẹn gặp).",
      check:["Mỗi câu một động từ quá khứ đúng: var, reiste, regnet, spiste, kjøpte, kom","Có men / og / så nối câu","Câu hỏi kết có đảo động từ: Har du tid…?"] },
    m4: { title:"Email báo hỏng cho chủ nhà",
      prompt:"Viết email 60–80 từ cho chủ nhà: bạn là ai, ở căn hộ nào, cái gì hỏng từ khi nào, đề nghị họ đến sửa, nói khi nào bạn ở nhà. Mở đầu và kết thư lịch sự.",
      model:["Hei!|Chào!","Jeg heter Duy Nguyen og bor i leilighet 3B i Storgata 12.|Tôi tên Duy Nguyen và ở căn hộ 3B, Storgata 12.","Varmtvannet virker ikke. Det har vært kaldt siden i går.|Nước nóng không hoạt động. Nước lạnh từ hôm qua.","Kan du komme og se på det?|Anh có thể đến xem được không?","Jeg er hjemme etter klokka fire i dag og hele lørdag.|Hôm nay sau 4 giờ tôi ở nhà, và cả ngày thứ bảy.","Takk på forhånd!|Cảm ơn trước!","Vennlig hilsen Duy Nguyen|Trân trọng, Duy Nguyen"],
      note:"Email chính thức (chủ nhà, trường, cơ quan) là đề A2 và A2–B1 skriftlig. Khác tin nhắn bạn bè: mở đầu «Hei» + kết «Vennlig hilsen», không viết tắt, có «Takk på forhånd». Thi thật: 2 bài viết trong 90 phút.",
      check:["Thông tin cụ thể: căn hộ nào, hỏng gì, từ khi nào","Câu yêu cầu lịch sự: Kan du…?","Kết: Vennlig hilsen + họ tên"] }
  }
};

/* =====================================================================
   PHẦN 1
   ===================================================================== */
NORSK.p1 = (function () {
/* ============ TỪ ĐIỂN DỮ LIỆU ============ */
const ALFA = [
  ["A a","a","a"],["B b","be","bê"],["C c","se","xê"],["D d","de","đê"],
  ["E e","e","ê"],["F f","eff","ép-fờ"],["G g","ge","ghê"],["H h","hå","hô"],
  ["I i","i","i"],["J j","je","yê","trap"],["K k","kå","kô"],["L l","ell","e-lờ"],
  ["M m","em","em"],["N n","enn","en-nờ"],["O o","o","u","trap"],["P p","pe","pê"],
  ["Q q","ku","kuy"],["R r","ærr","e-rờ"],["S s","ess","ét-sờ"],["T t","te","tê"],
  ["U u","u","uy","trap"],["V v","ve","vê"],["W w","dobbelt-ve","đúp-belt vê"],
  ["X x","eks","ếch-xờ"],["Y y","y","uy","trap"],["Z z","sett","xét"],
  ["Æ æ","æ","e","extra"],["Ø ø","ø","ơ","extra"],["Å å","å","ô","extra"]
];

const VOK_EASY = [
  ["a","a","[ɑ]","bra|bra|tốt · katt|kat|con mèo"],
  ["e dài","ê","[eː]","se|xê|nhìn · le|lê|cười"],
  ["e ngắn","e","[ɛ]","penn|pen|cây bút · vennlig|ven-li|thân thiện"],
  ["e không nhấn","ơ","[ə]","gutten|gút-tơn|cậu bé đó"],
  ["i","i","[iː]","fin|fin|đẹp · si|si|nói"],
  ["o dài","u","[uː]","bok|buk|sách · sol|sul|mặt trời"],
  ["o ngắn","o","[ɔ]","topp|top|đỉnh · kopp|kop|cái cốc"],
  ["æ","e mở","[æː]","være|ve-rơ|thì, là · her|her|ở đây"],
  ["å","ô","[oː]","gå|gô|đi · blå|blô|xanh dương"]
];

const VOK_HARD = [
  ["u","uy","[ʉː]","Nói \"ư\" rồi chu môi ra phía trước như thổi nến. Lưỡi giữ nguyên ở giữa miệng. Ví dụ: hus|huys|nhà · du|duy|bạn"],
  ["y","uy (mảnh hơn)","[yː]","Nói \"i\", giữ lưỡi sát ngạc trên, chỉ tròn môi lại. Nghe cao và mảnh hơn u. Ví dụ: ny|nuy|mới · by|buy|thành phố"],
  ["ø","ơ tròn môi","[øː]","Nói \"ê\", giữ lưỡi, chu môi tròn. Không phải \"ơ\" thường. Ví dụ: øl|ơl|bia · smør|smơr|bơ"]
];

const LENGDE = [
  ["tak|ta-k|mái nhà (a kéo dài)","takk|tak|cảm ơn (a ngắn, dứt)","Một k = nguyên âm dài, hai k = nguyên âm ngắn"],
  ["mate|ma-tơ|cho ăn","matte|mát-tơ|tấm thảm","Nguyên âm ngắn khi có phụ âm đôi"],
  ["pen|pên|đẹp","penn|pen|cây bút","Nghe kỹ độ dài của ê"]
];

const KONS = [
  ["d","đ (như tiếng Việt)","dag|đag|ngày · du|duy|bạn"],
  ["g trước a o u å","g cứng","gate|ga-tơ|đường phố · god|gu|tốt"],
  ["g trước i y ei","y","gi|yi|đưa · gift|yift|đã kết hôn"],
  ["j","y","ja|ya|vâng · jeg|yây|tôi"],
  ["k trước a o u å","k","kake|ka-kơ|bánh ngọt"],
  ["k trước i, y","kh (âm kj)","kino|khi-nu|rạp phim · kysse|khuýs-sơ|hôn"],
  ["s","s (không rung)","sitte|sít-tơ|ngồi"],
  ["v","v","vann|van|nước"],
  ["ng","ng (như tiếng Việt)","mange|mang-ơ|nhiều · lang|lang|dài"]
];

const KLYNGER = [
  ["kj · tj · ki · ky","kh (gió)","kjøtt|khớt|thịt · tjue|khuy-ơ|hai mươi · kino|khi-nu|rạp phim"],
  ["sj · skj · sk+i,y,øy","s quặt lưỡi","sjø|sơ|biển · skje|sê|cái thìa · ski|si|ván trượt tuyết"],
  ["gj · hj · lj","y","gjøre|yơ-rơ|làm · hjelp|yelp|giúp đỡ · hjerte|yer-tơ|trái tim"],
  ["-sjon","-sun","stasjon|sta-sun|nhà ga · nasjon|na-sun|quốc gia"],
  ["rs","s quặt lưỡi","norsk|nosk|tiếng Na Uy · person|pe-sun|người"],
  ["rd","d quặt lưỡi, r biến mất","bord|bur|cái bàn · gjerde|yer-ơ|hàng rào"],
  ["rt · rn · rl","quặt lưỡi","bort|bot|đi khỏi · barn|ban|đứa trẻ · perle|pe-lơ|ngọc trai"],
  ["eg cuối từ","ây","jeg|yây|tôi · meg|mây|tôi (tân ngữ) · deg|đây|bạn (tân ngữ)"]
];

const STUMME = [
  ["1","<b>h</b> câm trước v và j","hva|va|cái gì · hvor|vur|ở đâu · hjem|yem|về nhà"],
  ["2","<b>d</b> câm ở cuối từ sau nguyên âm hoặc sau l, n","god|gu|tốt · med|me|với · land|lan|đất nước · glad|gla|vui"],
  ["3","<b>g</b> câm trong đuôi -ig","viktig|vík-ti|quan trọng · dårlig|đór-li|tệ"],
  ["4","<b>t</b> câm trong det và đuôi -et","det|đe|nó, cái đó · huset|huy-sơ|căn nhà đó"],
  ["5","<b>v</b> câm trong vài từ quen thuộc","selv|sel|tự · tolv|tol|mười hai · halv|hal|một nửa"],
  ["6","<b>g</b> câm trước j","gjøre|yơ-rơ|làm · gjerne|yer-nơ|sẵn lòng"]
];

const STAVE = [
  {parts:["h","u","s"],whole:"hus",vn:"huys",mean:"ngôi nhà",note:"u đọc là uy môi chu. s cuối phải nghe rõ."},
  {parts:["sk","o","le"],whole:"skole",vn:"skú-lơ",mean:"trường học",note:"o dài thành u. e cuối không nhấn thành ơ."},
  {parts:["kj","ø","tt"],whole:"kjøtt",vn:"khớt",mean:"thịt",note:"kj là âm gió. tt đôi nên ø đọc ngắn."},
  {parts:["h","v","or"],whole:"hvor",vn:"vur",mean:"ở đâu",note:"h câm. o dài thành u. r quặt lưỡi."},
  {parts:["g","o","d"],whole:"god",vn:"gu",mean:"tốt",note:"o thành u, d cuối câm. Chỉ còn hai âm."},
  {parts:["n","or","sk"],whole:"norsk",vn:"nosk",mean:"tiếng Na Uy",note:"rs gộp thành một âm s quặt lưỡi."}
];

const TONER = [
  ["bønder|bơn-nơr|nông dân","bønner|bơn-nơr|hạt đậu, lời cầu nguyện","Viết khác, đọc giống hệt trừ thanh điệu"],
  ["tanken|táng-kơn|cái bồn (tank + en)","tanken|táng-kơn|ý nghĩ (tanke + n)","Cùng chữ viết: gốc 1 âm tiết → thanh 1, gốc 2 âm tiết → thanh 2"],
  ["hender|hen-nơr|những bàn tay","hender|hen-nơr|xảy ra","Cùng một chữ viết, hai nghĩa"]
];

const ORD = [
  ["hei","hây","chào"],["takk","tak","cảm ơn"],["ja","ya","vâng"],["nei","nây","không"],
  ["unnskyld","uyn-shuyl","xin lỗi"],["hva","va","cái gì"],["hvem","vem","ai"],["hvor","vur","ở đâu"],
  ["hvorfor","vur-for","tại sao"],["hvordan","vur-đan","như thế nào"],["jeg","yây","tôi"],["du","duy","bạn"],
  ["han","han","anh ấy"],["hun","huyn","cô ấy"],["vi","vi","chúng tôi"],["de","đi","họ"],
  ["er","er","thì, là"],["har","har","có"],["snakke","snák-kơ","nói"],["forstå","fo-stô","hiểu"],
  ["norsk","nosk","tiếng Na Uy"],["Norge","no-ghơ","Na Uy"],["språk","sprôk","ngôn ngữ"],["lære","le-rơ","học"],
  ["hus","huys","ngôi nhà"],["skole","skú-lơ","trường học"],["bok","buk","quyển sách"],["by","buy","thành phố"],
  ["mat","mat","đồ ăn"],["vann","van","nước"],["brød","brơ","bánh mì"],["melk","melk","sữa"],
  ["kaffe","káf-fơ","cà phê"],["øl","ơl","bia"],["venn","ven","bạn bè"],["familie","fa-mí-li-ơ","gia đình"],
  ["gutt","gut","cậu bé"],["jente","yén-tơ","cô gái"],["dag","đag","ngày"],["natt","nat","đêm"]
];

const QUIZ = [
  {q:"Từ <span class='no'>bok</span> (sách) đọc thế nào?",o:["bok","buk","bôk","bơk"],a:1,
   w:"Chữ o trong tiếng Na Uy thường đọc là u. Đây là bẫy số một với người mới học."},
  {q:"Từ <span class='no'>hva</span> (cái gì) đọc thế nào?",o:["hơ-va","kh-va","va","hva"],a:2,
   w:"h luôn câm khi đứng trước v hoặc j. hva → va, hvem → vem, hjem → yem."},
  {q:"Tổ hợp <span class='no'>sj</span> và <span class='no'>skj</span> đọc là âm gì?",
   o:["s quặt lưỡi, như s giọng miền Nam","x như trong xa","kh như trong khô","y như trong yêu"],a:0,
   w:"Đây là âm [ʂ] quặt lưỡi. Người nói giọng miền Nam đã có sẵn âm này trong chữ s."},
  {q:"Tại sao <span class='no'>takk</span> có nguyên âm ngắn còn <span class='no'>tak</span> có nguyên âm dài?",
   o:["Vì takk là từ mượn","Vì hai phụ âm sau nguyên âm làm nó ngắn lại","Vì nó có thanh điệu 2","Không có quy tắc, phải học thuộc"],a:1,
   w:"Quy tắc: một phụ âm theo sau thì nguyên âm dài, từ hai phụ âm trở lên thì ngắn."},
  {q:"Từ <span class='no'>god</span> (tốt) đọc thế nào?",o:["gôđ","gót","gu","gu-đơ"],a:2,
   w:"o thành u, và d cuối từ sau nguyên âm thì câm. Chỉ còn lại hai âm."},
  {q:"Ba nguyên âm nào không có tương đương trong tiếng Việt?",
   o:["a, e, i","æ, å, o","u, y, ø","e, æ, å"],a:2,
   w:"Cả ba đều cần tròn môi ở vị trí lưỡi mà tiếng Việt không tròn môi."},
  {q:"Từ <span class='no'>jeg</span> (tôi) đọc thế nào?",o:["yeg","yây","giếch","yơg"],a:1,
   w:"j đọc là y, và đuôi -eg trong nhóm jeg, meg, deg đọc thành ây."},
  {q:"Trong <span class='no'>barn</span> (đứa trẻ), tổ hợp <span class='no'>rn</span> xử lý ra sao?",
   o:["Đọc rõ cả r rồi tới n","Gộp thành một âm n quặt lưỡi, r biến mất","n câm, chỉ đọc r","Thêm nguyên âm ơ vào giữa"],a:1,
   w:"Nhóm rd, rt, rn, rl, rs đều gộp thành một âm quặt lưỡi duy nhất ở giọng miền Đông."},
  {q:"Từ <span class='no'>viktig</span> (quan trọng) đọc thế nào?",o:["vík-tig","vík-ti","vík-tikh","vík-tiy"],a:1,
   w:"Chữ g trong đuôi -ig luôn câm: viktig, dårlig, hyggelig."},
  {q:"Tiếng Na Uy có <span class='no'>tonelag</span> — hai thanh điệu từ. Vì sao người Việt có lợi thế?",
   o:["Vì thanh điệu Na Uy giống hệt dấu sắc và dấu huyền","Vì tai đã quen với việc cao độ làm đổi nghĩa từ","Vì tiếng Việt cũng có đúng hai thanh","Vì tiếng Na Uy mượn thanh điệu từ châu Á"],a:1,
   w:"Cao độ mang nghĩa là chuyện hiển nhiên với người Việt, còn người nói tiếng Anh phải học lại từ đầu. Nhưng lưu ý: hai hệ thanh điệu này khác nhau, đừng gán dấu tiếng Việt vào từ Na Uy."}
];
  return { ALFA, VOK_EASY, VOK_HARD, LENGDE, KONS, KLYNGER, STUMME, STAVE, TONER, ORD, QUIZ };
})();

/* =====================================================================
   PHẦN 2
   ===================================================================== */
NORSK.p2 = (function () {
/* ============ DỮ LIỆU ============ */
const HILS1 = [
  ["Hei!","hây","Chào — dùng được với bất kỳ ai, bất kỳ lúc nào"],
  ["Hallo!","ha-lú","Chào — hay dùng khi nghe điện thoại"],
  ["Hei hei!","hây hây","Thân mật hơn, cũng dùng để tạm biệt"],
  ["Ha det!","ha đe","Tạm biệt — dạng rút gọn thông dụng nhất"],
  ["Ha det bra!","ha đe bra","Tạm biệt, dạng đầy đủ"],
  ["Vi ses!","vi sês","Hẹn gặp lại"],
  ["Hvordan går det?","vur-đan gôr đe","Dạo này thế nào?"],
  ["Bare bra, takk.","ba-rơ bra, tak","Khoẻ, cảm ơn"],
  ["Det går bra.","đe gôr bra","Ổn cả"],
  ["Hyggelig å møte deg.","hýg-gơ-li ô mớ-tơ đây","Rất vui được gặp bạn"]
];
const HILS2 = [
  ["God morgen!","gu mór-ơn","Chào buổi sáng — tới khoảng 10 giờ"],
  ["God dag!","gu đag","Chào buổi ngày, hơi trang trọng"],
  ["God kveld!","gu kvel","Chào buổi tối"],
  ["God natt!","gu nat","Chúc ngủ ngon — chỉ nói khi đi ngủ"],
  ["God helg!","gu helg","Cuối tuần vui vẻ — nói vào chiều thứ sáu"]
];
const HILS3 = [
  ["Takk!","tak","Cảm ơn"],
  ["Tusen takk!","tuy-sơn tak","Cảm ơn nhiều — nghĩa đen: nghìn lần cảm ơn"],
  ["Takk skal du ha.","tak skal đuy ha","Cảm ơn bạn nhé"],
  ["Vær så god.","ver sô gu","Không có gì / mời bạn"],
  ["Ingen årsak.","íng-ơn ór-sak","Không có gì đâu"],
  ["Unnskyld!","uyn-shuyl","Xin lỗi — khi gọi ai đó hoặc đi ngang qua"],
  ["Beklager.","bơ-klá-gơr","Xin lỗi — khi bạn thật sự làm sai"]
];
const OMEG = [
  ["Jeg heter Duy.","yây hê-tơr Duy","Tôi tên là Duy"],
  ["Jeg er fra Vietnam.","yây er fra vi-et-nam","Tôi đến từ Việt Nam"],
  ["Jeg kommer fra Hanoi.","yây kóm-mơr fra ha-nôi","Tôi từ Hà Nội tới"],
  ["Jeg bor i Hanoi.","yây bur i ha-nôi","Tôi sống ở Hà Nội"],
  ["Jeg er tretti år gammel.","yây er trét-ti ôr gám-mơl","Tôi ba mươi tuổi"],
  ["Jeg snakker vietnamesisk.","yây snák-kơr vi-et-na-mê-sisk","Tôi nói tiếng Việt"],
  ["Jeg lærer norsk.","yây le-rơr nosk","Tôi đang học tiếng Na Uy"],
  ["Jeg jobber med data.","yây yób-bơr me đa-ta","Tôi làm về máy tính"]
];
const SPORS = [
  ["Hva heter du?|va hê-tơr đuy|Bạn tên gì?","Jeg heter Duy.|yây hê-tơr Duy|Tôi tên Duy"],
  ["Hvor kommer du fra?|vur kóm-mơr đuy fra|Bạn từ đâu tới?","Jeg kommer fra Vietnam.|yây kóm-mơr fra vi-et-nam|Tôi từ Việt Nam"],
  ["Hvor bor du?|vur bur đuy|Bạn sống ở đâu?","Jeg bor i Oslo.|yây bur i ós-lu|Tôi sống ở Oslo"],
  ["Hvor gammel er du?|vur gám-mơl er đuy|Bạn bao nhiêu tuổi?","Jeg er tjue år.|yây er khuy-ơ ôr|Tôi hai mươi tuổi"],
  ["Snakker du engelsk?|snák-kơr đuy éng-ơlsk|Bạn nói tiếng Anh không?","Ja, litt.|ya, lit|Có, một chút"],
  ["Hva jobber du med?|va yób-bơr đuy me|Bạn làm nghề gì?","Jeg er student.|yây er stuy-đent|Tôi là sinh viên"]
];
const BØYING = [
  ["jeg|yây|tôi","er|er","har|har","snakker|snák-kơr"],
  ["du|đuy|bạn","er","har","snakker"],
  ["han / hun|han / huyn|anh ấy / cô ấy","er","har","snakker"],
  ["vi|vi|chúng tôi","er","har","snakker"],
  ["dere|đê-rơ|các bạn","er","har","snakker"],
  ["de|đi|họ","er","har","snakker"]
];
const FLIPS = [
  {s:["Du","snakker","norsk"],q:["Snakker","du","norsk"],vs:"Bạn nói tiếng Na Uy.",vq:"Bạn có nói tiếng Na Uy không?"},
  {s:["Han","bor","i Oslo"],q:["Bor","han","i Oslo"],vs:"Anh ấy sống ở Oslo.",vq:"Anh ấy sống ở Oslo à?"},
  {s:["Du","er","student"],q:["Er","du","student"],vs:"Bạn là sinh viên.",vq:"Bạn là sinh viên phải không?"}
];
const DIAL1 = [
  ["A","Hei! Jeg heter Ingrid. Hva heter du?","hây! yây hê-tơr íng-ri. va hê-tơr đuy","Chào! Tôi tên Ingrid. Bạn tên gì?"],
  ["B","Hei! Jeg heter Duy.","hây! yây hê-tơr Duy","Chào! Tôi tên Duy."],
  ["A","Hyggelig å møte deg. Hvor kommer du fra?","hýg-gơ-li ô mớ-tơ đây. vur kóm-mơr đuy fra","Rất vui được gặp bạn. Bạn từ đâu tới?"],
  ["B","Jeg kommer fra Vietnam. Og du?","yây kóm-mơr fra vi-et-nam. o đuy","Tôi từ Việt Nam. Còn bạn?"],
  ["A","Jeg er fra Bergen. Snakker du norsk?","yây er fra bær-ghơn. snák-kơr đuy nosk","Tôi từ Bergen. Bạn nói tiếng Na Uy không?"],
  ["B","Litt. Jeg lærer norsk nå.","lit. yây le-rơr nosk nô","Một chút. Tôi đang học tiếng Na Uy."],
  ["A","Så bra! Lykke til.","sô bra! lúyk-kơ til","Tốt quá! Chúc may mắn."]
];
const DIAL2 = [
  ["A","Hvor gammel er du?","vur gám-mơl er đuy","Bạn bao nhiêu tuổi?"],
  ["B","Jeg er tjueåtte år. Og du?","yây er khuy-ơ-ót-tơ ôr. o đuy","Tôi hai mươi tám tuổi. Còn bạn?"],
  ["A","Jeg er trettifem. Hva er telefonnummeret ditt?","yây er trét-ti-fem. va er te-lơ-fun-núm-mơ-rơ đit","Tôi ba mươi lăm. Số điện thoại của bạn là gì?"],
  ["B","Det er førtifem – trettito – atten – nitti.","đe er fớ-ti-fem – trét-ti-tu – át-tơn – nít-ti","Là 45 32 18 90."],
  ["A","Takk! Jeg ringer deg i morgen.","tak! yây ríng-ơr đây i mór-ơn","Cảm ơn! Mai tôi gọi bạn."]
];
const TALL1 = [
  [0,"null","nuyl"],[1,"en","ên"],[2,"to","tu"],[3,"tre","trê"],[4,"fire","fí-rơ"],
  [5,"fem","fem"],[6,"seks","seks"],[7,"sju","su"],[8,"åtte","ót-tơ"],[9,"ni","ni"],
  [10,"ti","ti"],[11,"elleve","él-vơ"],[12,"tolv","tol"],[13,"tretten","trét-tơn"],
  [14,"fjorten","fyú-tơn"],[15,"femten","fém-tơn"],[16,"seksten","sáis-tơn"],
  [17,"sytten","sớt-tơn"],[18,"atten","át-tơn"],[19,"nitten","nít-tơn"],[20,"tjue","khuy-ơ"]
];
const TALL2 = [
  [10,"ti","ti"],[20,"tjue","khuy-ơ"],[30,"tretti","trét-ti"],[40,"førti","fớ-ti"],
  [50,"femti","fém-ti"],[60,"seksti","sék-sti"],[70,"sytti","sớt-ti"],[80,"åtti","ót-ti"],
  [90,"nitti","nít-ti"],[100,"hundre","húnd-rơ"]
];
const TALL3 = [
  [21,"tjueen","khuy-ơ-ên"],[25,"tjuefem","khuy-ơ-fem"],[32,"trettito","trét-ti-tu"],
  [47,"førtisju","fớ-ti-su"],[58,"femtiåtte","fém-ti-ót-tơ"],[63,"sekstitre","sék-sti-trê"],
  [76,"syttiseks","sớt-ti-seks"],[89,"åttini","ót-ti-ni"],[94,"nittifire","nít-ti-fí-rơ"],
  [100,"hundre","húnd-rơ"]
];
const FELLEN = [
  ["13|tretten|trét-tơn","30|tretti|trét-ti","Chỉ khác âm cuối: n đóng lại hay i mở ra"],
  ["14|fjorten|fyú-tơn","40|førti|fớ-ti","Nguyên âm gốc cũng khác: fjor và før"],
  ["15|femten|fém-tơn","50|femti|fém-ti","Cặp dễ nhầm nhất khi nghe giá tiền"],
  ["16|seksten|sáis-tơn","60|seksti|sék-sti","16 đọc là sáis-tơn, chữ ks biến mất hoàn toàn"],
  ["17|sytten|sớt-tơn","70|sytti|sớt-ti","Cả hai đều có âm ø, chỉ khác đuôi"],
  ["18|atten|át-tơn","80|åtti|ót-ti","Khác cả nguyên âm đầu: a và å"],
  ["19|nitten|nít-tơn","90|nitti|nít-ti","Nghe kỹ có n cuối hay không"]
];
const ALDER = [
  ["Hvor gammel er du?","vur gám-mơl er đuy","Bạn bao nhiêu tuổi?"],
  ["Jeg er tjuefem år.","yây er khuy-ơ-fem ôr","Tôi 25 tuổi"],
  ["Jeg er tretti år gammel.","yây er trét-ti ôr gám-mơl","Tôi 30 tuổi, dạng đầy đủ"],
  ["Hun er førtito.","huyn er fớ-ti-tu","Cô ấy 42 tuổi"]
];
const TLF = [
  ["Hva er nummeret ditt?","va er núm-mơ-rơ đit","Số của bạn là gì?"],
  ["Nummeret mitt er…","núm-mơ-rơ mit er","Số của tôi là…"],
  ["Kan du gjenta nummeret?","kan đuy yen-ta núm-mơ-rơ","Nhắc lại số được không?"]
];
const PRIS = [
  ["Hva koster det?","va kós-tơr đe","Cái này giá bao nhiêu?"],
  ["Det koster femti kroner.","đe kós-tơr fém-ti krú-nơr","Nó giá 50 kroner"],
  ["Nittini kroner.","nít-ti-ni krú-nơr","99 kroner"],
  ["Det er dyrt.","đe er đuyt","Đắt quá"],
  ["Det er billig.","đe er bíl-li","Rẻ đấy"]
];
const QUIZ = [
  {q:"Bạn gặp sếp mới ở Na Uy. Bạn xưng hô thế nào?",
   o:["Dùng <span class='no'>De</span> cho lịch sự","Dùng <span class='no'>du</span> và gọi thẳng tên","Gọi bằng chức danh + họ","Tránh xưng hô, chỉ dùng câu bị động"],a:1,
   w:"Dạng De đã chết từ thập niên 1970. Dùng nó bây giờ nghe kỳ quặc chứ không lịch sự."},
  {q:"<span class='no'>Jeg heter Duy</span> nghĩa là gì?",o:["Tôi sống ở đây","Tôi tên là Duy","Tôi đến từ Duy","Tôi là người Duy"],a:1,
   w:"heter = tên là. Đây là cách chuẩn để nói tên, dùng nhiều hơn Jeg er Duy."},
  {q:"Chuyển <span class='no'>Du snakker norsk</span> thành câu hỏi:",
   o:["Gjør du snakker norsk?","Du snakker norsk?","Snakker du norsk?","Er du snakker norsk?"],a:2,
   w:"Chỉ đảo động từ ra trước chủ ngữ. Tiếng Na Uy không có do/does như tiếng Anh."},
  {q:"Số 16 trong tiếng Na Uy viết là <span class='no'>seksten</span>. Đọc thế nào?",
   o:["sék-stơn","sáis-tơn","seks-ten","sék-sti"],a:1,
   w:"Đây là số đọc bất thường nhất: cụm ks biến mất, thành sáis-tơn."},
  {q:"Nghe thấy <span class='no'>femti</span>. Đó là số mấy?",o:["15","50","5","55"],a:1,
   w:"Đuôi -ti là số chục. femten mới là 15. Đây là cặp bẫy hay gặp nhất khi nghe giá tiền."},
  {q:"Động từ <span class='no'>er</span> chia thế nào với <span class='no'>han</span> và <span class='no'>de</span>?",
   o:["han est, de ere","han er, de erer","han er, de er","han har, de er"],a:2,
   w:"Động từ tiếng Na Uy không đổi theo ngôi. Một dạng dùng cho tất cả."},
  {q:"Số 47 viết là gì?",o:["førti sju","sjuogførti","førtisju","fire-sju"],a:2,
   w:"Viết liền một chữ, chục trước đơn vị sau. Dạng sjuogførti là hệ đếm cũ đã bỏ."},
  {q:"Ai đó nói <span class='no'>Tusen takk!</span> Bạn đáp lại thế nào?",
   o:["Vær så god.","Unnskyld.","God natt.","Hvordan går det?"],a:0,
   w:"Vær så god là câu đáp lời cảm ơn phổ biến nhất. Ingen årsak cũng dùng được."},
  {q:"Câu nào có nghĩa là bạn không hiểu người ta đang nói gì?",
   o:["Jeg forstår ikke.","Jeg snakker ikke.","Jeg heter ikke.","Jeg hører ikke."],a:0,
   w:"forstår = hiểu. Đây là câu quan trọng nhất trong toàn bộ phần 2."},
  {q:"Thứ tự đúng trong câu hỏi có từ để hỏi là gì?",
   o:["từ hỏi → chủ ngữ → động từ","chủ ngữ → từ hỏi → động từ","từ hỏi → động từ → chủ ngữ","động từ → từ hỏi → chủ ngữ"],a:2,
   w:"Hva heter du? — động từ luôn ở vị trí thứ hai. Đây là quy tắc V2."}
];
  return { HILS1, HILS2, HILS3, OMEG, SPORS, BØYING, FLIPS, DIAL1, DIAL2, TALL1, TALL2, TALL3, FELLEN, ALDER, TLF, PRIS, QUIZ };
})();

/* =====================================================================
   PHẦN 3
   ===================================================================== */
NORSK.p3 = (function () {
/* ============ DỮ LIỆU ============
   [giống, số ít, xác định số ít, số nhiều, số nhiều xác định, nghĩa, phiên âm dạng gốc]
   giống: m = en, f = ei, n = et                                        */
const N = [
  ["m","bil","bilen","biler","bilene","xe hơi","bil"],
  ["m","gutt","gutten","gutter","guttene","cậu bé","gut"],
  ["m","stol","stolen","stoler","stolene","cái ghế","stul"],
  ["m","venn","vennen","venner","vennene","bạn bè","ven"],
  ["m","dag","dagen","dager","dagene","ngày","đag"],
  ["m","by","byen","byer","byene","thành phố","buy"],
  ["m","skole","skolen","skoler","skolene","trường học","skú-lơ"],
  ["m","butikk","butikken","butikker","butikkene","cửa hàng","buy-tík"],
  ["m","lærer","læreren","lærere","lærerne","giáo viên","le-rơr"],
  ["m","kopp","koppen","kopper","koppene","cái cốc","kop"],
  ["m","telefon","telefonen","telefoner","telefonene","điện thoại","te-lơ-fún"],
  ["m","stat","staten","stater","statene","nhà nước","stat"],
  ["f","bok","boka","bøker","bøkene","quyển sách","buk"],
  ["f","jente","jenta","jenter","jentene","cô gái","yén-tơ"],
  ["f","dør","døra","dører","dørene","cánh cửa","đơr"],
  ["f","uke","uka","uker","ukene","tuần","úy-kơ"],
  ["f","hytte","hytta","hytter","hyttene","nhà nghỉ trên núi","hýt-tơ"],
  ["f","seng","senga","senger","sengene","cái giường","seng"],
  ["f","klokke","klokka","klokker","klokkene","đồng hồ","klók-kơ"],
  ["f","avis","avisa","aviser","avisene","tờ báo","a-vís"],
  ["n","hus","huset","hus","husene","ngôi nhà","huys"],
  ["n","bord","bordet","bord","bordene","cái bàn","bur"],
  ["n","brev","brevet","brev","brevene","lá thư","brêv"],
  ["n","glass","glasset","glass","glassene","cái ly","glas"],
  ["n","land","landet","land","landene","đất nước","lan"],
  ["n","år","året","år","årene","năm","ôr"],
  ["n","eple","eplet","epler","eplene","quả táo","ép-lơ"],
  ["n","bilde","bildet","bilder","bildene","bức ảnh","bíl-đơ"],
  ["n","kontor","kontoret","kontorer","kontorene","văn phòng","kun-túr"],
  ["n","vindu","vinduet","vinduer","vinduene","cửa sổ","vín-đuy"]
];
const UREG = [
  ["m","mann","mannen","menn","mennene","người đàn ông","man"],
  ["f","hånd","hånda","hender","hendene","bàn tay","hon"],
  ["m","fot","foten","føtter","føttene","bàn chân","fut"],
  ["f","natt","natta","netter","nettene","đêm","nat"],
  ["n","tre","treet","trær","trærne","cái cây","trê"],
  ["m","far","faren","fedre","fedrene","cha","far"],
  ["f","mor","mora","mødre","mødrene","mẹ","mur"],
  ["m","bror","broren","brødre","brødrene","anh, em trai","brur"],
  ["f","søster","søstera","søstre","søstrene","chị, em gái","sớs-tơr"],
  ["n","barn","barnet","barn","barna","đứa trẻ","ban"],
  ["n","øye","øyet","øyne","øynene","con mắt","ới-ơ"],
  ["m","bonde","bonden","bønder","bøndene","nông dân","bún-nơ"]
];
const ART = {m:"en", f:"ei", n:"et"};
const KLASSE = {m:"hank", f:"hunk", n:"intk"};
const KJONNNAVN = {m:"giống đực", f:"giống cái", n:"trung tính"};

const FLERTALLSREGLER = [
  ["1","Mặc định: thêm <b>-er</b>","bil → biler|stol → stoler|dag → dager"],
  ["2","Từ đã kết thúc bằng <b>-e</b>: chỉ thêm <b>-r</b>","jente → jenter|eple → epler|uke → uker"],
  ["3","Trung tính một âm tiết: <b>không thêm gì</b>","hus → hus|bord → bord|år → år"],
  ["4","Từ kết thúc <b>-er</b> chỉ người: thêm <b>-e</b>","lærer → lærere|forfatter → forfattere"],
  ["5","Số nhiều xác định: luôn <b>-ene</b>","bilene|jentene|husene"],
  ["6","Từ kết thúc -er ở số nhiều xác định: <b>-ne</b>","lærere → lærerne|søstre → søstrene"]
];
const MEDTALL = [
  ["en bil","ên bil","một chiếc xe"],
  ["to biler","tu bí-lơr","hai chiếc xe"],
  ["tre hus","trê huys","ba ngôi nhà — trung tính, không thêm đuôi"],
  ["fire bøker","fí-rơ bớ-kơr","bốn quyển sách — số nhiều bất quy tắc"],
  ["mange barn","máng-ơ ban","nhiều đứa trẻ"],
  ["tjue år","khuy-ơ ôr","hai mươi năm"]
];
const BRUK = [
  ["Jeg leser en bok.|yây lê-sơr ên buk|Tôi đang đọc một quyển sách. Người nghe chưa biết quyển nào.",
   "Boka er god.|bú-ka er gu|Quyển sách đó hay. Đã nhắc ở câu trước rồi."],
  ["Jeg har et hus.|yây har ê huys|Tôi có một ngôi nhà.",
   "Huset er stort.|húy-sơ er stut|Ngôi nhà đó thì to."],
  ["Vi kjøper epler.|vi khớ-pơr ép-lơr|Chúng tôi mua táo, nói chung chung.",
   "Eplene er dyre.|ép-lơ-nơ er đúy-rơ|Số táo đó đắt."]
];
const QUIZ = [
  {q:"Dạng xác định số ít của <span class='no'>et hus</span> là gì?",o:["husen","huset","husa","husene"],a:1,
   w:"Danh từ trung tính lấy đuôi -et. Nhớ chữ t câm: huset đọc là húy-sơ."},
  {q:"Số nhiều của <span class='no'>et bord</span> (cái bàn) là gì?",o:["border","bord","bordene","borda"],a:1,
   w:"Trung tính một âm tiết không thêm gì ở số nhiều. Số nhiều xác định mới là bordene."},
  {q:"Số nhiều của <span class='no'>ei bok</span> là gì?",o:["boker","boka","bøker","bokene"],a:2,
   w:"bok đổi nguyên âm o thành ø ở số nhiều: bok – boka – bøker – bøkene."},
  {q:"<span class='no'>Jenta</span> nghĩa là gì?",o:["một cô gái","cô gái đó","những cô gái","những cô gái đó"],a:1,
   w:"Đuôi -a là dạng xác định số ít của giống cái. Nghĩa là cô gái cụ thể đã biết."},
  {q:"Chọn cách ghi từ vựng đúng khi học danh từ mới:",
   o:["bil","bil (xe hơi)","en bil – bilen – biler – bilene","bil, số nhiều biler"],a:2,
   w:"Học đủ bốn dạng ngay từ đầu. Ghi thiếu mạo từ là ghi thiếu thông tin quan trọng nhất."},
  {q:"Số nhiều xác định của <span class='no'>et barn</span> là gì?",o:["barnene","barna","barner","barnet"],a:1,
   w:"barn là ngoại lệ: barn – barnet – barn – barna. Không theo quy tắc -ene."},
  {q:"Trong Bokmål, <span class='no'>en bok / boken</span> có được coi là đúng không?",
   o:["Không, bok bắt buộc là giống cái","Có, mọi danh từ giống cái đều dùng được như giống đực","Chỉ đúng khi viết, không đúng khi nói","Chỉ đúng ở Nynorsk"],a:1,
   w:"Bokmål cho phép hệ hai giống. Nhưng dạng boka vẫn phổ biến hơn nhiều trong lời nói."},
  {q:"Số nhiều của <span class='no'>en lærer</span> (giáo viên) là gì?",o:["lærerer","lærere","lærerne","lærers"],a:1,
   w:"Từ chỉ người kết thúc bằng -er chỉ thêm -e. Số nhiều xác định là lærerne."},
  {q:"Câu nào đúng khi bạn nhắc lại quyển sách vừa nói tới ở câu trước?",
   o:["Bok er god.","En bok er god.","Boka er god.","Bøker er god."],a:2,
   w:"Đã nhắc rồi thì chuyển sang dạng xác định. Bỏ dạng xác định là lỗi phổ biến nhất của người Việt."},
  {q:"<span class='no'>Tre hus</span> nghĩa là gì?",o:["cái cây và ngôi nhà","ba ngôi nhà","ngôi nhà thứ ba","những ngôi nhà"],a:1,
   w:"tre = số 3. Danh từ trung tính một âm tiết giữ nguyên hình dạng sau số đếm."}
];
  return { N, UREG, ART, KLASSE, KJONNNAVN, FLERTALLSREGLER, MEDTALL, BRUK, QUIZ };
})();

/* =====================================================================
   PHẦN 4
   ===================================================================== */
NORSK.p4 = (function () {
/* ============ DỮ LIỆU ============ */
/* [nguyên thể, hiện tại, phiên âm hiện tại, nghĩa, bất quy tắc?] */
const VERB = [
  ["å snakke","snakker","snák-kơr","nói chuyện",0],
  ["å bo","bor","bur","sống, ở",0],
  ["å hete","heter","hê-tơr","tên là",0],
  ["å komme","kommer","kóm-mơr","đến",0],
  ["å gå","går","gôr","đi bộ",0],
  ["å jobbe","jobber","yób-bơr","làm việc",0],
  ["å lære","lærer","le-rơr","học",0],
  ["å lese","leser","lê-sơr","đọc",0],
  ["å skrive","skriver","skrí-vơr","viết",0],
  ["å høre","hører","hớ-rơr","nghe",0],
  ["å se","ser","sêr","nhìn, thấy",0],
  ["å spise","spiser","spí-sơr","ăn",0],
  ["å drikke","drikker","đrík-kơr","uống",0],
  ["å sove","sover","sô-vơr","ngủ",0],
  ["å like","liker","lí-kơr","thích",0],
  ["å elske","elsker","él-skơr","yêu",0],
  ["å tenke","tenker","téng-kơr","nghĩ",0],
  ["å forstå","forstår","fo-stór","hiểu",0],
  ["å kjenne","kjenner","khén-nơr","quen biết ai",0],
  ["å kjøpe","kjøper","khớ-pơr","mua",0],
  ["å betale","betaler","bơ-tá-lơr","trả tiền",0],
  ["å reise","reiser","rây-sơr","đi xa, du lịch",0],
  ["å kjøre","kjører","khớ-rơr","lái xe",0],
  ["å ta","tar","tar","lấy, cầm",0],
  ["å gi","gir","yir","đưa, cho",0],
  ["å få","får","fôr","nhận được",0],
  ["å begynne","begynner","bơ-yýn-nơr","bắt đầu",0],
  ["å slutte","slutter","slút-tơr","kết thúc",0],
  ["å hjelpe","hjelper","yél-pơr","giúp đỡ",0],
  ["å vente","venter","vén-tơr","đợi",0],
  ["å bruke","bruker","brúy-kơr","dùng",0],
  ["å være","er","er","thì, là",1],
  ["å ha","har","har","có",1],
  ["å gjøre","gjør","yơr","làm",1],
  ["å si","sier","sí-ơr","nói rằng",1],
  ["å vite","vet","vêt","biết điều gì",1],
  ["å spørre","spør","spơr","hỏi",1],
  ["å kunne","kan","kan","có thể",1],
  ["å ville","vil","vil","muốn",1],
  ["å skulle","skal","skal","sẽ",1],
  ["å måtte","må","mô","phải",1]
];

const V2RADER = [
  ["Jeg","spiser","—","frokost klokka åtte","Tôi ăn sáng lúc 8 giờ"],
  ["Klokka åtte","spiser","jeg","frokost","Lúc 8 giờ tôi ăn sáng"],
  ["Frokost","spiser","jeg","klokka åtte","Bữa sáng thì tôi ăn lúc 8 giờ"],
  ["Han","bor","—","i Oslo nå","Anh ấy sống ở Oslo bây giờ"],
  ["Nå","bor","han","i Oslo","Bây giờ anh ấy sống ở Oslo"],
  ["I dag","går","jeg","på skolen","Hôm nay tôi đi học"]
];
const FEILPAR = [
  ["I dag jeg går på skolen.","I dag går jeg på skolen.","Hôm nay tôi đi học"],
  ["Nå han bor i Oslo.","Nå bor han i Oslo.","Bây giờ anh ấy sống ở Oslo"],
  ["Om morgenen vi drikker kaffe.","Om morgenen drikker vi kaffe.","Buổi sáng chúng tôi uống cà phê"]
];
const SKJEMA = [
  ["Jeg","snakker","—","ikke","norsk","Tôi không nói tiếng Na Uy"],
  ["Han","liker","—","ikke","kaffe","Anh ấy không thích cà phê"],
  ["I dag","jobber","jeg","ikke","—","Hôm nay tôi không làm việc"],
  ["Nå","forstår","hun","ikke","noe","Bây giờ cô ấy không hiểu gì"]
];
const IKKEPAR = [
  ["Jeg ikke snakker norsk.","Jeg snakker ikke norsk.","Tôi không nói tiếng Na Uy"],
  ["Han ikke liker kaffe.","Han liker ikke kaffe.","Anh ấy không thích cà phê"],
  ["Vi ikke bor i Norge.","Vi bor ikke i Norge.","Chúng tôi không sống ở Na Uy"]
];
const IKKELISTE = [
  ["Jeg forstår ikke.","yây fo-stór ík-kơ","Tôi không hiểu"],
  ["Jeg vet ikke.","yây vêt ík-kơ","Tôi không biết"],
  ["Det går ikke.","đe gôr ík-kơ","Không được đâu"],
  ["Hun er ikke hjemme.","huyn er ík-kơ yém-mơ","Cô ấy không có nhà"],
  ["Vi har ikke tid.","vi har ík-kơ tid","Chúng tôi không có thời gian"],
  ["Jeg liker ikke fisk.","yây lí-kơr ík-kơ fisk","Tôi không thích cá"]
];
const JASPORS = [
  ["Snakker","du","—","norsk?","Bạn có nói tiếng Na Uy không?"],
  ["Bor","han","—","i Oslo?","Anh ấy sống ở Oslo à?"],
  ["Liker","du","ikke","kaffe?","Bạn không thích cà phê à?"],
  ["Kan","du","—","hjelpe meg?","Bạn giúp tôi được không?"]
];
const JONEI = [
  ["Ja","ya","Có — trả lời câu hỏi khẳng định"],
  ["Nei","nây","Không — phủ nhận"],
  ["Jo","yu","Có chứ — phản bác một câu hỏi phủ định"],
  ["Jo, det gjør jeg.","yu, đe yơr yây","Có chứ, tôi có làm mà"]
];
const SPORREORD = [
  ["hva","va","cái gì","Hva gjør du?|va yơr đuy|Bạn đang làm gì?"],
  ["hvem","vem","ai","Hvem er han?|vem er han|Anh ta là ai?"],
  ["hvor","vur","ở đâu","Hvor bor du?|vur bur đuy|Bạn sống ở đâu?"],
  ["hvorfor","vur-for","tại sao","Hvorfor lærer du norsk?|vur-for le-rơr đuy nosk|Sao bạn học tiếng Na Uy?"],
  ["hvordan","vur-đan","như thế nào","Hvordan går det?|vur-đan gôr đe|Dạo này thế nào?"],
  ["når","nôr","khi nào","Når kommer du?|nôr kóm-mơr đuy|Khi nào bạn đến?"],
  ["hvilken","víl-kơn","cái nào","Hvilken bok liker du?|víl-kơn buk lí-kơr đuy|Bạn thích quyển sách nào?"],
  ["hvor mye","vur mú-ơ","bao nhiêu (không đếm)","Hvor mye koster det?|vur mú-ơ kós-tơr đe|Cái đó giá bao nhiêu?"],
  ["hvor mange","vur máng-ơ","bao nhiêu (đếm được)","Hvor mange barn har du?|vur máng-ơ ban har đuy|Bạn có mấy đứa con?"]
];
const BISETNING = [
  ["Jeg drikker ikke kaffe.","yây đrík-kơr ík-kơ káf-fơ","Câu chính: ikke đứng sau động từ"],
  ["…fordi jeg ikke drikker kaffe.","fo-đi yây ík-kơ đrík-kơr káf-fơ","Sau fordi: ikke nhảy lên trước động từ"],
  ["Jeg vet at han ikke kommer.","yây vêt at han ík-kơ kóm-mơr","Sau at cũng vậy"]
];
const DRILL = [
  {vi:"Hôm nay tôi đi học.",
   o:["I dag jeg går på skolen.","I dag går jeg på skolen.","Jeg i dag går på skolen.","I dag på skolen jeg går."],a:1,
   w:"I dag chiếm vị trí 1, nên động từ går phải đứng ngay sau, rồi mới tới jeg."},
  {vi:"Tôi không nói tiếng Na Uy.",
   o:["Jeg ikke snakker norsk.","Ikke jeg snakker norsk.","Jeg snakker ikke norsk.","Jeg snakker norsk ikke."],a:2,
   w:"ikke luôn đứng ngay sau động từ chia trong câu kể."},
  {vi:"Bạn sống ở đâu?",
   o:["Hvor du bor?","Hvor bor du?","Du bor hvor?","Hvor er du bor?"],a:1,
   w:"Từ hỏi chiếm vị trí 1, động từ vẫn ở vị trí 2, chủ ngữ lùi ra sau."},
  {vi:"Lúc tám giờ chúng tôi uống cà phê.",
   o:["Klokka åtte vi drikker kaffe.","Klokka åtte drikker vi kaffe.","Vi klokka åtte drikker kaffe.","Drikker vi kaffe klokka åtte."],a:1,
   w:"Trạng ngữ thời gian lên đầu thì chủ ngữ vi phải nhường chỗ cho động từ."},
  {vi:"Anh ấy không sống ở Oslo.",
   o:["Han ikke bor i Oslo.","Han bor i Oslo ikke.","Han bor ikke i Oslo.","Ikke han bor i Oslo."],a:2,
   w:"Thứ tự cố định: chủ ngữ – động từ – ikke – phần còn lại."},
  {vi:"Bạn có nói tiếng Anh không?",
   o:["Gjør du snakker engelsk?","Du snakker engelsk?","Snakker du engelsk?","Er du snakker engelsk?"],a:2,
   w:"Câu hỏi có/không: đưa động từ lên đầu. Tiếng Na Uy không có do/does."},
  {vi:"Bây giờ tôi đang học tiếng Na Uy.",
   o:["Nå jeg lærer norsk.","Nå lærer jeg norsk.","Jeg nå lærer norsk.","Lærer nå jeg norsk."],a:1,
   w:"Nå ở vị trí 1 thì lærer ở vị trí 2, jeg lùi xuống vị trí 3."},
  {vi:"Tại sao bạn đến Na Uy?",
   o:["Hvorfor du kommer til Norge?","Hvorfor kommer du til Norge?","Du hvorfor kommer til Norge?","Hvorfor kommer til Norge du?"],a:1,
   w:"Từ hỏi → động từ → chủ ngữ. Thứ tự này không đổi với bất kỳ từ hỏi nào."},
  {vi:"Buổi sáng cô ấy đọc báo.",
   o:["Om morgenen hun leser avisa.","Hun om morgenen leser avisa.","Om morgenen leser hun avisa.","Leser hun avisa om morgenen."],a:2,
   w:"Cùng một quy tắc đảo. Câu cuối là câu hỏi chứ không phải câu kể."},
  {vi:"Tôi có thể giúp bạn.",
   o:["Jeg kan hjelper deg.","Jeg kan å hjelpe deg.","Jeg kan hjelpe deg.","Jeg kan hjelpe å deg."],a:2,
   w:"Sau động từ khiếm khuyết là nguyên thể trần, không có å và không chia."},
  {vi:"Hôm nay tôi không làm việc.",
   o:["I dag jeg jobber ikke.","I dag jobber jeg ikke.","I dag ikke jobber jeg.","Jeg jobber ikke i dag ikke."],a:1,
   w:"Ghép hai quy tắc: đảo vì I dag ở vị trí 1, và ikke đứng sau chủ ngữ đã lùi."},
  {vi:"Bạn tên là gì?",
   o:["Hva du heter?","Hva heter du?","Du heter hva?","Hvem heter du?"],a:1,
   w:"hva = cái gì, hvem = ai. Và trật tự vẫn là từ hỏi → động từ → chủ ngữ."}
];
const QUIZ = [
  {q:"Dạng hiện tại của <span class='no'>å snakke</span> là gì?",o:["snakke","snakker","snakkar","snakket"],a:1,
   w:"Bỏ å, thêm -r. Dạng này dùng cho tất cả các ngôi."},
  {q:"Câu nào đúng?",o:["I dag jeg går på jobb.","I dag går jeg på jobb.","Jeg i dag går på jobb.","Går i dag jeg på jobb."],a:1,
   w:"Quy tắc V2: I dag chiếm vị trí 1, động từ phải đứng thứ hai."},
  {q:"<span class='no'>ikke</span> đứng ở đâu trong câu kể?",
   o:["Trước động từ","Ngay sau động từ chia","Cuối câu","Đầu câu"],a:1,
   w:"Ngược với tiếng Việt. Jeg snakker ikke norsk, không phải Jeg ikke snakker."},
  {q:"Dạng hiện tại của <span class='no'>å være</span> là gì?",o:["værer","er","var","vær"],a:1,
   w:"Đây là động từ bất quy tắc quan trọng nhất: å være → er."},
  {q:"Chuyển <span class='no'>Du bor i Bergen</span> thành câu hỏi:",
   o:["Gjør du bor i Bergen?","Du bor i Bergen?","Bor du i Bergen?","Er du bor i Bergen?"],a:2,
   w:"Đưa động từ lên đầu. Không thêm trợ động từ nào."},
  {q:"Ai đó hỏi <span class='no'>Liker du ikke fisk?</span> Bạn thích cá. Trả lời sao?",
   o:["Ja.","Nei.","Jo.","Ikke."],a:2,
   w:"jo dùng riêng để phản bác câu hỏi phủ định. Tiếng Việt không có từ tương đương."},
  {q:"Dạng hiện tại của <span class='no'>å vite</span> (biết) là gì?",o:["viter","vet","vitte","visste"],a:1,
   w:"Bất quy tắc: å vite → vet. Đừng nhầm với å vente → venter."},
  {q:"Câu nào đúng sau động từ khiếm khuyết?",
   o:["Jeg kan snakker norsk.","Jeg kan å snakke norsk.","Jeg kan snakke norsk.","Jeg kan snakket norsk."],a:2,
   w:"Sau kan, vil, skal, må là nguyên thể trần: không å, không chia."},
  {q:"Vị trí 1 trong câu tiếng Na Uy chứa được bao nhiêu thành phần?",
   o:["Một","Hai","Không giới hạn","Tùy loại câu"],a:0,
   w:"Chỉ một. Đây chính là lý do chủ ngữ bị đẩy ra sau động từ khi có trạng ngữ đứng đầu."},
  {q:"Trong mệnh đề sau <span class='no'>fordi</span>, <span class='no'>ikke</span> đứng ở đâu?",
   o:["Vẫn sau động từ","Trước động từ","Cuối mệnh đề","Bỏ hẳn ikke"],a:1,
   w:"fordi jeg ikke liker kaffe. Mệnh đề phụ không theo V2 — phần 6 sẽ làm kỹ."}
];
  return { VERB, V2RADER, FEILPAR, SKJEMA, IKKEPAR, IKKELISTE, JASPORS, JONEI, SPORREORD, BISETNING, DRILL, QUIZ };
})();

/* =====================================================================
   PHẦN 5
   ===================================================================== */
NORSK.p5 = (function () {
/* ============ SỞ HỮU ============ */
const EIER = [
  ["của tôi","min","mi","mitt","mine"],
  ["của bạn","din","di","ditt","dine"],
  ["của anh ấy","hans","hans","hans","hans"],
  ["của cô ấy","hennes","hennes","hennes","hennes"],
  ["của chúng tôi","vår","vår","vårt","våre"],
  ["của các bạn / của họ","deres","deres","deres","deres"]
];
const EIEPOS = [
  ["bilen min|bí-lơn min|xe của tôi","min bil|min bil|xe của tôi"],
  ["boka mi|bú-ka mi|sách của tôi","mi bok|mi buk|sách của tôi"],
  ["huset mitt|húy-sơ mit|nhà của tôi","mitt hus|mit huys|nhà của tôi"],
  ["bøkene mine|bớ-kơ-nơ mí-nơ|những quyển sách của tôi","mine bøker|mí-nơ bớ-kơr|những quyển sách của tôi"]
];
const EIEPAR = [
  ["min bilen er rød","min bil er rød","Xe tôi màu đỏ — đặt trước thì danh từ ở dạng cơ bản"],
  ["bil min er rød","bilen min er rød","Xe tôi màu đỏ — đặt sau thì danh từ ở dạng xác định"],
  ["huset min","huset mitt","Nhà của tôi — huset là trung tính nên phải dùng mitt"]
];
const SIN = [
  ["Han tar bilen sin.|han tar bí-lơn sin|Anh ta lấy xe của chính mình",
   "Han tar bilen hans.|han tar bí-lơn hans|Anh ta lấy xe của một người khác"],
  ["Hun ringer moren sin.|huyn ríng-ơr mú-rơn sin|Cô ấy gọi mẹ mình",
   "Hun ringer moren hennes.|huyn ríng-ơr mú-rơn hén-nơs|Cô ấy gọi mẹ của cô kia"],
  ["De selger huset sitt.|đi sél-gơr húy-sơ sit|Họ bán nhà của chính họ",
   "De selger huset deres.|đi sél-gơr húy-sơ đê-rơs|Họ bán nhà của người khác"]
];

/* ============ TỪ VỰNG ============
   [từ, phiên âm, nghĩa, giống]                                          */
const FAMILIE = [
  ["en familie","fa-mí-li-ơ","gia đình","m"],
  ["ei mor","mur","mẹ","f"],
  ["en far","far","cha","m"],
  ["foreldre","fo-rél-đrơ","bố mẹ (chỉ số nhiều)","x"],
  ["ei søster","sớs-tơr","chị, em gái","f"],
  ["en bror","brur","anh, em trai","m"],
  ["søsken","sớs-kơn","anh chị em (chỉ số nhiều)","x"],
  ["ei datter","đát-tơr","con gái","f"],
  ["en sønn","sơn","con trai","m"],
  ["et barn","ban","đứa con","n"],
  ["ei kone","kú-nơ","vợ","f"],
  ["en mann","man","chồng, đàn ông","m"],
  ["en kjæreste","khe-rơs-tơ","người yêu","m"],
  ["en samboer","sám-bu-ơr","người sống chung","m"],
  ["ei bestemor","bés-tơ-mur","bà","f"],
  ["en bestefar","bés-tơ-far","ông","m"],
  ["ei tante","tán-tơ","cô, dì, bác gái","f"],
  ["en onkel","óng-kơl","chú, bác, cậu","m"],
  ["et barnebarn","bá-nơ-ban","cháu","n"],
  ["en fetter","fét-tơr","anh em họ (nam)","m"],
  ["ei kusine","kuy-sí-nơ","chị em họ (nữ)","f"]
];
const HUS = [
  ["et hus","huys","ngôi nhà","n"],
  ["ei leilighet","lây-li-hêt","căn hộ","f"],
  ["et rom","rum","căn phòng","n"],
  ["ei stue","stúy-ơ","phòng khách","f"],
  ["et kjøkken","khớk-kơn","nhà bếp","n"],
  ["et soverom","sô-vơ-rum","phòng ngủ","n"],
  ["et bad","bad","phòng tắm","n"],
  ["en gang","gang","hành lang, lối vào","m"],
  ["en kjeller","khél-lơr","tầng hầm","m"],
  ["en hage","há-ghơ","khu vườn","m"],
  ["en balkong","bal-kóng","ban công","m"],
  ["et vindu","vín-đuy","cửa sổ","n"],
  ["ei dør","đơr","cánh cửa","f"],
  ["ei seng","seng","cái giường","f"],
  ["en sofa","sú-fa","ghế sofa","m"],
  ["et kjøleskap","khớ-lơ-skap","tủ lạnh","n"],
  ["en komfyr","kum-fúyr","bếp lò","m"],
  ["en dusj","đuysh","vòi sen","m"]
];
const ROMGIRO = [
  ["på kjøkkenet","pô khớk-kơ-nơ","trong bếp","x"],
  ["i stua","i stúy-a","ở phòng khách","x"],
  ["på badet","pô bá-đơ","trong phòng tắm","x"],
  ["på soverommet","pô sô-vơ-rum-mơ","trong phòng ngủ","x"],
  ["på rommet","pô rúm-mơ","trong phòng","x"],
  ["i gangen","i gáng-ơn","ngoài hành lang","x"],
  ["i hagen","i há-ghơn","ngoài vườn","x"],
  ["i kjelleren","i khél-lơ-rơn","dưới tầng hầm","x"],
  ["hjemme","yém-mơ","ở nhà (không cần giới từ)","x"],
  ["ute","úy-tơ","ở ngoài","x"]
];
const KLOKKEDELER = [
  ["over","ố-vơr","hơn, sau — dùng cho phút đã trôi qua"],
  ["på","pô","kém, trước — dùng cho phút còn thiếu"],
  ["halv","hal","nửa đường tới giờ kế tiếp (chữ v câm)"],
  ["kvart","kvat","mười lăm phút"]
];
const KLOKKER = [
  ["2:00","klokka to","klók-ka tu",0],
  ["2:05","fem over to","fem ố-vơr tu",0],
  ["2:10","ti over to","ti ố-vơr tu",0],
  ["2:15","kvart over to","kvat ố-vơr tu",0],
  ["2:20","ti på halv tre","ti pô hal trê",1],
  ["2:25","fem på halv tre","fem pô hal trê",1],
  ["2:30","halv tre","hal trê",1],
  ["2:35","fem over halv tre","fem ố-vơr hal trê",1],
  ["2:40","ti over halv tre","ti ố-vơr hal trê",1],
  ["2:45","kvart på tre","kvat pô trê",0],
  ["2:50","ti på tre","ti pô trê",0],
  ["2:55","fem på tre","fem pô trê",0]
];
const KLOKKESPORS = [
  ["Hva er klokka?","va er klók-ka","Mấy giờ rồi?","x"],
  ["Klokka er halv fire.","klók-ka er hal fí-rơ","Ba giờ rưỡi","x"],
  ["Når kommer du?","nôr kóm-mơr đuy","Khi nào bạn đến?","x"],
  ["Klokka åtte.","klók-ka ót-tơ","Lúc tám giờ","x"],
  ["Vi møtes klokka to.","vi mớ-tơs klók-ka tu","Chúng ta gặp lúc hai giờ","x"],
  ["Om en time.","om ên tí-mơ","Trong một tiếng nữa","x"]
];
const UKEDAGER = [
  ["mandag","mán-đag","thứ hai","x"],["tirsdag","tís-đag","thứ ba","x"],
  ["onsdag","úns-đag","thứ tư","x"],["torsdag","tós-đag","thứ năm","x"],
  ["fredag","frê-đag","thứ sáu","x"],["lørdag","lớ-đag","thứ bảy","x"],
  ["søndag","sớn-đag","chủ nhật","x"]
];
const MANEDER = [
  ["januar","ya-nuy-ar","tháng 1","x"],["februar","fé-bruy-ar","tháng 2","x"],
  ["mars","mas","tháng 3","x"],["april","a-príl","tháng 4","x"],
  ["mai","mai","tháng 5","x"],["juni","yúy-ni","tháng 6","x"],
  ["juli","yúy-li","tháng 7","x"],["august","áu-guyst","tháng 8","x"],
  ["september","sep-tém-bơr","tháng 9","x"],["oktober","ok-tú-bơr","tháng 10","x"],
  ["november","nu-vém-bơr","tháng 11","x"],["desember","đe-sém-bơr","tháng 12","x"]
];
const ARSTIDER = [
  ["en vår","vôr","mùa xuân","m"],["en sommer","sóm-mơr","mùa hè","m"],
  ["en høst","hớst","mùa thu","m"],["en vinter","vín-tơr","mùa đông","m"]
];
const TIDORD = [
  ["i dag","i đag","hôm nay","x"],["i morgen","i mór-ơn","ngày mai","x"],
  ["i går","i gôr","hôm qua","x"],["i kveld","i kvel","tối nay","x"],
  ["i natt","i nat","đêm nay","x"],["i helga","i hél-ga","cuối tuần này","x"],
  ["om morgenen","om mór-ơ-nơn","vào buổi sáng, thường lệ","x"],
  ["om ettermiddagen","om ét-tơr-mid-đa-ghơn","vào buổi chiều","x"],
  ["om kvelden","om kvél-đơn","vào buổi tối","x"],
  ["om natta","om nát-ta","vào ban đêm","x"],
  ["neste uke","nés-tơ úy-kơ","tuần tới","x"],
  ["forrige uke","fór-ri-ơ úy-kơ","tuần trước","x"],
  ["hver dag","ver đag","mỗi ngày","x"],
  ["alltid","ál-ti","luôn luôn","x"],
  ["ofte","óf-tơ","thường xuyên","x"],
  ["aldri","ál-đri","không bao giờ","x"]
];
const MALTID = [
  ["en frokost","frú-kost","bữa sáng","m"],
  ["en lunsj","luynsh","bữa trưa nhẹ","m"],
  ["en middag","míd-đag","bữa chính, khoảng 16–17 giờ","m"],
  ["en kveldsmat","kvéls-mat","bữa tối nhẹ","m"],
  ["å spise","spí-sơ","ăn","x"],
  ["å lage mat","lá-ghơ mat","nấu ăn","x"]
];
const DAGTEKST = [
  ["Jeg står opp klokka sju.","yây stôr op klók-ka su","Tôi dậy lúc bảy giờ."],
  ["Så spiser jeg frokost på kjøkkenet.","sô spí-sơr yây frú-kost pô khớk-kơ-nơ","Rồi tôi ăn sáng trong bếp."],
  ["Klokka åtte går jeg på jobb.","klók-ka ót-tơ gôr yây pô yob","Tám giờ tôi đi làm."],
  ["Jeg jobber fra ni til fem.","yây yób-bơr fra ni til fem","Tôi làm từ chín giờ tới năm giờ."],
  ["Om ettermiddagen handler jeg mat.","om ét-tơr-mid-đa-ghơn hánd-lơr yây mat","Buổi chiều tôi đi chợ."],
  ["Klokka fem lager jeg middag.","klók-ka fem lá-ghơr yây míd-đag","Năm giờ tôi nấu bữa chính."],
  ["Om kvelden ser jeg på TV i stua.","om kvél-đơn sêr yây pô tê-vê i stúy-a","Buổi tối tôi xem TV ở phòng khách."],
  ["Jeg legger meg klokka elleve.","yây lég-gơr mây klók-ka él-vơ","Tôi đi ngủ lúc mười một giờ."]
];
const DRILL = [
  {t:"2:30", o:["halv to","halv tre","to tretti minutter","tretti over to"],a:1,
   w:"halv tính hướng tới giờ sau. 2:30 là nửa đường tới ba giờ."},
  {t:"3:15", o:["kvart på tre","kvart over tre","halv tre","femten over tre"],a:1,
   w:"kvart over = 15 phút đã trôi qua kể từ đầu giờ."},
  {t:"4:45", o:["kvart over fire","kvart på fem","halv fem","kvart på fire"],a:1,
   w:"45 phút tức là còn thiếu 15 phút nữa tới năm giờ: kvart på fem."},
  {t:"7:20", o:["tjue over sju","ti på halv åtte","ti over halv åtte","halv åtte"],a:1,
   w:"7:20 neo vào mốc nửa: còn 10 phút nữa tới halv åtte."},
  {t:"9:35", o:["fem over halv ti","trettifem over ni","fem på halv ti","halv ti"],a:0,
   w:"9:35 là 5 phút sau mốc halv ti (9:30)."},
  {t:"11:00", o:["halv elleve","klokka elleve","kvart over elleve","elleve på tolv"],a:1,
   w:"Giờ tròn thì chỉ cần klokka + số."},
  {t:"1:05", o:["fem på ett","fem over ett","fem over en","halv to"],a:1,
   w:"Với đồng hồ, số 1 dùng dạng ett chứ không phải en."},
  {t:"6:50", o:["ti over halv sju","ti på sju","femti over seks","kvart på sju"],a:1,
   w:"Còn thiếu 10 phút nữa tới bảy giờ: ti på sju."},
  {t:"10:25", o:["fem over halv elleve","tjuefem over ti","fem på halv elleve","halv elleve"],a:2,
   w:"Còn 5 phút nữa tới mốc halv elleve (10:30)."},
  {t:"12:40", o:["ti på ett","ti over halv ett","førti over tolv","kvart på ett"],a:1,
   w:"12:40 là 10 phút sau mốc halv ett (12:30)."}
];
const QUIZ = [
  {q:"<span class='no'>halv fem</span> là mấy giờ?",o:["5:30","4:30","5:00","4:00"],a:1,
   w:"halv tính hướng tới giờ sau: nửa đường tới năm giờ, tức 4:30."},
  {q:"Nhà của tôi nói thế nào? (<span class='no'>et hus</span>)",o:["huset min","huset mitt","husen min","mitt huset"],a:1,
   w:"hus là trung tính nên dùng mitt. Đặt sau thì danh từ ở dạng xác định: huset mitt."},
  {q:"Từ sở hữu biến đổi theo cái gì?",
   o:["Theo người sở hữu","Theo giống của vật được sở hữu","Theo số lượng người sở hữu","Không bao giờ đổi"],a:1,
   w:"boka mi, bilen min, huset mitt — hình dạng phụ thuộc vào danh từ đứng cạnh."},
  {q:"<span class='no'>Han tar bilen hans.</span> Chiếc xe đó của ai?",
   o:["Của chính anh ta","Của một người đàn ông khác","Của cô ấy","Không xác định được"],a:1,
   w:"hans chỉ người khác. Muốn nói xe của chính anh ta thì dùng bilen sin."},
  {q:"2:20 nói thế nào?",o:["tjue over to","ti på halv tre","ti over halv to","halv tre"],a:1,
   w:"Người Na Uy neo phút quanh mốc halv, không neo vào đầu giờ."},
  {q:"Câu nào đúng?",o:["min bilen","bilen min","min bilene","bil min"],a:1,
   w:"Đặt sau thì danh từ ở dạng xác định. Dạng đặt trước là min bil."},
  {q:"Bữa <span class='no'>middag</span> ở Na Uy thường ăn lúc nào?",
   o:["12 giờ trưa","16–17 giờ","19–20 giờ","Trước khi đi ngủ"],a:1,
   w:"Đây là bữa chính trong ngày, ăn sớm hơn thói quen Việt Nam nhiều."},
  {q:"Trong bếp nói thế nào?",o:["i kjøkkenet","på kjøkkenet","ved kjøkkenet","til kjøkkenet"],a:1,
   w:"Bếp, phòng tắm, phòng ngủ đi với på. Phòng khách và vườn đi với i. Phải học thuộc từng cụm."},
  {q:"Số nhiều của <span class='no'>ei datter</span> (con gái) là gì?",o:["dattere","døtre","dattrer","døttere"],a:1,
   w:"Bất quy tắc, đổi nguyên âm giống mor → mødre và bror → brødre."},
  {q:"<span class='no'>Om morgenen drikker jeg kaffe</span> nghĩa là gì?",
   o:["Sáng nay tôi uống cà phê","Sáng nào tôi cũng uống cà phê","Ngày mai tôi sẽ uống cà phê","Tôi vừa uống cà phê"],a:1,
   w:"om + buổi chỉ thói quen lặp lại. Muốn nói sáng nay cụ thể thì dùng i morges."}
];
  return { EIER, EIEPOS, EIEPAR, SIN, FAMILIE, HUS, ROMGIRO, KLOKKEDELER, KLOKKER, KLOKKESPORS, UKEDAGER, MANEDER, ARSTIDER, TIDORD, MALTID, DAGTEKST, DRILL, QUIZ };
})();

/* =====================================================================
   PHẦN 6
   ===================================================================== */
NORSK.p6 = (function () {
/* ============ DỮ LIỆU ============
   [nguyên thể, hiện tại, quá khứ, hoàn thành, phiên âm quá khứ, nghĩa, mạnh?] */
const VERB = [
  ["å snakke","snakker","snakket","har snakket","snák-kơt","nói chuyện",0],
  ["å jobbe","jobber","jobbet","har jobbet","yób-bơt","làm việc",0],
  ["å vaske","vasker","vasket","har vasket","vás-kơt","rửa, giặt",0],
  ["å handle","handler","handlet","har handlet","hánd-lơt","đi mua sắm",0],
  ["å spise","spiser","spiste","har spist","spís-tơ","ăn",0],
  ["å lese","leser","leste","har lest","lés-tơ","đọc",0],
  ["å kjøpe","kjøper","kjøpte","har kjøpt","khớp-tơ","mua",0],
  ["å høre","hører","hørte","har hørt","hớ-tơ","nghe",0],
  ["å like","liker","likte","har likt","lík-tơ","thích",0],
  ["å kjenne","kjenner","kjente","har kjent","khén-tơ","quen biết",0],
  ["å glemme","glemmer","glemte","har glemt","glém-tơ","quên",0],
  ["å lære","lærer","lærte","har lært","le-tơ","học",0],
  ["å leve","lever","levde","har levd","lév-đơ","sống",0],
  ["å prøve","prøver","prøvde","har prøvd","prớv-đơ","thử",0],
  ["å bo","bor","bodde","har bodd","bód-đơ","cư trú",0],
  ["å bety","betyr","betydde","har betydd","bơ-túyd-đơ","có nghĩa là",0],
  ["å tro","tror","trodde","har trodd","trúd-đơ","tin, nghĩ rằng",0],
  ["å være","er","var","har vært","var","thì, là",1],
  ["å ha","har","hadde","har hatt","hád-đơ","có",1],
  ["å gjøre","gjør","gjorde","har gjort","yú-rơ","làm",1],
  ["å si","sier","sa","har sagt","sa","nói rằng",1],
  ["å se","ser","så","har sett","sô","nhìn, thấy",1],
  ["å ta","tar","tok","har tatt","tuk","lấy, cầm",1],
  ["å få","får","fikk","har fått","fik","nhận được",1],
  ["å gi","gir","ga","har gitt","ga","đưa, cho",1],
  ["å gå","går","gikk","har gått","yik","đi bộ",1],
  ["å komme","kommer","kom","har kommet","kom","đến",1],
  ["å drikke","drikker","drakk","har drukket","drak","uống",1],
  ["å skrive","skriver","skrev","har skrevet","skrêv","viết",1],
  ["å finne","finner","fant","har funnet","fant","tìm thấy",1],
  ["å sitte","sitter","satt","har sittet","sat","ngồi",1],
  ["å ligge","ligger","lå","har ligget","lô","nằm",1],
  ["å sove","sover","sov","har sovet","sôv","ngủ",1],
  ["å vite","vet","visste","har visst","vís-tơ","biết điều gì",1],
  ["å spørre","spør","spurte","har spurt","spúy-tơ","hỏi",1],
  ["å velge","velger","valgte","har valgt","vál-tơ","chọn",1],
  ["å selge","selger","solgte","har solgt","sól-tơ","bán",1],
  ["å hjelpe","hjelper","hjalp","har hjulpet","yalp","giúp đỡ",1],
  ["å bli","blir","ble","har blitt","blê","trở thành, ở lại",1],
  ["å stå","står","sto","har stått","stu","đứng",1]
];
const FIRE = [
  ["Nguyên thể","å snakke","Sau động từ khiếm khuyết, hoặc khi tra từ điển"],
  ["Hiện tại","snakker","Việc đang xảy ra hoặc lặp lại — phần 4"],
  ["Quá khứ","snakket","Việc đã xong tại một thời điểm cụ thể"],
  ["Hoàn thành","har snakket","Việc đã xảy ra, không nói rõ thời điểm"]
];
const GRUPPER = [
  ["Nhóm 1","-et","Gốc kết thúc bằng hai phụ âm trở lên","snakke → snakket<br>jobbe → jobbet<br>vaske → vasket"],
  ["Nhóm 2","-te","Gốc kết thúc bằng một phụ âm","spise → spiste<br>lese → leste<br>kjøpe → kjøpte"],
  ["Nhóm 3","-de","Gốc kết thúc bằng v hoặc g","leve → levde<br>prøve → prøvde"],
  ["Nhóm 4","-dde","Gốc là một nguyên âm có trọng âm","bo → bodde<br>tro → trodde<br>bety → betydde"]
];
const PPTAB = [
  ["Jeg spiste frokost klokka åtte.|yây spís-tơ frú-kost klók-ka ót-tơ|Tôi ăn sáng lúc tám giờ — có mốc giờ",
   "Jeg har spist frokost.|yây har spist frú-kost|Tôi ăn sáng rồi — không nói lúc nào, ý là giờ không đói"],
  ["Jeg var i Norge i fjor.|yây var i nor-ghơ i fyur|Tôi ở Na Uy năm ngoái — có mốc năm",
   "Jeg har vært i Norge.|yây har vet i nor-ghơ|Tôi từng ở Na Uy — nói kinh nghiệm"],
  ["Hun kom klokka to.|huyn kom klók-ka tu|Cô ấy đến lúc hai giờ",
   "Hun har kommet.|huyn har kóm-mơt|Cô ấy đến rồi — tức là đang ở đây"]
];
const FORTIDORD = [
  ["i går","i gôr","hôm qua"],["i forgårs","i fo-gôsh","hôm kia"],
  ["i går kveld","i gôr kvel","tối qua"],["forrige uke","fór-ri-ơ úy-kơ","tuần trước"],
  ["forrige måned","fór-ri-ơ mó-nơd","tháng trước"],["i fjor","i fyur","năm ngoái"],
  ["for tre dager siden","fo trê đá-ghơr sí-đơn","ba ngày trước"],
  ["nettopp","nét-top","vừa mới"],["allerede","al-lơ-rê-đơ","đã, rồi"],
  ["ennå ikke","en-nô ík-kơ","vẫn chưa"],["aldri","ál-đri","chưa bao giờ"],
  ["en gang","ên gang","một lần nọ"]
];
const FRAM1 = [
  ["Jeg reiser i morgen.","yây rây-sơr i mór-ơn","Mai tôi đi — động từ vẫn ở hiện tại"],
  ["Vi møtes neste uke.","vi mớ-tơs nés-tơ úy-kơ","Tuần tới chúng ta gặp nhau"],
  ["Bussen kommer klokka fem.","búys-sơn kóm-mơr klók-ka fem","Xe buýt đến lúc năm giờ"]
];
const FRAM2 = [
  ["Jeg skal reise til Norge.","yây skal rây-sơ til nor-ghơ","Tôi sẽ đi Na Uy — đã định"],
  ["Vi skal spise middag klokka fire.","vi skal spí-sơ míd-đag klók-ka fí-rơ","Chúng tôi sẽ ăn lúc bốn giờ"],
  ["Hva skal du gjøre i helga?","va skal đuy yơ-rơ i hél-ga","Cuối tuần bạn định làm gì?"]
];
const FRAM3 = [
  ["Det kommer til å regne.","đe kóm-mơr til ô rấy-nơ","Trời sắp mưa — dự đoán"],
  ["Det kommer til å gå bra.","đe kóm-mơr til ô gô bra","Rồi sẽ ổn thôi"]
];
const MODAL = [
  ["kan","kunne","có thể","Jeg kan snakke litt norsk.|yây kan snák-kơ lit nosk|Tôi nói được chút tiếng Na Uy"],
  ["vil","ville","muốn","Jeg vil ha kaffe.|yây vil ha káf-fơ|Tôi muốn cà phê"],
  ["skal","skulle","sẽ, định","Jeg skal jobbe i morgen.|yây skal yób-bơ i mór-ơn|Mai tôi sẽ làm việc"],
  ["må","måtte","phải","Jeg må gå nå.|yây mô gô nô|Tôi phải đi bây giờ"],
  ["bør","burde","nên","Du bør sove mer.|đuy bơr sô-vơ mêr|Bạn nên ngủ nhiều hơn"],
  ["får","fikk","được phép","Får jeg spørre?|fôr yây spơ-rơ|Tôi hỏi được không?"]
];
const MODALPAR = [
  ["Jeg kan å snakke norsk.","Jeg kan snakke norsk.","Sau động từ khiếm khuyết là nguyên thể trần, không có å"],
  ["Jeg må går nå.","Jeg må gå nå.","Động từ theo sau không được chia"],
  ["Jeg vil reise i morgen. (ý: tôi sẽ đi)","Jeg skal reise i morgen.","vil nghĩa là muốn, không phải sẽ"]
];
const LEDDRADER = [
  ["fordi","jeg","ikke","liker","kaffe","bởi vì tôi không thích cà phê"],
  ["at","han","ikke","kommer","i dag","rằng hôm nay anh ấy không đến"],
  ["hvis","du","ikke","har","tid","nếu bạn không có thời gian"],
  ["når","vi","—","spiser","middag","khi chúng tôi ăn bữa chính"]
];
const LEDDPAR = [
  ["Jeg blir hjemme fordi jeg er ikke frisk.","Jeg blir hjemme fordi jeg ikke er frisk.","Tôi ở nhà vì tôi không khoẻ"],
  ["Han sier at han kommer ikke.","Han sier at han ikke kommer.","Anh ấy nói là anh ấy không đến"],
  ["Jeg vet at du liker ikke fisk.","Jeg vet at du ikke liker fisk.","Tôi biết bạn không thích cá"]
];
const LEDDFORST = [
  ["Hvis det regner, blir jeg hjemme.","vis đe rấy-nơr, blir yây yém-mơ","Nếu trời mưa thì tôi ở nhà"],
  ["Når jeg er ferdig, ringer jeg deg.","nôr yây er fe-đi, ríng-ơr yây đây","Khi nào xong tôi gọi bạn"],
  ["Fordi jeg var syk, jobbet jeg ikke.","fo-đi yây var suyk, yób-bơt yây ík-kơ","Vì tôi ốm nên tôi không đi làm"]
];
const NARDA = [
  ["Når jeg drikker kaffe, blir jeg våken.|nôr yây đrík-kơr káf-fơ|Mỗi khi uống cà phê tôi tỉnh táo — lặp lại",
   "Da jeg var barn, bodde jeg i Hanoi.|đa yây var ban|Hồi tôi còn nhỏ, tôi sống ở Hà Nội — một giai đoạn đã qua"],
  ["Når du kommer, spiser vi.|nôr đuy kóm-mơr|Khi nào bạn đến thì chúng ta ăn — tương lai",
   "Da han kom, sov jeg.|đa han kom|Lúc anh ấy đến thì tôi đang ngủ — một lần trong quá khứ"]
];
const IGAR = [
  ["I går sto jeg opp klokka åtte.","i gôr stu yây op klók-ka ót-tơ","Hôm qua tôi dậy lúc tám giờ."],
  ["Jeg spiste frokost og drakk kaffe.","yây spís-tơ frú-kost o drak káf-fơ","Tôi ăn sáng và uống cà phê."],
  ["Så gikk jeg på jobb.","sô yik yây pô yob","Rồi tôi đi làm."],
  ["Jeg jobbet til klokka fire.","yây yób-bơt til klók-ka fí-rơ","Tôi làm tới bốn giờ."],
  ["Etterpå handlet jeg mat fordi jeg ikke hadde noe hjemme.","ét-tơr-pô hánd-lơt yây mat fo-đi yây ík-kơ hád-đơ nu-ơ yém-mơ","Sau đó tôi đi chợ vì ở nhà không còn gì."],
  ["Om kvelden så jeg en film.","om kvél-đơn sô yây ên film","Buổi tối tôi xem một bộ phim."],
  ["Jeg la meg klokka elleve fordi jeg var trøtt.","yây la mây klók-ka él-vơ fo-đi yây var trớt","Tôi đi ngủ lúc mười một giờ vì buồn ngủ."]
];
const DRILL_ORDER = [
  {vi:"Tôi ở nhà vì tôi không khoẻ.",
   o:["Jeg blir hjemme fordi jeg er ikke frisk.","Jeg blir hjemme fordi jeg ikke er frisk.",
      "Jeg blir hjemme fordi ikke jeg er frisk.","Jeg blir hjemme fordi er jeg ikke frisk."],a:1,
   w:"Trong mệnh đề phụ, ikke đứng trước động từ."},
  {vi:"Anh ấy nói là anh ấy không đến.",
   o:["Han sier at han kommer ikke.","Han sier at ikke han kommer.",
      "Han sier at han ikke kommer.","Han sier at kommer han ikke."],a:2,
   w:"Sau at cũng theo trật tự mệnh đề phụ: chủ ngữ – ikke – động từ."},
  {vi:"Nếu trời mưa thì tôi ở nhà.",
   o:["Hvis det regner, jeg blir hjemme.","Hvis det regner, blir jeg hjemme.",
      "Hvis regner det, blir jeg hjemme.","Hvis det regner, jeg hjemme blir."],a:1,
   w:"Mệnh đề phụ đứng đầu chiếm vị trí 1, nên mệnh đề chính phải đảo: động từ rồi mới tới chủ ngữ."},
  {vi:"Tôi biết bạn không thích cá.",
   o:["Jeg vet at du liker ikke fisk.","Jeg vet at ikke du liker fisk.",
      "Jeg vet at du ikke liker fisk.","Jeg vet du at ikke liker fisk."],a:2,
   w:"Cùng quy tắc: liên từ – chủ ngữ – ikke – động từ."},
  {vi:"Hồi tôi còn nhỏ, tôi sống ở Hà Nội.",
   o:["Når jeg var barn, bodde jeg i Hanoi.","Da jeg var barn, bodde jeg i Hanoi.",
      "Da jeg var barn, jeg bodde i Hanoi.","Når jeg var barn, jeg bodde i Hanoi."],a:1,
   w:"Một giai đoạn đã qua thì dùng da. Và mệnh đề chính vẫn phải đảo."},
  {vi:"Mai tôi sẽ đi Na Uy.",
   o:["Jeg vil reise til Norge i morgen.","Jeg skal reise til Norge i morgen.",
      "Jeg skal reiser til Norge i morgen.","Jeg skal å reise til Norge i morgen."],a:1,
   w:"vil nghĩa là muốn. Tương lai có kế hoạch thì dùng skal + nguyên thể trần."}
];
const DRILL_FORM = [
  {inf:"å spise",mean:"ăn",o:["spisde","spiste","spiset","spisdde"],a:1,w:"Gốc kết thúc bằng một phụ âm nên theo nhóm 2, đuôi -te."},
  {inf:"å snakke",mean:"nói chuyện",o:["snakkte","snakkde","snakket","snakkedde"],a:2,w:"Gốc kết thúc bằng hai phụ âm nên theo nhóm 1, đuôi -et."},
  {inf:"å bo",mean:"cư trú",o:["bote","bodde","boet","bode"],a:1,w:"Gốc là một nguyên âm có trọng âm nên theo nhóm 4, đuôi -dde."},
  {inf:"å drikke",mean:"uống",o:["drikket","drakk","drikte","drukk"],a:1,w:"Động từ mạnh, đổi nguyên âm và không thêm đuôi: drikke – drakk – drukket."},
  {inf:"å gå",mean:"đi bộ",o:["gådde","gikk","gått","gåde"],a:1,w:"Động từ mạnh. gikk là quá khứ, gått là dạng hoàn thành."},
  {inf:"å være",mean:"thì, là",o:["værte","var","vært","vardde"],a:1,w:"var là quá khứ, vært là dạng hoàn thành đi với har."},
  {inf:"å leve",mean:"sống",o:["levte","levde","levet","levdde"],a:1,w:"Gốc kết thúc bằng v nên theo nhóm 3, đuôi -de."},
  {inf:"å kjøpe",mean:"mua",o:["kjøpet","kjøpte","kjøpde","kjøpdde"],a:1,w:"Gốc kết thúc bằng một phụ âm, nhóm 2, đuôi -te."},
  {inf:"å si",mean:"nói rằng",o:["sidde","sa","site","sagte"],a:1,w:"Động từ mạnh: si – sa – sagt."},
  {inf:"å få",mean:"nhận được",o:["fådde","fikk","fått","fåte"],a:1,w:"Động từ mạnh: få – fikk – fått."}
];
const QUIZ = [
  {q:"Dạng quá khứ của <span class='no'>å snakke</span> là gì?",o:["snakkte","snakket","snakkede","snakk"],a:1,
   w:"Gốc kết thúc bằng hai phụ âm nên vào nhóm 1, đuôi -et. Dạng snakka cũng đúng."},
  {q:"Câu nào đúng?",
   o:["Jeg blir hjemme fordi jeg er ikke frisk.","Jeg blir hjemme fordi jeg ikke er frisk.",
      "Jeg blir hjemme fordi ikke jeg er frisk.","Jeg blir hjemme fordi er jeg ikke frisk."],a:1,
   w:"Mệnh đề phụ không theo V2. ikke đứng trước động từ."},
  {q:"<span class='no'>Jeg vil ha kaffe</span> nghĩa là gì?",
   o:["Tôi sẽ có cà phê","Tôi muốn cà phê","Tôi đã uống cà phê","Tôi phải uống cà phê"],a:1,
   w:"vil là muốn, không phải will. Đây là bẫy lớn nhất với người có nền tiếng Anh."},
  {q:"Chọn câu đúng cho ý 'Tôi từng ở Na Uy':",
   o:["Jeg var i Norge.","Jeg har vært i Norge.","Jeg er i Norge.","Jeg skal være i Norge."],a:1,
   w:"Nói kinh nghiệm mà không nêu thời điểm thì dùng thì hoàn thành."},
  {q:"Cách nào phổ biến nhất để nói về tương lai?",
   o:["kommer til å + nguyên thể","vil + nguyên thể","Dùng luôn thì hiện tại kèm cụm thời gian","skal ha + nguyên thể"],a:2,
   w:"Jeg reiser i morgen. Người Na Uy dùng thì hiện tại cho tương lai nhiều hơn hẳn."},
  {q:"Sau động từ khiếm khuyết thì động từ chính ở dạng nào?",
   o:["Nguyên thể có å","Nguyên thể không có å","Thì hiện tại","Thì quá khứ"],a:1,
   w:"Jeg kan snakke norsk. Không å, không chia."},
  {q:"Dạng quá khứ của <span class='no'>å kunne</span> là gì?",o:["kan","kunne","kunnet","kande"],a:1,
   w:"Với động từ khiếm khuyết, dạng quá khứ trùng với dạng nguyên thể."},
  {q:"Câu nào đúng cho 'Hồi tôi còn nhỏ'?",
   o:["Når jeg var barn","Da jeg var barn","Hvis jeg var barn","At jeg var barn"],a:1,
   w:"Một giai đoạn đã qua dùng da. når dùng cho việc lặp lại hoặc tương lai."},
  {q:"<span class='no'>Hvis det regner, ___ jeg hjemme.</span> Điền gì?",
   o:["jeg blir","blir","blir jeg","jeg er blir"],a:1,
   w:"Mệnh đề phụ đứng đầu chiếm vị trí 1, nên động từ blir phải theo ngay sau, rồi mới tới jeg."},
  {q:"Dạng hoàn thành của <span class='no'>å drikke</span> là gì?",o:["har drakk","har drikket","har drukket","har drikk"],a:2,
   w:"drikke – drakk – drukket. Giống hệt drink – drank – drunk trong tiếng Anh."}
];
  return { VERB, FIRE, GRUPPER, PPTAB, FORTIDORD, FRAM1, FRAM2, FRAM3, MODAL, MODALPAR, LEDDRADER, LEDDPAR, LEDDFORST, NARDA, IGAR, DRILL_ORDER, DRILL_FORM, QUIZ };
})();

/* =====================================================================
   PHẦN 7
   ===================================================================== */
NORSK.p7 = (function () {
/* ============ DỮ LIỆU ============ */
const PREDIKATIV = [
  ["Bilen er stor.","bí-lơn er stur","Chiếc xe thì to — bil là en"],
  ["Huset er stort.","húy-sơ er stut","Ngôi nhà thì to — hus là et"],
  ["Bilene er store.","bí-lơ-nơ er stú-rơ","Những chiếc xe thì to — số nhiều"],
  ["Boka er ny.","bú-ka er nuy","Quyển sách thì mới"],
  ["Eplet er rødt.","ép-lơ er rớt","Quả táo thì đỏ"],
  ["Barna er små.","bá-na er smô","Bọn trẻ thì nhỏ"]
];
const UNNTAK = [
  ["1","Kết thúc bằng <b>-ig</b>","et hyggelig hus|ngôi nhà dễ chịu · et viktig brev|lá thư quan trọng"],
  ["2","Kết thúc bằng <b>-sk</b> chỉ quốc tịch","et norsk hus|ngôi nhà kiểu Na Uy · et vietnamesisk ord|một từ tiếng Việt"],
  ["3","Đã kết thúc bằng <b>-t</b>","et lett spørsmål|câu hỏi dễ · et svart bord|cái bàn đen"],
  ["4","Kết thúc bằng <b>-e</b>","et moderne hus|ngôi nhà hiện đại · et spennende liv|cuộc sống hấp dẫn"]
];
const ENDRING = [
  ["Kết thúc bằng nguyên âm: thêm <b>-tt</b>","ny → nytt|mới · blå → blått|xanh dương"],
  ["Kết thúc bằng phụ âm đôi: bớt một chữ","grønn → grønt|xanh lá · tynn → tynt|mỏng"],
  ["Kết thúc bằng <b>-d</b>: đổi thành <b>-tt</b> hoặc <b>-dt</b>","god → godt|tốt · rød → rødt|đỏ"],
  ["<b>-el, -en, -er</b>: bỏ nguyên âm ở dạng -e","gammel → gamle|cũ · sulten → sultne|đói"]
];
const UREGADJ = [
  ["liten","lite","små","den lille","nhỏ (dạng ei là lita)",1],
  ["gammel","gammelt","gamle","den gamle","cũ, già",1],
  ["god","godt","gode","den gode","tốt",1],
  ["ny","nytt","nye","den nye","mới",1],
  ["blå","blått","blå","den blå","xanh dương",1],
  ["annen","annet","andre","den andre","khác",1],
  ["egen","eget","egne","den egne","riêng",1],
  ["stor","stort","store","den store","to",0],
  ["fin","fint","fine","den fine","đẹp, ổn",0],
  ["billig","billig","billige","den billige","rẻ",0]
];
const DOBBEL = [
  ["en (đực)","den store bilen","chiếc xe to đó"],
  ["ei (cái)","den nye boka","quyển sách mới đó"],
  ["et (trung)","det store huset","ngôi nhà to đó"],
  ["số nhiều","de store bilene","những chiếc xe to đó"]
];
const DOBBELPAR = [
  ["den stor bilen","den store bilen","Chiếc xe to đó — tính từ trong cụm xác định luôn có đuôi -e"],
  ["den store bil","den store bilen","Danh từ phải ở dạng xác định, không phải dạng gốc"],
  ["det store hus","det store huset","Trung tính dùng det, và danh từ vẫn phải xác định"]
];
const EIENDOM = [
  ["min store bil","min stú-rơ bil","chiếc xe to của tôi"],
  ["den store bilen min","đen stú-rơ bí-lơn min","chiếc xe to đó của tôi"],
  ["mitt nye hus","mit núy-ơ huys","ngôi nhà mới của tôi"],
  ["mine gamle bøker","mí-nơ gám-lơ bớ-kơr","những quyển sách cũ của tôi"]
];
const GRAD = [
  ["pen","penere","penest","đẹp"],
  ["billig","billigere","billigst","rẻ"],
  ["kald","kaldere","kaldest","lạnh"],
  ["rask","raskere","raskest","nhanh"],
  ["morsom","morsommere","morsomst","vui nhộn"],
  ["sterk","sterkere","sterkest","mạnh"]
];
const MERORD = [
  ["interessant – mer interessant – mest interessant","ín-tơ-rơ-sant","thú vị"],
  ["praktisk – mer praktisk – mest praktisk","prák-tisk","tiện dụng"],
  ["spennende – mer spennende – mest spennende","spén-nơn-nơ","hấp dẫn"]
];
const UREGKOMP = [
  ["god","bedre","best","tốt",1],
  ["dårlig","verre","verst","tệ",1],
  ["stor","større","størst","to",1],
  ["liten","mindre","minst","nhỏ",1],
  ["gammel","eldre","eldst","già, cũ",1],
  ["ung","yngre","yngst","trẻ",1],
  ["lang","lengre","lengst","dài",1],
  ["mange","flere","flest","nhiều (đếm được)",1],
  ["mye","mer","mest","nhiều (không đếm)",1],
  ["få","færre","færrest","ít",1]
];
const SAMMEN = [
  ["Bilen min er større enn bilen din.","bí-lơn min er stớr-rơ en bí-lơn đin","Xe tôi to hơn xe bạn"],
  ["Han er like gammel som meg.","han er lí-kơ gám-mơl som mây","Anh ấy bằng tuổi tôi"],
  ["Norsk er ikke så vanskelig som tysk.","nosk er ík-kơ sô váns-kơ-li som tuysk","Tiếng Na Uy không khó bằng tiếng Đức"],
  ["Dette er den beste boka.","đét-tơ er đen bés-tơ bú-ka","Đây là quyển sách hay nhất"],
  ["Hun er yngst i familien.","huyn er uyngst i fa-mí-li-ơn","Cô ấy nhỏ nhất nhà"],
  ["Det blir kaldere om vinteren.","đe blir kál-đơ-rơ om vín-tơ-rơn","Mùa đông trời lạnh hơn"]
];
const MOTSATT = [
  ["stor|stur|to","liten|lí-tơn|nhỏ"],
  ["ny|nuy|mới","gammel|gám-mơl|cũ"],
  ["god|gu|tốt","dårlig|đór-li|tệ"],
  ["lang|lang|dài","kort|kot|ngắn"],
  ["høy|hới|cao","lav|lav|thấp"],
  ["varm|varm|ấm","kald|kal|lạnh"],
  ["dyr|đuyr|đắt","billig|bíl-li|rẻ"],
  ["tung|tung|nặng","lett|let|nhẹ, dễ"],
  ["vanskelig|váns-kơ-li|khó","enkel|éng-kơl|đơn giản"],
  ["rask|rask|nhanh","sakte|sák-tơ|chậm"],
  ["ren|rên|sạch","skitten|shít-tơn|bẩn"],
  ["glad|gla|vui","lei seg|lây sây|buồn"],
  ["frisk|frisk|khoẻ","syk|suyk|ốm"],
  ["sulten|súyl-tơn|đói","mett|met|no"],
  ["morsom|mó-som|vui nhộn","kjedelig|khê-đơ-li|chán"],
  ["snill|snil|tốt bụng","slem|slem|xấu tính"],
  ["sterk|stæk|mạnh","svak|svak|yếu"],
  ["pen|pên|đẹp","stygg|stuyg|xấu"],
  ["ung|ung|trẻ","gammel|gám-mơl|già"],
  ["våken|vó-kơn|tỉnh táo","trøtt|trớt|buồn ngủ"]
];
const FARGER = [
  ["rød","rødt","røde","đỏ",1],
  ["blå","blått","blå","xanh dương",1],
  ["grønn","grønt","grønne","xanh lá",1],
  ["gul","gult","gule","vàng",0],
  ["hvit","hvitt","hvite","trắng",1],
  ["svart","svart","svarte","đen",1],
  ["brun","brunt","brune","nâu",0],
  ["grå","grått","grå","xám",1],
  ["rosa","rosa","rosa","hồng — không đổi",1]
];
const PREP = [
  ["i","i","trong, ở trong"],
  ["på","pô","trên, ở tại"],
  ["under","uyn-nơr","dưới"],
  ["over","ố-vơr","phía trên"],
  ["ved","ve","cạnh, gần"],
  ["ved siden av","ve sí-đơn av","bên cạnh"],
  ["mellom","mél-lom","giữa hai thứ"],
  ["bak","bak","phía sau"],
  ["foran","fó-ran","phía trước"],
  ["til","til","đến, tới"],
  ["fra","fra","từ"],
  ["gjennom","yén-nom","xuyên qua"],
  ["hos","hus","ở chỗ của ai đó"],
  ["med","me","với, cùng"],
  ["uten","úy-tơn","không có"],
  ["mot","mut","về phía"]
];
const BEVEGELSE = [
  ["Jeg er på skolen.|yây er pô skú-lơn|Tôi đang ở trường","Jeg går til skolen.|yây gôr til skú-lơn|Tôi đi tới trường"],
  ["Jeg er hjemme.|yây er yém-mơ|Tôi đang ở nhà","Jeg går hjem.|yây gôr yem|Tôi đi về nhà"],
  ["Hun er ute.|huyn er úy-tơ|Cô ấy ở bên ngoài","Hun går ut.|huyn gôr uyt|Cô ấy đi ra ngoài"],
  ["Vi er inne.|vi er ín-nơ|Chúng tôi ở trong nhà","Vi går inn.|vi gôr in|Chúng tôi đi vào trong"]
];
const IPA = [
  ["i Norge","i nor-ghơ","ở Na Uy"],["i Oslo","i ós-lu","ở Oslo"],
  ["i Vietnam","i vi-et-nam","ở Việt Nam"],["på Island","pô ís-lan","ở Iceland — đảo dùng på"],
  ["på Hamar","pô há-mar","ở Hamar — một số thị trấn dùng på"],
  ["i byen","i búy-ơn","trong thành phố"],["på landet","pô lán-nơ","ở nông thôn"],
  ["på jobb","pô yob","ở chỗ làm"],["på skolen","pô skú-lơn","ở trường"],
  ["på kino","pô khí-nu","ở rạp phim"],["i butikken","i buy-tík-kơn","trong cửa hàng"],
  ["i banken","i báng-kơn","trong ngân hàng"],["på hotellet","pô hu-tél-lơ","ở khách sạn"],
  ["i parken","i pár-kơn","trong công viên"]
];
const DRILL_FORM = [
  {n:"et ___ hus",adj:"stor",o:["stor","stort","store","storen"],a:1,w:"hus là trung tính nên tính từ thêm -t."},
  {n:"ei ___ bok",adj:"ny",o:["ny","nytt","nye","nyt"],a:0,w:"Giống cái dùng dạng gốc, không thêm gì."},
  {n:"___ biler",adj:"stor",o:["stor","stort","store","størst"],a:2,w:"Số nhiều luôn thêm -e."},
  {n:"et ___ hus",adj:"norsk",o:["norsk","norskt","norske","norsket"],a:0,w:"Tính từ -sk chỉ quốc tịch không thêm -t."},
  {n:"et ___ hus",adj:"hyggelig",o:["hyggelig","hyggeligt","hyggelige","hyggeligst"],a:0,w:"Tính từ kết thúc -ig không thêm -t."},
  {n:"den ___ bilen",adj:"stor",o:["stor","stort","store","størst"],a:2,w:"Trong cụm xác định kép, tính từ luôn có đuôi -e."},
  {n:"et ___ eple",adj:"rød",o:["rød","rødt","røde","rødet"],a:1,w:"Đuôi -d đổi thành -dt với danh từ trung tính."},
  {n:"et ___ hus",adj:"blå",o:["blå","blåt","blått","blåe"],a:2,w:"Tính từ kết thúc bằng nguyên âm thêm hẳn -tt."},
  {n:"de ___ husene",adj:"gammel",o:["gammel","gammelt","gammele","gamle"],a:3,w:"gammel bỏ nguyên âm ở dạng -e, thành gamle."},
  {n:"et ___ barn",adj:"liten",o:["liten","litet","lite","lille"],a:2,w:"liten có dạng riêng cho trung tính là lite."}
];
const DRILL_KOMP = [
  {base:"god",ask:"Bậc so sánh hơn",o:["godere","bedre","gode","bedst"],a:1,w:"Bất quy tắc: god – bedre – best."},
  {base:"stor",ask:"Bậc so sánh hơn",o:["storere","større","store","størst"],a:1,w:"Bất quy tắc: stor – større – størst."},
  {base:"gammel",ask:"Bậc so sánh hơn",o:["gammelere","eldre","gamlere","eldst"],a:1,w:"Bất quy tắc: gammel – eldre – eldst."},
  {base:"billig",ask:"Bậc so sánh hơn",o:["billigere","billigst","mer billig","billige"],a:0,w:"Theo quy tắc: thêm -ere."},
  {base:"liten",ask:"Bậc so sánh nhất",o:["litest","minst","mindre","lillest"],a:1,w:"Bất quy tắc: liten – mindre – minst."},
  {base:"interessant",ask:"Bậc so sánh hơn",o:["interessantere","mer interessant","interessanter","interessantest"],a:1,w:"Tính từ dài dùng mer thay vì thêm đuôi."}
];
const QUIZ = [
  {q:"<span class='no'>et ___ hus</span> với tính từ <span class='no'>stor</span>:",o:["stor","stort","store","større"],a:1,
   w:"Danh từ trung tính thì tính từ thêm -t."},
  {q:"Câu nào đúng cho 'chiếc xe to đó'?",
   o:["den stor bilen","den store bil","den store bilen","store bilen"],a:2,
   w:"Xác định kép: den + tính từ đuôi -e + danh từ dạng xác định."},
  {q:"<span class='no'>et ___ hus</span> với tính từ <span class='no'>hyggelig</span>:",
   o:["hyggeligt","hyggelig","hyggelige","hyggeligst"],a:1,
   w:"Tính từ kết thúc bằng -ig không thêm -t. Nhóm này rất lớn."},
  {q:"Bậc so sánh hơn của <span class='no'>god</span> là gì?",o:["godere","bedre","best","mer god"],a:1,
   w:"Bất quy tắc, giống good – better – best trong tiếng Anh."},
  {q:"Bậc so sánh hơn của <span class='no'>stor</span> là gì?",o:["storere","større","størst","mer stor"],a:1,
   w:"stor – større – størst. Chỗ này tiếng Anh theo quy tắc còn tiếng Na Uy thì không."},
  {q:"Trong tiếng Na Uy, 'hơn' trong câu so sánh là từ nào?",o:["som","enn","mer","av"],a:1,
   w:"Han er større enn meg. Còn like … som dùng để nói bằng nhau."},
  {q:"<span class='no'>et ___ eple</span> với tính từ <span class='no'>rød</span>:",o:["rød","rødt","røde","rødet"],a:1,
   w:"Đuôi -d chuyển thành -dt khi đi với danh từ trung tính."},
  {q:"Câu nào đúng cho 'Tôi đi về nhà'?",o:["Jeg går hjemme.","Jeg går hjem.","Jeg er hjem.","Jeg går til hjemme."],a:1,
   w:"hjem là hướng đi, hjemme là vị trí. Dạng ngắn chỉ chuyển động."},
  {q:"Dạng trung tính của <span class='no'>liten</span> là gì?",o:["litet","liten","lite","lille"],a:2,
   w:"liten có năm dạng: liten, lita, lite, små, lille. Đây là tính từ bất quy tắc nhất."},
  {q:"Vì sao là <span class='no'>i Norge</span> nhưng <span class='no'>på Island</span>?",
   o:["Vì Island không thuộc Bắc Âu","Vì đảo dùng på, không có lý do sâu xa hơn","Vì Island là giống trung tính","Vì cả hai đều sai"],a:1,
   w:"Không có quy tắc suy ra được. Đảo và một số thị trấn trong đất liền dùng på, phải học thuộc."}
];
  return { PREDIKATIV, UNNTAK, ENDRING, UREGADJ, DOBBEL, DOBBELPAR, EIENDOM, GRAD, MERORD, UREGKOMP, SAMMEN, MOTSATT, FARGER, PREP, BEVEGELSE, IPA, DRILL_FORM, DRILL_KOMP, QUIZ };
})();

/* =====================================================================
   PHẦN 8
   ===================================================================== */
NORSK.p8 = (function () {
/* ============ DỮ LIỆU ============ */
const REDNING = [
  ["Unnskyld, kan du hjelpe meg?","uyn-shuyl, kan đuy yél-pơ mây","Xin lỗi, bạn giúp tôi được không?"],
  ["Jeg forstår ikke.","yây fo-stór ík-kơ","Tôi không hiểu"],
  ["Kan du snakke saktere?","kan đuy snák-kơ sák-tơ-rơ","Bạn nói chậm lại được không?"],
  ["Kan du gjenta det?","kan đuy yen-ta đe","Bạn nhắc lại được không?"],
  ["Hva betyr det?","va bơ-tuyr đe","Cái đó nghĩa là gì?"],
  ["Jeg snakker litt norsk.","yây snák-kơr lit nosk","Tôi nói được chút tiếng Na Uy"],
  ["Hvordan sier man … på norsk?","vur-đan sí-ơr man … pô nosk","Cái … nói tiếng Na Uy thế nào?"],
  ["Kan du skrive det ned?","kan đuy skrí-vơ đe nêd","Bạn viết ra được không?"],
  ["Kan du snakke engelsk?","kan đuy snák-kơ éng-ơlsk","Bạn nói tiếng Anh được không?"],
  ["Beklager, jeg lærer fortsatt.","bơ-klá-gơr, yây le-rơr fót-sat","Xin lỗi, tôi vẫn đang học"]
];
const BUTIKK = [
  ["Hva koster det?","va kós-tơr đe","Cái này giá bao nhiêu?"],
  ["Har dere brød?","har đê-rơ brơ","Các bạn có bánh mì không?"],
  ["Jeg leter etter melk.","yây lê-tơr ét-tơr melk","Tôi đang tìm sữa"],
  ["Hvor finner jeg kaffe?","vur fín-nơr yây káf-fơ","Cà phê ở chỗ nào?"],
  ["Jeg tar denne.","yây tar đén-nơ","Tôi lấy cái này"],
  ["Det er alt, takk.","đe er alt, tak","Vậy thôi, cảm ơn"],
  ["Kan jeg betale med kort?","kan yây bơ-tá-lơ me kot","Tôi trả bằng thẻ được không?"],
  ["Skal du ha pose?","skal đuy ha pú-sơ","Bạn cần túi không? — câu nhân viên hỏi"],
  ["Ja takk. / Nei takk.","ya tak / nây tak","Có ạ. / Không ạ."],
  ["Kan jeg få kvittering?","kan yây fô kvit-tê-ring","Cho tôi xin hoá đơn?"],
  ["Er det noe mer?","er đe nu-ơ mêr","Còn gì nữa không? — câu nhân viên hỏi"],
  ["Har dere dette i en større størrelse?","har đê-rơ đét-tơ i ên stớr-rơ stơr-rél-sơ","Cái này có cỡ lớn hơn không?"]
];
const MAT = [
  ["et brød","brơ","ổ bánh mì"],["ei melk","melk","sữa"],["en ost","ust","phô mai"],
  ["et smør","smơr","bơ"],["et egg","eg","quả trứng"],["et kjøtt","khớt","thịt"],
  ["en fisk","fisk","cá"],["en kylling","khýl-ling","thịt gà"],["ei suppe","súp-pơ","súp"],
  ["grønnsaker","grơn-sá-kơr","rau củ"],["frukt","fruykt","trái cây"],["et eple","ép-lơ","quả táo"],
  ["en potet","pu-têt","củ khoai tây"],["ris","ris","gạo, cơm"],["ei kake","ká-kơ","bánh ngọt"],
  ["en kaffe","káf-fơ","cà phê"],["en te","tê","trà"],["et vann","van","nước"],
  ["en juice","yús","nước ép"],["et øl","ơl","bia"]
];
const KAFE = [
  ["Et bord for to, takk.","ê bur fo tu, tak","Cho bàn hai người"],
  ["Er det ledig her?","er đe lê-đi her","Chỗ này trống chứ?"],
  ["Kan jeg få menyen?","kan yây fô me-núy-ơn","Cho tôi xem thực đơn?"],
  ["Jeg vil gjerne ha en kaffe.","yây vil yer-nơ ha ên káf-fơ","Tôi muốn một cà phê"],
  ["Hva anbefaler du?","va án-bơ-fa-lơr đuy","Bạn gợi ý món gì?"],
  ["Har dere noe uten kjøtt?","har đê-rơ nu-ơ úy-tơn khớt","Có món nào không có thịt không?"],
  ["Noe å drikke?","nu-ơ ô đrík-kơ","Uống gì không ạ? — câu phục vụ hỏi"],
  ["Det smakte veldig godt.","đe smák-tơ vél-đi got","Ngon lắm"],
  ["Kan jeg få regningen?","kan yây fô rấy-ning-ơn","Cho tôi xin hoá đơn thanh toán?"],
  ["Vi betaler hver for oss.","vi bơ-tá-lơr ver fo os","Chúng tôi trả riêng"]
];
const TRANSPORT = [
  ["en buss","buys","xe buýt"],["et tog","tôg","tàu hoả"],["en trikk","trik","tàu điện"],
  ["en T-bane","tê-bá-nơ","tàu điện ngầm"],["en taxi","ták-si","taxi"],
  ["en billett","bi-lét","vé"],["en holdeplass","hól-lơ-plas","trạm dừng"],
  ["en stasjon","sta-sún","nhà ga"],["en flyplass","flúy-plas","sân bay"],
  ["et spor","spur","đường ray, sân ga số"],["sentrum","sén-truym","trung tâm"],
  ["en avgang","áv-gang","chuyến khởi hành"]
];
const TRANSPORTFRASER = [
  ["Når går bussen til sentrum?","nôr gôr búys-sơn til sén-truym","Mấy giờ có xe buýt vào trung tâm?"],
  ["Går denne bussen til Majorstuen?","gôr đén-nơ búys-sơn til ma-yó-stuy-ơn","Xe này có đi Majorstuen không?"],
  ["Én billett til Bergen, takk.","ên bi-lét til bær-ghơn, tak","Cho một vé đi Bergen"],
  ["Hvor lenge tar det?","vur léng-ơ tar đe","Mất bao lâu?"],
  ["Hvilket spor går toget fra?","víl-kơt spur gôr tó-ghơ fra","Tàu chạy từ sân ga số mấy?"],
  ["Toget er forsinket.","tó-ghơ er fo-síng-kơt","Tàu bị trễ"],
  ["Må jeg bytte?","mô yây být-tơ","Tôi có phải đổi chuyến không?"],
  ["Neste holdeplass, takk.","nés-tơ hól-lơ-plas, tak","Cho xuống trạm kế tiếp"]
];
const VEI = [
  ["Unnskyld, hvor er stasjonen?","uyn-shuyl, vur er sta-sú-nơn","Xin lỗi, nhà ga ở đâu?"],
  ["Hvordan kommer jeg til sentrum?","vur-đan kóm-mơr yây til sén-truym","Làm sao tôi tới trung tâm?"],
  ["Er det langt herfra?","er đe langt her-fra","Có xa đây không?"],
  ["Jeg har gått meg bort.","yây har got mây bot","Tôi bị lạc"],
  ["Kan du vise meg på kartet?","kan đuy ví-sơ mây pô kár-tơ","Chỉ giúp tôi trên bản đồ được không?"],
  ["Det er ti minutters gange.","đe er ti mi-nút-tơs gáng-ơ","Đi bộ mười phút"],
  ["Det er like ved.","đe er lí-kơ ve","Ngay gần đây thôi"],
  ["Ta første gate til høyre.","ta fớs-tơ gá-tơ til hới-rơ","Rẽ phải ở phố đầu tiên"]
];
const RETNINGER = [
  ["til høyre","til hới-rơ","bên phải"],["til venstre","til véns-trơ","bên trái"],
  ["rett fram","ret fram","thẳng phía trước"],["tilbake","til-bá-kơ","quay lại"],
  ["over gata","ố-vơr gá-ta","qua đường"],["forbi","fo-bí","đi qua khỏi"],
  ["ved siden av","ve sí-đơn av","bên cạnh"],["på hjørnet","pô yớ-nơ","ở góc phố"]
];
const TIMEORD = [
  ["Jeg vil gjerne bestille time.","yây vil yer-nơ bơ-stíl-lơ tí-mơ","Tôi muốn đặt lịch hẹn"],
  ["Har dere ledig time på fredag?","har đê-rơ lê-đi tí-mơ pô frê-đag","Thứ sáu còn lịch trống không?"],
  ["Passer klokka to?","pás-sơr klók-ka tu","Hai giờ được không?"],
  ["Det passer bra.","đe pás-sơr bra","Vậy được ạ"],
  ["Det passer dessverre ikke.","đe pás-sơr đes-vér-rơ ík-kơ","Tiếc là không tiện"],
  ["Jeg må avbestille timen min.","yây mô áv-bơ-stil-lơ tí-mơn min","Tôi phải huỷ lịch hẹn"],
  ["Kan jeg flytte timen?","kan yây flýt-tơ tí-mơn","Tôi đổi lịch được không?"],
  ["Hva heter du?","va hê-tơr đuy","Tên bạn là gì? — câu lễ tân hỏi"]
];
const LEGE = [
  ["Jeg føler meg ikke bra.","yây fớ-lơr mây ík-kơ bra","Tôi thấy không khoẻ"],
  ["Jeg har vondt i hodet.","yây har vunt i hú-đơ","Tôi đau đầu"],
  ["Jeg har vondt i magen.","yây har vunt i má-ghơn","Tôi đau bụng"],
  ["Jeg har feber.","yây har fê-bơr","Tôi bị sốt"],
  ["Jeg er forkjølet.","yây er fo-khớ-lơt","Tôi bị cảm lạnh"],
  ["Hvor lenge har du hatt det?","vur léng-ơ har đuy hat đe","Bạn bị bao lâu rồi? — câu bác sĩ hỏi"],
  ["Jeg trenger en resept.","yây tréng-ơr ên rơ-sépt","Tôi cần đơn thuốc"],
  ["Hvor er nærmeste apotek?","vur er ner-mơs-tơ a-pu-têk","Hiệu thuốc gần nhất ở đâu?"]
];
const KROPP = [
  ["et hode","hú-đơ","cái đầu"],["en mage","má-ghơ","bụng"],["en hals","hals","cổ họng"],
  ["ei tann","tan","cái răng"],["en rygg","ruyg","lưng"],["et bein","bây-n","chân"],
  ["en arm","arm","cánh tay"],["et øre","ớ-rơ","tai"]
];
const NOD = [
  ["Hjelp!","yelp","Cứu!"],
  ["Jeg trenger hjelp.","yây tréng-ơr yelp","Tôi cần giúp đỡ"],
  ["Ring etter ambulanse!","ring ét-tơr am-buy-láng-sơ","Gọi xe cấp cứu!"],
  ["Det har skjedd en ulykke.","đe har shed ên úy-lúyk-kơ","Có tai nạn"],
  ["Jeg har mistet lommeboka mi.","yây har mís-tơt lóm-mơ-bú-ka mi","Tôi mất ví"],
  ["Kan du ringe politiet?","kan đuy ríng-ơ pu-li-tí-ơ","Bạn gọi cảnh sát được không?"]
];
const DIAL1 = [
  ["A","Unnskyld, hvor finner jeg brød?","uyn-shuyl, vur fín-nơr yây brơ","Xin lỗi, bánh mì ở đâu ạ?","you"],
  ["B","Det er i gang tre, ved siden av melka.","đe er i gang trê, ve sí-đơn av mél-ka","Ở lối ba, cạnh chỗ sữa.","them"],
  ["A","Tusen takk!","tuy-sơn tak","Cảm ơn nhiều!","you"],
  ["B","Er det noe mer?","er đe nu-ơ mêr","Còn gì nữa không ạ?","them"],
  ["A","Nei, det er alt. Kan jeg betale med kort?","nây, đe er alt. kan yây bơ-tá-lơ me kot","Không, vậy thôi. Tôi trả thẻ được chứ?","you"],
  ["B","Ja. Skal du ha pose?","ya. skal đuy ha pú-sơ","Được. Bạn cần túi không?","them"],
  ["A","Ja takk, én pose.","ya tak, ên pú-sơ","Có ạ, một túi.","you"]
];
const DIAL2 = [
  ["B","Hei! Hva kan jeg hjelpe deg med?","hây! va kan yây yél-pơ đây me","Chào! Bạn dùng gì ạ?","them"],
  ["A","Hei. Jeg vil gjerne ha en kaffe, takk.","hây. yây vil yer-nơ ha ên káf-fơ, tak","Chào. Cho tôi một cà phê.","you"],
  ["B","Stor eller liten?","stur él-lơr lí-tơn","Cỡ lớn hay nhỏ?","them"],
  ["A","Stor, takk. Og har dere noe uten kjøtt?","stur, tak. o har đê-rơ nu-ơ úy-tơn khớt","Cỡ lớn. Và có món nào không thịt không?","you"],
  ["B","Ja, vi har ostesmørbrød og en grønnsakssuppe.","ya, vi har ós-tơ-smơr-brơ o ên grơn-saks-súp-pơ","Có, bánh mì phô mai và súp rau.","them"],
  ["A","Da tar jeg suppa. Hva koster det til sammen?","đa tar yây súp-pa. va kós-tơr đe til sám-mơn","Vậy tôi lấy súp. Tổng bao nhiêu ạ?","you"],
  ["B","Hundre og nitti kroner.","húnd-rơ o nít-ti krú-nơr","190 kroner.","them"]
];
const DIAL3 = [
  ["A","Unnskyld, kan du hjelpe meg? Jeg har gått meg bort.","uyn-shuyl, kan đuy yél-pơ mây? yây har got mây bot","Xin lỗi, giúp tôi được không? Tôi bị lạc.","you"],
  ["B","Selvfølgelig. Hvor skal du?","sel-fớl-gơ-li. vur skal đuy","Tất nhiên rồi. Bạn đi đâu?","them"],
  ["A","Jeg skal til stasjonen. Er det langt herfra?","yây skal til sta-sú-nơn. er đe langt her-fra","Tôi đi nhà ga. Có xa đây không?","you"],
  ["B","Nei, det er like ved. Gå rett fram, så ta første gate til høyre.","nây, đe er lí-kơ ve. gô ret fram, sô ta fớs-tơ gá-tơ til hới-rơ","Không, gần thôi. Đi thẳng rồi rẽ phải ở phố đầu tiên.","them"],
  ["A","Rett fram og så til høyre. Hvor lenge tar det?","ret fram o sô til hới-rơ. vur léng-ơ tar đe","Thẳng rồi rẽ phải. Mất bao lâu ạ?","you"],
  ["B","Omtrent fem minutter til fots.","om-trént fem mi-nút-tơr til futs","Khoảng năm phút đi bộ.","them"],
  ["A","Tusen takk for hjelpen!","tuy-sơn tak fo yél-pơn","Cảm ơn bạn nhiều!","you"]
];
const DIAL4 = [
  ["B","Legekontoret, god morgen.","lê-ghơ-kun-tú-rơ, gu mór-ơn","Phòng khám xin nghe, chào buổi sáng.","them"],
  ["A","God morgen. Jeg vil gjerne bestille time.","gu mór-ơn. yây vil yer-nơ bơ-stíl-lơ tí-mơ","Chào buổi sáng. Tôi muốn đặt lịch hẹn.","you"],
  ["B","Ja. Hva heter du?","ya. va hê-tơr đuy","Vâng. Tên bạn là gì ạ?","them"],
  ["A","Jeg heter Duy Nguyen.","yây hê-tơr đuy nguy-en","Tôi tên Duy Nguyễn.","you"],
  ["B","Takk. Har du time på torsdag klokka halv tre?","tak. har đuy tí-mơ pô tós-đag klók-ka hal trê","Cảm ơn. Thứ năm hai giờ rưỡi được không?","them"],
  ["A","Halv tre, altså klokka to tretti? Det passer bra.","hal trê, ált-sô klók-ka tu trét-ti? đe pás-sơr bra","Hai rưỡi, tức là 2:30 phải không? Được ạ.","you"],
  ["B","Flott. Vi ses på torsdag.","flot. vi sês pô tós-đag","Tốt. Hẹn gặp thứ năm.","them"]
];
const DRILL = [
  {s:"Nhân viên thu ngân hỏi bạn <b>Skal du ha pose?</b> Bạn muốn một cái túi.",
   o:["Ja takk.","Nei takk.","Unnskyld.","Vær så god."],a:0,
   w:"Ja takk là câu đồng ý lịch sự. Nei takk là từ chối."},
  {s:"Bạn nghe không kịp, muốn người ta nói chậm lại.",
   o:["Kan du gjenta det?","Kan du snakke saktere?","Hva betyr det?","Jeg forstår ikke."],a:1,
   w:"saktere = chậm hơn. gjenta là nhắc lại, còn betyr là hỏi nghĩa."},
  {s:"Bạn muốn hỏi giá một món đồ.",
   o:["Hva heter det?","Hvor er det?","Hva koster det?","Når er det?"],a:2,
   w:"koste = trị giá. Hva koster det? là câu bạn sẽ dùng nhiều nhất khi mua sắm."},
  {s:"Bạn ăn xong ở quán và muốn thanh toán.",
   o:["Kan jeg få menyen?","Kan jeg få regningen?","Kan jeg få kvittering?","Er det ledig?"],a:1,
   w:"regningen là hoá đơn thanh toán. kvittering là biên lai sau khi đã trả."},
  {s:"Bạn muốn biết xe buýt này có đi trung tâm không.",
   o:["Hvor er bussen?","Går denne bussen til sentrum?","Når går bussen?","Er bussen forsinket?"],a:1,
   w:"Câu hỏi có/không nên đưa động từ går lên đầu."},
  {s:"Bạn bị lạc và cần nhờ người qua đường.",
   o:["Jeg har gått meg bort.","Jeg forstår ikke.","Jeg er forkjølet.","Det er like ved."],a:0,
   w:"å gå seg bort = bị lạc đường. Đây là cụm cố định, học nguyên khối."},
  {s:"Người ta chỉ đường: <b>Ta første gate til venstre.</b> Bạn phải làm gì?",
   o:["Rẽ phải ở phố đầu tiên","Rẽ trái ở phố đầu tiên","Đi thẳng qua phố đầu tiên","Quay lại phố trước"],a:1,
   w:"venstre = trái, høyre = phải. Cặp này rất dễ nhầm, học kỹ."},
  {s:"Lễ tân phòng khám hỏi thứ năm lúc <b>halv tre</b> được không. Đó là mấy giờ?",
   o:["3:30","2:30","3:00","2:00"],a:1,
   w:"halv tính hướng tới giờ sau — nhắc lại từ phần 5."},
  {s:"Bạn muốn nói mình đau đầu.",
   o:["Jeg har feber.","Jeg er forkjølet.","Jeg har vondt i hodet.","Jeg føler meg ikke bra."],a:2,
   w:"Cấu trúc ha vondt i + bộ phận cơ thể = đau ở chỗ nào đó."},
  {s:"Bạn muốn huỷ cuộc hẹn đã đặt.",
   o:["Jeg vil gjerne bestille time.","Jeg må avbestille timen min.","Kan jeg flytte timen?","Det passer bra."],a:1,
   w:"avbestille là huỷ, flytte là dời sang lúc khác. Hai việc khác nhau."},
  {s:"Bạn vào quán, muốn hỏi chỗ này có trống không.",
   o:["Er det ledig her?","Er det langt herfra?","Hva anbefaler du?","Det smakte godt."],a:0,
   w:"ledig = trống, còn chỗ. Cũng dùng khi hỏi lịch hẹn còn trống."},
  {s:"Bạn muốn hỏi một từ tiếng Việt nói bằng tiếng Na Uy thế nào.",
   o:["Hva betyr det?","Hvordan sier man det på norsk?","Kan du skrive det ned?","Jeg snakker litt norsk."],a:1,
   w:"betyr hỏi nghĩa của từ tiếng Na Uy. Câu này hỏi ngược lại — cách nói một khái niệm."}
];
const QUIZ = [
  {q:"<b>Skal du ha pose?</b> nghĩa là gì?",
   o:["Bạn có thẻ không?","Bạn cần túi không?","Bạn trả tiền mặt chứ?","Bạn còn gì nữa không?"],a:1,
   w:"Câu này bạn sẽ nghe ở mọi quầy thu ngân. Túi có tính tiền."},
  {q:"Bạn muốn xin hoá đơn thanh toán ở nhà hàng. Nói gì?",
   o:["Kan jeg få menyen?","Kan jeg få regningen?","Kan jeg få pose?","Kan jeg få time?"],a:1,
   w:"regningen là hoá đơn thanh toán, menyen là thực đơn."},
  {q:"<span class='no'>en time</span> có mấy nghĩa?",
   o:["Chỉ nghĩa một tiếng đồng hồ","Chỉ nghĩa cuộc hẹn","Cả hai: một tiếng và một cuộc hẹn","Chỉ nghĩa buổi học"],a:2,
   w:"Jeg har time klokka to = tôi có hẹn lúc hai giờ. Ngữ cảnh phân biệt."},
  {q:"<span class='no'>til venstre</span> nghĩa là gì?",o:["bên phải","bên trái","thẳng phía trước","quay lại"],a:1,
   w:"venstre trái, høyre phải. Nhầm hai từ này là đi ngược hướng."},
  {q:"Chủ nhật ở Na Uy, siêu thị lớn thế nào?",
   o:["Mở cả ngày như thường","Đóng cửa theo luật","Mở muộn hơn ngày thường","Chỉ mở buổi sáng"],a:1,
   w:"Chỉ vài cửa hàng nhỏ như Bunnpris hay Joker được mở. Người ta đi chợ thứ bảy."},
  {q:"Ở hiệu thuốc hay bưu điện Na Uy, việc đầu tiên bạn phải làm là gì?",
   o:["Xếp hàng","Lấy số thứ tự","Gọi nhân viên","Đăng ký ở quầy"],a:1,
   w:"Gọi là kølapp. Không có hàng người đứng, chỉ có số."},
  {q:"Số điện thoại cấp cứu y tế ở Na Uy là số nào?",o:["110","112","113","115"],a:2,
   w:"110 cứu hoả, 112 cảnh sát, 113 cấp cứu y tế."},
  {q:"Câu nào dùng để nói 'tôi đau bụng'?",
   o:["Jeg har feber.","Jeg har vondt i magen.","Jeg er forkjølet.","Jeg føler meg ikke bra."],a:1,
   w:"Cấu trúc: ha vondt i + bộ phận cơ thể."},
  {q:"Ở quán ăn Na Uy bình thường, tiền boa thế nào?",
   o:["Bắt buộc 10%","Bắt buộc 15%","Không cần, giá đã gồm phục vụ","Luôn phải đưa tiền mặt"],a:2,
   w:"Ở nhà hàng sang thì làm tròn số lên là đủ lịch sự."},
  {q:"Bạn muốn đổi cuộc hẹn sang ngày khác, không phải huỷ. Nói gì?",
   o:["Jeg må avbestille timen.","Kan jeg flytte timen?","Jeg vil bestille time.","Det passer bra."],a:1,
   w:"flytte = dời chỗ, dời lịch. avbestille là huỷ hẳn."}
];
const RECAP = [
  ["Phần 1","Phát âm","29 chữ cái, 9 nguyên âm, tổ hợp phụ âm, chữ câm, thanh điệu","#p1"],
  ["Phần 2","Chào hỏi &amp; số","Xưng hô, tự giới thiệu, số 0–100, bẫy -ten và -ti","#p2"],
  ["Phần 3","Danh từ","Ba giống, bốn dạng, mạo từ dính đuôi, số nhiều bất quy tắc","#p3"],
  ["Phần 4","Động từ &amp; V2","Thì hiện tại, quy tắc V2, vị trí ikke, cách đặt câu hỏi","#p4"],
  ["Phần 5","Đời sống","Sở hữu, gia đình, nhà cửa, xem giờ với halv","#p5"],
  ["Phần 6","Trục thời gian","Quá khứ, hoàn thành, tương lai, khiếm khuyết, mệnh đề phụ","#p6"],
  ["Phần 7","Tính từ","Ba dạng, xác định kép, so sánh, giới từ nơi chốn","#p7"],
  ["Phần 8","Thực hành","Mua sắm, quán ăn, đi lại, hỏi đường, đặt lịch hẹn","#p8"]
];
  return { REDNING, BUTIKK, MAT, KAFE, TRANSPORT, TRANSPORTFRASER, VEI, RETNINGER, TIMEORD, LEGE, KROPP, NOD, DIAL1, DIAL2, DIAL3, DIAL4, DRILL, QUIZ, RECAP };
})();

/* =====================================================================
   3. BỘ THẺ SRS — dựng tự động từ dữ liệu 8 phần
   Mỗi thẻ: id · part · f (mặt trước) · s (chuỗi máy đọc) · d (đáp án chép chính tả)
            p (phiên âm) · m (nghĩa) · x (dạng thêm) · tag
   ===================================================================== */
NORSK.cards = (function () {
  const out = [], seen = new Set();
  const strip = s => s.replace(/^(en|ei|et|å) /, "");
  function add(part, f, s, p, m, x, tag, d) {
    const id = part + ":" + f.toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(id)) return;
    seen.add(id);
    out.push({ id, part, f, s: s || f, d: d || s || f, p: p || "", m: m || "", x: x || "", tag: tag || "" });
  }
  const P1 = NORSK.p1, P2 = NORSK.p2, P3 = NORSK.p3, P4 = NORSK.p4, P5 = NORSK.p5, P6 = NORSK.p6, P7 = NORSK.p7, P8 = NORSK.p8;

  P1.ORD.forEach(([n, v, m]) => add("p1", n, n, v, m, "", "từ"));

  [...P2.HILS1, ...P2.HILS2, ...P2.HILS3, ...P2.OMEG].forEach(([n, v, m]) => add("p2", n, n, v, m, "", "cụm"));
  [...P2.TALL1, ...P2.TALL2.slice(2), ...P2.TALL3].forEach(([n, o, v]) => add("p2", o, o, v, "số " + n, "", "số"));

  P3.N.forEach(([g, s, ds, pl, dpl, mean]) => add("p3", P3.ART[g] + " " + s, `${s}, ${ds}, ${pl}, ${dpl}`, "", mean, `${ds} · ${pl} · ${dpl}`, "", s));
  P3.UREG.forEach(([g, s, ds, pl, dpl, mean]) => add("p3", P3.ART[g] + " " + s, `${s}, ${ds}, ${pl}, ${dpl}`, "", mean, `${ds} · ${pl} · ${dpl}`, "bất quy tắc", s));

  P4.VERB.forEach(([inf, pres, ph, mean, irr]) => add("p4", inf, pres, ph, mean, "→ " + pres, irr ? "bất quy tắc" : "", pres));

  P5.FAMILIE.forEach(([n, v, m]) => add("p5", n, strip(n), v, m, "", "gia đình", strip(n)));
  [...P5.HUS, ...P5.ROMGIRO, ...P5.UKEDAGER, ...P5.MANEDER, ...P5.ARSTIDER, ...P5.TIDORD, ...P5.MALTID]
    .forEach(([n, v, m]) => add("p5", n, strip(n), v, m, "", "", strip(n)));

  P6.VERB.forEach(([inf, pres, pret, perf, ph, mean, strong]) =>
    add("p6", inf, `${pres}, ${pret}, ${perf}`, ph, mean, `${pres} · ${pret} · ${perf}`, strong ? "mạnh" : "", pret));

  P7.MOTSATT.forEach(pair => pair.forEach(c => { const [n, p, m] = c.split("|"); add("p7", n, n, p, m, "", "tính từ"); }));
  P7.FARGER.forEach(([a, b, c, m]) => add("p7", a, a, "", m, `${a} · ${b} · ${c}`, "màu"));
  P7.PREP.forEach(([n, p, m]) => add("p7", n, n, p, m, "", "giới từ"));

  P8.REDNING.forEach(([n, v, m]) => add("p8", n, n, v, m, "", "cứu mạng"));
  [...P8.BUTIKK, ...P8.KAFE, ...P8.TRANSPORTFRASER, ...P8.VEI, ...P8.TIMEORD, ...P8.LEGE, ...P8.NOD]
    .forEach(([n, v, m]) => add("p8", n, n, v, m, "", "cụm"));
  [...P8.MAT, ...P8.TRANSPORT, ...P8.KROPP, ...P8.RETNINGER]
    .forEach(([n, v, m]) => add("p8", n, strip(n), v, m, "", "từ", strip(n)));
  return out;
})();

/* ---------- HELPERS ---------- */
NORSK.partIndex = Object.fromEntries(NORSK.parts.map((p, i) => [p.id, i]));
NORSK.partById = id => NORSK.parts[NORSK.partIndex[id]];
NORSK.cardsFor = part => NORSK.cards.filter(c => c.part === part);
NORSK.allQuiz = () => NORSK.parts.flatMap(p => NORSK[p.id].QUIZ.map(q => Object.assign({ part: p.id }, q)));

/* Lịch 52 phiên đúng thứ tự: phiên bài học của từng phần, xen 4 phiên ôn tổng */
NORSK.schedule = (function () {
  const list = [];
  NORSK.parts.forEach(p => {
    p.sessions.forEach((s, i) => list.push({ id: `${p.id}-s${i + 1}`, part: p.id, n: i + 1, t: s.t, secs: s.secs, practice: s.practice, kind: "lesson" }));
    const r = NORSK.reviews.find(r => r.after === p.id);
    if (r) list.push({ id: r.id, part: p.id, t: r.t, tasks: r.tasks, write: r.write, kind: "review" });
  });
  return list;
})();
