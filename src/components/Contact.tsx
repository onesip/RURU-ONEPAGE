import React, { useState } from 'react';
import { Check, Copy, Github, Heart, Mail, Sparkles } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'zhengjiaru2018@gmail.com';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[32px] border-2 border-purple-200 bg-[#fffdf8] px-6 py-12 shadow-[8px_9px_0_rgba(216,180,254,0.52)] sm:px-12 sm:py-14">
        <span className="absolute -top-3 left-[16%] h-9 w-28 -rotate-3 bg-[#fff0a8]/90 shadow-sm" />
        <span className="absolute -right-8 top-9 h-20 w-20 rotate-12 rounded-[26px] border-2 border-pink-200 bg-pink-50" />
        <Sparkles className="absolute right-5 top-13 h-8 w-8 rotate-12 text-pink-400" />
        <Heart className="absolute bottom-8 left-8 hidden h-8 w-8 -rotate-12 fill-purple-200 text-purple-300 sm:block" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="mx-auto w-full max-w-sm rotate-[-1deg] rounded-[28px] border-2 border-dashed border-pink-200 bg-[#fff4f8] p-6 text-left shadow-[5px_6px_0_#fce7f3]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-pink-200 bg-white text-pink-500 shadow-[3px_3px_0_#fbcfe8]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-black text-[#392a52]">如如的灵感收件箱</div>
                <div className="text-xs text-slate-400">奇怪点子也欢迎投递</div>
              </div>
            </div>
            <p className="hand-note text-base font-bold leading-7 text-purple-700">
              “要是有个网页能帮我做这个就好了……”
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">这种念头请不要憋着。很多小程序，最开始就是一句随口说出来的话。</p>
          </div>

          <div className="text-center lg:text-left">
            <div className="mb-3 inline-flex rotate-1 items-center gap-2 rounded-xl border-2 border-purple-100 bg-white px-4 py-2 text-xs font-black text-purple-600 shadow-[3px_3px_0_#ede9fe]">
              <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
              有想法就来敲门
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#392a52] sm:text-4xl">下一件作品，也许从你的点子开始。</h2>
            <p className="mb-7 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              日常小痛点、女生友好工具、脑洞玩法、想玩的小游戏，都可以告诉我。合适的想法，我会认真想办法把它做出来。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center rounded-2xl border-2 border-purple-100 bg-white px-5 py-3.5 text-sm font-black text-slate-700 shadow-[4px_5px_0_#ede9fe] transition-all hover:-translate-y-1 hover:border-pink-200 active:translate-y-1 active:shadow-none"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-600">邮箱已经复制好啦</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4 text-purple-400" />
                    复制如如的邮箱
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#4b2b73] bg-[#6f46a8] px-6 py-3.5 text-sm font-black text-white shadow-[4px_5px_0_#f9a8d4] transition-all hover:-translate-y-1 active:translate-y-1 active:shadow-none"
              >
                <Mail className="mr-2 h-4 w-4" />
                写信给如如
              </a>
            </div>

            <a
              href="https://github.com/onesip/RURU-ONEPAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 underline decoration-dashed underline-offset-4 transition-colors hover:text-purple-600"
            >
              <Github className="h-3.5 w-3.5" />
              在 GitHub 看这个幻想乡继续长大
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
