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
    bar: 'bg-pink-500',
    icon: 'bg-pink-100 text-pink-600',
    link: 'text-pink-600 group-hover:bg-pink-500'
  },
  lavender: {
    bar: 'bg-violet-500',
    icon: 'bg-violet-100 text-violet-600',
    link: 'text-violet-600 group-hover:bg-violet-500'
  },
  peach: {
    bar: 'bg-orange-400',
    icon: 'bg-orange-100 text-orange-600',
    link: 'text-orange-600 group-hover:bg-orange-500'
  },
  mint: {
    bar: 'bg-emerald-500',
    icon: 'bg-emerald-100 text-emerald-600',
    link: 'text-emerald-600 group-hover:bg-emerald-500'
  },
  sky: {
    bar: 'bg-sky-500',
    icon: 'bg-sky-100 text-sky-600',
    link: 'text-sky-600 group-hover:bg-sky-500'
  }
};

export function AppCard({ app }: { app: MiniApp }) {
  const tone = toneMap[app.tone || 'rose'];

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-slate-100 bg-white shadow-[0_18px_45px_-32px_rgba(15,23,42,0.42)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_26px_55px_-30px_rgba(109,40,217,0.35)]"
    >
      <div className={`h-2 w-full ${tone.bar}`} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}>
            {iconMap[app.icon] || <Gamepad2 className="h-6 w-6" />}
          </div>

          <div className="flex flex-wrap justify-end gap-1.5">
            {app.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black text-amber-700">
                <Star className="h-3 w-3 fill-current" />
                精选
              </span>
            )}
            {app.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white">
                <Sparkles className="h-3 w-3" />
                NEW
              </span>
            )}
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">{app.category}</span>
          {app.tag && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">{app.tag}</span>}
        </div>

        <h3 className="mb-2 text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
          {app.title}
        </h3>
        <p className="mb-6 flex-grow text-sm leading-7 text-slate-500">{app.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />
            {app.dateAdded.replaceAll('-', '.')}
          </span>
          <span className={`inline-flex items-center gap-2 text-xs font-black ${tone.link}`}>
            打开体验
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:rotate-45 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
