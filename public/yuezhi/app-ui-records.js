function renderWeek() {
  const moods = ["","☁","◔","◉","◕","☀"];
  let html = "";
  for (let i=-3;i<=3;i++) {
    const d = addDays(selectedDate,i);
    const key = dateKey(d);
    const log = state.logs[key];
    html += `<button class="day-pill ${key===dateKey(new Date())?"today":""} ${i===0?"selected":""}" data-date="${key}">
      <b>${new Intl.DateTimeFormat("zh-CN",{weekday:"short"}).format(d)}</b>
      <small>${d.getMonth()+1}/${d.getDate()}</small>
      ${log ? `<span class="mood-dot">${moods[log.mood]}</span><small>乏 ${log.fatigue ?? Math.max(0,5-(log.energy||3))}/5 · 痛 ${log.pain}/10</small>` : `<div class="no-log">·</div>`}
    </button>`;
  }
  $("weekStrip").innerHTML = html;
  qsa(".day-pill").forEach(btn => btn.addEventListener("click", () => setSelectedDate(parseDate(btn.dataset.date))));
}

function renderPersonalNotes() {
  const profile = state.profile;
  const info = getCycleInfo(selectedDate);
  const notes = [];
  if (profile.hormonal === "yes") {
    notes.push(["◌","激素类避孕会改变自然周期","撤退性出血、点滴出血或没有出血，都可能与使用方式有关；此时‘排卵期’推算尤其不可靠。"]);
  }
  if (profile.age < 18) {
    notes.push(["↺","青春期周期更容易波动","初潮后的几年里，周期可能尚未稳定；但持续很重、很痛或长时间不来仍值得就医。"]);
  } else if (profile.age >= 40) {
    notes.push(["◇","年龄阶段也会影响周期","40岁以后周期改变可能与围绝经期有关，但新的异常出血仍需要排除其他原因。"]);
  } else {
    notes.push(["◎","你的年龄并不等于‘应该很规律’","压力、睡眠、旅行、疾病、体重和运动变化都可能让某一次周期偏移。"]);
  }
  if (profile.height && profile.weight) {
    const bmi = profile.weight / Math.pow(profile.height/100,2);
    notes.push(["↔","身体指标只用于看明显变化",`当前录入的 BMI 约 ${bmi.toFixed(1)}。单个数字不能解释周期；短期快速增减重比‘是否符合某个标准’更值得注意。`]);
  }
  if (info.phase === "luteal") {
    notes.push(["☁","先区分‘经前模式’与现实压力","如果低落只在经前反复出现并在月经后缓解，可能存在周期模式；如果整月都持续，就不要只怪激素。"]);
  }
  $("personalNotes").innerHTML = notes.map(n=>`<div class="note-item"><span>${n[0]}</span><div><b>${n[1]}</b><p>${n[2]}</p></div></div>`).join("");
}

function renderAlerts() {
  const alerts = [];
  const todayLog = state.logs[dateKey(selectedDate)];
  const intervals = getCycleIntervals();
  if (todayLog?.bleeding === "hourly") alerts.push(["danger","需要尽快获得医疗建议","你记录了‘每小时浸透卫生用品’。若持续发生、伴明显头晕、虚弱、呼吸急促或晕厥，应尽快联系当地急诊/医疗服务。"]);
  if (todayLog?.pain >= 8) alerts.push(["danger","严重疼痛不该被默认忍受","疼痛达到 8/10 或影响站立、工作、睡眠时，尤其是突然加重、单侧剧痛或伴发热，应及时就医。"]);
  if (todayLog?.discharge === "unusual") alerts.push(["warning","异常分泌物需要另看","明显异味、颜色异常、瘙痒或疼痛不应简单归因于排卵期，可能需要检查感染或其他问题。"]);
  if (intervals.some(n => n < 21 || n > 35)) alerts.push(["warning","周期长度出现明显波动","成人周期反复短于 21 天或长于 35 天，值得把记录带给家庭医生或妇科医生评估。"]);
  if (state.profile.hormonal === "yes") alerts.push(["info","当前阶段只是参考","激素类避孕可能抑制排卵或改变出血，因此页面阶段不能代表自然激素周期。"]);
  $("alertArea").innerHTML = alerts.map(a=>`<div class="alert ${a[0]}"><span>${a[0]==="danger"?"!":a[0]==="warning"?"△":"i"}</span><div><b>${a[1]}</b>${a[2]}</div></div>`).join("");
}

function openCheckin(date) {
  const key = dateKey(date);
  const log = state.logs[key];
  $("checkinDateInput").value = key;
  $("checkinDateTitle").textContent = `${formatDate(date,{weekday:true})}怎么样？`;
  $("moodInput").value = log?.mood ?? 3;
  $("energyInput").value = log?.energy ?? 3;
  $("fatigueInput").value = log?.fatigue ?? Math.max(0, 5 - Number(log?.energy ?? 3));
  $("painInput").value = log?.pain ?? 0;
  $("sleepInput").value = log?.sleep ?? "";
  $("stressInput").value = log?.stress ?? "";
  $("bleedingInput").value = log?.bleeding ?? "none";
  $("dischargeInput").value = log?.discharge ?? "";
  $("noteInput").value = log?.note ?? "";
  selectedSymptoms = new Set(log?.symptoms ?? []);
  renderSymptomChips();
  updateRangeLabels();
  $("checkinDialog").showModal();
}

function renderSymptomChips() {
  $("symptomChips").innerHTML = SYMPTOMS.map(s=>`<button type="button" class="symptom-chip ${selectedSymptoms.has(s)?"active":""}" data-symptom="${s}">${s}</button>`).join("");
  qsa(".symptom-chip").forEach(btn => btn.addEventListener("click", () => {
    const s = btn.dataset.symptom;
    selectedSymptoms.has(s) ? selectedSymptoms.delete(s) : selectedSymptoms.add(s);
    btn.classList.toggle("active");
  }));
}

function updateRangeLabels() {
  const mood = Number($("moodInput").value);
  const energy = Number($("energyInput").value);
  const fatigue = Number($("fatigueInput").value);
  const pain = Number($("painInput").value);
  $("moodValue").textContent = `${mood} · ${["","很差","偏低","一般","不错","很好"][mood]}`;
  $("energyValue").textContent = `${energy} · ${["","耗尽","偏低","普通","不错","充沛"][energy]}`;
  $("fatigueValue").textContent = `${fatigue} · ${fatigue===0?"没有":fatigue===1?"很轻":fatigue===2?"轻微":fatigue===3?"明显":fatigue===4?"较重":"严重"}`;
  $("painValue").textContent = `${pain} · ${pain===0?"无痛":pain<=3?"轻微":pain<=6?"中等":pain<=8?"严重":"极重"}`;
}

function saveCheckin(e) {
  e.preventDefault();
  const date = $("checkinDateInput").value;
  state.logs[date] = {
    date,
    mood: Number($("moodInput").value),
    energy: Number($("energyInput").value),
    fatigue: Number($("fatigueInput").value),
    pain: Number($("painInput").value),
    sleep: $("sleepInput").value === "" ? null : Number($("sleepInput").value),
    stress: $("stressInput").value === "" ? null : Number($("stressInput").value),
    bleeding: $("bleedingInput").value,
    discharge: $("dischargeInput").value,
    symptoms: [...selectedSymptoms],
    note: $("noteInput").value.trim(),
    phase: phaseForDate(parseDate(date)),
    updatedAt: new Date().toISOString()
  };
  selectedDate = parseDate(date);
  saveState();
  $("checkinDialog").close();
  renderAll();
  toast("已保存。你记录的是线索，不是给自己打分。");
}

function openPeriodDialog() {
  if (isFutureDate(selectedDate)) return;
  $("periodStartInput").value = dateKey(selectedDate);
  $("periodDialog").showModal();
}

function savePeriodStart(e) {
  e.preventDefault();
  const value = $("periodStartInput").value;
  if (!state.periodStarts.includes(value)) state.periodStarts.push(value);
  state.periodStarts.sort();
  state.profile.lastPeriod = value;
  if (!state.logs[value]) {
    state.logs[value] = {date:value,mood:3,energy:3,fatigue:0,pain:0,sleep:null,stress:null,bleeding:"medium",discharge:"",symptoms:[],note:"",phase:"menstrual",updatedAt:new Date().toISOString()};
  } else {
    state.logs[value].bleeding = state.logs[value].bleeding === "none" ? "medium" : state.logs[value].bleeding;
    state.logs[value].phase = "menstrual";
  }
  selectedDate = parseDate(value);
  saveState();
  $("periodDialog").close();
  renderAll();
  renderCalendar();
  toast("已把这一天设为新周期第 1 天。");
}

function renderCalendar() {
  const y = calendarCursor.getFullYear();
  const m = calendarCursor.getMonth();
  $("calendarMonthTitle").textContent = new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"long"}).format(calendarCursor);
  const first = new Date(y,m,1,12);
  const mondayIndex = (first.getDay()+6)%7;
  const start = addDays(first,-mondayIndex);
  let html = "";
  for(let i=0;i<42;i++) {
    const d = addDays(start,i), key=dateKey(d);
    const log = state.logs[key];
    const isActualPeriod = log && ["spotting","light","medium","heavy","hourly"].includes(log.bleeding);
    const isPredictedPeriod = !isActualPeriod && (getCycleInfo(d)?.day || 99) <= (state.profile.periodLength || 5);
    html += `<button class="calendar-day ${d.getMonth()!==m?"outside":""} ${key===dateKey(new Date())?"today":""} ${key===dateKey(selectedDate)?"selected":""} ${isActualPeriod?"period":""} ${isPredictedPeriod?"predicted":""} ${log?"logged":""}" data-date="${key}">${d.getDate()}</button>`;
  }
  $("calendarGrid").innerHTML = html;
  qsa(".calendar-day").forEach(btn=>btn.addEventListener("click",()=>showSelectedDay(btn.dataset.date)));
}

function showSelectedDay(key) {
  const log = state.logs[key];
  const d = parseDate(key);
  const panel = $("selectedDayPanel");
  panel.classList.remove("hidden");
  const future = isFutureDate(d);
  const summary = log ? `<div class="selected-day-summary">
    <div class="metric-row"><span>心情</span><b>${log.mood}/5</b></div>
    <div class="metric-row"><span>精力</span><b>${log.energy}/5</b></div>
    <div class="metric-row"><span>乏力</span><b>${log.fatigue ?? Math.max(0,5-(log.energy||3))}/5</b></div>
    <div class="metric-row"><span>疼痛</span><b>${log.pain}/10</b></div>
    <div class="metric-row"><span>睡眠</span><b>${log.sleep ?? "未记录"}${log.sleep!=null?" 小时":""}</b></div>
    <div class="metric-row"><span>症状</span><b>${log.symptoms?.join("、") || "无"}</b></div>
    ${log.note ? `<p>${escapeHtml(log.note)}</p>`:""}
  </div>` : `<p class="soft-note">${future?"这是未来日期，可以先查看阶段、天气和生活规划。":"这一天还没有记录，可以补记当时的真实感受。"}</p>`;
  panel.innerHTML = `<div class="section-head"><div><span class="eyebrow">${formatDate(d,{year:true,weekday:true})}</span><h2>${log ? (PHASES[log.phase]?.name || "周期记录") : (future?"提前规划":"暂无记录")}</h2></div></div>
    ${summary}
    <div class="today-actions"><button id="calendarPlanBtn" class="primary-btn">查看这一天安排</button>${future?"":`<button id="calendarCheckinBtn" class="secondary-btn">${log?"编辑记录":"补记这一天"}</button>`}</div>`;
  $("calendarPlanBtn").addEventListener("click",()=>{ setSelectedDate(d); showView("mainView"); });
  if (!future) $("calendarCheckinBtn").addEventListener("click",()=>openCheckin(d));
}
