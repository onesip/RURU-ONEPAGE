function renderInsights() {
  const intervals = getCycleIntervals();
  $("avgCycleStat").textContent = intervals.length ? `${Math.round(intervals.reduce((a,b)=>a+b,0)/intervals.length)} 天` : "数据不足";
  const periodDays = Object.values(state.logs).filter(x=>["spotting","light","medium","heavy","hourly"].includes(x.bleeding)).length;
  const cycleCount = Math.max(1,state.periodStarts.length);
  $("avgPeriodStat").textContent = periodDays ? `约 ${(periodDays/cycleCount).toFixed(1)} 天` : "数据不足";
  let streak=0;
  for(let i=0;i<90;i++){
    const key=dateKey(addDays(new Date(),-i));
    if(state.logs[key]) streak++; else if(i>0) break;
  }
  $("streakStat").textContent = streak ? `${streak} 天` : "从今天开始";
  const logs = Object.values(state.logs);
  const groups = {menstrual:[],follicular:[],ovulation:[],luteal:[]};
  logs.forEach(l => groups[l.phase]?.push(l));
  const names = {menstrual:"经期",follicular:"卵泡期",ovulation:"排卵估算",luteal:"黄体期"};
  const rows = Object.entries(groups).map(([phase,arr])=>{
    const mood = arr.length ? arr.reduce((s,l)=>s+Number(l.mood||3),0)/arr.length : 0;
    const fatigue = arr.length ? arr.reduce((s,l)=>s+Number(l.fatigue ?? Math.max(0,5-Number(l.energy||3))),0)/arr.length : 0;
    return {phase,name:names[phase],mood,fatigue,count:arr.length};
  });
  if (logs.length >= 7) {
    $("phaseInsightChart").innerHTML = rows.map(r=>`<div class="phase-insight-group">
      <div class="phase-insight-title"><b>${r.name}</b><small>${r.count} 天记录</small></div>
      <div class="metric-bar-row mood"><span>心情</span><div class="bar-track"><div class="bar-fill" style="width:${r.mood*20}%"></div></div><b>${r.mood?r.mood.toFixed(1):"—"}/5</b></div>
      <div class="metric-bar-row fatigue"><span>乏力</span><div class="bar-track"><div class="bar-fill" style="width:${r.fatigue*20}%"></div></div><b>${r.count?r.fatigue.toFixed(1):"—"}/5</b></div>
    </div>`).join("");
    $("insightEmpty").classList.add("hidden");
  } else {
    $("phaseInsightChart").innerHTML = "";
    $("insightEmpty").classList.remove("hidden");
  }
  const lutealLogs = groups.luteal;
  const otherLogs = [...groups.menstrual,...groups.follicular,...groups.ovulation];
  if (lutealLogs.length >= 3 && otherLogs.length >= 3) {
    const avgMood = arr => arr.reduce((s,l)=>s+l.mood,0)/arr.length;
    const diff = avgMood(otherLogs)-avgMood(lutealLogs);
    $("pmsInsight").innerHTML = diff >= .7
      ? `<b>目前出现了经前心情偏低的线索。</b><p>你的黄体期平均心情比其他阶段低约 ${diff.toFixed(1)} 分。但这还不是诊断；建议继续记录至少 2 个周期，并同时看睡眠、压力和现实事件。</p>`
      : `<b>目前没有明显证据显示低落只集中在经前。</b><p>这并不代表你的感受不真实，只说明现有记录更像是由多种因素共同影响。</p>`;
  } else {
    $("pmsInsight").innerHTML = `<p>至少需要黄体期和其他阶段各 3 天记录，才能做最基础的对比。诊断经前相关障碍通常需要跨周期的前瞻性记录。</p>`;
  }
}

function openProfileDialog() {
  const p=state.profile;
  $("editAgeInput").value=p.age;
  $("editCycleInput").value=p.cycleLength;
  $("editPeriodInput").value=p.periodLength;
  $("editHeightInput").value=p.height ?? "";
  $("editWeightInput").value=p.weight ?? "";
  const radio=document.querySelector(`input[name="editHormonal"][value="${p.hormonal}"]`);
  if(radio) radio.checked=true;
  $("profileDialog").showModal();
}

function saveProfile(e) {
  e.preventDefault();
  state.profile = {
    ...state.profile,
    age:Number($("editAgeInput").value),
    cycleLength:Number($("editCycleInput").value),
    periodLength:Number($("editPeriodInput").value),
    height:$("editHeightInput").value ? Number($("editHeightInput").value) : null,
    weight:$("editWeightInput").value ? Number($("editWeightInput").value) : null,
    hormonal:document.querySelector('input[name="editHormonal"]:checked')?.value || "unsure"
  };
  saveState();
  $("profileDialog").close();
  renderAll();
  toast("设置已更新。");
}

function doctorSummaryText() {
  const intervals=getCycleIntervals();
  const logs=Object.values(state.logs).sort((a,b)=>a.date.localeCompare(b.date));
  const avg = intervals.length ? (intervals.reduce((a,b)=>a+b,0)/intervals.length).toFixed(1) : "数据不足";
  const range = intervals.length ? `${Math.min(...intervals)}–${Math.max(...intervals)} 天` : "数据不足";
  const painLogs=logs.filter(l=>l.pain>=5);
  const heavyLogs=logs.filter(l=>["heavy","hourly"].includes(l.bleeding));
  const lowMood=logs.filter(l=>l.mood<=2);
  const highFatigue=logs.filter(l=>Number(l.fatigue ?? Math.max(0,5-Number(l.energy||3)))>=4);
  const symptoms={};
  logs.forEach(l=>(l.symptoms||[]).forEach(s=>symptoms[s]=(symptoms[s]||0)+1));
  const top=Object.entries(symptoms).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>`${x[0]}（${x[1]}天）`).join("、") || "无足够记录";
  return `月知健康记录摘要
生成日期：${dateKey(new Date())}

基础情况
- 年龄：${state.profile.age}
- 是否使用激素类避孕：${state.profile.hormonal==="yes"?"是":state.profile.hormonal==="no"?"否":"不确定"}
- 记录周期数：${state.periodStarts.length}
- 每日记录天数：${logs.length}

周期
- 平均周期长度：${avg}${avg==="数据不足"?"":" 天"}
- 已观察范围：${range}
- 月经开始日期：${state.periodStarts.join("、") || "无"}

出血与疼痛
- 较多/每小时浸透记录：${heavyLogs.length} 天
- 疼痛 ≥5/10：${painLogs.length} 天
- 最高疼痛：${logs.length?Math.max(...logs.map(l=>l.pain)):"无记录"}/10

情绪与症状
- 心情 ≤2/5：${lowMood.length} 天
- 乏力 ≥4/5：${highFatigue.length} 天
- 最常记录的症状：${top}

备注
- 以上阶段和排卵均为日历估算，不能确认是否排卵。
- 请结合实际病史、用药、妊娠可能、检查结果由专业人员判断。`;
}

function showDoctorSummary() {
  $("doctorSummary").textContent=doctorSummaryText();
  $("summaryDialog").showModal();
}

async function copySummary() {
  try { await navigator.clipboard.writeText($("doctorSummary").textContent); toast("摘要已复制。"); }
  catch { toast("复制失败，请长按文本手动复制。"); }
}

function exportJson() { download(`yuezhi-backup-${dateKey(new Date())}.json`, JSON.stringify(state,null,2), "application/json"); }
function exportCsv() {
  const headers=["date","phase","mood","energy","fatigue","pain","sleep","stress","bleeding","discharge","symptoms","note"];
  const lines=[headers.join(",")];
  Object.values(state.logs).sort((a,b)=>a.date.localeCompare(b.date)).forEach(l=>{
    lines.push(headers.map(h=>csvCell(h==="symptoms"?(l.symptoms||[]).join("|"):(l[h]??""))).join(","));
  });
  download(`yuezhi-records-${dateKey(new Date())}.csv`, "\ufeff"+lines.join("\n"), "text/csv;charset=utf-8");
}
function csvCell(v) { return `"${String(v).replaceAll('"','""')}"`; }
function download(name,content,type) {
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=name;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),500);
  toast("文件已导出。");
}
function deleteData() {
  if (!confirm("确定删除全部本地记录吗？此操作无法恢复。")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}
function toast(message) {
  const el=$("toast");
  el.textContent=message;el.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer=setTimeout(()=>el.classList.add("hidden"),2600);
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
initialize();
