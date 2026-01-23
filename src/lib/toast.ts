import { toast } from "sonner";

/**
 * Toast notification utilities
 * Wrapper around sonner for consistent toast notifications across the app
 */

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000,
    });
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 5000,
    });
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 4000,
    });
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 4000,
    });
  },

  loading: (message: string, description?: string) => {
    return toast.loading(message, {
      description,
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  dismiss: (toastId?: string | number) => {
    toast.dismiss(toastId);
  },
};

// Common toast messages
export const toastMessages = {
  auth: {
    loginSuccess: (name: string) => ({
      message: "Login successful!",
      description: `Welcome back, ${name}!`,
    }),
    loginError: "Login failed",
    logoutSuccess: {
      message: "Logged out successfully",
      description: "You have been logged out of your account.",
    },
    sessionExpired: {
      message: "Session expired",
      description: "Please login again to continue.",
    },
    registerSuccess: (name: string) => ({
      message: "Registration successful!",
      description: `Welcome, ${name}!`,
    }),
    registerError: "Registration failed",
  },

  data: {
    saveSuccess: "Changes saved successfully",
    saveError: "Failed to save changes",
    deleteSuccess: "Deleted successfully",
    deleteError: "Failed to delete",
    updateSuccess: "Updated successfully",
    updateError: "Failed to update",
    createSuccess: "Created successfully",
    createError: "Failed to create",
    fetchError: "Failed to load data",
  },

  form: {
    validationError: "Please check the form for errors",
    requiredFields: "Please fill in all required fields",
  },

  file: {
    uploadSuccess: "File uploaded successfully",
    uploadError: "Failed to upload file",
    deleteSuccess: "File deleted successfully",
    deleteError: "Failed to delete file",
    sizeError: "File size is too large",
    typeError: "Invalid file type",
  },

  network: {
    offline: "You are offline. Please check your internet connection.",
    error: "Network error. Please try again.",
  },
};
