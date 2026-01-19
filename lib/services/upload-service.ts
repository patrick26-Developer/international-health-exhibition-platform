// lib/services/upload-service.ts
import { apiClient } from '@/lib/api/api-client';
import { validateFile } from '@/lib/utils/validators';
import type { APIResponse, UploadedFile } from '@/lib/types';

export const uploadService = {
  /**
   * Upload un fichier image
   */
  async uploadImage(file: File): Promise<APIResponse<UploadedFile>> {
    // Validation
    const validationError = validateFile(file);
    if (validationError) {
      return {
        success: false,
        error: validationError.message,
        code: 'VALIDATION_ERROR',
      };
    }

    return apiClient.uploadFile<UploadedFile>('/upload?type=image', file);
  },

  /**
   * Upload un document
   */
  async uploadDocument(file: File): Promise<APIResponse<UploadedFile>> {
    const validationError = validateFile(file);
    if (validationError) {
      return {
        success: false,
        error: validationError.message,
        code: 'VALIDATION_ERROR',
      };
    }

    return apiClient.uploadFile<UploadedFile>('/upload?type=document', file);
  },

  /**
   * Upload une vidéo
   */
  async uploadVideo(file: File): Promise<APIResponse<UploadedFile>> {
    const validationError = validateFile(file);
    if (validationError) {
      return {
        success: false,
        error: validationError.message,
        code: 'VALIDATION_ERROR',
      };
    }

    return apiClient.uploadFile<UploadedFile>('/upload?type=video', file);
  },

  /**
   * Supprimer un fichier
   */
  async deleteFile(fileUrl: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>('/upload', {
      data: { fileUrl },
    });
  },
};