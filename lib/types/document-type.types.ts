/**
 * Document types admin API types
 */

export interface DocumentType {
  id: string;
  name: string;
  description?: string;
  is_required: boolean;
  [key: string]: unknown;
}

export interface CreateDocumentTypeDto {
  name: string;
  description?: string;
  is_required: boolean;
}

export interface UpdateDocumentTypeDto {
  name?: string;
  description?: string;
  is_required?: boolean;
}
