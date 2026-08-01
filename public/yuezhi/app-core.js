"use strict";

const STORAGE_KEY = "yuezhi_v1";
const state = loadState();
let calendarCursor = new Date();
let selectedDate = new Date();
let selectedSymptoms = new Set();
let weatherCache = null;
let weatherRequestId = 0;

const $ = (id) => document.getElementById(id);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const PHASES = {
  menstrual: {
    name: "经期", color: "#ef6686",
    subtitle: "身体正在完成一次周期的结束与重新开始。",
    items: [
      ["↘", "能量可能偏低", "出血、疼痛或睡眠变化都可能让你更容易疲惫。"],
      ["≈", "腹部或腰背不适", "子宫收缩与炎症介质变化可能带来痉挛、腰酸或肠胃反应。"],
      ["◌", "更需要慢一点", "不是必须停下所有事，但可以主动降低不必要的消耗。"]
    ]
  },
  follicular: {
    name: "卵泡期", color: "#56a8d8",
    subtitle: "月经后到排卵前，卵泡逐步发育；这一阶段长短最容易变化。",
    items: [
      ["↗", "精力可能回升", "部分人会感觉疲惫减少、行动意愿变强，但个体差异很大。"],
      ["✦", "思路可能更清晰", "睡眠、压力和生活事件同样会明显影响专注力，不要只归因于周期。"],
      ["○", "分泌物会变化", "接近排卵时可能更湿润或透明拉丝，但仅凭它不能确认排卵。"]
    ]
  },
  ovulation: {
    name: "排卵估算期", color: "#d8a238",
    subtitle: "这是按周期长度推算的时间窗口，不代表已经确认排卵。",
    items: [
      ["◎", "分泌物可能增多", "部分人会出现透明、湿润或拉丝状分泌物。"],
      ["↟", "社交或欲望可能变化", "有些人会感觉更外向或性欲提高，也有人完全没有变化。"],
      ["!", "不能当作避孕依据", "排卵会受压力、疾病、旅行和周期波动影响，日历只能估算。"]
    ]
  },
  luteal: {
    name: "黄体期", color: "#9569d0",
    subtitle: "排卵后到下次月经前，孕酮通常升高后再下降。",
    items: [
      ["≈", "更容易胀或饿", "部分人会有腹胀、乳房胀、食欲变化或头痛。"],
      ["☁", "情绪可能更敏感", "易怒、低落或焦虑可能在经前出现；若明显影响生活，应认真求助。"],
      ["◇", "恢复比硬撑重要", "规律睡眠、适度活动和减少额外压力，通常比责怪自己更有用。"]
    ]
  }
};

const SYMPTOMS = [
  "腹胀","乳房胀痛","头痛","腰酸","腹痛","痘痘","食欲增加","恶心",
  "便秘","腹泻","怕冷","睡不着","嗜睡","易怒","焦虑","低落","想哭",
  "注意力差","性欲变化","偏头痛","眩晕"
];

function defaultState() {
  return {
    profile: null,
    periodStarts: [],
    logs: {},
    weatherLocation: null,
    createdAt: new Date().toISOString()
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && typeof parsed === "object") return { ...defaultState(), ...parsed };
    const legacy = JSON.parse(localStorage.getItem("yuezhi_public_v1"));
    if (legacy && typeof legacy === "object" && legacy.profile) {
      const migrated = defaultState();
      migrated.profile = {
        age: Number(legacy.profile.age || 28),
        lastPeriod: legacy.starts?.slice().sort().at(-1) || dateKey(new Date()),
        cycleLength: Number(legacy.profile.cycle || 28),
        periodLength: Number(legacy.profile.period || 5),
        height: null, weight: null, hormonal: "unsure", goals: ["body","mood","planning"]
      };
      migrated.periodStarts = [...(legacy.starts || [migrated.profile.lastPeriod])];
      migrated.logs = legacy.logs || {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function parseDate(value) {
  const [y,m,d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2,"0");
  const d = String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function daysBetween(a,b) {
  const one = new Date(a.getFullYear(),a.getMonth(),a.getDate());
  const two = new Date(b.getFullYear(),b.getMonth(),b.getDate());
  return Math.round((two - one) / 86400000);
}

function formatDate(date, opts={}) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: opts.long ? "long" : "short",
    day: "numeric",
    ...(opts.weekday ? {weekday:"short"} : {}),
    ...(opts.year ? {year:"numeric"} : {})
  }).format(date);
}

function getAverageCycle() {
  const starts = [...state.periodStarts].sort();
  if (starts.length < 2) return state.profile?.cycleLength || 28;
  const intervals = [];
  for (let i=1;i<starts.length;i++) {
    const n = daysBetween(parseDate(starts[i-1]), parseDate(starts[i]));
    if (n >= 15 && n <= 90) intervals.push(n);
  }
  if (!intervals.length) return state.profile?.cycleLength || 28;
  return Math.round(intervals.reduce((a,b)=>a+b,0)/intervals.length);
}

function getCycleIntervals() {
  const starts = [...state.periodStarts].sort();
  const out = [];
  for (let i=1;i<starts.length;i++) {
    const n = daysBetween(parseDate(starts[i-1]), parseDate(starts[i]));
    if (n >= 15 && n <= 90) out.push(n);
  }
  return out;
}

function getLastPeriodStart(onDate = new Date()) {
  const key = dateKey(onDate);
  const starts = state.periodStarts.filter(d => d <= key).sort();
  return starts.length ? parseDate(starts[starts.length-1]) : null;
}

function getCycleInfo(date = new Date()) {
  const avg = getAverageCycle();
  const periodLength = state.profile?.periodLength || 5;
  const starts = [...state.periodStarts].sort();
  if (!starts.length) return null;
  let last = getLastPeriodStart(date);
  if (!last) {
    const first = parseDate(starts[0]);
    const back = Math.ceil(Math.abs(daysBetween(first,date)) / avg);
    last = addDays(first, -back * avg);
  }
  const rawDay = daysBetween(last,date) + 1;
  const cyclesElapsed = Math.floor((rawDay - 1) / avg);
  const day = ((rawDay - 1) % avg + avg) % avg + 1;
  const estimatedCycleStart = addDays(last, cyclesElapsed * avg);
  const estimatedOvulation = Math.max(periodLength + 2, avg - 14);
  let phase = "luteal";
  if (day <= periodLength) phase = "menstrual";
  else if (day < estimatedOvulation - 1) phase = "follicular";
  else if (day <= estimatedOvulation + 1) phase = "ovulation";
  const nextPeriod = addDays(estimatedCycleStart, avg);
  return { last: estimatedCycleStart, avg, day, periodLength, estimatedOvulation, phase, nextPeriod };
}

function phaseForDate(date) {
  return getCycleInfo(date)?.phase || "follicular";
}

function showView(id) {
  qsa(".view").forEach(v => v.classList.add("hidden"));
  $(id).classList.remove("hidden");
  qsa("#bottomNav button").forEach(b => b.classList.toggle("active", b.dataset.view === id));
  if (id === "mainView") renderAll();
  if (id === "calendarView") renderCalendar();
  if (id === "insightsView") renderInsights();
  if (id === "settingsView") renderWeatherLocationStatus();
  window.scrollTo({top:0, behavior:"smooth"});
}
