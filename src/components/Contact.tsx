import React from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';

export function Contact() {
  return (
    <section className="bg-white/80 backdrop-blur-md border-[3px] border-pink-100 py-12 px-6 sm:px-12 rounded-[40px] mx-4 sm:mx-8 mb-12 relative overflow-hidden flex flex-col items-center text-center shadow-[0_8px_30px_rgb(244,114,182,0.1)]">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="inline-flex items-center justify-center p-3 bg-pink-50 rounded-2xl mb-4 text-pink-500">
        <Heart className="w-8 h-8 fill-pink-200" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-3 tracking-tight">有想实现的神奇魔法吗？</h2>
      <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-xl leading-relaxed">
        如如的魔法工坊一直在营业中哦！如果你有任何好玩的主意、或者想要如如帮你开发专属的可爱小网页，随时写信告诉我叭 (๑•̀ㅂ•́)و✧
      </p>
      
      <a 
        href="mailto:zhengjiaru2018@gmail.com"
        className="group relative inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 rounded-full overflow-hidden shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all hover:scale-105 active:scale-95"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
        <Mail className="w-5 h-5 mr-2" />
        给如如发射邮件：zhengjiaru2018@gmail.com
        <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
      </a>
    </section>
  );
}
