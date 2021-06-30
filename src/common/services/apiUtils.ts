const BASE_URL: string =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8001/api/";

const AUTH_CODE_STORAGE_KEY = "cstvAuth";

const getEndpointUrl = (endpoint: string) =>
  new URL(endpoint, BASE_URL).toString();

const getAuthHeaders = () => ({
  "X-AUTH-CODE": localStorage.getItem(AUTH_CODE_STORAGE_KEY) || "",
});

const getContentTypeHeaders = (contentType = "application/json") => ({
  "Content-Type": contentType,
});

const getRequestWithBodyHeaders = (contentType?: string) => ({
  ...getAuthHeaders(),
  ...getContentTypeHeaders(contentType),
});

const getJsonResponsePromise = <T>(
  pendingResponse: Promise<Response>
): Promise<T> => pendingResponse.then((res) => res.json());

const checkedRequest = async (
  pendingResponse: Promise<Response>
): Promise<Response> => {
  const response = await pendingResponse;
  if (!response.ok) {
    throw new ApiError(response.statusText, response);
  }
  return response;
};

const requestWithBody = <BodyType, ResponseType>(
  endpoint: string,
  method: string,
  body?: BodyType,
  contentType?: string
): Promise<ResponseType> =>
  getJsonResponsePromise(
    checkedRequest(
      fetch(getEndpointUrl(endpoint), {
        method: "POST",
        headers: getRequestWithBodyHeaders(contentType),
        body: JSON.stringify(body),
      })
    )
  );

export const setAuthCode = (code: string): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(AUTH_CODE_STORAGE_KEY, code);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

export const get = <T>(endpoint: string): Promise<T> =>
  getJsonResponsePromise(
    checkedRequest(
      fetch(getEndpointUrl(endpoint), {
        headers: getAuthHeaders(),
      })
    )
  );

export class ApiError extends Error {
  constructor(public message: string, public response: Response) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// We export this because we want to be able to check authentication before
// attempting to make requests so we can show a "not connected" screen.
// Otherwise we try get the value from localStorage and it just gives us a
// "cannot find key" error. We can preempt this and give the user some clue
// about what's going on.
export const isAuthAvailable = (): boolean =>
  localStorage.getItem(AUTH_CODE_STORAGE_KEY) !== null;

export const post = <BodyType, ResponseType>(
  endpoint: string,
  body?: BodyType,
  contentType?: string
): Promise<ResponseType> =>
  requestWithBody(endpoint, "POST", body, contentType);

export const patch = <BodyType, ResponseType>(
  endpoint: string,
  body?: BodyType,
  contentType?: string
): Promise<ResponseType> =>
  requestWithBody(endpoint, "PATCH", body, contentType);

export const put = <BodyType, ResponseType>(
  endpoint: string,
  body?: BodyType,
  contentType?: string
): Promise<ResponseType> => requestWithBody(endpoint, "PUT", body, contentType);
