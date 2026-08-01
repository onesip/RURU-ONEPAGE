import React, { useMemo, useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import {
  ArrowDown,
  Bell,
  Code2,
  ExternalLink,
  Layers3,
  Search,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const HERO_IMAGE_URL = 'https://design.canva.ai/Dd8oyi3t0QbHj7M';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdates, setShowUpdates] = useState(false);

  const featuredApp = miniApps.find((app) => app.featured) || miniApps[0];

  const filteredApps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return miniApps.filter((app) => {
      const categoryMatch = activeCategory === '🌸 全部' || app.category === activeCategory;
      const searchable = [
        app.title,
        app.description,
        app.category,
        app.tag || '',
        ...(app.keywords || [])
      ]
        .join(' ')
        .toLowerCase();

      return categoryMatch && (!query || searchable.includes(query));
    });
  }, [activeCategory, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(categories[0]);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffafb] text-slate-800 selection:bg-fuchsia-200 selection:text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071742]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-300/50 bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_24px_rgba(217,70,239,0.35)]">
              <Code2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-black tracking-wide sm:text-base">如如的代码幻想乡</span>
              <span className="hidden text-[9px] font-bold tracking-[0.24em] text-fuchsia-200/80 sm:block">RURU APP COLLECTION</span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => setShowUpdates(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15"
          >
            <Bell className="h-4 w-4 text-fuchsia-200" />
            更新日记
            <span className="h-2 w-2 rounded-full bg-pink-400" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showUpdates && (
          <>
            <motion.button
              type="button"
              aria-label="关闭更新日记"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpdates(false)}
              className="fixed inset-0 z-50 cursor-default bg-slate-950/35 backdrop-blur-sm"
            />
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.28)] sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-black text-fuchsia-600">
                    <Sparkles className="h-4 w-4" />
                    幻想乡更新记录
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">最近新做了什么？</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUpdates(false)}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-fuchsia-50 hover:text-fuchsia-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[52vh] space-y-4 overflow-y-auto pr-2">
                {[...updates].reverse().map((update) => (
                  <article key={update.id} className="rounded-2xl border border-fuchsia-100 bg-[#fff9fe] p-4">
                    <div className="mb-2 text-xs font-black text-violet-600">{update.date}</div>
                    <p className="text-sm leading-6 text-slate-600">{update.content}</p>
                  </article>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero-circuit relative overflow-hidden bg-[#071742] text-white">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />

          <div className="relative z-10 mx-auto grid min-h-[690px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/35 bg-white/10 px-4 py-2 text-xs font-black text-fuchsia-100 backdrop-blur"
              >
                <Sparkles className="h-4 w-4 text-pink-300" />
                你的全能小工具箱 · 持续更新中
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-5 text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[76px]"
              >
                <span className="hero-title block">RURU APP</span>
                <span className="mt-3 block text-4xl text-white sm:text-5xl lg:text-6xl">实用工具合集</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mx-auto mb-8 max-w-xl text-sm leading-7 text-blue-100/80 sm:text-base lg:mx-0 lg:text-lg lg:leading-8"
              >
                如如开发的网页小程序、生活工具与独立游戏，都收在这里。分类清楚、可以搜索，找到后直接打开，不绕路。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mx-auto mb-7 flex max-w-2xl flex-col gap-3 sm:flex-row lg:mx-0"
              >
                <label className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="搜索：经期、记账、游戏、邪修……"
                    className="h-14 w-full rounded-2xl border-2 border-white bg-white pl-12 pr-11 text-sm font-medium text-slate-800 shadow-[0_16px_40px_rgba(0,0,0,0.25)] outline-none placeholder:text-slate-400 focus:border-fuchsia-300"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-fuchsia-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </label>

                <a
                  href="#works"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 text-sm font-black text-white shadow-[0_14px_38px_rgba(168,85,247,0.42)] transition-transform hover:-translate-y-0.5"
                >
                  开始探索
                  <ArrowDown className="h-4 w-4" />
                </a>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-blue-100/75 lg:justify-start">
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">{miniApps.length} 个作品</span>
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">{categories.length - 1} 个分类</span>
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">一站直达</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="relative mx-auto w-full max-w-[470px]"
            >
              <div className="hero-image-halo" />
              <div className="hero-image-frame relative aspect-[4/5] overflow-hidden rounded-[34px] border-[3px] border-white/85 bg-gradient-to-br from-violet-500 to-blue-700 shadow-[0_32px_90px_rgba(0,0,0,0.42)]">
                <img
                  src={HERO_IMAGE_URL}
                  alt="紫发动漫女孩在开发桌前使用平板电脑"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071742] via-[#071742]/35 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/25 bg-[#071742]/75 px-4 py-3 backdrop-blur-md">
                  <span>
                    <span className="block text-sm font-black">如如正在开发中</span>
                    <span className="mt-0.5 block text-[11px] text-blue-100/75">把奇怪点子认真做出来</span>
                  </span>
                  <span className="rounded-xl bg-fuchsia-500 px-3 py-2 text-xs font-black">RURU</span>
                </div>
              </div>
              <div className="absolute -right-3 -top-4 rotate-3 rounded-2xl border-2 border-white bg-pink-400 px-4 py-2 text-sm font-black text-white shadow-xl">
                NEW WORLD ✦
              </div>
            </motion.div>
          </div>
        </section>

        {featuredApp && (
          <section className="border-b border-fuchsia-100 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Star className="h-5 w-5 fill-current" />
                </span>
                <div>
                  <div className="text-xs font-black text-fuchsia-600">本期如如精选</div>
                  <div className="mt-1 text-lg font-black text-slate-900">{featuredApp.title}</div>
                </div>
              </div>
              <a
                href={featuredApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-violet-700"
              >
                直接体验
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}

        <section id="works" className="scroll-mt-20 bg-[#fffafb] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-black text-violet-700">
                  <Layers3 className="h-4 w-4" />
                  分类清楚 · 快速找到
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">如如的作品工具箱</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">没有乱飞的装饰，作品本身才是重点。</p>
              </div>

              <p className="rounded-full border border-fuchsia-100 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                当前显示 <strong className="text-fuchsia-600">{filteredApps.length}</strong> 个作品
              </p>
            </div>

            <div className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {categories.map((category) => {
                const active = activeCategory === category;
                const count = category === '🌸 全部'
                  ? miniApps.length
                  : miniApps.filter((app) => app.category === category).length;

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-black transition-all ${
                      active
                        ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-600'
                    }`}
                  >
                    {category}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {(searchQuery || activeCategory !== '🌸 全部') && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm text-slate-500">
                <span>
                  {searchQuery ? `正在搜索“${searchQuery}”` : `正在浏览 ${activeCategory}`}
                </span>
                <button type="button" onClick={clearFilters} className="font-black text-violet-600 hover:text-fuchsia-600">
                  清空筛选
                </button>
              </div>
            )}

            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app) => (
                  <motion.div
                    layout
                    key={app.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full"
                  >
                    <AppCard app={app} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredApps.length === 0 && (
              <div className="py-24 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-500">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">没有找到这项工具</h3>
                <p className="mt-2 text-sm text-slate-500">换个关键词，或者返回全部作品。</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-black text-white"
                >
                  查看全部
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Contact />

      <footer className="border-t border-slate-100 bg-white px-4 py-9 text-center text-xs text-slate-400">
        <p className="font-bold">© {new Date().getFullYear()} 如如的代码幻想乡</p>
        <p className="mt-2">持续更新 · 分类清晰 · 一站直达</p>
      </footer>
    </div>
  );
}
