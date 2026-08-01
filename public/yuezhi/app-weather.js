function renderWeatherLocationStatus() {
  const loc = state.weatherLocation;
  if (!$("weatherLocationStatus")) return;
  if (!loc) {
    $("weatherLocationStatus").innerHTML = "尚未设置地区。天气功能保持关闭。";
    $("clearWeatherLocationBtn").disabled = true;
  } else {
    $("weatherLocationStatus").innerHTML = `<b>${escapeHtml(loc.label || "已设置地区")}</b><br>坐标约 ${Number(loc.lat).toFixed(2)}, ${Number(loc.lon).toFixed(2)}；只用于天气。`;
    $("clearWeatherLocationBtn").disabled = false;
  }
}

function useCurrentLocation() {
  if (!navigator.geolocation) { toast("当前浏览器不支持定位，请改用城市搜索。"); return; }
  const buttons = [$("inlineLocationBtn"), $("useCurrentLocationBtn")];
  buttons.forEach(b=>{ if(b){ b.disabled=true; b.textContent="定位中…"; }});
  navigator.geolocation.getCurrentPosition(pos => {
    state.weatherLocation = {lat:Number(pos.coords.latitude.toFixed(2)),lon:Number(pos.coords.longitude.toFixed(2)),label:"当前位置附近",source:"device",timezone:"auto"};
    weatherCache = null;
    saveState();
    buttons.forEach(b=>{ if(b){ b.disabled=false; b.textContent=b.id==="inlineLocationBtn"?"更新位置":"使用当前位置"; }});
    renderWeatherLocationStatus(); renderDayPlan(); toast("已开启本地天气。");
  }, err => {
    buttons.forEach(b=>{ if(b){ b.disabled=false; b.textContent=b.id==="inlineLocationBtn"?"开启天气":"使用当前位置"; }});
    const msg = err.code===1 ? "定位权限被拒绝，可以在设置中输入城市。" : "暂时无法取得位置，请稍后重试或输入城市。";
    toast(msg);
  }, {enableHighAccuracy:false, timeout:10000, maximumAge:3600000});
}

async function searchCityLocation() {
  const query = $("citySearchInput").value.trim();
  if (query.length < 2) { toast("请输入至少两个字的城市名。"); return; }
  const btn = $("citySearchBtn"); btn.disabled=true; btn.textContent="搜索中…";
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=zh&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("geocoding");
    const data = await res.json();
    const hit = data.results?.[0];
    if (!hit) { toast("没有找到这个城市，请换一种写法。"); return; }
    state.weatherLocation = {
      lat:Number(Number(hit.latitude).toFixed(3)), lon:Number(Number(hit.longitude).toFixed(3)),
      label:[hit.name,hit.admin1,hit.country].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).join(" · "),
      source:"city", timezone:hit.timezone || "auto"
    };
    weatherCache=null; saveState(); renderWeatherLocationStatus(); renderDayPlan(); toast("城市已设置。");
  } catch { toast("城市搜索失败，请检查网络后重试。"); }
  finally { btn.disabled=false; btn.textContent="设置城市"; }
}

function clearWeatherLocation() {
  state.weatherLocation=null; weatherCache=null; saveState(); renderWeatherLocationStatus(); renderDayPlan(); toast("已关闭天气功能。");
}

async function fetchWeatherMap() {
  const loc = state.weatherLocation;
  if (!loc) return null;
  const cacheKey = `${loc.lat},${loc.lon}`;
  if (weatherCache && weatherCache.key===cacheKey && Date.now()-weatherCache.time<1800000) return weatherCache.map;
  const daily = ["weather_code","temperature_2m_max","temperature_2m_min","apparent_temperature_max","precipitation_probability_max","precipitation_sum","wind_speed_10m_max","uv_index_max"].join(",");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(loc.lat)}&longitude=${encodeURIComponent(loc.lon)}&daily=${daily}&timezone=auto&past_days=92&forecast_days=16`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("weather");
  const data = await res.json();
  const map={};
  (data.daily?.time||[]).forEach((date,i)=>{
    map[date]={code:data.daily.weather_code?.[i],max:data.daily.temperature_2m_max?.[i],min:data.daily.temperature_2m_min?.[i],apparent:data.daily.apparent_temperature_max?.[i],rainChance:data.daily.precipitation_probability_max?.[i],rain:data.daily.precipitation_sum?.[i],wind:data.daily.wind_speed_10m_max?.[i],uv:data.daily.uv_index_max?.[i]};
  });
  weatherCache={key:cacheKey,time:Date.now(),map};
  return map;
}

function weatherLabel(code) {
  if (code===0) return ["☀","晴"];
  if ([1,2].includes(code)) return ["◔","晴间多云"];
  if (code===3) return ["☁","阴"];
  if ([45,48].includes(code)) return ["≋","雾"];
  if (code>=51 && code<=67) return ["☂","雨"];
  if (code>=71 && code<=77) return ["❄","雪"];
  if (code>=80 && code<=82) return ["☔","阵雨"];
  if (code>=85 && code<=86) return ["❄","阵雪"];
  if (code>=95) return ["ϟ","雷雨"];
  return ["⌁","天气"];
}

async function renderDayPlan() {
  const requestId=++weatherRequestId;
  const loc=state.weatherLocation;
  const key=dateKey(selectedDate);
  $("inlineLocationBtn").classList.toggle("hidden", !!loc);
  let weather=null;
  if (!loc) {
    $("inlineLocationBtn").textContent="开启天气";
    $("weatherIcon").textContent="⌁"; $("weatherTitle").textContent="尚未开启本地天气";
    $("weatherDetail").textContent="允许定位或在设置中填写城市后，建议会结合温度、降雨、风和紫外线。"; $("weatherMeta").textContent="";
    renderPlanCards(null); return;
  }
  $("weatherIcon").textContent="…"; $("weatherTitle").textContent=`正在获取 ${loc.label || "本地"} 天气`;
  $("weatherDetail").textContent="天气只作为辅助因素，不会覆盖你的疼痛、疲劳和意愿。"; $("weatherMeta").textContent="";
  renderPlanCards(null);
  try {
    const map=await fetchWeatherMap();
    if (requestId!==weatherRequestId || key!==dateKey(selectedDate)) return;
    weather=map?.[key] || null;
    if (!weather) {
      const delta=daysBetween(new Date(),selectedDate);
      $("weatherIcon").textContent="⌁"; $("weatherTitle").textContent=delta>16?"该日期还没有可靠短期预报":delta<-92?"该历史日期超出快捷天气范围":"这一天暂时没有天气数据";
      $("weatherDetail").textContent="仍会按周期阶段和已有记录生成基础建议。"; $("weatherMeta").textContent=loc.label || "";
    } else {
      const [icon,label]=weatherLabel(weather.code);
      $("weatherIcon").textContent=icon; $("weatherTitle").textContent=`${loc.label || "本地"} · ${label} · ${Math.round(weather.min)}–${Math.round(weather.max)}°C`;
      const details=[];
      if (weather.rainChance!=null) details.push(`降雨 ${Math.round(weather.rainChance)}%`);
      if (weather.wind!=null) details.push(`最大风速 ${Math.round(weather.wind)} km/h`);
      if (weather.uv!=null) details.push(`UV ${Number(weather.uv).toFixed(1)}`);
      $("weatherDetail").textContent=details.join(" · ") || "天气数据可用";
      $("weatherMeta").textContent=isFutureDate(selectedDate)?"预报":"历史/近期数据";
    }
    renderPlanCards(weather);
  } catch {
    if (requestId!==weatherRequestId) return;
    $("weatherIcon").textContent="!"; $("weatherTitle").textContent="天气暂时获取失败"; $("weatherDetail").textContent="请检查网络；基础建议仍然可用。"; $("weatherMeta").textContent=loc.label || "";
    renderPlanCards(null);
  }
}

function renderPlanCards(weather) {
  const info=getCycleInfo(selectedDate);
  if (!info) return;
  const phase=info.phase;
  const log=state.logs[dateKey(selectedDate)];
  const pain=Number(log?.pain||0), fatigue=Number(log?.fatigue ?? 0), sleep=log?.sleep, bleeding=log?.bleeding || "none";
  const hot=weather?.max>=28 || weather?.apparent>=30, cold=weather?.max<=8, wet=(weather?.rainChance||0)>=60 || (weather?.rain||0)>=5, windy=(weather?.wind||0)>=35, uv=(weather?.uv||0);
  let exercise={level:"按状态",title:"适度活动",text:"先用热身后的真实体感决定强度，不需要为了‘周期阶段’硬完成训练。",tips:[]};
  if (phase==="menstrual") { exercise.level="轻到中等"; exercise.title="可动，但不必硬撑"; exercise.text="没有明显不适时可以散步、拉伸或做较轻的力量训练；出血、腹痛和乏力明显时休息优先。"; }
  if (phase==="follicular") { exercise.level="较适合"; exercise.title="可安排常规或进阶训练"; exercise.text="若睡眠和恢复良好，可以做力量、耐力或间歇训练；阶段不是自动获得好状态。"; }
  if (phase==="ovulation") { exercise.level="状态允许"; exercise.title="正常训练即可"; exercise.text="不用因为‘排卵期’刻意挑战极限，也没有必要自动降低强度，以当日恢复为准。"; }
  if (phase==="luteal") { exercise.level="中等优先"; exercise.title="保留一点余量"; exercise.text="如果体温感、腹胀、睡眠或经前不适上升，可把高强度改为稳态有氧、力量减量或灵活性训练。"; }
  if (pain>=7 || fatigue>=4 || ["heavy","hourly"].includes(bleeding)) { exercise.level="休息优先"; exercise.title="今天不适合硬练"; exercise.text="明显疼痛、重度乏力或大量出血时，休息、补水和处理症状比完成训练更重要。"; }
  else if (sleep!=null && sleep<6) exercise.tips.push("睡眠不足：把强度或训练量下调一级。");
  if (hot) exercise.tips.push("偏热：优先室内或早晚，缩短高强度时长并补水。");
  if (wet || windy) exercise.tips.push("降雨或大风：户外训练可改为室内方案。");
  let skin={level:"基础护理",title:"温和、稳定比频繁换产品重要",text:"按出油、干燥、敏感和痘痘的真实变化调整，不需要仅因周期更换整套护肤。",tips:[]};
  if (phase==="luteal") skin.tips.push("经前若更易出油或长痘，避免突然叠加强酸、磨砂或多种刺激性产品。");
  if (uv>=3) skin.tips.push(`UV ${Number(uv).toFixed(1)}：白天做好广谱防晒，并按户外时长补涂。`);
  if (cold || windy) skin.tips.push("寒冷或大风：加强保湿和屏障护理，减少过热水和过度清洁。");
  if (hot) skin.tips.push("炎热或出汗多：运动后尽快温和清洁，避免汗液和闷湿长时间停留。");
  let shower={level:"可以正常洗",title:"温水、快速、按舒适度",text:"经期可以正常洗澡和洗头，不需要‘避水’。避免过热水和长时间泡澡导致头晕或皮肤更干。",tips:[]};
  if (hot || log?.energy>=4) shower.tips.push("出汗后及时淋浴和更换干爽衣物。");
  if (pain>=4) shower.tips.push("温热淋浴可能让身体更放松，但不能替代对严重疼痛的评估。");
  if (fatigue>=4) shower.tips.push("乏力明显时缩短洗澡时间，注意防滑，避免独自长时间泡热水。");
  let intimacy={level:"看意愿",title:"不是‘该不该’，而是愿不愿意与舒不舒服",text:"任何阶段都应以双方明确同意、舒适度、可靠避孕和感染防护为前提。日历阶段不能确认排卵，也不能安全避孕。",tips:[]};
  if (phase==="ovulation") intimacy.tips.push("处于排卵估算窗口：如果不计划怀孕，更不能把日历当作避孕方式。");
  if (phase==="menstrual") intimacy.tips.push("经期也可以发生性行为，但是否进行完全取决于舒适度；使用屏障保护仍有意义。");
  if (pain>=5 || ["heavy","hourly"].includes(bleeding)) { intimacy.level="不勉强"; intimacy.tips.push("疼痛或出血较多：暂停或选择不引起不适的亲密方式。"); }
  if (log?.discharge==="unusual") { intimacy.level="先处理异常"; intimacy.tips.push("异味、异常颜色、瘙痒或疼痛时，先暂停可能刺激的性行为并考虑医疗检查。"); }
  let food={level:"均衡优先",title:"蛋白质、主食、蔬果和水都要有",text:"没有某一种‘周期神食物’。更实用的是根据出血、运动、胃口、腹胀和天气调整份量与组合。",tips:[]};
  if (phase==="menstrual" || ["medium","heavy","hourly"].includes(bleeding)) food.tips.push("有出血时可多安排富含铁和蛋白质的食物，并搭配富含维生素 C 的蔬果。");
  if (phase==="luteal") food.tips.push("经前更饿或腹胀时，规律进餐、足量蛋白质与纤维通常比极端节食更稳。");
  if (hot) food.tips.push("炎热或运动多：增加水分；大量出汗时可从正常饮食中补充盐分和碳水。");
  if (cold) food.tips.push("寒冷天气可选择温热、易消化的正餐，但不需要为了‘暖宫’强迫自己吃特定食物。");
  if (fatigue>=3) food.tips.push("乏力明显：不要只靠咖啡顶住，先确认是否吃够、喝够并获得休息。");
  const cards=[["🏃","健身",exercise],["🫧","护肤",skin],["🚿","洗澡",shower],["♡","亲密行为",intimacy],["🥗","饮食重点",food]];
  $("dayPlanGrid").innerHTML=cards.map((c,i)=>`<article class="plan-card ${i===4?"wide":""}"><div class="plan-card-head"><span>${c[0]}</span><b>${c[1]} · ${c[2].title}</b><em class="plan-level">${c[2].level}</em></div><p>${c[2].text}</p>${c[2].tips.length?`<ul>${c[2].tips.map(t=>`<li>${t}</li>`).join("")}</ul>`:""}</article>`).join("");
}
