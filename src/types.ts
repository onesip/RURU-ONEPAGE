export type Category = '🌸 全部' | '🌿 生活与身心' | '🎈 社区与同好' | '✨ 效率与自律' | '🎮 独立小游戏';

export interface MiniApp {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string;
  url: string;
  isNew: boolean;
  dateAdded: string;
  tag?: string;
}

export interface UpdateLog {
  id: string;
  date: string;
  content: string;
}

