import { MiniApp, Category, UpdateLog } from './types';

export const categories: Category[] = ['🌸 全部', '🌿 生活与身心', '🎈 社区与同好', '✨ 效率与自律', '🧪 邪修百科', '🎮 独立小游戏'];

export const updates: UpdateLog[] = [
  {
    id: 'u1',
    date: '2026-08-01',
    content: '🎀 幻想乡换上了轻动漫粉紫新装：增加作品搜索、分类筛选、精选标记和更清楚的作品信息，以后找小程序会更方便。',
  },
  {
    id: 'u2',
    date: '2026-08-01',
    content: '✨ 收录了原创剧情游戏《雨巷十三号》和女生身体节律助手《月知》，新的网页、小工具和游戏也会继续住进这里。',
  },
  {
    id: 'u3',
    date: '2026-08-01',
    content: '🧪 新增《如如邪修百科》：把公开分享中的省力、省钱和脑洞生活技巧整理成可以搜索和分类浏览的实验室。',
  }
];

export const miniApps: MiniApp[] = [
  {
    id: 'app-1',
    title: '月知 · 身体提醒',
    description: '一个温柔记录经期与身体节律的小助手。除了日期，也会陪你理解不同阶段的情绪、精力和身体变化。',
    category: '🌿 生活与身心',
    icon: 'Heart',
    url: 'https://yuezhi.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-01',
    tag: '女生友好',
    keywords: ['经期', '月经', '排卵期', '黄体期', '身体', '情绪', '健康'],
    featured: true,
    tone: 'rose'
  },
  {
    id: 'app-2',
    title: '温馨日常记账本',
    description: '把繁杂的收支明细变成清爽可爱的日常账本。随手记下小开销，让花钱和攒钱都更有掌控感。',
    category: '🌿 生活与身心',
    icon: 'Wallet',
    url: 'https://bankhome-hmza.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '实用工具',
    keywords: ['记账', '账本', '收支', '预算', '存钱', '财务'],
    tone: 'peach'
  },
  {
    id: 'app-3',
    title: 'ACG 同好交友集散地',
    description: '给二次元朋友准备的轻松小圈子。可以寻找喜好相近的人，聊新番、分享热爱，也安利自己的宝藏作品。',
    category: '🎈 社区与同好',
    icon: 'Users',
    url: 'https://euro-acg.vercel.app/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '同好社区',
    keywords: ['ACG', '动漫', '二次元', '交友', '同好', '社区'],
    tone: 'lavender'
  },
  {
    id: 'app-4',
    title: 'J人狂喜 · 专注清单',
    description: '给计划型朋友准备的可爱 Check List。把今天要做的事一条条划掉，收获清清楚楚的进度和完成感。',
    category: '✨ 效率与自律',
    icon: 'ListTodo',
    url: 'https://dayflow-open-planner.yangbooboo.chatgpt.site/',
    isNew: false,
    dateAdded: '2026-08-01',
    tag: '计划控',
    keywords: ['清单', '计划', '待办', '打卡', '效率', '自律', 'J人'],
    tone: 'mint'
  },
  {
    id: 'app-5',
    title: '雨巷十三号',
    description: '如如独立制作的原创剧情互动游戏。雨夜、小巷、来历不明的客人，以及会互相牵动的选择与谜团。',
    category: '🎮 独立小游戏',
    icon: 'Gamepad2',
    url: 'https://rain-alley-13.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-01',
    tag: '原创游戏',
    keywords: ['游戏', '剧情', '互动', '悬疑', '雨巷', '独立游戏'],
    featured: true,
    tone: 'sky'
  },
  {
    id: 'app-6',
    title: '如如邪修百科',
    description: '把散落在公开分享里的省力、省钱和脑洞生活技巧收进一间可搜索、可分类浏览的邪修实验室。先看原理和风险，再决定要不要亲自试。',
    category: '🧪 邪修百科',
    icon: 'FlaskConical',
    url: 'https://ruru-xiexiu-lab.vercel.app/',
    isNew: true,
    dateAdded: '2026-08-01',
    tag: '脑洞技巧',
    keywords: ['邪修', '百科', '攻略', '技巧', '省钱', '省力', '生活妙招', '实验室', '小红书'],
    featured: true,
    tone: 'lavender'
  }
];
