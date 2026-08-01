import React from 'react';
import { MiniApp } from '../types';

const palette = {
  rose: { bg: '#FFF0F7', accent: '#F472B6', deep: '#9D174D', soft: '#FBCFE8' },
  lavender: { bg: '#F5F0FF', accent: '#A78BFA', deep: '#6D28D9', soft: '#DDD6FE' },
  peach: { bg: '#FFF4EB', accent: '#FB923C', deep: '#C2410C', soft: '#FED7AA' },
  mint: { bg: '#ECFDF7', accent: '#34D399', deep: '#047857', soft: '#A7F3D0' },
  sky: { bg: '#EEF7FF', accent: '#60A5FA', deep: '#1D4ED8', soft: '#BFDBFE' }
};

function MoonCalendar({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <circle cx="90" cy="63" r="34" fill="#FFF8D9" />
      <circle cx="105" cy="52" r="31" fill="#FFF0F7" />
      <rect x="139" y="48" width="118" height="92" rx="20" fill="#FFFFFF" stroke={soft} strokeWidth="4" />
      <rect x="139" y="48" width="118" height="28" rx="18" fill={accent} />
      <path d="M164 42V57M230 42V57" stroke={deep} strokeWidth="7" strokeLinecap="round" />
      <circle cx="166" cy="94" r="7" fill={soft} />
      <circle cx="197" cy="94" r="7" fill={accent} />
      <circle cx="228" cy="94" r="7" fill={soft} />
      <circle cx="166" cy="120" r="7" fill={soft} />
      <circle cx="197" cy="120" r="7" fill={soft} />
      <path d="M63 117C63 100 78 88 94 88C111 88 125 101 125 117C125 141 94 156 94 156C94 156 63 141 63 117Z" fill={accent} />
      <path d="M84 117L91 124L105 108" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function WalletScene({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <path d="M70 73C70 58 82 46 97 46H218C233 46 245 58 245 73V139C245 154 233 166 218 166H97C82 166 70 154 70 139V73Z" fill="#FFFFFF" stroke={soft} strokeWidth="5" />
      <path d="M70 82H220C236 82 248 95 248 111V134H188C170 134 156 120 156 102C156 91 162 82 170 76H70V82Z" fill={accent} opacity="0.9" />
      <rect x="177" y="92" width="83" height="46" rx="18" fill={deep} />
      <circle cx="195" cy="115" r="7" fill="#FFFFFF" />
      <circle cx="270" cy="63" r="22" fill="#FDE68A" stroke="#F59E0B" strokeWidth="4" />
      <path d="M270 51V75M261 58H276C285 58 285 68 276 68H263" fill="none" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      <circle cx="286" cy="127" r="19" fill="#FDE68A" stroke="#F59E0B" strokeWidth="4" />
      <path d="M286 117V137M278 122H291C299 122 299 130 291 130H280" fill="none" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      <path d="M45 147C63 128 80 124 100 130" fill="none" stroke={soft} strokeWidth="8" strokeLinecap="round" />
    </>
  );
}

function CommunityScene({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <rect x="42" y="42" width="134" height="90" rx="26" fill="#FFFFFF" stroke={soft} strokeWidth="5" />
      <path d="M79 132L65 154L103 132" fill="#FFFFFF" stroke={soft} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="88" cy="82" r="19" fill={soft} />
      <circle cx="130" cy="82" r="19" fill={accent} opacity="0.75" />
      <path d="M66 116C72 98 89 92 106 102C121 91 145 98 151 116" fill="none" stroke={deep} strokeWidth="6" strokeLinecap="round" />
      <rect x="169" y="76" width="130" height="83" rx="25" fill={accent} />
      <path d="M262 159L280 176L247 159" fill={accent} />
      <path d="M197 107H272M197 129H246" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      <path d="M233 36L239 50L254 56L239 62L233 77L227 62L212 56L227 50L233 36Z" fill="#FDE68A" />
    </>
  );
}

function ChecklistScene({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <rect x="84" y="35" width="176" height="137" rx="24" fill="#FFFFFF" stroke={soft} strokeWidth="5" />
      <rect x="132" y="24" width="82" height="28" rx="12" fill={deep} />
      <rect x="108" y="72" width="24" height="24" rx="7" fill={soft} />
      <path d="M113 84L120 91L131 77" fill="none" stroke={deep} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M149 84H227" stroke={accent} strokeWidth="8" strokeLinecap="round" />
      <rect x="108" y="111" width="24" height="24" rx="7" fill={accent} />
      <path d="M113 123L120 130L131 116" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M149 123H211" stroke={deep} strokeWidth="8" strokeLinecap="round" />
      <circle cx="61" cy="68" r="16" fill="#FDE68A" />
      <path d="M52 68H70M61 59V77" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      <path d="M278 113C294 102 310 112 308 128C306 144 287 152 287 152C287 152 269 143 270 128C270 121 273 116 278 113Z" fill={accent} opacity="0.72" />
    </>
  );
}

function RainAlleyScene({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <path d="M48 148L88 74L126 148H48Z" fill={deep} opacity="0.88" />
      <path d="M198 148L239 56L284 148H198Z" fill={deep} opacity="0.72" />
      <rect x="119" y="80" width="105" height="68" rx="7" fill="#F8FAFC" stroke={soft} strokeWidth="4" />
      <rect x="134" y="94" width="30" height="41" rx="4" fill={accent} opacity="0.65" />
      <rect x="178" y="94" width="30" height="41" rx="4" fill={accent} opacity="0.35" />
      <path d="M101 148H256" stroke={deep} strokeWidth="9" strokeLinecap="round" />
      <path d="M70 36L61 52M117 31L108 47M164 38L155 54M218 29L209 45M274 38L265 54" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M54 71L48 82M147 63L140 76M247 70L239 83" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M153 160C164 146 179 140 195 142C206 144 217 150 225 160" fill="none" stroke={soft} strokeWidth="7" strokeLinecap="round" />
      <circle cx="189" cy="121" r="8" fill="#FDE68A" />
    </>
  );
}

function LabScene({ accent, deep, soft }: { accent: string; deep: string; soft: string }) {
  return (
    <>
      <path d="M127 39H202M146 39V76L94 151C87 161 94 174 106 174H244C257 174 264 160 257 150L202 76V39" fill="#FFFFFF" stroke={deep} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M116 143L144 103C164 116 184 111 205 97L236 143C242 153 236 163 225 163H126C115 163 109 153 116 143Z" fill={accent} opacity="0.82" />
      <circle cx="154" cy="132" r="8" fill="#FFFFFF" opacity="0.8" />
      <circle cx="193" cy="145" r="6" fill="#FFFFFF" opacity="0.65" />
      <circle cx="211" cy="122" r="5" fill="#FFFFFF" opacity="0.8" />
      <path d="M64 77L72 95L91 103L72 111L64 130L56 111L37 103L56 95L64 77Z" fill="#FDE68A" />
      <rect x="240" y="53" width="73" height="51" rx="15" fill="#FFFFFF" stroke={soft} strokeWidth="4" transform="rotate(8 240 53)" />
      <path d="M260 79L273 91L295 66" fill="none" stroke={deep} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

export function ProjectIllustration({ app }: { app: MiniApp }) {
  const tone = palette[app.tone || 'rose'];
  const sceneProps = { accent: tone.accent, deep: tone.deep, soft: tone.soft };

  return (
    <div className="relative overflow-hidden rounded-[24px] border-2 border-white bg-white shadow-inner">
      <svg viewBox="0 0 340 190" className="block h-auto w-full" aria-hidden="true">
        <rect width="340" height="190" rx="24" fill={tone.bg} />
        <path d="M0 143C65 113 112 161 175 136C237 112 278 120 340 88V190H0V143Z" fill={tone.soft} opacity="0.35" />
        <circle cx="301" cy="31" r="44" fill="#FFFFFF" opacity="0.55" />
        <circle cx="37" cy="163" r="29" fill="#FFFFFF" opacity="0.55" />
        {app.icon === 'Heart' && <MoonCalendar {...sceneProps} />}
        {app.icon === 'Wallet' && <WalletScene {...sceneProps} />}
        {app.icon === 'Users' && <CommunityScene {...sceneProps} />}
        {app.icon === 'ListTodo' && <ChecklistScene {...sceneProps} />}
        {app.icon === 'Gamepad2' && <RainAlleyScene {...sceneProps} />}
        {app.icon === 'FlaskConical' && <LabScene {...sceneProps} />}
      </svg>
      <span className="absolute left-3 top-3 rotate-[-3deg] rounded-lg border border-white/90 bg-white/90 px-2.5 py-1 text-[10px] font-black tracking-[0.12em] text-slate-500 shadow-sm">
        RURU MADE
      </span>
      <span className="absolute -right-1 -top-1 h-7 w-14 rotate-[26deg] bg-[#fff3a8]/80 shadow-sm" aria-hidden="true" />
    </div>
  );
}
