import { ResponseTypes } from "@/app/constants/enum";
import { toast } from "react-toastify";
import {
  ApiType,
  BaseUrls,
  ContentTypes,
  ResponseType,
  ServiceType,
} from "@/app/constants/baseUrls";

export const showErrorToast = (message?: string) => {
  toast(message || "Something went wrong", { type: "error" });
};

export const handleApiResponse = async (
  response: Response,
  responseType: string
) => {
  try {
    let responseData;
    responseData = await response.json();
    if (!responseData || responseData?.status === ResponseTypes.FAILURE) {
      showErrorToast(
        `${responseData?.message || "Something went wrong"}${
          responseData?.data?.description || ""
        }`
      );
      return {};
    }
    return responseData;
  } catch (err) {
    if (response.status === 200) {
      return response;
    } else {
      showErrorToast(err?.toString() || "Something went wrong");
      return {};
    }
  }
};

const getFinalUrl = (url: string, service?: ServiceType) =>
  `${BaseUrls[service || ServiceType.DASHBOARD]}/${url}`;

export const postApi = async (
  url: string,
  data: any,
  service?: ServiceType
) => {
  const response = await callFetchApi(
    ApiType.POST,
    getFinalUrl(url, service),
    data
  );
  return response;
};

export const putApi = async (url: string, data: any, service?: ServiceType) => {
  const response = await callFetchApi(
    ApiType.PUT,
    getFinalUrl(url, service),
    data
  );
  return response;
};

export const getApi = async (url: string, service?: ServiceType) => {
  const response = await callFetchApi(
    ApiType.GET,
    getFinalUrl(url, service),
    {}
  );
  return response;
};

export const callFetchApi = async (
  method: ApiType,
  url: string,
  data: any,
  contentType?: string,
  responseType?: string,
  requestMode?: RequestMode
) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-type": contentType || ContentTypes.JSON,
    },
  };
  let requestData: ArrayBuffer | string = JSON.stringify(data);
  data instanceof ArrayBuffer && (requestData = data);
  method !== ApiType.GET && (options.body = requestData);
  requestMode && (options.mode = requestMode);
  try {
    const response: Response = await fetch(url, options);
    return await handleApiResponse(response, responseType || ResponseType.JSON);
  } catch (error) {
    showErrorToast(error?.toString() || "Something went wrong");
    return {};
  }
};
