import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export default class API {
  static #instance: AxiosInstance;

  static {
    this.#instance = axios.create({
      timeout: import.meta.env.VITE_API_TIME_OUT,
      headers: { 'Content-Type': 'application/json' }
    });

    this.#instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return Promise.resolve(response.data);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  public static get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.#instance.get<T, R>(url, config).catch((error: AxiosError) => {
      throw error;
    });
  }

  public static post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.#instance.post<T, R>(url, data, config).catch((error: AxiosError) => {
      throw error;
    });
  }

  public static put<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.#instance.put<T, R>(url, data, config).catch((error: AxiosError) => {
      throw error;
    });
  }

  public static delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.#instance.delete<T, R>(url, config).catch((error: AxiosError) => {
      throw error;
    });
  }

  public static patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.#instance.patch<T, R>(url, data, config).catch((error: AxiosError) => {
      throw error;
    });
  }
}
