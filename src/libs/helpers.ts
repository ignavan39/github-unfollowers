import axios, { Method } from 'axios';

export type HttpOptions = {
  url: string;
  method: Method;
  headers: any;
};

export async function request<T>(options: HttpOptions): Promise<T> {
  const res = await axios.get(options.url, {
    method: options.method,
    headers: options.headers,
  });
  const result: T = res.data;
  return result;
}
