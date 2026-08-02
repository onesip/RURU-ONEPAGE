import React, { useEffect, useState } from 'react';
import { MiniApp } from '../types';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  Heart,
  ListTodo,
  Sparkles,
  Star,
  Users,
  Wallet,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import RURU_HERO_HD from '../assets/ruruHeroHd';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-5 w-5" />,
  Wallet: <Wallet className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  ListTodo: <ListTodo className="h-5 w-5" />,
  Gamepad2: <Gamepad2 className="h-5 w-5" />,
  FlaskConical: <FlaskConical className="h-5 w-5" />
};

const toneMap = {
  rose: { bar: 'from-pink-400 to-fuchsia-500', accent: 'text-pink-200', button: 'from-pink-500 to-fuchsia-500' },
  lavender: { bar: 'from-violet-400 to-fuchsia-500', accent: 'text-violet-200', button: 'from-violet-500 to-fuchsia-500' },
  peach: { bar: 'from-orange-300 to-pink-400', accent: 'text-orange-200', button: 'from-orange-400 to-pink-500' },
  mint: { bar: 'from-emerald-300 to-cyan-400', accent: 'text-emerald-200', button: 'from-emerald-400 to-cyan-500' },
  sky: { bar: 'from-sky-300 to-violet-400', accent: 'text-sky-200', button: 'from-sky-500 to-violet-500' }
};

function AppBanner({ app, large = false }: { app: MiniApp; large?: boolean }) {
  const height = large ? 'h-52 sm:h-60' : 'h-40';

  if (app.id === 'app-1') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#4c1d95] via-[#8b5cf6] to-[#f472b6]`}>
        <div className="absolute -left-6 -top-8 h-28 w-28 rounded-full bg-yellow-100/90 shadow-[0_0_55px_rgba(254,240,138,0.75)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(255,255,255,.95)_0_1px,transparent_2px),radial-gradient(circle_at_78%_18%,rgba(255,255,255,.8)_0_1px,transparent_2px)] bg-[length:72px_72px,96px_96px]" />
        <img src={RURU_HERO_HD} alt="" className="absolute -bottom-24 right-0 h-[270px] w-[210px] object-cover object-top opacity-95 sm:right-8" />
        <div className="absolute bottom-4 left-5 max-w-[58%]">
          <div className="mb-2 text-2xl">🌙 💗 ✨</div>
          <div className="text-sm font-black text-white/95">更懂身体的温柔提醒</div>
          <div className="mt-1 text-[11px] text-white/70">周期 · 情绪 · 精力</div>
        </div>
      </div>
    );
  }

  if (app.id === 'app-2') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#fda4af] via-[#f9a8d4] to-[#fbcfe8]`}>
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="absolute left-6 top-5 rotate-[-6deg] rounded-2xl border-2 border-white/70 bg-white/80 p-4 shadow-xl">
          <div className="mb-2 flex gap-2"><span className="h-2 w-14 rounded-full bg-pink-300"/><span className="h-2 w-6 rounded-full bg-amber-300"/></div>
          <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="flex gap-2"><span className="h-3 w-3 rounded-full bg-fuchsia-300"/><span className="h-3 w-20 rounded-full bg-slate-200"/></div>)}</div>
        </div>
        <div className="absolute bottom-3 right-5 text-[74px] drop-shadow-xl">🐱</div>
        <div className="absolute right-7 top-5 rounded-full bg-white/75 px-3 py-1 text-xs font-black text-pink-600 shadow">€ +1.20</div>
        <div className="absolute bottom-5 left-6 text-sm font-black text-[#831843]">把每一笔小开销变清楚</div>
      </div>
    );
  }

  if (app.id === 'app-3') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#312e81] via-[#6d28d9] to-[#db2777]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.14),transparent_55%)]" />
        <div className="absolute left-[12%] top-7 h-24 w-24 overflow-hidden rounded-full border-4 border-pink-300/80 bg-violet-300 shadow-[0_0_35px_rgba(244,114,182,.55)]">
          <img src={RURU_HERO_HD} alt="" className="h-full w-full object-cover object-top" />
        </div>
        <div className="absolute right-[13%] top-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-300/70 bg-[#172554] text-4xl shadow-[0_0_35px_rgba(103,232,249,.4)]">🎧</div>
        <div className="absolute left-1/2 top-[52%] h-[3px] w-[26%] -translate-x-1/2 rotate-[-8deg] bg-gradient-to-r from-pink-300 to-cyan-300" />
        <div className="absolute bottom-5 left-0 right-0 text-center text-sm font-black text-white">用热爱找到真正聊得来的人</div>
      </div>
    );
  }

  if (app.id === 'app-4') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#064e3b] via-[#0f766e] to-[#0891b2]`}>
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute left-7 top-5 w-[58%] rotate-[-3deg] rounded-2xl border border-white/30 bg-white/15 p-4 backdrop-blur-md">
          {[['今天最重要','bg-amber-300'],['完成方案','bg-emerald-300'],['运动 30 分钟','bg-cyan-300']].map(([label,color],i)=><div key={i} className="mb-2 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white"><span className={`flex h-5 w-5 items-center justify-center rounded-md ${color} text-emerald-950`}>{i<2?'✓':''}</span>{label}</div>)}
        </div>
        <div className="absolute bottom-4 right-6 text-6xl">⚡</div>
        <div className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-black text-emerald-100">3 / 5 DONE</div>
      </div>
    );
  }

  if (app.id === 'app-5') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#020617]`}>
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(110deg,transparent_0_47%,rgba(186,230,253,.28)_48%,transparent_49%),linear-gradient(110deg,transparent_0_67%,rgba(186,230,253,.2)_68%,transparent_69%)] [background-size:42px_42px]" />
        <div className="absolute bottom-0 left-[12%] h-[72%] w-[24%] bg-[#111827] [clip-path:polygon(0_22%,70%_0,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 right-[8%] h-[88%] w-[31%] bg-[#0b1222] [clip-path:polygon(30%_0,100%_22%,100%_100%,0_100%)]" />
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-7xl drop-shadow-[0_0_18px_rgba(147,197,253,.35)]">☂️</div>
        <div className="absolute bottom-4 left-5 rounded-full border border-sky-200/20 bg-slate-950/55 px-3 py-1 text-xs font-black text-sky-100 backdrop-blur">雨夜以后，客人才会出现</div>
      </div>
    );
  }

  if (app.id === 'app-6') {
    return (
      <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#1e1b4b] via-[#581c87] to-[#0f172a]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(232,121,249,.32),transparent_28%),radial-gradient(circle_at_25%_70%,rgba(167,139,250,.3),transparent_30%)]" />
        <div className="absolute left-8 top-5 rotate-[-8deg] text-6xl drop-shadow-[0_0_25px_rgba(216,180,254,.5)]">📖</div>
        <div className="absolute right-12 top-8 text-6xl drop-shadow-[0_0_25px_rgba(134,239,172,.45)]">🧪</div>
        <div className="absolute bottom-3 left-1/2 h-20 w-44 -translate-x-1/2 rounded-[50%] border border-fuchsia-300/25 bg-fuchsia-400/10 blur-[1px]" />
        <div className="absolute bottom-5 left-0 right-0 text-center text-sm font-black text-white">先看原理和风险，再决定要不要试</div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${height} bg-gradient-to-br from-[#020617] via-[#172554] to-[#3b0764]`}>
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[92px] font-black leading-none text-red-400/90 drop-shadow-[0_0_28px_rgba(248,113,113,.55)]">13</div>
      <div className="absolute left-6 top-5 rotate-[-7deg] rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/75 backdrop-blur">不要相信第七条</div>
      <div className="absolute bottom-5 right-6 rotate-[5deg] rounded-lg border border-red-300/30 bg-red-950/45 px-3 py-2 text-xs text-red-100">你确定读懂了吗？</div>
      <div className="absolute bottom-4 left-5 text-sm font-black text-white">每句话都可能改变前面的规则</div>
    </div>
  );
}

function AppIntroModal({ app, onClose }: { app: MiniApp; onClose: () => void }) {
  const tone = toneMap[app.tone || 'rose'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.button type="button" aria-label="关闭介绍" className="fixed inset-0 z-[80] cursor-default bg-slate-950/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label={`${app.title} 使用介绍`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="fixed inset-x-0 bottom-0 z-[81] max-h-[92vh] overflow-hidden rounded-t-[30px] border border-white/15 bg-[#091a49] shadow-[0_-30px_100px_rgba(0,0,0,.65)] sm:left-1/2 sm:right-auto sm:top-1/2 sm:bottom-auto sm:w-[92%] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px]"
      >
        <div className="relative">
          <AppBanner app={app} large />
          <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur transition hover:bg-slate-950/80">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#091a49] to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-black">
              <span className="rounded-full border border-white/15 bg-slate-950/45 px-3 py-1.5 text-white">{app.category}</span>
              {app.tag && <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/20 px-3 py-1.5 text-fuchsia-100">{app.tag}</span>}
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">{app.title}</h2>
          </div>
        </div>

        <div className="custom-scrollbar max-h-[58vh] overflow-y-auto px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
          <p className="text-sm leading-7 text-blue-100/75 sm:text-base">{app.intro}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className={`mb-2 text-xs font-black ${tone.accent}`}>适合谁？</div>
            <p className="text-sm leading-6 text-blue-100/68">{app.audience}</p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><Sparkles className={`h-4 w-4 ${tone.accent}`} />可以做什么</h3>
              <div className="space-y-2">
                {app.features.map((feature) => <div key={feature} className="flex gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs leading-5 text-blue-100/70"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.accent}`} />{feature}</div>)}
              </div>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><ArrowRight className={`h-4 w-4 ${tone.accent}`} />怎么开始</h3>
              <div className="space-y-2">
                {app.steps.map((step, index) => <div key={step} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs leading-5 text-blue-100/70"><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black ${tone.accent}`}>{index + 1}</span>{step}</div>)}
              </div>
            </div>
          </div>

          {app.notice && <div className="mt-5 rounded-2xl border border-pink-300/15 bg-pink-400/[0.08] p-4 text-xs leading-6 text-pink-100/75"><span className="font-black text-pink-200">进入前请知道：</span>{app.notice}</div>}
        </div>

        <div className="flex gap-3 border-t border-white/10 bg-[#071640] p-4 sm:px-7 sm:py-5">
          <button type="button" onClick={onClose} className="h-12 flex-1 rounded-2xl border border-white/15 bg-white/[0.06] text-sm font-black text-blue-100/70 transition hover:bg-white/10">先不进入</button>
          <a href={app.url} target="_blank" rel="noopener noreferrer" className={`inline-flex h-12 flex-[1.65] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${tone.button} text-sm font-black text-white shadow-[0_12px_34px_rgba(168,85,247,.32)] transition hover:-translate-y-0.5`}>
            我知道了，开始体验
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </motion.section>
    </>
  );
}

export function AppCard({ app }: { app: MiniApp }) {
  const [open, setOpen] = useState(false);
  const tone = toneMap[app.tone || 'rose'];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0d2157]/90 text-left shadow-[0_18px_55px_-32px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-300/35 hover:bg-[#10265f]"
      >
        <div className={`absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r ${tone.bar}`} />
        <AppBanner app={app} />
        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap gap-2">
              <span className="max-w-full truncate rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-black text-blue-100/75">{app.category}</span>
              {app.tag && <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-2.5 py-1 text-[10px] font-black text-fuchsia-200">{app.tag}</span>}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {app.featured && <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-300"><Star className="h-3.5 w-3.5 fill-current" /></span>}
              {app.isNew && <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-2.5 py-1 text-[10px] font-black tracking-wider text-white"><Sparkles className="h-3 w-3" />NEW</span>}
            </div>
          </div>

          <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] ${tone.accent}`}>{iconMap[app.icon] || <Gamepad2 className="h-5 w-5" />}</div>
          <h3 className="mb-2 text-xl font-black tracking-tight text-white transition-colors group-hover:text-fuchsia-100">{app.title}</h3>
          <p className="mb-5 flex-grow text-sm leading-7 text-blue-100/58">{app.description}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-100/40"><CalendarDays className="h-3.5 w-3.5 text-fuchsia-300/70" />{app.dateAdded.replaceAll('-', '.')}</span>
            <span className={`inline-flex items-center gap-2 text-xs font-black ${tone.accent}`}>先看介绍 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </div>
      </button>

      <AnimatePresence>{open && <AppIntroModal app={app} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
