import React from 'react';
import { Mail, Lightbulb, Code } from 'lucide-react';

export function Contact() {
  return (
    <section className="bg-zinc-900 border border-emerald-500/20 py-10 px-8 rounded-[24px] mx-4 sm:mx-8 mb-12 relative overflow-hidden flex flex-col items-start text-left max-w-7xl lg:mx-auto" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #18181b 100%)' }}>
      <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Join the Development</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 mb-3">Request a Feature</h2>
      <p className="text-sm text-zinc-400 mb-6 max-w-xl">
        Want to see something specific? Send me your ideas or website requests directly. 这是一个持续生长的工具箱。如果你有任何好玩的主意，随时告诉我！
      </p>
      
      <div className="bg-zinc-950 px-4 py-3 rounded-xl border border-emerald-900 w-full max-w-md flex justify-between items-center mt-2 group">
        <span className="text-emerald-400 font-mono text-sm">zhengjiaru2018@gmail.com</span>
        <a 
          href="mailto:zhengjiaru2018@gmail.com"
          className="text-zinc-500 text-xs font-semibold hover:text-zinc-300 transition-colors uppercase"
        >
          Email
        </a>
      </div>
    </section>
  );
}
