import React from 'react';
import { MiniApp } from '../types';
import { Timer, Key, Palette, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Timer: <Timer className="w-6 h-6" />,
  Key: <Key className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />
};

export function AppCard({ app }: { app: MiniApp }) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-[24px] p-6 hover:border-zinc-700 transition-colors flex flex-col h-full cursor-pointer overflow-hidden text-left col-span-1">
      <div className="flex justify-between items-start mb-6">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {app.category}
        </div>
        {app.isNew && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">New</span>
          </div>
        )}
      </div>
      
      <div className="w-12 h-12 bg-zinc-800 text-zinc-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-zinc-700 group-hover:text-zinc-50 transition-all duration-300">
        {iconMap[app.icon] || <Gamepad2 className="w-5 h-5" />}
      </div>
      
      <h3 className="text-xl font-bold text-zinc-50 mb-2">{app.title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed flex-grow mb-6">{app.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="inline-flex items-center px-3 py-1 bg-zinc-800 text-zinc-300 text-[12px] font-medium rounded-full">
          Open App
        </span>
        <div className="flex items-center text-zinc-500 font-medium text-sm group-hover:text-zinc-300 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
