export type Category = '所有' | '实用工具' | '游戏娱乐' | '创意设计' | '学习开发';

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
