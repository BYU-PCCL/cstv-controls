import { get, put } from "./apiUtils";
import { CurrentExperience, Experience } from "../../types/experience";
import { Collection } from "../../types/collection";
import { ApiStatusResponse } from "../../types/response";

const EXPERIENCES_ENDPOINT = "experiences";
const COLLECTIONS_ENDPOINT = "collections";
const CURRENT_EXPERIENCE_ENDPOINT = "current";

// TODO: Decide if we'll ever use these under any circumstances (seems like we
//  can probably do everything we need to with the cached data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExperienceEndpoint = (id: string): string =>
  EXPERIENCES_ENDPOINT + `/${id}`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCollectionEndpoint = (id: string): string =>
  COLLECTIONS_ENDPOINT + `/${id}`;

export const getExperiences = async (): Promise<Experience[]> =>
  get(EXPERIENCES_ENDPOINT);

export const getCollections = async (): Promise<Collection[]> =>
  get(COLLECTIONS_ENDPOINT);

export const getCurrentExperience = async (): Promise<CurrentExperience> =>
  get(CURRENT_EXPERIENCE_ENDPOINT);

export const setCurrentExperience = async (
  id: string
): Promise<ApiStatusResponse> => put(CURRENT_EXPERIENCE_ENDPOINT, { id });
