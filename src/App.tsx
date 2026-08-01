import React, { useEffect, useMemo, useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import RURU_HERO_HD from './assets/ruruHeroHd';
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

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdates, setShowUpdates] = useState(false);
  const [showAppPicker, setShowAppPicker] = useState(false);
  const [pickerQuery, setPickerQuery] = useState('');

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

  const pickerApps = useMemo(() => {
    const query = pickerQuery.trim().toLowerCase();
    if (!query) return miniApps;

    return miniApps.filter((app) =>
      [app.title, app.description, app.category, app.tag || '', ...(app.keywords || [])]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [pickerQuery]);

  useEffect(() => {
    const modalOpen = showUpdates || showAppPicker;
    document.body.style.overflow = modalOpen ? 'hidden' : '';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUpdates(false);
        setShowAppPicker(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showUpdates, showAppPicker]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(categories[0]);
  };

  const openPicker = () => {
    setPickerQuery('');
    setShowAppPicker(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#061237] text-white selection:bg-fuchsia-300 selection:text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061237]/95 text-white backdrop-blur-xl">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPicker}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 py-2 text-xs font-black text-white shadow-[0_0_24px_rgba(217,70,239,0.24)] sm:inline-flex"
            >
              <Layers3 className="h-4 w-4" />
              直接选网站
            </button>
            <button
              type="button"
              onClick={() => setShowUpdates(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15"
            >
              <Bell className="h-4 w-4 text-fuchsia-200" />
              <span className="hidden sm:inline">更新日记</span>
              <span className="h-2 w-2 rounded-full bg-pink-400" />
            </button>
          </div>
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
              className="fixed inset-0 z-50 cursor-default bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-fuchsia-300/25 bg-[#0b1d51] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-black text-fuchsia-300">
                    <Sparkles className="h-4 w-4" />
                    幻想乡更新记录
                  </div>
                  <h2 className="text-2xl font-black text-white">最近新做了什么？</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUpdates(false)}
                  className="rounded-full bg-white/10 p-2 text-blue-100/70 hover:bg-white/15 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[52vh] space-y-4 overflow-y-auto pr-2">
                {[...updates].reverse().map((update) => (
                  <article key={update.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="mb-2 text-xs font-black text-fuchsia-300">{update.date}</div>
                    <p className="text-sm leading-6 text-blue-100/75">{update.content}</p>
                  </article>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAppPicker && (
          <>
            <motion.button
              type="button"
              aria-label="关闭网站选择器"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppPicker(false)}
              className="fixed inset-0 z-[60] cursor-default bg-slate-950/80 backdrop-blur-md"
            />
            <motion.section
              initial={{ opacity: 0, y: 48, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.98 }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-hidden rounded-t-[30px] border border-fuchsia-300/25 bg-[#091a49] shadow-[0_-24px_80px_rgba(0,0,0,0.55)] sm:left-1/2 sm:right-auto sm:top-1/2 sm:bottom-auto sm:w-[92%] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[30px]"
            >
              <div className="border-b border-white/10 px-5 pb-4 pt-5 sm:px-7 sm:pt-7">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-black text-fuchsia-300">
                      <Layers3 className="h-4 w-4" />
                      一站直达
                    </div>
                    <h2 className="text-2xl font-black text-white">直接选择你要打开的网站</h2>
                    <p className="mt-2 text-sm text-blue-100/65">不用继续往下刷，搜名字或直接点开。</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAppPicker(false)}
                    className="shrink-0 rounded-full bg-white/10 p-2.5 text-blue-100/70 hover:bg-white/15 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <label className="relative block">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fuchsia-300" />
                  <input
                    autoFocus
                    value={pickerQuery}
                    onChange={(event) => setPickerQuery(event.target.value)}
                    placeholder="搜索：月知、雨巷、邪修、记账……"
                    className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 pl-12 pr-4 text-sm font-medium text-white outline-none placeholder:text-blue-100/35 focus:border-fuchsia-300/70 focus:bg-white/[0.12]"
                  />
                </label>
              </div>

              <div className="custom-scrollbar max-h-[58vh] overflow-y-auto p-4 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {pickerApps.map((app) => (
                    <a
                      key={app.id}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/45 hover:bg-white/[0.1]"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] font-black text-fuchsia-200">
                          {app.category}
                        </span>
                        <ExternalLink className="h-4 w-4 text-blue-100/35 transition-colors group-hover:text-fuchsia-300" />
                      </div>
                      <h3 className="text-base font-black text-white transition-colors group-hover:text-fuchsia-200">{app.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-blue-100/55">{app.description}</p>
                    </a>
                  ))}
                </div>

                {pickerApps.length === 0 && (
                  <div className="py-12 text-center text-blue-100/55">没有找到，换个关键词试试。</div>
                )}
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero-circuit relative overflow-hidden bg-[#061237] text-white">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:min-h-[690px] lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/35 bg-white/10 px-4 py-2 text-xs font-black text-fuchsia-100 backdrop-blur"
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
                className="mx-auto mb-7 max-w-xl text-sm leading-7 text-blue-100/75 sm:text-base lg:mx-0 lg:text-lg lg:leading-8"
              >
                如如开发的网页小程序、生活工具与独立游戏都在这里。可以搜索、按分类慢慢逛，也可以直接打开网站选择器。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mx-auto mb-6 flex max-w-2xl flex-col gap-3 sm:flex-row lg:mx-0"
              >
                <button
                  type="button"
                  onClick={openPicker}
                  className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 text-sm font-black text-white shadow-[0_14px_38px_rgba(168,85,247,0.42)] transition-transform hover:-translate-y-0.5"
                >
                  <Layers3 className="h-5 w-5" />
                  直接选择网站
                </button>

                <a
                  href="#works"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/15"
                >
                  浏览全部
                  <ArrowDown className="h-4 w-4" />
                </a>
              </motion.div>

              <label className="relative mx-auto mb-7 hidden max-w-2xl sm:block lg:mx-0">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="在作品区筛选：经期、记账、游戏、邪修……"
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

              <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-blue-100/70 lg:justify-start">
                <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-2">{miniApps.length} 个作品</span>
                <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-2">{categories.length - 1} 个分类</span>
                <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-2">弹窗直达</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="relative mx-auto w-full max-w-[420px] sm:max-w-[455px]"
            >
              <div className="hero-image-halo" />
              <div className="hero-image-frame relative aspect-[4/5] overflow-hidden rounded-[34px] border-[3px] border-white/85 bg-gradient-to-br from-violet-500 to-blue-700 shadow-[0_32px_90px_rgba(0,0,0,0.42)]">
                <img
                  src={RURU_HERO_HD}
                  alt="紫发动漫女孩在开发桌前使用平板电脑"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                  decoding="sync"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#061237] via-[#061237]/25 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/25 bg-[#061237]/78 px-4 py-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                  <span>
                    <span className="block text-sm font-black">如如正在开发中</span>
                    <span className="mt-0.5 block text-[11px] text-blue-100/75">高清原图 · 固定比例 · 不会移位</span>
                  </span>
                  <span className="rounded-xl bg-fuchsia-500 px-3 py-2 text-xs font-black">RURU</span>
                </div>
              </div>
              <div className="absolute -right-2 -top-3 rotate-2 rounded-2xl border-2 border-white bg-pink-400 px-3 py-2 text-xs font-black text-white shadow-xl sm:-right-3 sm:-top-4 sm:px-4 sm:text-sm">
                HD ✦ ANIME
              </div>
            </motion.div>
          </div>
        </section>

        {featuredApp && (
          <section className="border-y border-white/10 bg-[#0a1b4b]">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300">
                  <Star className="h-5 w-5 fill-current" />
                </span>
                <div>
                  <div className="text-xs font-black text-fuchsia-300">本期如如精选</div>
                  <div className="mt-1 text-lg font-black text-white">{featuredApp.title}</div>
                </div>
              </div>
              <a
                href={featuredApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-black text-white transition-colors hover:border-fuchsia-300/50 hover:bg-fuchsia-400/15"
              >
                直接体验
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}

        <section id="works" className="works-circuit scroll-mt-20 border-b border-white/10 bg-[#071640] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-4 py-2 text-xs font-black text-fuchsia-200">
                  <Layers3 className="h-4 w-4" />
                  和首页同一套轻动漫科技风
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">如如的作品工具箱</h2>
                <p className="mt-3 text-sm leading-6 text-blue-100/60">从主视觉到作品卡、按钮和联系区，全部统一成深蓝粉紫体系。</p>
              </div>

              <button
                type="button"
                onClick={openPicker}
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/35 bg-fuchsia-400/10 px-4 py-2 text-sm font-black text-fuchsia-100 transition-colors hover:bg-fuchsia-400/20"
              >
                <Layers3 className="h-4 w-4" />
                弹窗快速选择
              </button>
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
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black transition-all ${
                      active
                        ? 'border-fuchsia-300/70 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow-[0_0_28px_rgba(217,70,239,0.25)]'
                        : 'border-white/10 bg-white/[0.06] text-blue-100/70 hover:border-fuchsia-300/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-100/45'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {(searchQuery || activeCategory !== '🌸 全部') && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-blue-100/60">
                <span>
                  {searchQuery ? `正在搜索“${searchQuery}”` : `正在浏览 ${activeCategory}`}
                </span>
                <button type="button" onClick={clearFilters} className="font-black text-fuchsia-300 hover:text-pink-300">
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
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/10 text-violet-300">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-white">没有找到这项工具</h3>
                <p className="mt-2 text-sm text-blue-100/55">换个关键词，或者返回全部作品。</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-black text-white"
                >
                  查看全部
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Contact />

      <footer className="border-t border-white/10 bg-[#050f2f] px-4 pb-24 pt-9 text-center text-xs text-blue-100/45 md:pb-9">
        <p className="font-bold text-blue-100/70">© {new Date().getFullYear()} 如如的代码幻想乡</p>
        <p className="mt-2">持续更新 · 分类清晰 · 一站直达</p>
      </footer>

      <button
        type="button"
        onClick={openPicker}
        className="fixed bottom-4 left-1/2 z-40 inline-flex h-14 -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-white/30 bg-gradient-to-r from-fuchsia-500 to-violet-500 px-7 text-sm font-black text-white shadow-[0_16px_45px_rgba(0,0,0,0.42),0_0_30px_rgba(217,70,239,0.32)] md:hidden"
      >
        <Layers3 className="h-5 w-5" />
        直接选择网站
      </button>
    </div>
  );
}
