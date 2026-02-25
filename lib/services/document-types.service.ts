import { apiClient } from "@/lib/api/client";
import type {
  DocumentType,
  CreateDocumentTypeDto,
  UpdateDocumentTypeDto,
} from "@/lib/types";

export const documentTypesService = {
  list(): Promise<DocumentType[]> {
    return apiClient.get("/document-types").then((r) => r.data);
  },

  getById(id: string): Promise<DocumentType> {
    return apiClient.get(`/document-types/${id}`).then((r) => r.data);
  },

  create(body: CreateDocumentTypeDto): Promise<DocumentType> {
    return apiClient.post("/document-types", body).then((r) => r.data);
  },

  update(id: string, body: UpdateDocumentTypeDto): Promise<DocumentType> {
    return apiClient.put(`/document-types/${id}`, body).then((r) => r.data);
  },

  delete(id: string): Promise<void> {
    return apiClient.delete(`/document-types/${id}`).then(() => {});
  },
};
