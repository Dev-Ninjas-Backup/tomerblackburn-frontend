import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const uploadService = {
  // Upload single file
  uploadSingle: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    return axios.post(`${API_URL}/upload/single`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload multiple files
  uploadMultiple: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    
    return axios.post(`${API_URL}/upload/multiple`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get file details
  getFile: (id: string) => {
    return axios.get(`${API_URL}/upload/${id}`);
  },

  // Delete file
  deleteFile: (id: string) => {
    return axios.delete(`${API_URL}/upload/${id}`);
  },
};
