function initialize() {
  renderSymptomChips();
  attachEvents();
  if (!state.profile) {
    $("setupView").classList.remove("hidden");
    $("bottomNav").classList.add("hidden");
    $("lastPeriodInput").value = dateKey(new Date());
  } else {
    $("mainView").classList.remove("hidden");
    $("bottomNav").classList.remove("hidden");
    renderAll();
  }
}

function attachEvents() {
  $("setupForm").addEventListener("submit", onSetup);
  $("openCheckinBtn").addEventListener("click", () => openCheckin(selectedDate));
  $("startPeriodBtn").addEventListener("click", openPeriodDialog);
  $("prevDayBtn").addEventListener("click", () => changeSelectedDate(-1));
  $("nextDayBtn").addEventListener("click", () => changeSelectedDate(1));
  $("todayJumpBtn").addEventListener("click", () => setSelectedDate(new Date()));
  $("selectedDateInput").addEventListener("change", e => setSelectedDate(parseDate(e.target.value)));
  $("inlineLocationBtn").addEventListener("click", useCurrentLocation);
  $("useCurrentLocationBtn").addEventListener("click", useCurrentLocation);
  $("citySearchBtn").addEventListener("click", searchCityLocation);
  $("citySearchInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); searchCityLocation(); } });
  $("clearWeatherLocationBtn").addEventListener("click", clearWeatherLocation);
  $("periodForm").addEventListener("submit", savePeriodStart);
  $("checkinForm").addEventListener("submit", saveCheckin);
  $("profileForm").addEventListener("submit", saveProfile);
  $("editProfileBtn").addEventListener("click", openProfileDialog);
  $("prevMonthBtn").addEventListener("click", () => { calendarCursor.setMonth(calendarCursor.getMonth()-1); renderCalendar(); });
  $("nextMonthBtn").addEventListener("click", () => { calendarCursor.setMonth(calendarCursor.getMonth()+1); renderCalendar(); });
  $("goInsightsBtn").addEventListener("click", () => showView("insightsView"));
  $("exportJsonBtn").addEventListener("click", exportJson);
  $("exportCsvBtn").addEventListener("click", exportCsv);
  $("exportSummaryBtn").addEventListener("click", showDoctorSummary);
  $("copySummaryBtn").addEventListener("click", copySummary);
  $("deleteDataBtn").addEventListener("click", deleteData);
  $("privacyBtn").addEventListener("click", () => $("privacyCover").classList.remove("hidden"));
  $("privacyCover").addEventListener("click", () => $("privacyCover").classList.add("hidden"));
  qsa("[data-close-dialog]").forEach(btn => btn.addEventListener("click", () => $(btn.dataset.closeDialog).close()));
  qsa("#bottomNav button").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
  ["mood","energy","fatigue","pain"].forEach(name => {
    $(`${name}Input`).addEventListener("input", updateRangeLabels);
  });
}

function onSetup(e) {
  e.preventDefault();
  const goals = qsa('input[name="goal"]:checked').map(x=>x.value);
  state.profile = {
    age: Number($("ageInput").value),
    lastPeriod: $("lastPeriodInput").value,
    cycleLength: Number($("cycleLengthInput").value),
    periodLength: Number($("periodLengthInput").value),
    height: $("heightInput").value ? Number($("heightInput").value) : null,
    weight: $("weightInput").value ? Number($("weightInput").value) : null,
    hormonal: document.querySelector('input[name="hormonal"]:checked').value,
    goals
  };
  state.periodStarts = [state.profile.lastPeriod];
  selectedDate = new Date();
  saveState();
  $("setupView").classList.add("hidden");
  $("mainView").classList.remove("hidden");
  $("bottomNav").classList.remove("hidden");
  renderAll();
  toast("已开始。先记录真实感受，不需要迎合任何‘标准周期’。");
}

function renderAll() {
  renderDateNavigator();
  renderToday();
  renderWeek();
  renderPersonalNotes();
  renderDashboardStats();
  renderAlerts();
  renderWeatherLocationStatus();
  renderDayPlan();
}

function setSelectedDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return;
  selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  calendarCursor = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 12);
  renderAll();
}

function changeSelectedDate(delta) { setSelectedDate(addDays(selectedDate, delta)); }
function isFutureDate(date) { return dateKey(date) > dateKey(new Date()); }

function renderDateNavigator() {
  const key = dateKey(selectedDate);
  const todayKey = dateKey(new Date());
  $("selectedDateInput").value = key;
  const delta = daysBetween(new Date(), selectedDate);
  $("todayJumpBtn").disabled = key === todayKey;
  $("dateContextLabel").textContent = delta === 0 ? "正在查看今天" : delta < 0 ? `正在回看 ${Math.abs(delta)} 天前；可以补记真实感受` : `正在规划 ${delta} 天后；周期和天气都只是估算`;
}

function renderToday() {
  const now = selectedDate;
  const info = getCycleInfo(now);
  if (!info) return;
  const phase = PHASES[info.phase];
  const relation = dateKey(now) === dateKey(new Date()) ? " · 今天" : isFutureDate(now) ? " · 规划" : " · 回看";
  $("todayDate").textContent = new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"}).format(now) + relation;
  $("phaseTitle").textContent = `周期第 ${info.day} 天`;
  $("phaseSubtitle").textContent = phase.subtitle;
  $("phaseDay").textContent = `D${info.day}`;
  $("phaseName").textContent = phase.name;
  $("phaseOrb").style.background = `linear-gradient(145deg, ${phase.color}, #8758ce)`;
  $("cycleProgress").style.width = `${Math.min(100, info.day/info.avg*100)}%`;
  $("trackMarker").style.left = `${Math.min(100, info.day/info.avg*100)}%`;
  $("phaseLegend").innerHTML = `<span>经期</span><span>卵泡期</span><span>排卵估算</span><span>黄体期</span>`;
  $("whyTitle").textContent = `${phase.name}，为什么可能这样？`;
  $("confidenceBadge").textContent = state.periodStarts.length >= 3 ? "结合你的记录" : "日历估算";
  $("phaseExplanation").innerHTML = phase.items.map(x => `<article class="explanation-item"><i>${x[0]}</i><b>${x[1]}</b><p>${x[2]}</p></article>`).join("");
  $("nextPeriodDate").textContent = formatDate(info.nextPeriod,{weekday:true});
  const delta = daysBetween(now,info.nextPeriod);
  $("nextPeriodHint").textContent = delta >= 0 ? `相对所选日期约 ${delta} 天后；实际日期可能前后波动` : "请记录新的月经开始日以更新估算";
  const future = isFutureDate(now);
  $("openCheckinBtn").disabled = future;
  $("startPeriodBtn").disabled = future;
  $("openCheckinBtn").textContent = future ? "未来日期仅供规划" : dateKey(now) === dateKey(new Date()) ? "记录今天" : "补记这一天";
  $("startPeriodBtn").textContent = dateKey(now) === dateKey(new Date()) ? "今天来月经了" : "这一天是月经第一天";
}

function renderDashboardStats() {
  const logs = Object.values(state.logs).sort((a,b)=>b.date.localeCompare(a.date));
  if (logs.length) {
    const mood = Number(logs[0].mood);
    const fatigue = Number(logs[0].fatigue ?? Math.max(0, 5 - Number(logs[0].energy || 3)));
    $("recentMood").textContent = `${["","很差","偏低","一般","不错","很好"][mood]}`;
    $("recentMoodHint").textContent = formatDate(parseDate(logs[0].date),{weekday:true}) + "的记录";
    $("recentFatigue").textContent = `${fatigue}/5 · ${fatigue===0?"没有":fatigue<=2?"轻微":fatigue<=4?"明显":"很重"}`;
    $("recentFatigueHint").textContent = formatDate(parseDate(logs[0].date),{weekday:true}) + "的记录";
  } else {
    $("recentMood").textContent = "尚未记录";
    $("recentMoodHint").textContent = "记录 3 天后更有意义";
    $("recentFatigue").textContent = "尚未记录";
    $("recentFatigueHint").textContent = "单独记录，更容易找规律";
  }
  const intervals = getCycleIntervals();
  if (intervals.length >= 2) {
    const spread = Math.max(...intervals)-Math.min(...intervals);
    $("stabilityText").textContent = spread <= 7 ? "相对稳定" : "波动较明显";
    $("stabilityHint").textContent = `最近周期相差约 ${spread} 天`;
  } else {
    $("stabilityText").textContent = "等待更多数据";
    $("stabilityHint").textContent = "至少需要 3 次月经开始日期";
  }
}
