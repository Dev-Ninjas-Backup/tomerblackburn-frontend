import { api } from "@/lib/api";

export const portfolioService = {
  getAllCategories: (includeInactive = false) => {
    return api.get("/portfolio/categories", { params: { includeInactive } });
  },

  getCategoryById: (id: string) => {
    return api.get(`/portfolio/categories/${id}`);
  },

  getCategoryBySlug: (slug: string) => {
    return api.get(`/portfolio/categories/slug/${slug}`);
  },

  createCategory: (data: {
    name: string;
    slug: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
    images?: Array<{
      fileId: string;
      caption?: string;
      displayOrder?: number;
    }>;
  }) => {
    return api.post("/portfolio/categories", data);
  },

  updateCategory: (
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      displayOrder?: number;
      isActive?: boolean;
    }
  ) => {
    return api.patch(`/portfolio/categories/${id}`, data);
  },

  toggleCategoryStatus: (id: string) => {
    return api.patch(`/portfolio/categories/${id}/toggle-status`);
  },

  deleteCategory: (id: string) => {
    return api.delete(`/portfolio/categories/${id}`);
  },

  addImage: (
    categoryId: string,
    data: {
      fileId: string;
      caption?: string;
      displayOrder?: number;
    }
  ) => {
    return api.post(`/portfolio/categories/${categoryId}/images`, data);
  },

  updateImage: (
    imageId: string,
    data: {
      fileId?: string;
      caption?: string;
      displayOrder?: number;
    }
  ) => {
    return api.patch(`/portfolio/images/${imageId}`, data);
  },

  deleteImage: (imageId: string) => {
    return api.delete(`/portfolio/images/${imageId}`);
  },

  reorderImages: (categoryId: string, imageIds: string[]) => {
    return api.post(`/portfolio/categories/${categoryId}/reorder-images`, { imageIds });
  },
};
