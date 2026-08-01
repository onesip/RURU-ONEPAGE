import React from 'react';
import { MiniApp } from '../types';
import {
  Heart,
  Wallet,
  Users,
  ListTodo,
  Gamepad2,
  FlaskConical,
  Sparkles,
  ArrowUpRight,
  Star,
  CalendarDays
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Wallet: <Wallet className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  ListTodo: <ListTodo className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />
};

const toneMap = {
  rose: {
    glow: 'from-pink-200/80 via-rose-100/60 to-white',
    icon: 'from-pink-100 to-rose-100 text-pink-500 group-hover:from-pink-400 group-hover:to-rose-400',
    dot: 'bg-pink-300'
  },
  lavender: {
    glow: 'from-purple-200/80 via-fuchsia-100/60 to-white',
    icon: 'from-purple-100 to-fuchsia-100 text-purple-500 group-hover:from-purple-400 group-hover:to-fuchsia-400',
    dot: 'bg-purple-300'
  },
  peach: {
    glow: 'from-orange-100/90 via-pink-100/70 to-white',
    icon: 'from-orange-100 to-pink-100 text-orange-500 group-hover:from-orange-300 group-hover:to-pink-400',
    dot: 'bg-orange-300'
  },
  mint: {
    glow: 'from-emerald-100/90 via-teal-50/80 to-white',
    icon: 'from-emerald-100 to-teal-100 text-emerald-600 group-hover:from-emerald-400 group-hover:to-teal-400',
    dot: 'bg-emerald-300'
  },
  sky: {
    glow: 'from-sky-100/90 via-purple-100/70 to-white',
    icon: 'from-sky-100 to-purple-100 text-sky-600 group-hover:from-sky-400 group-hover:to-purple-400',
    dot: 'bg-sky-300'
  }
};

export function AppCard({ app }: { app: MiniApp }) {
  const tone = toneMap[app.tone || 'rose'];

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[30px] border border-white/90 bg-white/88 p-5 shadow-[0_18px_50px_-28px_rgba(126,34,206,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-[0_28px_65px_-28px_rgba(236,72,153,0.42)] sm:p-6"
    >
      <div className={`absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-br ${tone.glow} opacity-75 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="absolute -right-8 -top-8 -z-10 h-24 w-24 rounded-full border-[14px] border-white/45" />
      <span className={`absolute right-5 top-20 h-2.5 w-2.5 rounded-full ${tone.dot} opacity-70 shadow-[18px_14px_0_rgba(255,255,255,0.95),-10px_20px_0_rgba(255,255,255,0.9)]`} />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="max-w-full truncate rounded-full border border-white/90 bg-white/78 px-3 py-1 text-[11px] font-semibold text-purple-700 shadow-sm">
            {app.category}
          </span>
          {app.tag && (
            <span className="rounded-full border border-pink-100 bg-pink-50/90 px-2.5 py-1 text-[11px] font-medium text-pink-600">
              {app.tag}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {app.featured && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-500 shadow-sm" title="如如精选">
              <Star className="h-3.5 w-3.5 fill-current" />
            </span>
          )}
          {app.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-sm">
              <Sparkles className="h-3 w-3" />
              NEW
            </span>
          )}
        </div>
      </div>

      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br ${tone.icon} border border-white/80 shadow-sm transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:text-white`}>
        {iconMap[app.icon] || <Gamepad2 className="h-6 w-6" />}
      </div>

      <h3 className="mb-2 text-xl font-extrabold tracking-tight text-slate-800 transition-colors group-hover:text-pink-600">
        {app.title}
      </h3>
      <p className="mb-6 flex-grow text-sm leading-7 text-slate-500">{app.description}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-pink-100/70 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <CalendarDays className="h-3.5 w-3.5 text-pink-400" />
          {app.dateAdded.replaceAll('-', '.')}
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-bold text-pink-600">
          去看看
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-pink-500 shadow-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-pink-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </div>
    </a>
  );
}
