import { Colors } from "./colors";
import { Thumbnails } from "./thumbnails";

export interface Experience {
  id: string;
  title: string;
  lastUpdate: number;
  description?: string;
  artist?: string;
  collection?: string;
  lifetime?: number;
  colors: Colors;
  thumbnails: Thumbnails;
}

export interface CurrentExperience extends Experience {
  // Unix timestamp
  endTime: number;
}
