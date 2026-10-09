(function () {
  // ---------- 各面向的解讀文字 ----------
  // hi / lo：偏向該面向兩端時，可能反映的想法與生活態度
  // scene：差異可能出現在哪些日常情境
  // comp：差異可以如何互補或平衡
  const INSIGHT = {
    1: { hi: "傾向為人生設定方向並主動推進，相信努力與規劃能帶來改變。", lo: "較能接受不確定性，重視當下的體驗，不急於為人生定下框架。", scene: "人生規劃的節奏、面對挫折時的反應、對「努力」與「隨緣」的評價", comp: "一方提供方向感與行動力，另一方提供彈性與對過程的珍惜。" },
    2: { hi: "把金錢視為安全感的來源，重視儲蓄與謹慎消費。", lo: "把金錢視為提升生活品質的工具，願意為體驗與快樂花錢。", scene: "共同開銷分配、儲蓄目標、大額消費、旅行與興趣的預算", comp: "一方守住財務安全網，另一方提醒生活也值得投資在快樂上。" },
    3: { hi: "重視一致的原則與規則，傾向以「該不該做」作為判斷依據。", lo: "較看重情境與結果，認為道德判斷需要彈性與人情考量。", scene: "對他人行為的評價、處理灰色地帶（如小謊、走捷徑）、親友犯錯時的立場", comp: "一方守住底線，另一方提醒體諒處境；但彼此的核心底線最好事先對齊。" },
    4: { hi: "傾向從結構與環境理解個人處境，支持集體保障與重分配。", lo: "傾向強調個人努力與責任，較認同競爭與市場機制。", scene: "時事與政治話題、對他人成敗的解讀、公益與稅務的看法", comp: "兩種視角能互相補足對社會問題的理解，不一定需要達成一致。" },
    5: { hi: "重視家族連結與代間責任，家人意見在決策中有重要份量。", lo: "傾向以小家庭與個人選擇為中心，與原生家庭保持適當距離。", scene: "與雙方父母的互動頻率、節日安排、奉養責任、生育決定、居住地點", comp: "差異能平衡家族情感與個人自主，但需要具體約定界線。" },
    6: { hi: "樂於擴展社交圈，把人際關係視為重要資源與能量來源。", lo: "偏好少而深的關係，需要獨處來恢復能量。", scene: "週末安排、聚會頻率、對朋友投入的時間與金錢", comp: "外向的一方帶來新的人際機會，內向的一方帶來深度與穩定。" },
    7: { hi: "把事業成就視為人生價值的重要來源，願意為發展付出代價。", lo: "把工作放在整體生活中衡量，重視興趣、平衡與生活品質。", scene: "加班與陪伴時間、搬遷或換工作的決定、家務分工、對成就的期待", comp: "一方提供衝勁與資源，另一方守護生活品質與身心平衡。" },
    8: { hi: "喜歡新鮮體驗與適度享受，生活重心偏向探索與外出。", lo: "偏好規律、簡樸與可預期的日常，在熟悉中感到安心。", scene: "假日安排、旅行頻率、居家與外出的比例、消費習慣", comp: "一方帶來新鮮感，另一方帶來穩定的生活節奏。" },
    9: { hi: "重視個人空間、隱私與自主決定，不喜歡被過度過問。", lo: "傾向緊密共享，認為親近的人之間應保持透明與高度參與。", scene: "手機與隱私、行程報備、個人時間、獨自出遊或交友", comp: "這類差異較難自然互補，需要明確約定彼此的透明度與空間。" },
    10: { hi: "傾向直接表達情緒與不滿，希望問題能即時處理。", lo: "傾向先冷靜、消化情緒，必要時以忍讓維持和諧。", scene: "爭執時的節奏（追問或退開）、冷戰、情緒表達方式", comp: "若能約定「先暫停、再約時間談」，直接與冷靜兩種風格可以互相平衡。" },
    11: { hi: "重視持續精進與自我改變，樂於投資學習、接受批評。", lo: "較重視自我接納，以自在的步調成長，不追求不斷進步。", scene: "對彼此的期待（是否希望對方進步）、學習上的時間與金錢投入、給建議的方式", comp: "一方帶動成長，另一方提醒接納與休息。" },
    12: { hi: "重視環境責任，對新科技保持審慎，願意為永續付出代價。", lo: "擁抱新科技帶來的便利，較少為環保犧牲生活便利。", scene: "消費選擇、3C 使用習慣、對 AI 與新科技的態度", comp: "觀點差異通常不直接影響日常，反而能帶來不同的資訊與視角。" },
    13: { hi: "偏好穩健與預防，做決定前會考慮最壞情況並保留後路。", lo: "願意承擔風險追求機會，較常跟隨直覺行動。", scene: "投資理財、創業或轉職、旅行計畫、保險與預備金", comp: "一方抓住機會、一方管理風險，是常見的互補組合，前提是共同資產的規則要先談好。" },
    14: { hi: "重視長期承諾與緊密連結，期待彼此優先、重視儀式感。", lo: "重視關係中的獨立與彈性，認為關係應建立在雙方持續感到快樂之上。", scene: "對婚姻的時間表、相處頻率、紀念日與浪漫表達、對「承諾」的定義", comp: "差異可以平衡親密與獨立，但對承諾形式的期待需要說清楚。" },
    15: { hi: "追求意義、貢獻與精神寄託，願意為長遠價值承擔壓力。", lo: "重視當下的快樂、輕鬆與自在，認為平凡日子本身就是幸福。", scene: "重大選擇的優先順序、對「成功」與「幸福」的定義、對信仰的態度", comp: "一方帶來使命感，另一方提醒享受當下。" }
  };

  // 核心追求：對應的面向
  const PURSUITS = [
    { area: "人生", dims: [1, 15] },
    { area: "金錢", dims: [2, 13] },
    { area: "道德", dims: [3, 4] },
    { area: "工作", dims: [7, 11] },
    { area: "生活", dims: [8, 9, 6] }
  ];

  const DIM = Object.fromEntries(DIMENSIONS.map(d => [d.id, d]));
  const files = [null, null];
  const tip = document.getElementById("tip");
  const report = document.getElementById("report");
  const runBtn = document.getElementById("run");
  const uploadMsg = document.getElementById("upload-msg");

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = v => `${Math.round(v)}%`;
  const avg = arr => arr.reduce((s, v) => s + v, 0) / arr.length;

  // ---------- 讀取與驗證檔案 ----------
  function parseAnswerFile(data, fallbackName) {
    if (!data || !Array.isArray(data.answers)) throw new Error("檔案格式不正確：找不到 answers 欄位。");
    const map = {};
    data.answers.forEach(item => {
      let id = item.id;
      if (!id && item.no) id = QUESTIONS[item.no - 1] && QUESTIONS[item.no - 1].id;
      const v = Number(item.answer);
      if (id && v >= 1 && v <= 5 && Number.isInteger(v)) map[id] = v;
    });
    const missing = QUESTIONS.filter(q => !map[q.id]);
    if (missing.length) throw new Error(`答案不完整：缺少 ${missing.length} 題的有效答案。`);
    return { name: (data.name || fallbackName || "").trim() || fallbackName, answers: map };
  }

  function setSlot(slot, person, label) {
    files[slot] = person;
    const box = document.getElementById(slot === 0 ? "drop-a" : "drop-b");
    box.classList.toggle("ok", !!person);
    box.querySelector("[data-status]").textContent = person ? `✓ ${person.name}（${label}）` : "點此選擇或拖曳 JSON 檔到這裡";
    runBtn.disabled = !(files[0] && files[1]);
  }

  function readFile(file, slot) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const person = parseAnswerFile(JSON.parse(reader.result), slot === 0 ? "填寫者 A" : "填寫者 B");
        setSlot(slot, person, file.name);
        uploadMsg.className = "";
        uploadMsg.textContent = files[0] && files[1] ? "兩份檔案都已載入，可以開始分析。" : "";
      } catch (e) {
        setSlot(slot, null);
        uploadMsg.className = "error";
        uploadMsg.textContent = `${file.name}：${e instanceof SyntaxError ? "不是有效的 JSON 檔案。" : e.message}`;
      }
    };
    reader.readAsText(file);
  }

  document.querySelectorAll(".drop").forEach(box => {
    const input = box.querySelector("input");
    const slot = Number(input.dataset.slot);
    input.addEventListener("change", () => input.files[0] && readFile(input.files[0], slot));
    box.addEventListener("dragover", e => { e.preventDefault(); box.style.borderColor = "var(--accent)"; });
    box.addEventListener("dragleave", () => { box.style.borderColor = ""; });
    box.addEventListener("drop", e => {
      e.preventDefault();
      box.style.borderColor = "";
      const list = [...e.dataTransfer.files];
      if (list.length >= 2 && slot === 0) { readFile(list[0], 0); readFile(list[1], 1); }
      else if (list[0]) readFile(list[0], slot);
    });
  });

  runBtn.addEventListener("click", () => {
    if (files[0] && files[1]) render(files[0], files[1]);
  });

  document.getElementById("demo").addEventListener("click", () => {
    // 以固定種子產生兩份示範答案：大部分相近，部分面向刻意拉開
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const a = {}, b = {};
    QUESTIONS.forEach(q => {
      const base = 1 + Math.floor(rnd() * 5);
      a[q.id] = base;
      const spread = [2, 5, 9, 13].includes(q.dim) ? 2 + Math.floor(rnd() * 2) : Math.floor(rnd() * 2);
      const dir = rnd() < .5 ? -1 : 1;
      let v = base + dir * spread;
      if (v < 1 || v > 5) v = base - dir * spread;
      b[q.id] = Math.min(5, Math.max(1, v));
    });
    setSlot(0, { name: "範例 A", answers: a }, "示範資料");
    setSlot(1, { name: "範例 B", answers: b }, "示範資料");
    uploadMsg.className = "";
    uploadMsg.textContent = "已載入隨機產生的示範資料，僅供預覽版面。";
    render(files[0], files[1]);
  });

  // ---------- 計算 ----------
  function orient(person, dimId) {
    // 個人在某面向的傾向分數（1＝偏 low 端，5＝偏 high 端）
    return avg(QUESTIONS.filter(q => q.dim === dimId).map(q => q.reverse ? 6 - person.answers[q.id] : person.answers[q.id]));
  }

  function orientLabel(score, d) {
    if (score >= 3.8) return { side: 1, text: `明顯偏向「${d.high}」` };
    if (score >= 3.4) return { side: 1, text: `略偏向「${d.high}」` };
    if (score <= 2.2) return { side: -1, text: `明顯偏向「${d.low}」` };
    if (score <= 2.6) return { side: -1, text: `略偏向「${d.low}」` };
    return { side: 0, text: "兩端之間，傾向視情況而定" };
  }

  function compute(A, B) {
    const items = QUESTIONS.map((q, i) => {
      const a = A.answers[q.id], b = B.answers[q.id];
      const gap = Math.abs(a - b);
      return { ...q, no: i + 1, a, b, gap, sim: 100 - gap * 25, core: DIM[q.dim].type === "core" };
    });
    const dims = DIMENSIONS.map(d => {
      const qs = items.filter(it => it.dim === d.id);
      const oa = orient(A, d.id), ob = orient(B, d.id);
      return {
        ...d,
        sim: avg(qs.map(q => q.sim)),
        oa, ob,
        la: orientLabel(oa, d), lb: orientLabel(ob, d),
        bigGaps: qs.filter(q => q.gap >= 2).length
      };
    });
    const overall = avg(items.map(it => it.sim));
    return { items, dims, overall };
  }

  function band(v) {
    if (v >= 85) return "回答非常接近";
    if (v >= 75) return "回答大致相近";
    if (v >= 65) return "有相近也有明顯差異";
    return "回答差異較明顯";
  }

  function stanceText(v) {
    return v >= 4 ? "同意" : v <= 2 ? "不同意" : "中立";
  }

  // ---------- 圖表 ----------
  function gapChart(items) {
    const counts = [0, 1, 2, 3, 4].map(g => items.filter(it => it.gap === g).length);
    const W = 360, H = 200, pad = { l: 28, r: 8, t: 16, b: 40 };
    const max = Math.max(...counts, 1);
    const top = Math.ceil(max / 10) * 10;
    const bw = (W - pad.l - pad.r) / 5;
    const y = v => pad.t + (H - pad.t - pad.b) * (1 - v / top);
    let grid = "";
    for (let t = 0; t <= top; t += top / 2) {
      grid += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="var(--border)" stroke-width="1"/>
        <text x="${pad.l - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`;
    }
    const bars = counts.map((c, g) => {
      const x = pad.l + g * bw + bw * .2, w = bw * .6, h = H - pad.b - y(c);
      const r = Math.min(4, h / 2);
      const path = h > 0
        ? `M${x},${H - pad.b} V${y(c) + r} Q${x},${y(c)} ${x + r},${y(c)} H${x + w - r} Q${x + w},${y(c)} ${x + w},${y(c) + r} V${H - pad.b} Z`
        : "";
      const tipText = `差距 ${g} 分（單題相似度 ${100 - g * 25}%）：${c} 題，佔 ${Math.round(c / 75 * 100)}%`;
      return `<g data-tip="${esc(tipText)}">
        <rect x="${pad.l + g * bw}" y="${pad.t}" width="${bw}" height="${H - pad.t - pad.b}" fill="transparent"/>
        <path d="${path}" fill="var(--bar)"/>
        <text x="${x + w / 2}" y="${y(c) - 6}" text-anchor="middle" style="fill:var(--text);font-weight:600">${c}</text>
        <text x="${x + w / 2}" y="${H - pad.b + 18}" text-anchor="middle">差 ${g} 分</text>
        <text x="${x + w / 2}" y="${H - pad.b + 32}" text-anchor="middle">${100 - g * 25}%</text>
      </g>`;
    }).join("");
    return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="雙方答案差距分布">${grid}
      <line x1="${pad.l}" x2="${W - pad.r}" y1="${H - pad.b}" y2="${H - pad.b}" stroke="var(--muted)"/>${bars}</svg></div>`;
  }

  function simBars(dims) {
    const sorted = [...dims].sort((x, y) => y.sim - x.sim);
    return `<div class="bars">${sorted.map(d => `
      <div class="row" data-tip="${esc(`${d.name}：相似度 ${pct(d.sim)}，差距 ≥2 分的題目 ${d.bigGaps} 題`)}">
        <span>${d.name}</span>
        <div class="track"><div class="fill" style="width:${d.sim}%"></div></div>
        <span class="val">${pct(d.sim)}</span>
      </div>`).join("")}</div>`;
  }

  function dumbbells(dims, A, B) {
    const pos = s => ((s - 1) / 4 * 100).toFixed(1);
    return `<div class="db">${dims.map(d => {
      const pa = pos(d.oa), pb = pos(d.ob);
      const lo = Math.min(pa, pb), hi = Math.max(pa, pb);
      // 兩點幾乎重疊時上下錯開，避免其中一點被完全遮住
      const near = hi - lo < 4;
      const ya = near ? "top:-4px" : "", yb = near ? "top:6px" : "";
      return `<div class="db-row">
        <div class="db-name"><strong>${d.name}</strong></div>
        <div class="db-poles"><span>${d.low}</span><span>${d.high}</span></div>
        <div class="db-track">
          <span class="db-mid"></span>
          <span class="db-seg" style="left:${lo}%;width:${hi - lo}%"></span>
          <i class="db-dot a" style="left:${pa}%;${ya}" data-tip="${esc(`${A.name}・${d.name}：${d.oa.toFixed(1)} 分，${d.la.text}`)}"></i>
          <i class="db-dot b" style="left:${pb}%;${yb}" data-tip="${esc(`${B.name}・${d.name}：${d.ob.toFixed(1)} 分，${d.lb.text}`)}"></i>
        </div>
      </div>`;
    }).join("")}</div>`;
  }

  // ---------- 報告 ----------
  function render(A, B) {
    const { items, dims, overall } = compute(A, B);
    const nA = esc(A.name), nB = esc(B.name);
    const pillA = v => `<span class="answer-pill a">${v}</span>`;
    const pillB = v => `<span class="answer-pill b">${v}</span>`;
    const legend = `<div class="legend"><span><i class="dot-a"></i>${nA}</span><span><i class="dot-b"></i>${nB}</span></div>`;

    const bySim = [...dims].sort((x, y) => y.sim - x.sim);
    const bigGaps = items.filter(it => it.gap >= 2).sort((x, y) => y.gap - x.gap || x.no - y.no);
    const exact = items.filter(it => it.gap === 0).length;

    // 最相似：差距小優先，其次是雙方立場越鮮明越有代表性
    const mostSimilar = [...items].sort((x, y) =>
      x.gap - y.gap || (Math.abs(y.a + y.b - 6) - Math.abs(x.a + x.b - 6)) || x.no - y.no).slice(0, 5);
    // 差異最大：差距大優先，其次是立場相反（一方同意、一方不同意），再其次是核心面向
    const opposite = it => (it.a - 3) * (it.b - 3) < 0 ? 1 : 0;
    const mostDifferent = [...items].sort((x, y) =>
      y.gap - x.gap || opposite(y) - opposite(x) || (y.core - x.core) || x.no - y.no).slice(0, 5);

    // 方向相反的面向
    const oppositeDims = dims.filter(d => d.la.side * d.lb.side === -1);
    const differingDims = dims.filter(d => d.sim < 80 || d.la.side * d.lb.side === -1)
      .sort((x, y) => x.sim - y.sim);
    const needTalk = differingDims.filter(d => d.type === "core");
    const complement = differingDims.filter(d => d.type === "style");
    const conflictQs = items.filter(it => it.gap >= 3).sort((x, y) => y.gap - x.gap || (y.core - x.core));

    const sections = [
      ["s1", "整體相似度"], ["s2", "各面向相似度"], ["s3", "最相似的價值觀"], ["s4", "差異最大的價值觀"],
      ["s5", "差距 ≥2 分題目"], ["s6", "個人傾向"], ["s7", "核心追求"], ["s8", "可能的衝突"],
      ["s9", "互補與溝通"], ["s10", "討論問題"], ["s11", "完整對照表"]
    ];

    let html = `
    <div class="card no-print">
      <div class="toc">${sections.map(([id, t], i) => `<a href="#${id}">${i + 1}. ${t}</a>`).join("")}</div>
      <div class="btn-row" style="margin-top:12px"><button class="btn ghost" type="button" onclick="window.print()">列印 / 存成 PDF</button></div>
    </div>`;

    // 1. 整體
    const top2 = bySim.slice(0, 2).map(d => `${d.name}（${pct(d.sim)}）`).join("、");
    const low2 = bySim.slice(-2).reverse().map(d => `${d.name}（${pct(d.sim)}）`).join("、");
    html += `
    <section class="card" id="s1">
      <h2>1. 整體價值觀相似度</h2>
      <div class="hero">
        <div>
          <div class="big-num">${overall.toFixed(1)}<small>%</small></div>
          <div class="muted">${band(overall)}</div>
        </div>
        <div>
          <p style="margin-top:0"><strong>${nA}</strong> 與 <strong>${nB}</strong> 在 75 題中，有 <strong>${exact}</strong> 題答案完全相同，
          <strong>${bigGaps.length}</strong> 題差距達 2 分以上。最接近的面向是 ${top2}；差異最多的面向是 ${low2}。</p>
          <p class="muted">參考基準：如果兩人完全隨機作答，平均相似度約為 60%。另外，「普通（3 分）」與任何答案的差距最多只有 2 分，所以常選中間值的人，相似度通常會偏高。</p>
        </div>
      </div>
      <h3>答案差距分布</h3>
      ${gapChart(items)}
      <p class="note">計算方式：每題相似度＝100%－（雙方答案差距 × 25%）；各面向相似度為該面向 5 題的平均，整體相似度為 75 題的平均。百分比僅代表這份自訂測驗的回答接近程度，不代表科學驗證的感情契合度，也不能用來預測關係成敗。</p>
    </section>`;

    // 2. 各面向
    html += `
    <section class="card" id="s2">
      <h2>2. 15 大面向相似度</h2>
      <p class="muted">由高到低排序。滑過或點一下長條可以看到細節。</p>
      ${simBars(dims)}
      <h3>雙方在各面向的傾向位置</h3>
      <p class="muted">每一列左右兩端是該面向的兩種取向，圓點是各自的傾向分數（1～5，已處理反向題）。兩點距離越遠，代表看法方向差越多。</p>
      ${legend}
      ${dumbbells(dims, A, B)}
      <h3>面向明細表</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>面向</th><th class="num">相似度</th><th class="num">差距≥2</th><th>${nA} 的傾向</th><th>${nB} 的傾向</th></tr></thead>
        <tbody>${dims.map(d => `<tr>
          <td>${d.id}. ${d.name}</td><td class="num">${pct(d.sim)}</td><td class="num">${d.bigGaps} 題</td>
          <td>${d.oa.toFixed(1)}・${d.la.text}</td><td>${d.ob.toFixed(1)}・${d.lb.text}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>`;

    // 3 & 4
    const pairTable = (list, mode) => `
      <div class="table-wrap"><table>
        <thead><tr><th>#</th><th>價值觀</th><th>題目</th><th class="num">${nA}</th><th class="num">${nB}</th><th>解讀</th></tr></thead>
        <tbody>${list.map((it, i) => {
          let note;
          if (mode === "same") {
            const s = stanceText((it.a + it.b) / 2);
            note = it.gap === 0 ? `雙方都${s === "中立" ? "持中立" : s}` : `雙方立場一致（都偏${s}）`;
          } else {
            note = opposite(it) ? `立場相反：${nA}${stanceText(it.a)}，${nB}${stanceText(it.b)}` : `同方向但強度不同（相差 ${it.gap} 分）`;
          }
          return `<tr><td>${i + 1}</td><td><strong>${esc(it.label)}</strong><br><span class="tag${it.core ? " core" : ""}">${it.dimName}</span></td>
            <td>${esc(it.text)}</td><td class="num">${pillA(it.a)}</td><td class="num">${pillB(it.b)}</td><td>${note}</td></tr>`;
        }).join("")}</tbody></table></div>`;

    html += `
    <section class="card" id="s3">
      <h2>3. 雙方最相似的 5 個價值觀</h2>
      <p class="muted">差距最小者優先；同樣差距下，雙方立場越鮮明（都非常同意或都非常不同意）越優先，因為這比都選「普通」更能代表共同的信念。</p>
      ${pairTable(mostSimilar, "same")}
    </section>
    <section class="card" id="s4">
      <h2>4. 雙方差異最大的 5 個價值觀</h2>
      <p class="muted">差距最大者優先；同樣差距下，立場相反（一方同意、一方不同意）以及屬於核心面向（標示為橘色）的題目優先。</p>
      ${pairTable(mostDifferent, "diff")}
    </section>`;

    // 5. 差距 ≥2
    html += `
    <section class="card" id="s5">
      <h2>5. 回答差距達 2 分以上的題目（${bigGaps.length} 題）</h2>
      ${bigGaps.length ? `<div class="table-wrap"><table>
        <thead><tr><th>題號</th><th>面向</th><th>題目</th><th class="num">${nA}</th><th class="num">${nB}</th><th class="num">差距</th><th class="num">相似度</th></tr></thead>
        <tbody>${bigGaps.map(it => `<tr><td>${it.no}</td><td><span class="tag${it.core ? " core" : ""}">${it.dimName}</span></td><td>${esc(it.text)}</td>
          <td class="num">${pillA(it.a)}</td><td class="num">${pillB(it.b)}</td><td class="num">${it.gap}</td><td class="num">${it.sim}%</td></tr>`).join("")}</tbody>
      </table></div>` : `<p>沒有任何題目差距達 2 分以上，雙方的回答非常一致。</p>`}
    </section>`;

    // 6. 個人傾向
    const persona = (P, key, cls) => {
      const scores = dims.map(d => ({ d, s: key === "a" ? d.oa : d.ob, l: key === "a" ? d.la : d.lb }));
      const vivid = [...scores].sort((x, y) => Math.abs(y.s - 3) - Math.abs(x.s - 3)).filter(x => x.l.side !== 0).slice(0, 4);
      const balanced = scores.filter(x => x.l.side === 0).map(x => x.d.name);
      const vals = QUESTIONS.map(q => P.answers[q.id]);
      const extreme = vals.filter(v => v === 1 || v === 5).length;
      const neutral = vals.filter(v => v === 3).length;
      const meanAgree = avg(vals);
      let style;
      if (extreme >= 38) style = `有 ${extreme} 題選擇 1 或 5 分，表態鮮明，對多數議題有清楚立場。`;
      else if (neutral >= 25) style = `有 ${neutral} 題選擇「普通」，回答較保留，可能傾向視情況判斷，或對部分議題仍在思考中。`;
      else style = `極端值 ${extreme} 題、中間值 ${neutral} 題，表態程度適中，會區分自己在意與不在意的議題。`;
      const agreeNote = meanAgree >= 3.6 ? "整體平均分偏高，對多數陳述較容易表示認同。" : meanAgree <= 2.6 ? "整體平均分偏低，對陳述較常持保留或否定態度。" : "";
      return `<div class="card persona ${cls}">
        <h3 style="margin-top:0">${esc(P.name)}</h3>
        <p><strong>最鮮明的價值取向</strong></p>
        ${vivid.length ? `<ul>${vivid.map(x => `<li><strong>${x.d.name}</strong>：${x.l.text}。${INSIGHT[x.d.id][x.l.side > 0 ? "hi" : "lo"]}</li>`).join("")}</ul>` : `<p>各面向都落在兩端之間，沒有特別極端的取向，整體是較平衡、視情況而定的作答方式。</p>`}
        ${balanced.length ? `<p><strong>相對平衡的面向</strong><br><span class="muted">${balanced.join("、")}</span></p>` : ""}
        <p><strong>作答風格</strong><br>${style}${agreeNote}</p>
      </div>`;
    };
    html += `
    <section class="card" id="s6">
      <h2>6. 雙方各自的價值觀與人格傾向</h2>
      <p class="muted">以下根據各面向的傾向分數整理，只描述「回答反映出的想法」，不是心理診斷，也不代表實際行為一定如此。</p>
      <div class="persona-grid">${persona(A, "a", "")}${persona(B, "b", "b")}</div>
    </section>`;

    // 7. 核心追求
    const pursuit = (P, key, area) => {
      const lines = area.dims.map(id => {
        const d = dims.find(x => x.id === id);
        const l = key === "a" ? d.la : d.lb;
        return `${d.name}：${l.side === 0 ? "兩端之間" : l.text.replace(/^(明顯|略)偏向/, "偏向")}`;
      });
      const strong = QUESTIONS.filter(q => area.dims.includes(q.dim) && P.answers[q.id] >= 4)
        .sort((x, y) => P.answers[y.id] - P.answers[x.id]).slice(0, 3).map(q => q.label);
      return `${lines.join("<br>")}${strong.length ? `<br><span class="muted">高度認同：${strong.join("、")}</span>` : ""}`;
    };
    html += `
    <section class="card" id="s7">
      <h2>7. 對人生、金錢、道德、工作及生活的核心追求</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>領域</th><th>${nA}</th><th>${nB}</th><th class="num">相似度</th></tr></thead>
        <tbody>${PURSUITS.map(p => {
          const s = avg(items.filter(it => p.dims.includes(it.dim)).map(it => it.sim));
          return `<tr><td><strong>${p.area}</strong></td><td>${pursuit(A, "a", p)}</td><td>${pursuit(B, "b", p)}</td><td class="num">${pct(s)}</td></tr>`;
        }).join("")}</tbody>
      </table></div>
      <p class="muted">「高度認同」列出該領域中選 4～5 分的題目。注意：認同某題不等於反對另一端，例如一個人可以同時重視儲蓄與享受。</p>
    </section>`;

    // 8. 衝突
    html += `
    <section class="card" id="s8">
      <h2>8. 可能產生衝突的價值觀</h2>
      <p class="muted">差異不一定會變成衝突，下面列出的是「如果沒有說開，比較容易在日常中產生摩擦」的地方。</p>
      ${oppositeDims.length ? `<h3>方向相反的面向</h3><ul>${oppositeDims.map(d => `<li><strong>${d.name}</strong>：${nA}${d.la.text}，${nB}${d.lb.text}。可能出現在：${INSIGHT[d.id].scene}。</li>`).join("")}</ul>`
        : `<p>沒有任何面向出現雙方傾向方向相反的情況。</p>`}
      ${conflictQs.length ? `<h3>差距 3 分以上的題目</h3><ul>${conflictQs.map(it => `<li>${pillA(it.a)} ${pillB(it.b)} 「${esc(it.text)}」<span class="muted">（${it.dimName}）</span></li>`).join("")}</ul>`
        : `<p>沒有差距達 3 分以上的題目。</p>`}
    </section>`;

    // 9. 互補 vs 溝通
    const dimList = (list, field) => list.length
      ? `<ul>${list.map(d => `<li><strong>${d.name}</strong>（${pct(d.sim)}）：${field === "comp" ? INSIGHT[d.id].comp : `建議具體討論${INSIGHT[d.id].scene}。`}</li>`).join("")}</ul>`
      : `<p class="muted">沒有符合條件的面向。</p>`;
    html += `
    <section class="card" id="s9">
      <h2>9. 哪些差異可能互補，哪些需要溝通</h2>
      <p class="muted">只列出相似度低於 80% 或雙方方向相反的面向。判斷依據：涉及共同資源、共同生活規則或彼此底線的面向（金錢、道德、家庭、界線、衝突處理、親密關係、人生方向）較需要溝通與約定；屬於風格、興趣與視角的面向較可能形成互補。</p>
      <h3>較可能形成互補</h3>${dimList(complement, "comp")}
      <h3>較需要溝通與約定</h3>${dimList(needTalk, "talk")}
    </section>`;

    // 10. 討論問題
    const talkDims = bySim.slice(-4).reverse();
    html += `
    <section class="card" id="s10">
      <h2>10. 值得雙方深入討論的問題</h2>
      <h3>從差異最大的面向出發</h3>
      <ul>${talkDims.map(d => d.talk.map(t => `<li><span class="tag">${d.name}</span> ${t}</li>`).join("")).join("")}</ul>
      ${conflictQs.length || bigGaps.length ? `<h3>針對差距最大的題目</h3><ul>${(conflictQs.length ? conflictQs : bigGaps).slice(0, 6).map(it =>
        `<li>「${esc(it.text)}」— ${nA} 選 ${it.a} 分、${nB} 選 ${it.b} 分。各自是什麼經驗或想法讓你這樣選？在實際生活中，這會影響哪些決定？</li>`).join("")}</ul>` : ""}
      <h3>從相似處延伸</h3>
      <ul>
        <li>你們都${{ 同意: "同意", 不同意: "不同意", 中立: "對這句話持中立：" }[stanceText((mostSimilar[0].a + mostSimilar[0].b) / 2)]}「${esc(mostSimilar[0].text)}」— 這個共同點在你們的生活中是怎麼體現的？</li>
        <li>看完結果，哪一個差異最讓你意外？哪一個相似處最讓你安心？</li>
        <li>有沒有哪一題，你覺得自己的答案在未來幾年可能會改變？</li>
      </ul>
      <p class="note">討論時建議先問「為什麼」，再談「怎麼辦」。目的是理解對方看待世界的方式，而不是說服對方改變答案。</p>
    </section>`;

    // 11. 完整對照
    html += `
    <section class="card" id="s11">
      <h2>11. 完整對照表（75 題）</h2>
      <details><summary>展開全部題目與雙方答案</summary>
      <div class="table-wrap"><table>
        <thead><tr><th>題號</th><th>面向</th><th>題目</th><th class="num">${nA}</th><th class="num">${nB}</th><th class="num">相似度</th></tr></thead>
        <tbody>${items.map(it => `<tr><td>${it.no}</td><td>${it.dimName}</td><td>${esc(it.text)}</td>
          <td class="num">${pillA(it.a)}</td><td class="num">${pillB(it.b)}</td><td class="num">${it.sim}%</td></tr>`).join("")}</tbody>
      </table></div></details>
    </section>
    <p class="note">分析原則：本報告以規則計算，盡量保持客觀中立。差異不等於問題，相似也不等於契合；問卷只反映填寫當下的自我陳述，不能據此推斷一個人的真實行為，也不是心理診斷。</p>`;

    report.innerHTML = html;
    // 手機版表格改為卡片排列：把欄位名稱複製到每個儲存格
    report.querySelectorAll("table").forEach(t => {
      const heads = [...t.querySelectorAll("thead th")].map(th => th.textContent);
      t.classList.add("stack");
      t.querySelectorAll("tbody tr").forEach(tr =>
        [...tr.children].forEach((td, i) => td.setAttribute("data-label", heads[i] || "")));
    });
    report.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 網址加上 #demo 時直接顯示示範報告
  if (location.hash === "#demo") document.getElementById("demo").click();

  // ---------- 提示框 ----------
  function showTip(el, x, y) {
    tip.textContent = el.dataset.tip;
    tip.style.display = "block";
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = `${Math.min(window.innerWidth - w - 8, Math.max(8, x + 12))}px`;
    tip.style.top = `${Math.max(8, y - h - 12)}px`;
  }
  document.addEventListener("pointermove", e => {
    const el = e.target.closest && e.target.closest("[data-tip]");
    if (el) showTip(el, e.clientX, e.clientY); else tip.style.display = "none";
  });
  document.addEventListener("click", e => {
    const el = e.target.closest && e.target.closest("[data-tip]");
    if (el) showTip(el, e.clientX, e.clientY);
  });
  window.addEventListener("scroll", () => { tip.style.display = "none"; }, { passive: true });
})();
