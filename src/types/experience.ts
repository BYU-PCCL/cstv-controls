export interface ExperienceColors {
  primary: string;
  secondaryLight: string;
  secondaryDark: string;
}

export interface Experience {
  id: string;
  title: string;
  lastUpdate: string;
  description?: string;
  artist?: string;
  collection?: string;
  lifetime?: number;
  colors?: ExperienceColors;
}

export interface CurrentExperience extends Experience {
  // Unix timestamp
  endTime: number;
}
