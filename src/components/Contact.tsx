import React, { useState } from 'react';
import { Check, Copy, Github, Mail, MessageCircle, Sparkles } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'zhengjiaru2018@gmail.com';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#071742] px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.07] px-6 py-12 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-white/10 px-4 py-2 text-xs font-black text-fuchsia-100">
            <Sparkles className="h-4 w-4 text-pink-300" />
            如如的灵感收件箱
          </div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">有个想法，想把它做成网页？</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100/75 sm:text-base lg:mx-0">
            日常小痛点、奇怪但好玩的功能、想玩的小游戏，都可以告诉我。这里会继续收录如如做出来的新世界。
          </p>
        </div>

        <div className="relative z-10 mt-8 flex min-w-[250px] flex-col gap-3 lg:mt-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-black transition-colors hover:bg-white/15"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-emerald-300" />
                邮箱已复制
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4 text-fuchsia-200" />
                复制如如的邮箱
              </>
            )}
          </button>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_35px_rgba(168,85,247,0.35)] transition-transform hover:-translate-y-0.5"
          >
            <Mail className="mr-2 h-4 w-4" />
            写信给如如
          </a>

          <a
            href="https://github.com/onesip/RURU-ONEPAGE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-blue-100/55 transition-colors hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            查看幻想乡的 GitHub
          </a>
        </div>

        <MessageCircle className="pointer-events-none absolute bottom-7 right-7 h-20 w-20 text-white/[0.04]" />
      </div>
    </section>
  );
}
