/**
 * Common API types: pagination, list responses, errors.
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiErrorBody {
  statusCode: number;
  message: string;
  code?: string;
  details?: {
    errors?: Array<{ field: string; message: string; children?: unknown }>;
    [key: string]: unknown;
  };
}

/** Validation error entry (400 from ValidationPipe) */
export interface ValidationErrorItem {
  field: string;
  message: string;
  children?: ValidationErrorItem[];
}
