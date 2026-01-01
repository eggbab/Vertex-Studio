export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
}

export interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle';
}