import React from 'react';
import { MiniApp } from '../types';
import { Heart, Wallet, Users, ListTodo, Gamepad2, Sparkles } from 'lucide-react';

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
      className="group relative bg-white/80 backdrop-blur-md border-[3px] border-pink-100 rounded-[32px] p-6 hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-12px_rgba(244,114,182,0.4)] flex flex-col h-full cursor-pointer overflow-hidden text-left"
    >
      <div className="flex justify-between items-start mb-5">
        <div className="text-xs font-bold text-purple-400 bg-purple-50 px-3 py-1 rounded-full">
          {app.category}
        </div>
        {app.isNew && (
          <div className="flex items-center gap-1 bg-pink-100 px-2.5 py-1 rounded-full animate-bounce">
            <Sparkles className="w-3 h-3 text-pink-500" />
            <span className="text-[10px] font-black text-pink-500">NEW</span>
          </div>
        )}
      </div>
      
      <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 text-pink-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-pink-400 group-hover:to-purple-400 group-hover:text-white transition-all duration-300 shadow-sm border border-pink-50">
        {iconMap[app.icon] || <Gamepad2 className="w-6 h-6" />}
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{app.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">{app.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-dashed border-pink-100">
        <span className="inline-flex items-center text-pink-400 text-[13px] font-bold group-hover:text-pink-600 transition-colors">
          去看看鸭 ~
        </span>
        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 group-hover:bg-pink-200 group-hover:text-pink-600 transition-colors">
          →
        </div>
      </div>
    </a>
  );
}
