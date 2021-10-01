import { Colors } from "./colors";
import { Thumbnails } from "./thumbnails";

export interface Folder {
  id: string;
  title: string;
  tags: string[];
  colors: Colors;
  thumbnails: Thumbnails;
  description?: string;
}
