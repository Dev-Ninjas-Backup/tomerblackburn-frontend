import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const portfolioService = {
  // Get all categories (for public portfolio page)
  getAllCategories: (includeInactive = false) => {
    return axios.get(`${API_URL}/portfolio/categories`, {
      params: { includeInactive },
    });
  },

  // Get category by ID
  getCategoryById: (id: string) => {
    return axios.get(`${API_URL}/portfolio/categories/${id}`);
  },

  // Get category by slug
  getCategoryBySlug: (slug: string) => {
    return axios.get(`${API_URL}/portfolio/categories/slug/${slug}`);
  },

  // Create category (dashboard)
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
    return axios.post(`${API_URL}/portfolio/categories`, data);
  },

  // Update category (dashboard)
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
    return axios.patch(`${API_URL}/portfolio/categories/${id}`, data);
  },

  // Toggle category status (dashboard)
  toggleCategoryStatus: (id: string) => {
    return axios.patch(`${API_URL}/portfolio/categories/${id}/toggle-status`);
  },

  // Delete category (dashboard)
  deleteCategory: (id: string) => {
    return axios.delete(`${API_URL}/portfolio/categories/${id}`);
  },

  // Add image to category (dashboard)
  addImage: (
    categoryId: string,
    data: {
      fileId: string;
      caption?: string;
      displayOrder?: number;
    }
  ) => {
    return axios.post(
      `${API_URL}/portfolio/categories/${categoryId}/images`,
      data
    );
  },

  // Update image (dashboard)
  updateImage: (
    imageId: string,
    data: {
      fileId?: string;
      caption?: string;
      displayOrder?: number;
    }
  ) => {
    return axios.patch(`${API_URL}/portfolio/images/${imageId}`, data);
  },

  // Delete image (dashboard)
  deleteImage: (imageId: string) => {
    return axios.delete(`${API_URL}/portfolio/images/${imageId}`);
  },

  // Reorder images (dashboard)
  reorderImages: (categoryId: string, imageIds: string[]) => {
    return axios.post(
      `${API_URL}/portfolio/categories/${categoryId}/reorder-images`,
      { imageIds }
    );
  },
};
