import { get, put } from "./apiUtils";
import { CurrentExperience, Experience } from "../../types/experience";
import { Folder } from "../../types/folder";
import { ApiStatusResponse } from "../../types/response";

const EXPERIENCES_ENDPOINT = "experiences";
const FOLDERS_ENDPOINT = "folders";
const CURRENT_EXPERIENCE_ENDPOINT = "current";

// TODO: Decide if we'll ever use these under any circumstances (seems like we
//  can probably do everything we need to with the cached data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExperienceEndpoint = (id: string): string =>
  EXPERIENCES_ENDPOINT + `/${id}`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFolderEndpoint = (id: string): string => FOLDERS_ENDPOINT + `/${id}`;

export const getExperiences = async (): Promise<Experience[]> =>
  get(EXPERIENCES_ENDPOINT);

export const getFolders = async (): Promise<Folder[]> => get(FOLDERS_ENDPOINT);

export const getCurrentExperience = async (): Promise<CurrentExperience> =>
  get(CURRENT_EXPERIENCE_ENDPOINT);

export const setCurrentExperience = async (
  id: string
): Promise<ApiStatusResponse> => put(CURRENT_EXPERIENCE_ENDPOINT, { id });
