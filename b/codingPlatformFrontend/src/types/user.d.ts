
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  stats: UserStats;
  badges: Badge[];
  socials?: UserSocials;
}

export interface UserStats {
  totalSolved: number;
  totalSubmissions: number;
  streak: number;
  rank: number;
  points: number;
  easyProblems: number;
  mediumProblems: number;
  hardProblems: number;
  expertProblems: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
}

export interface UserSocials {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface AuthFormData {
  username?: string;
  email: string;
  password: string;
}
