import { MiniApp, Category, UpdateLog } from './types';

export const categories: Category[] = ['所有', '实用工具', '游戏娱乐', '创意设计', '学习开发'];

export const updates: UpdateLog[] = [
  {
    id: 'u1',
    date: '2026-08-01',
    content: '🎉 网站正式上线！欢迎大家探索各种有趣的小工具。如果有想要开发的新功能或者网站，随时点击底部的邮件联系我！',
  },
  {
    id: 'u2',
    date: '2026-08-02',
    content: '✨ 新增了「极简番茄钟」和「密码生成器」两个实用工具。',
  }
];

export const miniApps: MiniApp[] = [
  {
    id: 'app-1',
    title: '极简番茄钟',
    description: '一个极简风格的番茄工作法计时器，帮助你保持专注，提升工作与学习效率。',
    category: '实用工具',
    icon: 'Timer',
    url: '#',
    isNew: true,
    dateAdded: '2026-08-02'
  },
  {
    id: 'app-2',
    title: '强密码生成器',
    description: '在本地快速生成安全可靠的随机密码，不上传任何数据，保护你的账号安全。',
    category: '实用工具',
    icon: 'Key',
    url: '#',
    isNew: true,
    dateAdded: '2026-08-02'
  },
  {
    id: 'app-3',
    title: '颜色转换器',
    description: 'HEX、RGB、HSL 颜色值双向无缝转换工具，设计师和前端开发者的必备小助手。',
    category: '创意设计',
    icon: 'Palette',
    url: '#',
    isNew: false,
    dateAdded: '2026-08-01'
  },
  {
    id: 'app-4',
    title: '每日灵感词汇',
    description: '每天随机生成一个有趣的英文单词及其中文释义，在碎片时间扩充词汇量。',
    category: '学习开发',
    icon: 'BookOpen',
    url: '#',
    isNew: false,
    dateAdded: '2026-08-01'
  },
  {
    id: 'app-5',
    title: '摸鱼贪吃蛇',
    description: '经典的贪吃蛇小游戏，工作累了可以在网页上直接开玩，放松一下大脑。',
    category: '游戏娱乐',
    icon: 'Gamepad2',
    url: '#',
    isNew: false,
    dateAdded: '2026-08-01'
  }
];
