import React, { useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import { Sparkles, Bell, Heart, X, Sparkle, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showUpdates, setShowUpdates] = useState(false);

  const filteredApps = activeCategory === '🌸 全部' 
    ? miniApps 
    : miniApps.filter(app => app.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 font-sans text-gray-800 selection:bg-pink-100 selection:text-pink-900 overflow-x-hidden relative">
      
      {/* Subtle floating decor */}
      <div className="fixed top-24 left-12 text-pink-200/40 pointer-events-none">
        <Heart className="w-16 h-16 fill-current rotate-12" />
      </div>
      <div className="fixed bottom-36 right-12 text-purple-200/40 pointer-events-none">
        <Sparkle className="w-14 h-14 fill-current -rotate-12" />
      </div>

      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-pink-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-300 to-purple-400 rounded-xl flex items-center justify-center text-white shadow-sm shadow-pink-100 group-hover:rotate-6 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-800">
              如如的代码幻想乡
            </span>
          </div>
          <button 
            onClick={() => setShowUpdates(true)}
            className="relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:text-pink-600 bg-white/80 hover:bg-pink-50/80 border border-pink-100 rounded-full transition-all shadow-xs"
          >
            <Bell className="w-4 h-4 text-pink-400" />
            <span>更新日志</span>
            <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Updates Modal */}
      <AnimatePresence>
        {showUpdates && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/15 backdrop-blur-xs z-50"
              onClick={() => setShowUpdates(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border-2 border-pink-100 shadow-xl rounded-[28px] z-50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  最新动态与更新
                </h3>
                <button onClick={() => setShowUpdates(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                   <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {updates.map((update, idx) => (
                  <div key={update.id} className="relative pl-6">
                    {idx !== updates.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-[-20px] w-[1.5px] bg-pink-100"></div>
                    )}
                    <div className="absolute left-[-1px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-pink-400 shadow-xs"></div>
                    <div className="text-xs font-semibold text-pink-500 mb-1.5">{update.date}</div>
                    <div className="text-sm text-gray-600 leading-relaxed bg-pink-50/40 border border-pink-100/60 p-3.5 rounded-2xl">{update.content}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-5 border-t border-pink-50 text-center">
                <button 
                  onClick={() => setShowUpdates(false)}
                  className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-semibold text-sm hover:opacity-95 transition-all shadow-sm"
                >
                  知道啦
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-200 text-pink-600 font-medium text-xs mb-6 shadow-xs"
        >
          <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-400" />
          <span>Hi, 我是如如 🌷 · 喜欢做一些好玩又温暖的小网页</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight mb-5 leading-snug"
        >
          探索与收藏 <br className="sm:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400">
            如如的代码幻想乡
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          这是我的个人作品与喜好集合站。无论是生理期提醒、日常记账，还是好玩的游戏和同好社区，希望能在这里给你带来一点暖意和便利。
        </motion.p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-200/60 font-semibold scale-105'
                  : 'bg-white text-gray-600 border border-pink-100 hover:border-pink-300 hover:bg-pink-50/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* App Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
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
          <div className="text-center py-20 text-gray-400">
            <Heart className="w-12 h-12 mx-auto mb-3 text-pink-200" />
            <p className="text-sm">这个分类下暂时没有内容，随后就会继续完善～</p>
          </div>
        )}
      </main>

      <Contact />
      
      <footer className="text-center py-10 text-xs text-gray-400 border-t border-pink-100/60 relative z-10">
        <p>© {new Date().getFullYear()} 如如的代码幻想乡 · 带着好奇与真诚持续生长</p>
      </footer>
    </div>
  );
}

