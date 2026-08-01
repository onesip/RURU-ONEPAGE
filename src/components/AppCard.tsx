import React from 'react';
import { MiniApp } from '../types';
import { Heart, Wallet, Users, ListTodo, Gamepad2, Sparkles, ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Wallet: <Wallet className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  ListTodo: <ListTodo className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />
};

export function AppCard({ app }: { app: MiniApp }) {
  return (
    <a 
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white/90 backdrop-blur-md border-2 border-pink-100 rounded-[28px] p-6 hover:border-pink-300 hover:bg-gradient-to-br hover:from-white hover:to-pink-50/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-12px_rgba(244,114,182,0.35)] flex flex-col h-full cursor-pointer overflow-hidden text-left"
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-600 bg-purple-50/80 border border-purple-100 px-3 py-1 rounded-full">
            {app.category}
          </span>
          {app.tag && (
            <span className="text-[11px] font-medium text-pink-500 bg-pink-50 border border-pink-100 px-2.5 py-0.5 rounded-full">
              {app.tag}
            </span>
          )}
        </div>
        {app.isNew && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-2.5 py-0.5 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-bold tracking-wider uppercase">NEW</span>
          </div>
        )}
      </div>
      
      <div className="w-14 h-14 bg-gradient-to-br from-pink-100/80 to-purple-100/80 text-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:from-pink-400 group-hover:to-purple-400 group-hover:text-white transition-all duration-300 shadow-sm border border-pink-50">
        {iconMap[app.icon] || <Gamepad2 className="w-6 h-6" />}
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors flex items-center justify-between">
        <span>{app.title}</span>
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">{app.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-pink-100/60">
        <span className="inline-flex items-center text-pink-500 text-xs font-medium group-hover:text-pink-600 transition-colors">
          前往体验小功能
        </span>
        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 group-hover:bg-pink-400 group-hover:text-white transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

