import axios, { AxiosError } from 'axios';
import type { NYTSearchResponse, SearchParams } from '../types';

const API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export class APIError extends Error {
  public statusCode?: number;
  public originalError?: unknown;
  
  constructor(
    message: string,  
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (!API_KEY) {
    throw new APIError('NYT API key is not configured');
  }
  config.params = {
    ...config.params,
    'api-key': API_KEY,
  };
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status;
      let message = 'An error occurred while fetching data';

      switch (statusCode) {
        case 400:
          message = 'Invalid request parameters';
          break;
        case 401:
          message = 'Invalid API key';
          break;
        case 429:
          message = 'Too many requests. Please try again later';
          break;
        case 500:
          message = 'NYT server error. Please try again later';
          break;
      }

      return Promise.reject(new APIError(message, statusCode, error));
    } else if (error.request) {
      return Promise.reject(
        new APIError('Network error. Please check your connection', undefined, error)
      );
    } else {
      return Promise.reject(new APIError('An unexpected error occurred', undefined, error));
    }
  }
);

export const articleService = {
  async searchArticles(params: SearchParams): Promise<NYTSearchResponse> {
    try {
      const { q, page = 0, sort = 'relevance', beginDate, endDate } = params;
      
      const searchParams: Record<string, string | number> = {
        q,
        page,
        sort,
      };

      if (beginDate) {
        searchParams.begin_date = beginDate;
      }

      if (endDate) {
        searchParams.end_date = endDate;
      }

      console.log('Making API request with params:', searchParams);

      const response = await api.get<NYTSearchResponse>('/articlesearch.json', {
        params: searchParams,
      });

      console.log('API response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error details:', error);
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Failed to search articles', undefined, error);
    }
  },
};

export default articleService;