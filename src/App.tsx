import React, { useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import { Sparkles, Bell, Cat, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showUpdates, setShowUpdates] = useState(false);

  const filteredApps = activeCategory === '✨ 全部魔法' 
    ? miniApps 
    : miniApps.filter(app => app.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 font-sans text-gray-800 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden relative">
      
      {/* Cute floating background elements */}
      <div className="fixed top-20 left-10 text-pink-200/60 pointer-events-none"><Heart className="w-20 h-20 fill-current rotate-12" /></div>
      <div className="fixed bottom-40 right-10 text-purple-200/60 pointer-events-none"><Sparkles className="w-16 h-16 fill-current -rotate-12" /></div>

      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b-2 border-pink-100 shadow-sm shadow-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:rotate-12 transition-transform">
              <Cat className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight ml-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              如如的代码幻想乡
            </span>
          </div>
          <button 
            onClick={() => setShowUpdates(true)}
            className="relative p-2.5 text-pink-400 hover:text-pink-600 hover:bg-pink-100 rounded-full transition-colors group"
          >
            <Bell className="w-6 h-6 group-hover:scale-110 transition-transform origin-top" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white animate-pulse"></span>
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
              className="fixed inset-0 bg-pink-900/20 backdrop-blur-sm z-50"
              onClick={() => setShowUpdates(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border-4 border-pink-100 shadow-[0_20px_60px_-15px_rgba(244,114,182,0.3)] rounded-[32px] z-50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-pink-100 text-pink-500 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  如如的最新广播~
                </h3>
                <button onClick={() => setShowUpdates(false)} className="text-gray-400 hover:text-pink-500 bg-gray-50 hover:bg-pink-50 p-2 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {updates.map((update, idx) => (
                  <div key={update.id} className="relative pl-6">
                    {idx !== updates.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-[-24px] w-[2px] bg-pink-100 border-dashed"></div>
                    )}
                    <div className="absolute left-[-1px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-pink-400 shadow-sm"></div>
                    <div className="text-xs font-black text-pink-400 tracking-wider mb-2">{update.date}</div>
                    <div className="text-sm text-gray-600 leading-relaxed bg-pink-50/50 border border-pink-100 p-4 rounded-2xl">{update.content}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-pink-50 text-center">
                <button 
                  onClick={() => setShowUpdates(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95"
                >
                  收到啦！(๑•̀ㅂ•́)و✧
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-pink-200 text-pink-500 font-bold text-sm mb-8 shadow-sm shadow-pink-100"
        >
          <Heart className="w-4 h-4 fill-pink-200" />
          <span>持续更新的可爱宝藏库 ✨</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 tracking-tight mb-6 leading-tight"
        >
          欢迎来到<br className="sm:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 relative inline-block">
            如如的代码幻想乡
            <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-pink-300 animate-pulse" />
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          这里收集了如如施放的所有代码魔法哦！点击感兴趣的小卡片，一起进入奇妙的世界吧~ (🎀 持续更新中)
        </motion.p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-pink-400 text-white shadow-lg shadow-pink-200 scale-105'
                  : 'bg-white text-gray-500 border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-500'
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
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
                key={app.id}
                className="h-full"
              >
                <AppCard app={app} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-20 text-pink-300">
            <Cat className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-bold">这个分类下还没有小魔法哦，如如正在努力开发中！</p>
          </div>
        )}
      </main>

      <Contact />
      
      <footer className="text-center py-10 text-sm font-bold text-pink-300 relative z-10">
        <p>Made with <Heart className="w-4 h-4 inline-block mx-1 fill-current animate-pulse" /> by 如如 © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
