/**
 * Generic API response wrapper — mirrors the backend ApiResponse<T> shape.
 * All public endpoints return this structure.
 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T | null;
  message: string;
}
