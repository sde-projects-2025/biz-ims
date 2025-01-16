export interface ApiResponse<T> {
  success: boolean;
  data?: T; // Generic type to allow flexibility
  message?: string;
  error?: any; // Optional, to handle error details
}
