import React from 'react';

export function RuruHero() {
  return (
    <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[590px] select-none">
      <svg
        viewBox="0 0 720 665"
        role="img"
        aria-label="紫发的如如坐在电脑前制作小程序，身边有猫咪和漂浮的小工具"
        className="h-full w-full overflow-visible drop-shadow-[0_30px_35px_rgba(126,34,206,0.16)]"
      >
        <defs>
          <linearGradient id="hero-card" x1="90" y1="30" x2="620" y2="640" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF9FE" />
            <stop offset="0.52" stopColor="#FCEBFF" />
            <stop offset="1" stopColor="#E9E4FF" />
          </linearGradient>
          <linearGradient id="hero-hair" x1="236" y1="170" x2="465" y2="510" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7B9FF" />
            <stop offset="0.48" stopColor="#A777E8" />
            <stop offset="1" stopColor="#7144B5" />
          </linearGradient>
          <linearGradient id="hero-hair-dark" x1="258" y1="200" x2="438" y2="475" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9D68DB" />
            <stop offset="1" stopColor="#543188" />
          </linearGradient>
          <linearGradient id="hero-jacket" x1="230" y1="410" x2="500" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D8E8FF" />
          </linearGradient>
          <linearGradient id="hero-screen" x1="337" y1="425" x2="568" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38478B" />
            <stop offset="1" stopColor="#171D50" />
          </linearGradient>
          <linearGradient id="hero-pink" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FF8DCC" />
            <stop offset="1" stopColor="#BA78F8" />
          </linearGradient>
          <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#6B3FA0" floodOpacity="0.18" />
          </filter>
          <filter id="hero-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <pattern id="hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="#CDA7F2" fillOpacity="0.23" />
          </pattern>
        </defs>

        <ellipse cx="362" cy="619" rx="276" ry="31" fill="#8B5BC7" fillOpacity="0.12" filter="url(#hero-soft)" />

        <path
          d="M105 74C105 44 131 24 161 28L590 69C622 72 645 100 640 132L572 575C567 608 537 630 504 624L93 553C62 548 42 519 48 488L105 74Z"
          fill="url(#hero-card)"
          stroke="#FFFFFF"
          strokeWidth="10"
          filter="url(#hero-shadow)"
        />
        <path
          d="M105 74C105 44 131 24 161 28L590 69C622 72 645 100 640 132L572 575C567 608 537 630 504 624L93 553C62 548 42 519 48 488L105 74Z"
          fill="url(#hero-dots)"
        />

        <path d="M102 119C236 68 457 77 629 139" fill="none" stroke="#D8B4FE" strokeWidth="3" strokeDasharray="7 12" strokeLinecap="round" />
        <path d="M71 461C169 522 356 575 558 575" fill="none" stroke="#F0ABFC" strokeWidth="3" strokeDasharray="4 13" strokeLinecap="round" />

        <g className="hero-float-one" filter="url(#hero-shadow)">
          <rect x="46" y="116" width="118" height="91" rx="26" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="4" transform="rotate(-8 46 116)" />
          <path d="M86 152L107 132L128 152L107 172L86 152Z" fill="#C084FC" />
          <path d="M76 183H133" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" />
          <circle cx="143" cy="130" r="9" fill="#FF93CD" />
        </g>

        <g className="hero-float-two" filter="url(#hero-shadow)">
          <rect x="548" y="170" width="116" height="102" rx="27" fill="#FFFFFF" stroke="#FBCFE8" strokeWidth="4" transform="rotate(8 548 170)" />
          <path d="M586 216C586 201 598 189 613 189C628 189 640 201 640 216C640 239 613 252 613 252C613 252 586 239 586 216Z" fill="url(#hero-pink)" />
          <path d="M602 218L610 226L626 208" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="hero-float-three" filter="url(#hero-shadow)">
          <rect x="563" y="369" width="103" height="96" rx="25" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="4" transform="rotate(-5 563 369)" />
          <path d="M595 411L607 398L619 411L631 398L643 411" fill="none" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="620" cy="435" r="13" fill="#A78BFA" />
          <path d="M613 435H627M620 428V442" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g filter="url(#hero-shadow)">
          <path d="M162 537C154 497 178 462 219 454C258 446 294 468 304 507L312 539L162 537Z" fill="#F3DDFB" />
          <path d="M176 475L191 446L207 475" fill="#6E438E" />
          <path d="M244 476L263 446L276 481" fill="#6E438E" />
          <path d="M177 502C177 482 194 466 215 466H239C261 466 278 483 278 504V539H177V502Z" fill="#3E245C" />
          <ellipse cx="204" cy="505" rx="7" ry="10" fill="#E9D5FF" />
          <ellipse cx="251" cy="505" rx="7" ry="10" fill="#E9D5FF" />
          <path d="M220 521C224 526 231 526 235 521" fill="none" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="192" cy="520" rx="11" ry="6" fill="#F472B6" fillOpacity="0.55" />
          <ellipse cx="263" cy="520" rx="11" ry="6" fill="#F472B6" fillOpacity="0.55" />
          <path d="M154 531C133 517 133 489 155 479" fill="none" stroke="#3E245C" strokeWidth="13" strokeLinecap="round" />
        </g>

        <g>
          <path d="M273 243C246 256 228 293 231 332C233 370 255 396 277 416L464 421C498 389 510 351 499 310C489 272 460 243 424 233L273 243Z" fill="url(#hero-hair-dark)" />
          <circle cx="276" cy="248" r="69" fill="url(#hero-hair)" />
          <path d="M221 248C203 236 206 207 226 201C200 182 213 150 241 155C237 126 275 112 291 136C307 112 344 125 342 154C370 145 389 176 370 197C394 205 394 240 372 249C338 225 255 224 221 248Z" fill="url(#hero-hair)" />
          <circle cx="448" cy="248" r="72" fill="url(#hero-hair)" />
          <path d="M393 209C388 175 421 154 448 172C459 142 500 145 507 177C537 169 554 205 533 228C554 248 532 282 505 270C489 294 449 286 442 256L393 209Z" fill="url(#hero-hair)" />
          <path d="M250 253C244 187 288 147 354 151C421 154 464 198 454 273C450 308 426 345 389 361H306C270 345 253 310 250 253Z" fill="#FFE9E8" />
          <path d="M257 223C273 165 337 140 394 160C426 171 447 194 456 223C426 202 406 196 381 195C359 219 327 225 293 214C282 225 270 232 257 236V223Z" fill="url(#hero-hair)" />
          <path d="M299 190C316 210 318 233 308 255M346 178C358 208 357 235 345 260M397 188C397 215 390 237 375 254" fill="none" stroke="#7C4AB6" strokeWidth="5" strokeLinecap="round" opacity="0.58" />
          <path d="M252 238C230 272 231 325 258 360C239 356 224 343 216 326C219 367 242 397 279 409C251 365 254 293 272 254L252 238Z" fill="url(#hero-hair)" />
          <path d="M451 235C475 274 473 327 446 364C468 356 484 338 491 319C490 361 466 395 427 409C457 363 455 288 433 251L451 235Z" fill="url(#hero-hair)" />

          <ellipse cx="310" cy="278" rx="17" ry="23" fill="#5B2D89" />
          <ellipse cx="397" cy="278" rx="17" ry="23" fill="#5B2D89" />
          <ellipse cx="305" cy="271" rx="6" ry="8" fill="#FFFFFF" />
          <ellipse cx="392" cy="271" rx="6" ry="8" fill="#FFFFFF" />
          <circle cx="315" cy="286" r="4" fill="#C4B5FD" />
          <circle cx="402" cy="286" r="4" fill="#C4B5FD" />
          <path d="M337 316C346 325 359 325 368 316" fill="none" stroke="#D45A85" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="280" cy="310" rx="20" ry="9" fill="#F9A8D4" fillOpacity="0.48" />
          <ellipse cx="425" cy="310" rx="20" ry="9" fill="#F9A8D4" fillOpacity="0.48" />

          <path d="M288 160L302 137L315 160L302 181L288 160Z" fill="#FDE68A" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="419" y="184" width="47" height="18" rx="8" fill="#312E81" transform="rotate(8 419 184)" />
          <text x="428" y="198" fill="#FFFFFF" fontSize="11" fontWeight="800" transform="rotate(8 428 198)">RURU</text>
          <path d="M413 218L429 202M425 226L441 210" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />

          <path d="M303 359C298 383 298 400 306 419H401C409 398 407 382 400 359C374 373 329 374 303 359Z" fill="#FFD9D6" />
          <path d="M274 405C293 383 319 373 347 373H368C399 373 427 386 445 411L489 494L436 540H250L218 491L274 405Z" fill="url(#hero-jacket)" stroke="#B7C8F4" strokeWidth="4" />
          <path d="M322 377L353 417L385 378" fill="#24204D" />
          <path d="M337 418H369L377 506H328L337 418Z" fill="#292352" />
          <path d="M274 409L320 453L298 496L246 453M445 411L391 451L413 496L474 449" fill="none" stroke="#93A9E8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M250 451L217 485C206 497 209 518 224 526L266 547L288 506L250 451Z" fill="#EDF4FF" stroke="#B7C8F4" strokeWidth="4" />
          <path d="M462 447L499 478C513 490 514 512 501 525L463 558L427 512L462 447Z" fill="#EDF4FF" stroke="#B7C8F4" strokeWidth="4" />
          <path d="M220 492C203 493 191 504 191 520C191 536 204 548 220 548C231 548 241 542 247 533L263 506C248 496 235 492 220 492Z" fill="#FFE5E1" />
          <path d="M488 490C506 489 518 501 518 518C518 535 504 548 487 548C477 548 468 544 461 536L442 515C455 499 471 491 488 490Z" fill="#FFE5E1" />
        </g>

        <g filter="url(#hero-shadow)">
          <path d="M304 436L530 452C547 453 558 469 554 486L530 583H299L278 469C275 451 287 435 304 436Z" fill="url(#hero-screen)" stroke="#6E7ED0" strokeWidth="5" />
          <path d="M299 583H546C557 583 566 592 566 603H278C278 592 287 583 299 583Z" fill="#A6B9F4" />
          <circle cx="417" cy="510" r="30" fill="#FFFFFF" fillOpacity="0.1" />
          <path d="M397 512L409 500L421 512L433 500L445 512" fill="none" stroke="#E9D5FF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M409 538H434" stroke="#F9A8D4" strokeWidth="6" strokeLinecap="round" />
          <circle cx="505" cy="475" r="8" fill="#F9A8D4" />
        </g>

        <g>
          <path d="M105 303C83 286 55 303 63 330C38 336 42 371 68 371H145C171 371 178 337 153 327C159 301 128 286 105 303Z" fill="#FFFFFF" stroke="#F0ABFC" strokeWidth="4" />
          <path d="M85 337H126" stroke="#A855F7" strokeWidth="7" strokeLinecap="round" />
          <circle cx="137" cy="337" r="6" fill="#F472B6" />
        </g>

        <path d="M587 96L594 113L612 120L594 127L587 144L580 127L562 120L580 113L587 96Z" fill="#FDE68A" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M183 77L188 89L201 94L188 99L183 111L178 99L165 94L178 89L183 77Z" fill="#F9A8D4" />
        <circle cx="529" cy="117" r="8" fill="#A78BFA" />
        <circle cx="94" cy="406" r="7" fill="#60A5FA" />
        <path d="M623 316L630 328L644 330L634 340L637 354L623 347L610 354L612 340L602 330L616 328L623 316Z" fill="#F9A8D4" />
      </svg>

      <div className="absolute -right-2 top-[10%] hidden -rotate-3 rounded-[18px] border-2 border-purple-200 bg-white px-4 py-3 text-center shadow-[0_12px_24px_rgba(126,34,206,0.12)] sm:block">
        <p className="hand-note text-sm font-bold leading-5 text-purple-700">今天也要把<br />奇怪点子做成真的！</p>
        <span className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b-2 border-r-2 border-purple-200 bg-white" />
      </div>

      <div className="absolute -left-2 bottom-[9%] rotate-[-4deg] rounded-xl border border-pink-200 bg-[#fff8b8] px-4 py-2 shadow-[0_10px_22px_rgba(190,24,93,0.12)] sm:left-2">
        <p className="hand-note text-xs font-bold text-slate-700">RURU'S WORK DESK ✦</p>
      </div>
    </div>
  );
}
