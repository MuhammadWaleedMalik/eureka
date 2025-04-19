// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Language types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
}

// Blog Post types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

// Pricing Plan types
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

// Gallery Item types
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  tags: string[];
}