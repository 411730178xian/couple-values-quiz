(function () {
  const STORAGE_KEY = "values-quiz-draft-v1";
  const form = document.getElementById("quiz");
  const nameInput = document.getElementById("name");
  const msg = document.getElementById("msg");
  const answers = {};

  // 產生題目
  let n = 0;
  form.innerHTML = DIMENSIONS.map(d => {
    const qs = d.questions.map((q, i) => {
      n++;
      const id = `${d.id}-${i + 1}`;
      const opts = [1, 2, 3, 4, 5].map(v => `
        <input type="radio" name="q${id}" id="q${id}-${v}" value="${v}">
        <label for="q${id}-${v}">${v}<small>${SCALE_LABELS[v - 1]}</small></label>`).join("");
      return `
        <fieldset class="q" id="box-${id}" style="border-width:1px">
          <p><span class="qn">${n}.</span>${q.t}</p>
          <div class="scale" role="radiogroup">${opts}</div>
          <div class="scale-legend"><span>非常不同意</span><span>非常同意</span></div>
        </fieldset>`;
    }).join("");
    return `
      <section>
        <div class="section-title"><span class="idx">${String(d.id).padStart(2, "0")}</span><h2>${d.name}</h2></div>
        ${qs}
      </section>`;
  }).join("");

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: nameInput.value, answers }));
    } catch (e) { /* 無法存取 localStorage 時忽略 */ }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      nameInput.value = data.name || "";
      Object.entries(data.answers || {}).forEach(([id, v]) => {
        const el = document.getElementById(`q${id}-${v}`);
        if (el) { el.checked = true; answers[id] = v; }
      });
    } catch (e) { /* 忽略損壞的暫存 */ }
  }

  function updateProgress() {
    const done = Object.keys(answers).length;
    const pct = Math.round(done / QUESTIONS.length * 100);
    document.getElementById("progress-text").textContent = `已完成 ${done} / ${QUESTIONS.length} 題`;
    document.getElementById("progress-pct").textContent = `${pct}%`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
  }

  form.addEventListener("change", e => {
    if (e.target.type !== "radio") return;
    const id = e.target.name.slice(1);
    answers[id] = Number(e.target.value);
    document.getElementById(`box-${id}`).classList.remove("missing");
    updateProgress();
    save();
  });
  nameInput.addEventListener("input", save);

  document.getElementById("submit").addEventListener("click", () => {
    msg.className = "";
    const name = nameInput.value.trim();
    if (!name) {
      msg.className = "error";
      msg.textContent = "請先輸入你的名稱。";
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const missing = QUESTIONS.filter(q => !answers[q.id]);
    document.querySelectorAll(".q.missing").forEach(el => el.classList.remove("missing"));
    if (missing.length) {
      missing.forEach(q => document.getElementById(`box-${q.id}`).classList.add("missing"));
      msg.className = "error";
      msg.textContent = `還有 ${missing.length} 題尚未作答，已用紅框標示。`;
      document.getElementById(`box-${missing[0].id}`).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const result = {
      quiz: "雙人全方位價值觀測驗",
      version: QUIZ_VERSION,
      name,
      completedAt: new Date().toISOString(),
      scale: "1＝非常不同意，2＝不同意，3＝普通，4＝同意，5＝非常同意",
      answers: QUESTIONS.map((q, i) => ({
        no: i + 1,
        id: q.id,
        dimension: q.dimName,
        question: q.text,
        answer: answers[q.id],
        answerLabel: SCALE_LABELS[answers[q.id] - 1]
      }))
    };
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `價值觀測驗_${name.replace(/[\\/:*?"<>|]/g, "_")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    msg.className = "success";
    msg.textContent = "已下載答案檔！請和另一位填寫者的檔案一起上傳到分析頁。";
  });

  document.getElementById("reset").addEventListener("click", () => {
    if (!confirm("確定要清除所有作答與名稱嗎？")) return;
    form.reset();
    nameInput.value = "";
    Object.keys(answers).forEach(k => delete answers[k]);
    document.querySelectorAll(".q.missing").forEach(el => el.classList.remove("missing"));
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
    msg.textContent = "";
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  load();
  updateProgress();
})();
