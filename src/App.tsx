import React, { useMemo, useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import { RuruAvatar } from './components/RuruAvatar';
import {
  Search,
  Bell,
  Heart,
  X,
  Sparkles,
  Star,
  ArrowDown,
  Rocket,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdates, setShowUpdates] = useState(false);

  const featuredApps = miniApps.filter((app) => app.featured).slice(0, 2);

  const filteredApps = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return miniApps.filter((app) => {
      const matchesCategory = activeCategory === '🌸 全部' || app.category === activeCategory;
      const searchableText = [
        app.title,
        app.description,
        app.category,
        app.tag || '',
        ...(app.keywords || [])
      ]
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
    <div className="site-shell relative min-h-screen overflow-x-hidden bg-[#fff9fd] font-sans text-slate-800 selection:bg-pink-200 selection:text-pink-950">
      <div className="dream-grid pointer-events-none fixed inset-0 opacity-60" />
      <div className="pointer-events-none fixed -left-24 top-28 h-72 w-72 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="pointer-events-none fixed -right-28 top-[28%] h-80 w-80 rounded-full bg-purple-200/35 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-[35%] h-64 w-64 rounded-full bg-fuchsia-100/55 blur-3xl" />

      <div className="pointer-events-none fixed left-[7%] top-28 hidden text-pink-300/55 float-slow lg:block">
        <Heart className="h-12 w-12 fill-current rotate-12" />
      </div>
      <div className="pointer-events-none fixed right-[8%] top-[42%] hidden text-purple-300/55 float-reverse lg:block">
        <Sparkles className="h-11 w-11" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/90 bg-white/65 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-2.5">
            <RuruAvatar size="sm" className="transition-transform group-hover:rotate-3 group-hover:scale-110" />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight text-slate-800 sm:text-base">如如的代码幻想乡</div>
              <div className="hidden text-[10px] font-medium tracking-[0.18em] text-pink-400 sm:block">RURU'S LITTLE WEB UNIVERSE</div>
            </div>
          </a>

          <button
            onClick={() => setShowUpdates(true)}
            className="relative inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/85 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:text-pink-600"
          >
            <Bell className="h-4 w-4 text-pink-400" />
            <span>更新日记</span>
            <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-400" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showUpdates && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-purple-950/15 backdrop-blur-sm"
              onClick={() => setShowUpdates(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] border border-white bg-white/95 p-6 shadow-[0_30px_90px_-25px_rgba(88,28,135,0.45)] sm:p-8"
            >
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-pink-200/55 blur-2xl" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-pink-500">
                      <Sparkles className="h-3.5 w-3.5" />
                      幻想乡成长记录
                    </div>
                    <h3 className="text-xl font-black text-slate-800">最近又长出了什么？</h3>
                  </div>
                  <button
                    onClick={() => setShowUpdates(false)}
                    className="rounded-full bg-slate-50 p-2.5 text-slate-400 transition-colors hover:bg-pink-50 hover:text-pink-500"
                    aria-label="关闭更新日记"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="custom-scrollbar max-h-[52vh] space-y-5 overflow-y-auto pr-2">
                  {updates.map((update, idx) => (
                    <div key={update.id} className="relative pl-7">
                      {idx !== updates.length - 1 && (
                        <div className="absolute bottom-[-20px] left-[7px] top-6 w-px bg-gradient-to-b from-pink-200 to-purple-100" />
                      )}
                      <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-[4px] border-white bg-gradient-to-br from-pink-400 to-purple-400 shadow-sm" />
                      <div className="mb-1.5 text-xs font-bold text-pink-500">{update.date}</div>
                      <div className="rounded-2xl border border-pink-100/80 bg-gradient-to-br from-pink-50/80 to-purple-50/55 p-4 text-sm leading-6 text-slate-600">
                        {update.content}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowUpdates(false)}
                  className="mt-7 w-full rounded-2xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200/70 transition-transform active:scale-[0.98]"
                >
                  收到，继续逛逛 ♡
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pb-20 lg:pt-24">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/80 px-4 py-2 text-xs font-bold text-pink-600 shadow-sm backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5" />
              如如开发的小程序、网站与独立游戏合集
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-balance mb-6 text-4xl font-black leading-[1.15] tracking-[-0.04em] text-slate-800 sm:text-5xl lg:text-6xl"
            >
              把脑海里的小愿望，
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                做成可以打开的世界。
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base lg:mx-0 lg:text-lg lg:leading-8"
            >
              这里收着我做过的实用小工具、女生友好网页、ACG 同好空间和原创小游戏。输入你正在寻找的东西，或按分类慢慢逛，总会碰到一颗合适的小星星。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mx-auto mb-7 flex max-w-2xl flex-col gap-3 sm:flex-row lg:mx-0"
            >
              <label className="group relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400 transition-transform group-focus-within:scale-110" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="搜一搜：经期、记账、游戏、清单……"
                  className="h-14 w-full rounded-2xl border border-white bg-white/90 pl-12 pr-11 text-sm text-slate-700 shadow-[0_18px_45px_-28px_rgba(219,39,119,0.55)] outline-none transition-all placeholder:text-slate-400 focus:border-pink-300 focus:ring-4 focus:ring-pink-100/70"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition-colors hover:bg-pink-50 hover:text-pink-500"
                    aria-label="清空搜索"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <a
                href="#works"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-6 text-sm font-bold text-white shadow-lg shadow-pink-200/70 transition-all hover:-translate-y-0.5 hover:shadow-pink-300/70"
              >
                开始探索
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 lg:justify-start"
            >
              <span className="rounded-full border border-pink-100 bg-white/70 px-3 py-1.5">
                <strong className="text-pink-600">{miniApps.length}</strong> 个作品已入住
              </span>
              <span className="rounded-full border border-purple-100 bg-white/70 px-3 py-1.5">
                <strong className="text-purple-600">{categories.length - 1}</strong> 个小世界分类
              </span>
              <span className="rounded-full border border-amber-100 bg-white/70 px-3 py-1.5">
                持续更新中 ✦
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, type: 'spring', stiffness: 150, damping: 18 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute -inset-3 rounded-[42px] bg-gradient-to-br from-pink-200/60 via-white to-purple-200/60 blur-xl" />
            <div className="glass-panel relative overflow-hidden rounded-[38px] border border-white/95 bg-white/76 p-5 shadow-[0_35px_90px_-42px_rgba(126,34,206,0.6)] backdrop-blur-2xl sm:p-7">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-200/45 blur-3xl" />
              <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-purple-200/45 blur-3xl" />

              <div className="relative z-10 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <RuruAvatar size="xl" className="border-4 border-white shadow-lg" />
                    <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
                  </div>
                  <div>
                    <div className="font-black text-slate-800">如如正在制作中</div>
                    <div className="mt-1 text-xs text-slate-400">把奇怪点子认真做出来的人</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-pink-50 p-3 text-pink-500 float-slow">
                  <Rocket className="h-5 w-5" />
                </div>
              </div>

              <div className="relative z-10 rounded-[28px] border border-pink-100 bg-gradient-to-br from-white/95 to-pink-50/75 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                    <Star className="h-4 w-4 fill-amber-300 text-amber-400" />
                    如如精选入口
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-purple-400">FEATURED</span>
                </div>

                <div className="space-y-3">
                  {featuredApps.map((app, index) => (
                    <a
                      key={app.id}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-white bg-white/85 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${index === 0 ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'}`}>
                        0{index + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-sm font-bold text-slate-700 group-hover:text-pink-600">{app.title}</span>
                        <span className="mt-0.5 block truncate text-xs text-slate-400">{app.tag} · {app.category.replace(/^..\s/, '')}</span>
                      </span>
                      <ExternalLink className="h-4 w-4 text-slate-300 transition-colors group-hover:text-pink-500" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-4 flex items-center justify-between rounded-2xl border border-purple-100/80 bg-purple-50/65 px-4 py-3 text-xs text-purple-700">
                <span>下一颗小星星，也许已经在路上了</span>
                <Sparkles className="h-4 w-4 text-purple-400" />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="works" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/75 px-4 py-2 text-xs font-bold text-purple-600 shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
              请选择你今天想去的小世界
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">幻想乡作品图鉴</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              可以按类型筛选，也可以直接在上方搜索名称、用途或关键词。
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              const count = category === '🌸 全部' ? miniApps.length : miniApps.filter((app) => app.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'scale-[1.03] bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200/60'
                      : 'border border-white bg-white/78 text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/80 hover:text-pink-600'
                  }`}
                >
                  {category}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-5 flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
            <p className="text-slate-500">
              找到 <strong className="text-pink-600">{filteredApps.length}</strong> 个作品
              {searchQuery && <span>，与“{searchQuery}”有关</span>}
            </p>
            {(searchQuery || activeCategory !== '🌸 全部') && (
              <button onClick={clearFilters} className="text-xs font-bold text-purple-500 transition-colors hover:text-pink-600">
                清空筛选，全部看看
              </button>
            )}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-pink-100 bg-white/80 text-pink-300 shadow-sm">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-black text-slate-700">这颗星星暂时还没住进来</h3>
              <p className="mb-5 text-sm text-slate-400">换一个关键词试试，或者先看看全部作品吧。</p>
              <button
                onClick={clearFilters}
                className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200/60"
              >
                返回全部作品
              </button>
            </motion.div>
          )}
        </section>
      </main>

      <Contact />

      <footer className="relative z-10 border-t border-white/80 bg-white/35 px-4 py-9 text-center text-xs text-slate-400 backdrop-blur-xl">
        <p className="font-medium">© {new Date().getFullYear()} 如如的代码幻想乡 · 所有小世界都由好奇心认真搭建</p>
        <p className="mt-2 text-[11px] text-pink-300">Made with code, courage and a little bit of pink magic.</p>
      </footer>
    </div>
  );
}
