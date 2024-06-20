import { toast } from "react-toastify";
import { ApiType, BaseUrls, ContentTypes, ServiceType } from "@/app/utils/baseUrls";


export const showErrorToast = (message?: string) => {
  toast.error(message || "Something went wrong", {
    autoClose: 3000,
  });
};

export const handleApiResponse = async (response: Response) => {
  try {
    const responseData = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        const event = new CustomEvent('unauthorized', { detail: response });
        window.dispatchEvent(event);
      } else {
        showErrorToast(responseData.error || "Something went wrong");
      }
      return { error: responseData.error || "Something went wrong" };
    }

    return { data: responseData };
  } catch (err) {
    showErrorToast(err?.toString() || "Something went wrong");
    return { error: err?.toString() || "Something went wrong" };
  }
};

const getFinalUrl = (url: string, service?: ServiceType) =>
  `${BaseUrls[service || ServiceType.BOOKS]}/${url}`;

export const deleteApi = async (
  url: string,
  data: any,
  service?: ServiceType,
  headers?: any
) => {
  const response = await callFetchApi(
    ApiType.DELETE,
    getFinalUrl(url, service),
    data,
    ContentTypes.JSON,
    undefined,
    headers
  );
  return response;
};

export const postApi = async (
  url: string,
  data: any,
  headers?: Record<string, string | undefined>,
  service?: ServiceType
) => {
  const response = await callFetchApi(
    ApiType.POST,
    getFinalUrl(url, service),
    data,
    ContentTypes.JSON,
    undefined,
    headers
  );
  return response;
};

export const putApi = async (
  url: string,
  data: any,
  headers?: Record<string, string>,
  service?: ServiceType
) => {
  const response = await callFetchApi(
    ApiType.PUT,
    getFinalUrl(url, service),
    data,
    ContentTypes.JSON,
    undefined,
    headers
  );
  return response;
};

export const getApi = async (
  url: string,
  headers?: Record<string, string | undefined>,
  service?: ServiceType
) => {
  const response = await callFetchApi(
    ApiType.GET,
    getFinalUrl(url, service),
    {},
    undefined,
    undefined,
    headers
  );
  return response;
};

export const callFetchApi = async (
  method: ApiType,
  url: string,
  data: any,
  contentType?: string,
  requestMode?: RequestMode,
  headers?: Record<string, string | undefined>
) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-type": contentType || ContentTypes.JSON,
      ...(headers || {}),
    },
  };

  let requestData: ArrayBuffer | string = JSON.stringify(data);
  data instanceof ArrayBuffer && (requestData = data);
  method !== ApiType.GET && (options.body = requestData);
  requestMode && (options.mode = requestMode);

  try {
    const response: Response = await fetch(url, options);
    return await handleApiResponse(response);
  } catch (error) {
    showErrorToast(error?.toString() || "Something went wrong");
    return { error: error?.toString() || "Something went wrong" };
  }
};