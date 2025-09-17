import { API_CONFIG } from './config';

// 通用响应结构
interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

// Helper function for making API requests
export async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  // Get token from localStorage
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    ...API_CONFIG.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${url}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresTime');
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
        window.location.href = '/system/login';
      }
      
      throw new Error(`API request failed: ${response.statusText}`);
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    // Parse the response as JSON
    const responseData: ApiResponse<T> = await response.json();

    // Check if the API response indicates an error
    if (responseData.code !== 0 && responseData.code !== 200) {
      throw new Error(responseData.msg || 'API request failed');
    }

    // Return the data property of the response
    return responseData.data;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Helper function for handling API errors
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

// Mock data helper
export function mockResponse<T>(data: T, delay = 500): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
} 