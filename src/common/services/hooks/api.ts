import {
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { getCollections, getCurrentExperience, getExperiences } from "../api";
import { Experience } from "../../../types/experience";
import { ApiError, setAuthCode } from "../apiUtils";

const RETRY_COUNT = 3;

const useQueryRetryUnless400 = <
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, ApiError, TData, TQueryKey>
) =>
  useQuery(queryKey, queryFn, {
    retry: (failureCount, error) =>
      error.response &&
      error.response.status < 400 &&
      error.response.status >= 500 &&
      failureCount < RETRY_COUNT,
    ...options,
  });

export const useExperiences = (): UseQueryResult<Experience[], ApiError> =>
  useQueryRetryUnless400(["experiences"], getExperiences);

export const useCollections = (): UseQueryResult<Experience[], ApiError> =>
  useQueryRetryUnless400(["collections"], getCollections);

export const useCurrentExperience = (): UseQueryResult<
  Experience[],
  ApiError
> => useQueryRetryUnless400(["current"], getCurrentExperience);

// TODO: Add mutation for current experience

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
