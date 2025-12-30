
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  sources?: { uri: string; title: string }[];
}

export interface BonusOffer {
  id: string;
  brand: string;
  offer: string;
  promoCode: string;
  link: string;
  logo: string;
  terms: string;
  rating: number;
}

export enum Page {
  Home = 'home',
  News = 'news',
  Bonuses = 'bonuses',
  Guides = 'guides',
  Admin = 'admin'
}

export interface CloudwaysServer {
  id: string;
  label: string;
  ip: string;
  status: 'active' | 'inactive';
  memory: string;
  cpu: string;
}

export interface CloudwaysApp {
  id: string;
  label: string;
  app_name: string;
  server_id: string;
}
