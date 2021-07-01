import { Thumbnails } from "./thumbnails";

export interface ExperienceColors {
  primary: string;
  secondaryLight: string;
  secondaryDark: string;
}

export interface Experience {
  id: string;
  title: string;
  lastUpdate: number;
  description?: string;
  artist?: string;
  collection?: string;
  lifetime?: number;
  colors: ExperienceColors;
  thumbnail: Thumbnails;
}

export interface CurrentExperience extends Experience {
  // Unix timestamp
  endTime: number;
}
