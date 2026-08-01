import React from 'react';
import { MiniApp } from '../types';
import { ArrowUpRight, CalendarDays, Sparkles, Star } from 'lucide-react';
import { ProjectIllustration } from './ProjectIllustration';

export function AppCard({ app }: { app: MiniApp }) {
  const number = Number(app.id.replace(/\D/g, '')) || 1;
  const tilt = number % 2 === 0 ? 'lg:rotate-[0.35deg]' : 'lg:rotate-[-0.35deg]';

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full flex-col rounded-[30px] border-2 border-[#37245c]/8 bg-[#fffefd] p-3 shadow-[0_18px_0_-9px_rgba(126,34,206,0.08),0_24px_48px_-30px_rgba(76,29,149,0.35)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:border-pink-200 hover:shadow-[0_24px_0_-9px_rgba(236,72,153,0.10),0_35px_60px_-30px_rgba(126,34,206,0.42)] sm:p-4 ${tilt}`}
    >
      <ProjectIllustration app={app} />

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-700">
              {app.category}
            </span>
            {app.tag && (
              <span className="rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] font-bold text-pink-600">
                {app.tag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {app.featured && (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-200 bg-[#fff9c9] text-amber-500 shadow-sm" title="如如精选">
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
            )}
            {app.isNew && (
              <span className="inline-flex -rotate-2 items-center gap-1 rounded-lg bg-[#34205d] px-2.5 py-1 text-[10px] font-black tracking-wider text-white shadow-[2px_3px_0_#f9a8d4]">
                <Sparkles className="h-3 w-3" />
                NEW
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-xl font-black tracking-tight text-[#35264f] transition-colors group-hover:text-pink-600">
          {app.title}
        </h3>
        <p className="mb-5 flex-grow text-sm leading-7 text-slate-500">{app.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t-2 border-dashed border-purple-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <CalendarDays className="h-3.5 w-3.5 text-pink-400" />
            {app.dateAdded.replaceAll('-', '.')}
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-black text-purple-700">
            打开这个小世界
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-purple-100 bg-white text-purple-600 shadow-[3px_3px_0_#e9d5ff] transition-all duration-300 group-hover:rotate-6 group-hover:border-pink-300 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[3px_3px_0_#c4b5fd]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
