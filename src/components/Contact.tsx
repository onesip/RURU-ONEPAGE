import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Copy, Check } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "zhengjiaru2018@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-br from-white/90 via-pink-50/40 to-purple-50/40 backdrop-blur-md border-2 border-pink-100 py-12 px-6 sm:px-12 rounded-[36px] mx-4 sm:mx-8 mb-12 relative overflow-hidden flex flex-col items-center text-center shadow-[0_12px_30px_rgb(244,114,182,0.08)]">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="inline-flex items-center justify-center p-3.5 bg-pink-100/60 rounded-2xl mb-4 text-pink-500">
        <Heart className="w-6 h-6 fill-pink-300/50" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
        有想要实现的功能或网站吗？
      </h2>
      <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-xl leading-relaxed">
        如果你有想要解决的日常小痛点、好玩的功能点子，或者是想跟我一起交流前端小程序的开发心得，随时可以给我发邮件哦。
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-gray-700 bg-white border border-pink-200 hover:border-pink-300 rounded-full shadow-sm hover:bg-pink-50/50 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-emerald-500" />
              <span className="text-emerald-600">已复制到剪贴板</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 text-pink-400" />
              <span>复制邮箱：{email}</span>
            </>
          )}
        </button>

        <a 
          href={`mailto:${email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-md shadow-pink-200 hover:shadow-pink-300 hover:opacity-95 transition-all active:scale-95"
        >
          <Mail className="w-4 h-4 mr-2" />
          <span>写邮件给如如</span>
        </a>
      </div>
    </section>
  );
}

