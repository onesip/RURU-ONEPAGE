import React, { useMemo, useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import { RuruAvatar } from './components/RuruAvatar';
import { RuruHero } from './components/RuruHero';
import {
  ArrowDown,
  Bell,
  Code2,
  ExternalLink,
  Heart,
  Search,
  Sparkles,
  Star,
  WandSparkles,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdates, setShowUpdates] = useState(false);

  const featuredApps = miniApps.filter((app) => app.featured).slice(0, 3);

  const filteredApps = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return miniApps.filter((app) => {
      const matchesCategory = activeCategory === '🌸 全部' || app.category === activeCategory;
      const searchableText = [app.title, app.description, app.category, app.tag || '', ...(app.keywords || [])]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(categories[0]);
  };

  return (
    <div className="site-shell relative min-h-screen overflow-x-hidden bg-[#fffaf4] text-[#392a52] selection:bg-pink-200 selection:text-purple-950">
      <div className="paper-noise pointer-events-none fixed inset-0 opacity-35" />
      <div className="doodle-grid pointer-events-none fixed inset-0 opacity-45" />
      <div className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-[30%] h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <header className="sticky top-0 z-40 border-b-2 border-purple-100/80 bg-[#fffaf4]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <RuruAvatar size="sm" className="transition-transform group-hover:-rotate-6 group-hover:scale-110" />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight text-[#392a52] sm:text-base">如如的代码幻想乡</div>
              <div className="hidden text-[9px] font-black tracking-[0.2em] text-pink-400 sm:block">RURU APP COLLECTION</div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#works"
              className="hidden -rotate-1 rounded-xl border-2 border-purple-100 bg-white px-3 py-2 text-xs font-black text-purple-700 shadow-[3px_3px_0_#e9d5ff] transition-transform hover:rotate-1 sm:inline-flex"
            >
              全部作品
            </a>
            <button
              onClick={() => setShowUpdates(true)}
              className="relative inline-flex rotate-1 items-center gap-2 rounded-xl border-2 border-pink-100 bg-white px-3.5 py-2 text-xs font-black text-slate-600 shadow-[3px_3px_0_#fbcfe8] transition-all hover:-rotate-1 hover:text-pink-600"
            >
              <Bell className="h-4 w-4 text-pink-400" />
              更新日记
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-pink-500" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showUpdates && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#24153d]/25 backdrop-blur-sm"
              onClick={() => setShowUpdates(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2, y: 24 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] border-2 border-purple-200 bg-[#fffdf8] p-5 shadow-[10px_12px_0_rgba(168,85,247,0.16),0_35px_90px_-30px_rgba(49,46,129,0.55)] sm:p-7"
            >
              <span className="absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 -rotate-2 bg-[#fff0a8]/85 shadow-sm" />
              <div className="mb-6 flex items-start justify-between gap-4 pt-2">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs font-black text-pink-500">
                    <Sparkles className="h-3.5 w-3.5" />
                    幻想乡成长手账
                  </div>
                  <h3 className="text-2xl font-black text-[#392a52]">最近又做了什么？</h3>
                </div>
                <button
                  onClick={() => setShowUpdates(false)}
                  className="rounded-xl border-2 border-purple-100 bg-white p-2 text-slate-400 shadow-[2px_2px_0_#e9d5ff] hover:text-pink-500"
                  aria-label="关闭更新日记"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[52vh] space-y-4 overflow-y-auto pr-2">
                {updates.map((update, index) => (
                  <div
                    key={update.id}
                    className={`relative rounded-2xl border-2 border-dashed p-4 ${index % 2 === 0 ? 'rotate-[-0.5deg] border-pink-200 bg-pink-50/80' : 'rotate-[0.5deg] border-purple-200 bg-purple-50/80'}`}
                  >
                    <div className="mb-2 text-xs font-black text-purple-500">{update.date}</div>
                    <p className="text-sm leading-6 text-slate-600">{update.content}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowUpdates(false)}
                className="mt-6 w-full rounded-xl border-2 border-[#4c2a75] bg-[#6d42a6] py-3 text-sm font-black text-white shadow-[4px_5px_0_#f9a8d4] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
              >
                收到，继续逛逛 ♡
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-7 px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-16 lg:pt-16">
          <div className="relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-xs font-black text-purple-700 shadow-[4px_4px_0_#e9d5ff]"
            >
              <WandSparkles className="h-4 w-4 text-pink-500" />
              你的全能工具箱 · 持续长大中
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-balance mb-5 text-[2.7rem] font-black leading-[1.02] tracking-[-0.055em] text-[#392a52] sm:text-6xl lg:text-[4.7rem]"
            >
              <span className="relative inline-block">
                如如的
                <span className="absolute -right-7 -top-2 rotate-12 text-2xl text-pink-400">✦</span>
              </span>
              <span className="title-pop mt-2 block text-transparent">代码幻想乡</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mx-auto mb-7 max-w-xl text-sm font-medium leading-7 text-slate-500 sm:text-base lg:mx-0"
            >
              不是冷冰冰的工具导航，是我把日常里那些“要是有个网页就好了”的念头，一个个认真做出来，再收进这里。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mx-auto mb-6 flex max-w-xl flex-col gap-3 sm:flex-row lg:mx-0"
            >
              <label className="group relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="搜：经期、邪修、记账、游戏……"
                  className="h-14 w-full rounded-2xl border-2 border-purple-100 bg-white pl-12 pr-11 text-sm font-semibold text-slate-700 shadow-[5px_6px_0_#ede9fe] outline-none transition-all placeholder:text-slate-400 focus:border-pink-300 focus:shadow-[5px_6px_0_#fbcfe8]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-pink-50 hover:text-pink-500"
                    aria-label="清空搜索"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <a
                href="#works"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[#4b2b73] bg-[#6f46a8] px-6 text-sm font-black text-white shadow-[5px_6px_0_#f9a8d4] transition-all hover:-translate-y-1 hover:shadow-[5px_8px_0_#f9a8d4] active:translate-y-1 active:shadow-none"
              >
                开始翻图鉴
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-500 lg:justify-start"
            >
              <span className="-rotate-1 rounded-lg border border-pink-200 bg-[#fff4f8] px-3 py-2">🌸 {miniApps.length} 个作品</span>
              <span className="rotate-1 rounded-lg border border-purple-200 bg-[#f7f1ff] px-3 py-2">🗂️ {categories.length - 1} 个分类</span>
              <span className="-rotate-1 rounded-lg border border-amber-200 bg-[#fff9d8] px-3 py-2">✦ 全部如如开发</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.08, type: 'spring', stiffness: 145, damping: 19 }}
            className="relative"
          >
            <RuruHero />
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border-2 border-purple-100 bg-white/85 p-4 shadow-[7px_8px_0_rgba(216,180,254,0.45)] sm:p-5">
            <span className="absolute -left-3 top-5 h-8 w-24 -rotate-45 bg-pink-100/90" />
            <div className="relative flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
              <div className="flex items-center gap-3 text-center lg:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-purple-100 bg-purple-50 text-purple-600 shadow-[3px_3px_0_#ede9fe]">
                  <Star className="h-5 w-5 fill-amber-300 text-amber-400" />
                </div>
                <div>
                  <div className="font-black text-[#392a52]">如如最近比较偏爱的入口</div>
                  <div className="text-xs text-slate-400">不知道从哪里开始，就先点这几个</div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                {featuredApps.map((app, index) => (
                  <a
                    key={app.id}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex min-w-0 items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 text-left shadow-[3px_4px_0_#f3e8ff] transition-all hover:-translate-y-1 hover:border-pink-200 ${index === 1 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-xs font-black text-purple-600">
                      0{index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-[#392a52] group-hover:text-pink-600">{app.title}</span>
                      <span className="block truncate text-[11px] text-slate-400">{app.tag}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-pink-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex rotate-1 items-center gap-2 rounded-xl border-2 border-pink-200 bg-white px-4 py-2 text-xs font-black text-pink-600 shadow-[4px_4px_0_#fbcfe8]">
              <Heart className="h-3.5 w-3.5 fill-pink-300" />
              每一个都是我真的做出来的
            </div>
            <h2 className="relative text-3xl font-black tracking-tight text-[#392a52] sm:text-5xl">
              如如的作品图鉴
              <span className="absolute -right-8 -top-5 rotate-12 text-2xl text-purple-300">✦</span>
            </h2>
            <p className="hand-note mt-3 rotate-[-1deg] text-sm font-bold text-purple-500">慢慢逛，看到顺眼的就点进去玩一下呀。</p>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((category, index) => {
              const isActive = activeCategory === category;
              const count = category === '🌸 全部' ? miniApps.length : miniApps.filter((app) => app.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-black transition-all ${index % 2 ? 'rotate-[0.5deg]' : 'rotate-[-0.5deg]'} ${
                    isActive
                      ? 'border-[#4b2b73] bg-[#6f46a8] text-white shadow-[4px_5px_0_#f9a8d4]'
                      : 'border-purple-100 bg-white text-slate-600 shadow-[3px_4px_0_#ede9fe] hover:-translate-y-1 hover:border-pink-200 hover:text-pink-600'
                  }`}
                >
                  {category}
                  <span className={`rounded-lg px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-6 flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
            <p className="font-semibold text-slate-500">
              找到 <strong className="text-pink-600">{filteredApps.length}</strong> 个作品
              {searchQuery && <span>，与“{searchQuery}”有关</span>}
            </p>
            {(searchQuery || activeCategory !== '🌸 全部') && (
              <button onClick={clearFilters} className="hand-note text-sm font-bold text-purple-500 underline decoration-wavy decoration-pink-300 underline-offset-4">
                清空筛选，全部看看
              </button>
            )}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -12 }}
                  transition={{ duration: 0.25 }}
                  key={app.id}
                  className="h-full"
                >
                  <AppCard app={app} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredApps.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-24 w-24 rotate-3 items-center justify-center rounded-[30px] border-2 border-dashed border-pink-200 bg-white text-pink-300 shadow-[5px_6px_0_#fce7f3]">
                <Search className="h-9 w-9" />
              </div>
              <h3 className="mb-2 text-xl font-black text-[#392a52]">这个脑洞还没被我做出来</h3>
              <p className="mb-5 text-sm text-slate-400">换一个关键词，或者先看看已经入住的小世界。</p>
              <button
                onClick={clearFilters}
                className="rounded-xl border-2 border-[#4b2b73] bg-[#6f46a8] px-5 py-2.5 text-sm font-black text-white shadow-[4px_5px_0_#f9a8d4]"
              >
                返回全部作品
              </button>
            </motion.div>
          )}
        </section>
      </main>

      <Contact />

      <footer className="relative z-10 border-t-2 border-dashed border-purple-100 bg-white/45 px-4 py-10 text-center text-xs text-slate-400">
        <div className="mb-3 flex items-center justify-center gap-2 text-purple-400">
          <Code2 className="h-4 w-4" />
          <span className="font-black tracking-[0.12em]">RURU APP COLLECTION</span>
        </div>
        <p className="font-semibold">© {new Date().getFullYear()} 如如的代码幻想乡 · 都是如如开发的，随便试玩，随便提建议</p>
      </footer>
    </div>
  );
}
