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
import yuezhiBanner from '../assets/banners/yuezhi';
import thirteenthBanner from '../assets/banners/thirteenth';
import ledgerBanner from '../assets/banners360/ledger';
import acgBanner from '../assets/banners360/acg';
import focusBanner from '../assets/banners360/focus';
import rainBanner from '../assets/banners360/rain';
import xiexiuBanner from '../assets/banners360/xiexiu';

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

const bannerMap: Record<string, string> = {
  'app-1': yuezhiBanner,
  'app-2': ledgerBanner,
  'app-3': acgBanner,
  'app-4': focusBanner,
  'app-5': rainBanner,
  'app-6': xiexiuBanner,
  'app-7': thirteenthBanner
};

function AppBanner({ app, large = false }: { app: MiniApp; large?: boolean }) {
  const src = bannerMap[app.id];

  return (
    <div className={`relative overflow-hidden bg-[#071640] ${large ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}>
      <img
        src={src}
        alt={`${app.title} 轻动漫横幅`}
        className={`h-full w-full object-cover object-center ${large ? '' : 'transition-transform duration-500 group-hover:scale-[1.025]'}`}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061237]/35 via-transparent to-transparent" />
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
      <motion.button
        type="button"
        aria-label="关闭介绍"
        className="fixed inset-0 z-[80] cursor-default bg-slate-950/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label={`${app.title} 使用介绍`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="fixed inset-x-0 bottom-0 z-[81] max-h-[94vh] overflow-hidden rounded-t-[30px] border border-white/15 bg-[#091a49] shadow-[0_-30px_100px_rgba(0,0,0,.65)] sm:left-1/2 sm:right-auto sm:top-1/2 sm:bottom-auto sm:w-[92%] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px]"
      >
        <div className="relative">
          <AppBanner app={app} large />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-slate-950/70 text-white shadow-lg backdrop-blur transition hover:bg-slate-950/90"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#091a49] via-[#091a49]/75 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-black">
              <span className="rounded-full border border-white/20 bg-slate-950/55 px-3 py-1.5 text-white backdrop-blur">{app.category}</span>
              {app.tag && <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-400/25 px-3 py-1.5 text-fuchsia-50 backdrop-blur">{app.tag}</span>}
            </div>
            <h2 className="text-2xl font-black text-white drop-shadow-lg sm:text-3xl">{app.title}</h2>
          </div>
        </div>

        <div className="custom-scrollbar max-h-[52vh] overflow-y-auto px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
          <p className="text-sm leading-7 text-blue-100/75 sm:text-base">{app.intro}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className={`mb-2 text-xs font-black ${tone.accent}`}>适合谁？</div>
            <p className="text-sm leading-6 text-blue-100/68">{app.audience}</p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><Sparkles className={`h-4 w-4 ${tone.accent}`} />可以做什么</h3>
              <div className="space-y-2">
                {app.features.map((feature) => (
                  <div key={feature} className="flex gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs leading-5 text-blue-100/70">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.accent}`} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><ArrowRight className={`h-4 w-4 ${tone.accent}`} />怎么开始</h3>
              <div className="space-y-2">
                {app.steps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs leading-5 text-blue-100/70">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black ${tone.accent}`}>{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {app.notice && (
            <div className="mt-5 rounded-2xl border border-pink-300/15 bg-pink-400/[0.08] p-4 text-xs leading-6 text-pink-100/75">
              <span className="font-black text-pink-200">进入前请知道：</span>{app.notice}
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-white/10 bg-[#071640] p-4 sm:px-7 sm:py-5">
          <button type="button" onClick={onClose} className="h-12 flex-1 rounded-2xl border border-white/15 bg-white/[0.06] text-sm font-black text-blue-100/70 transition hover:bg-white/10">先不进入</button>
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-12 flex-[1.65] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${tone.button} text-sm font-black text-white shadow-[0_12px_34px_rgba(168,85,247,.32)] transition hover:-translate-y-0.5`}
          >
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
