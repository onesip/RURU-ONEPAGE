import React from 'react';
import { MiniApp } from '../types';
import {
  ArrowUpRight,
  CalendarDays,
  FlaskConical,
  Gamepad2,
  Heart,
  ListTodo,
  Sparkles,
  Star,
  Users,
  Wallet
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-6 w-6" />,
  Wallet: <Wallet className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  ListTodo: <ListTodo className="h-6 w-6" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" />,
  FlaskConical: <FlaskConical className="h-6 w-6" />
};

const toneMap = {
  rose: {
    bar: 'from-pink-400 to-fuchsia-500',
    icon: 'border-pink-300/25 bg-pink-300/10 text-pink-300',
    glow: 'group-hover:shadow-[0_24px_70px_-28px_rgba(244,114,182,0.55)]',
    link: 'text-pink-300'
  },
  lavender: {
    bar: 'from-violet-400 to-fuchsia-500',
    icon: 'border-violet-300/25 bg-violet-300/10 text-violet-300',
    glow: 'group-hover:shadow-[0_24px_70px_-28px_rgba(167,139,250,0.55)]',
    link: 'text-violet-300'
  },
  peach: {
    bar: 'from-orange-300 to-pink-400',
    icon: 'border-orange-300/25 bg-orange-300/10 text-orange-300',
    glow: 'group-hover:shadow-[0_24px_70px_-28px_rgba(251,146,60,0.48)]',
    link: 'text-orange-300'
  },
  mint: {
    bar: 'from-emerald-300 to-cyan-400',
    icon: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-300',
    glow: 'group-hover:shadow-[0_24px_70px_-28px_rgba(52,211,153,0.48)]',
    link: 'text-emerald-300'
  },
  sky: {
    bar: 'from-sky-300 to-violet-400',
    icon: 'border-sky-300/25 bg-sky-300/10 text-sky-300',
    glow: 'group-hover:shadow-[0_24px_70px_-28px_rgba(56,189,248,0.5)]',
    link: 'text-sky-300'
  }
};

export function AppCard({ app }: { app: MiniApp }) {
  const tone = toneMap[app.tone || 'rose'];

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0d2157]/90 p-5 shadow-[0_18px_55px_-32px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-300/30 hover:bg-[#10265f] sm:p-6 ${tone.glow}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} />
      <div className="app-card-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap gap-2">
          <span className="max-w-full truncate rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-black text-blue-100/75">
            {app.category}
          </span>
          {app.tag && (
            <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-2.5 py-1 text-[10px] font-black text-fuchsia-200">
              {app.tag}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {app.featured && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-300" title="如如精选">
              <Star className="h-3.5 w-3.5 fill-current" />
            </span>
          )}
          {app.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-2.5 py-1 text-[10px] font-black tracking-wider text-white shadow-[0_0_18px_rgba(217,70,239,0.28)]">
              <Sparkles className="h-3 w-3" />
              NEW
            </span>
          )}
        </div>
      </div>

      <div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${tone.icon} shadow-inner shadow-white/5 transition-transform duration-300 group-hover:scale-105`}>
        {iconMap[app.icon] || <Gamepad2 className="h-6 w-6" />}
      </div>

      <h3 className="relative mb-2 text-xl font-black tracking-tight text-white transition-colors group-hover:text-fuchsia-100">
        {app.title}
      </h3>
      <p className="relative mb-6 flex-grow text-sm leading-7 text-blue-100/58">{app.description}</p>

      <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-100/40">
          <CalendarDays className="h-3.5 w-3.5 text-fuchsia-300/70" />
          {app.dateAdded.replaceAll('-', '.')}
        </span>
        <span className={`inline-flex items-center gap-2 text-xs font-black ${tone.link}`}>
          打开体验
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] transition-all group-hover:rotate-45 group-hover:border-fuchsia-300/30 group-hover:bg-fuchsia-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </div>
    </a>
  );
}
