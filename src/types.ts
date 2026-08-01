export type Category = '✨ 全部魔法' | '🌸 仙女日常' | '💕 贴贴交友' | '📝 效率拉满' | '🎮 梦幻游乐园';

export interface MiniApp {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string;
  url: string;
  isNew: boolean;
  dateAdded: string;
}

export interface UpdateLog {
  id: string;
  date: string;
  content: string;
}
