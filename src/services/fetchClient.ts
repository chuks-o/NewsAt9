import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
  baseURL?: string;
  params?: Record<string, string | number>;
}

export const createFetchClient = ({ baseURL, params }: AxiosConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    params,
  });

  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
