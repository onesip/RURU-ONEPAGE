import { MiniApp, Category, UpdateLog } from './types';

export const categories: Category[] = ['🌸 全部', '🌿 生活与身心', '🎈 社区与同好', '✨ 效率与自律', '🎮 独立小游戏'];

export const updates: UpdateLog[] = [
  {
    id: 'u1',
    date: '2026-08-01',
    content: '🌷 欢迎做客如如的代码幻想乡！这里是我日常练手、做网页小程序的集中地，以后做出来的有趣工具和好玩的游戏都会陆续更新在这里。',
  },
  {
    id: 'u2',
    date: '2026-08-02',
    content: '✨ 上传了我自己做的剧情互动游戏《雨巷十三号》，还有女生专用的生理期提醒本《月知》，希望你们会喜欢！',
  }
];

export const miniApps: MiniApp[] = [
  {
    id: 'app-1',
    title: '月知 · 身体提醒',
    description: '一个安安静静的经期与健康管理小站。不仅记录经期时间，也会在特殊日子给你及时的提醒和关心。',
    category: '🌿 生活与身心',
    icon: 'Heart',
    url: 'https://yuezhi.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-02',
    tag: '温和日常'
  },
  {
    id: 'app-2',
    title: '温馨日常记账本',
    description: '把繁杂的收支明细变成清爽可爱的账本，随手记录每天的小开销，让攒钱和花钱都变得有仪式感。',
    category: '🌿 生活与身心',
    icon: 'Wallet',
    url: 'https://bankhome-hmza.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '实用工具'
  },
  {
    id: 'app-3',
    title: 'ACG 同好交友集散地',
    description: '二次元朋友之间的轻松小圈子。可以在这里寻找喜好相同的灵魂，聊聊新番和热爱，安利宝藏作品。',
    category: '🎈 社区与同好',
    icon: 'Users',
    url: 'https://euro-acg.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '热爱共鸣'
  },
  {
    id: 'app-4',
    title: 'J人狂喜 · 专注清单',
    description: '给计划型朋友准备的打卡 Check List，排版干净又治愈。一条条划掉今日任务，享受满满的掌控感。',
    category: '✨ 效率与自律',
    icon: 'ListTodo',
    url: 'https://dayflow-open-planner.yangbooboo.chatgpt.site/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '清晰整洁'
  },
  {
    id: 'app-5',
    title: '雨巷十三号',
    description: '如如自己独立打造的原创作品！下雨天的小巷深处藏着什么样的人和故事？快进去一探究竟吧。',
    category: '🎮 独立小游戏',
    icon: 'Gamepad2',
    url: 'https://rain-alley-13.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-02',
    tag: '如如原创'
  }
];

