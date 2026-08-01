import React, { useState } from 'react';
import { categories, miniApps, updates } from './data';
import { AppCard } from './components/AppCard';
import { Contact } from './components/Contact';
import { Sparkles, Bell, LayoutGrid, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showUpdates, setShowUpdates] = useState(false);

  const filteredApps = activeCategory === '所有' 
    ? miniApps 
    : miniApps.filter(app => app.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-800 selection:text-zinc-50">
      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-300 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight ml-1 text-zinc-50">极客工坊</span>
          </div>
          <button 
            onClick={() => setShowUpdates(true)}
            className="relative p-2.5 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-full transition-colors group"
          >
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950"></span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowUpdates(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl rounded-[24px] z-50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-extrabold flex items-center gap-2 text-zinc-50">
                  <div className="p-2 bg-zinc-800 text-zinc-400 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  最新动态
                </h3>
                <button onClick={() => setShowUpdates(false)} className="text-zinc-500 hover:text-zinc-300 bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {updates.map((update, idx) => (
                  <div key={update.id} className="relative pl-6">
                    {idx !== updates.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-[-24px] w-[2px] bg-zinc-800"></div>
                    )}
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-zinc-900 bg-zinc-500 shadow-sm"></div>
                    <div className="text-xs font-bold text-zinc-500 tracking-wider mb-2 uppercase">{update.date}</div>
                    <div className="text-sm text-zinc-300 leading-relaxed bg-zinc-800/50 border border-zinc-800/50 p-4 rounded-2xl">{update.content}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                <button 
                  onClick={() => setShowUpdates(false)}
                  className="w-full py-3.5 bg-zinc-800 text-zinc-300 rounded-xl font-semibold hover:bg-zinc-700 transition-colors"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium text-xs uppercase tracking-wider mb-8"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>持续更新的灵感库 v2.4</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-50 tracking-tight mb-6 leading-tight"
        >
          Everything I Built,<br/>All In One Place.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Explore my collection of mini-programs and web experiments. Updated weekly.
        </motion.p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-zinc-50 text-zinc-950 font-semibold'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* App Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={app.id}
                className="h-full"
              >
                <AppCard app={app} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <LayoutGrid className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-sm font-medium">该分类下暂无应用，敬请期待！</p>
          </div>
        )}
      </main>

      <Contact />
      
      <footer className="text-center py-10 text-sm font-medium text-zinc-500 border-t border-zinc-800/50 mt-12">
        <p>© {new Date().getFullYear()} 极客工坊 - 保持好奇，持续创造</p>
      </footer>
    </div>
  );
}
