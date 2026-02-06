import api from "@/lib/api";

export const uploadService = {
  // Upload single file
  uploadSingle: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await api.post("/upload/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  // Upload multiple files
  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    
    const response = await api.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  // Upload video file
  uploadVideo: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await api.post("/upload/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  // Get file details
  getFile: async (id: string) => {
    const response = await api.get(`/upload/${id}`);
    return response.data.data;
  },

  // Get file URL
  getFileUrl: async (id: string) => {
    const file = await uploadService.getFile(id);
    return { url: file.url || file.path };
  },

  // Delete file
  deleteFile: async (id: string) => {
    await api.delete(`/upload/${id}`);
  },
};
