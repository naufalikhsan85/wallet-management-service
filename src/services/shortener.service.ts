import axios, { AxiosRequestConfig } from 'axios';
import { APPConfig } from '../configs/app.configs';

export async function shortenUrl(url: string): Promise<string> {
  const data = { url };

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: APPConfig.SHORTENER,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data.short;
  } catch (error: any) {
    console.error('Shorten URL failed:', error?.response?.data || error.message);
    throw new Error('Failed to shorten URL');
  }
}
