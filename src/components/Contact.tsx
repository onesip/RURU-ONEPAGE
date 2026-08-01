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
    <section className="contact-circuit relative overflow-hidden border-b border-white/10 bg-[#071640] px-4 py-16 text-center sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-fuchsia-300/20 bg-[#0d2157]/88 px-6 py-12 shadow-[0_30px_90px_-42px_rgba(217,70,239,0.42)] backdrop-blur-xl sm:px-12 sm:py-16">
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 px-4 py-2 text-xs font-black text-fuchsia-200">
            <Sparkles className="h-4 w-4" />
            如如的灵感收件箱
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            有一个想变成网页的念头吗？
          </h2>
          <p className="mb-8 max-w-xl text-sm leading-7 text-blue-100/62 sm:text-base">
            日常小痛点、奇怪但有趣的功能、想玩的小游戏，都可以告诉我。也许下一颗住进幻想乡的小星星，就是你的点子。
          </p>

          <div className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
            <button
              onClick={handleCopy}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-5 py-3.5 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:bg-white/[0.12] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-emerald-300" />
                  <span className="text-emerald-200">邮箱已经复制好啦</span>
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4 text-fuchsia-300" />
                  <span>复制如如的邮箱</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-3.5 text-sm font-black text-white shadow-[0_14px_35px_rgba(168,85,247,0.35)] transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Mail className="mr-2 h-4 w-4" />
              写信给如如
            </a>
          </div>

          <a
            href="https://github.com/onesip/RURU-ONEPAGE"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-100/40 transition-colors hover:text-fuchsia-200"
          >
            <Github className="h-3.5 w-3.5" />
            这个幻想乡也在持续长大中
          </a>

          <Heart className="mt-7 h-5 w-5 fill-pink-300 text-pink-300" />
        </div>
      </div>
    </section>
  );
}
