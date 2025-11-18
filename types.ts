export enum Tab {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  EXPERIENCE = 'EXPERIENCE',
  PLAY = 'PLAY'
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}
