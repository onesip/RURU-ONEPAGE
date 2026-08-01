import React, { useState } from 'react';
import { Mail, Heart, Copy, Check, Sparkles, Github } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'zhengjiaru2018@gmail.com';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative mx-4 mb-14 overflow-hidden rounded-[38px] border border-white/90 bg-white/75 px-6 py-12 text-center shadow-[0_24px_70px_-38px_rgba(219,39,119,0.45)] backdrop-blur-xl sm:mx-8 sm:px-12 sm:py-16">
      <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-pink-200/45 blur-3xl" />
      <div className="absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-purple-200/45 blur-3xl" />
      <div className="absolute left-[12%] top-10 text-pink-300/75 float-slow">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="absolute right-[14%] top-20 text-purple-300/70 float-reverse">
        <Heart className="h-5 w-5 fill-current" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50/85 px-4 py-2 text-xs font-bold text-pink-600 shadow-sm">
          <Heart className="h-3.5 w-3.5 fill-pink-300" />
          如如的灵感收件箱
        </div>

        <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-800 sm:text-4xl">
          有一个想变成网页的念头吗？
        </h2>
        <p className="mb-8 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          日常小痛点、奇怪但有趣的功能、想玩的小游戏，都可以告诉我。也许下一颗住进幻想乡的小星星，就是你的点子。
        </p>

        <div className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
          <button
            onClick={handleCopy}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-pink-200 bg-white/90 px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600">邮箱已经复制好啦</span>
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4 text-pink-400" />
                <span>复制如如的邮箱</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${email}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-200/70 transition-all hover:-translate-y-0.5 hover:shadow-pink-300/70 active:scale-[0.98]"
          >
            <Mail className="mr-2 h-4 w-4" />
            写信给如如
          </a>
        </div>

        <a
          href="https://github.com/onesip/RURU-ONEPAGE"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-purple-600"
        >
          <Github className="h-3.5 w-3.5" />
          这个幻想乡也在持续长大中
        </a>
      </div>
    </section>
  );
}
