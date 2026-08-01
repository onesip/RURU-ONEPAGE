import { MiniApp, Category, UpdateLog } from './types';

export const categories: Category[] = ['✨ 全部魔法', '🌸 仙女日常', '💕 贴贴交友', '📝 效率拉满', '🎮 梦幻游乐园'];

export const updates: UpdateLog[] = [
  {
    id: 'u1',
    date: '2026-08-01',
    content: '🌸 欢迎来到如如的代码幻想乡！这里是我亲手建造的小小世界，会把所有好玩的魔法都收集在这里哦 (≧∇≦)ﾉ',
  },
  {
    id: 'u2',
    date: '2026-08-02',
    content: '✨ 上新啦！如如自己开发的《雨巷十三号》小游戏，还有超级贴心的《月知》身体记录本，快去玩玩看吧~',
  }
];

export const miniApps: MiniApp[] = [
  {
    id: 'app-1',
    title: '月知 - 身体提醒',
    description: '仙女专属的生理期与身体记录本，贴心呵护你的每一天，软绵绵的关怀哦~',
    category: '🌸 仙女日常',
    icon: 'Heart',
    url: 'https://yuezhi.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-02'
  },
  {
    id: 'app-2',
    title: '软乎乎记账本',
    description: '钱钱去哪里了？快用这个超可爱的记账本把它们都抓起来吧！',
    category: '🌸 仙女日常',
    icon: 'Wallet',
    url: 'https://bankhome-hmza.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01'
  },
  {
    id: 'app-3',
    title: '同好交友集散地',
    description: '二次元的专属聚集地！在这里寻找同好，开心贴贴，遇见灵魂共鸣的小伙伴~',
    category: '💕 贴贴交友',
    icon: 'Users',
    url: 'https://euro-acg.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01'
  },
  {
    id: 'app-4',
    title: 'J星人狂喜记事本',
    description: '让一切井井有条的 Check List，强迫症一本满足！每天都要做个超有计划的乖宝宝！',
    category: '📝 效率拉满',
    icon: 'ListTodo',
    url: 'https://dayflow-open-planner.yangbooboo.chatgpt.site/',
    isNew: false,
    dateAdded: '2026-08-01'
  },
  {
    id: 'app-5',
    title: '雨巷十三号',
    description: '如如亲手打造的神秘游戏世界！快来探索这个充满惊喜的原创小游戏吧 (๑•̀ㅂ•́)و✧',
    category: '🎮 梦幻游乐园',
    icon: 'Gamepad2',
    url: 'https://rain-alley-13.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-02'
  }
];
