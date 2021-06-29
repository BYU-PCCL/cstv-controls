import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { getCollections, getCurrentExperience, getExperiences } from "../api";
import { Experience } from "../../types/experience";
import { ApiError, setAuthCode } from "../apiUtils";

export const useExperiences = (): UseQueryResult<Experience[], ApiError> =>
  useQuery(["experiences"], getExperiences);

export const useCollections = (): UseQueryResult<Experience[], ApiError> =>
  useQuery(["collections"], getCollections);

export const useCurrentExperience = (): UseQueryResult<
  Experience[],
  ApiError
> => useQuery(["current"], getCurrentExperience);

export const useAuthCodeMutation = (): UseMutationResult<
  void,
  unknown,
  string
> => {
  const queryClient = useQueryClient();
  // TODO: Figure why onSuccess is being marked as unused
  // noinspection JSUnusedGlobalSymbols
  return useMutation(setAuthCode, {
    onSuccess: async () => queryClient.invalidateQueries(),
  });
};
