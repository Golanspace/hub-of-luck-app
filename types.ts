
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
  Guides = 'guides'
}
