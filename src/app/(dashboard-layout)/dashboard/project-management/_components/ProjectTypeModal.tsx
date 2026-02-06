"use client";

import React, { useEffect, useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCreateProjectType,
  useUpdateProjectType,
} from "@/hooks/useProjectManagement";
import { CreateProjectTypeDto } from "@/types/project-management.types";
import { uploadService } from "@/services/upload.service";

interface ProjectTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  data?: any;
}

const ProjectTypeModal = ({
  isOpen,
  onClose,
  mode,
  data,
}: ProjectTypeModalProps) => {
  const createMutation = useCreateProjectType();
  const updateMutation = useUpdateProjectType();
  const [formData, setFormData] = useState<CreateProjectTypeDto>({
    name: "",
    description: "",
    displayOrder: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({
        name: data.name,
        description: data.description || "",
        imageId: data.imageId,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      });
      if (data.image?.url) {
        setImagePreview(data.image.url);
      }
    } else {
      setFormData({
        name: "",
        description: "",
        displayOrder: 0,
        isActive: true,
      });
      setImagePreview("");
      setImageFile(null);
    }
  }, [mode, data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, imageId: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageId = formData.imageId;

      // Upload image if new file selected
      if (imageFile) {
        const uploaded = await uploadService.uploadSingle(imageFile);
        imageId = uploaded.id;
      }

      const submitData = { ...formData, imageId };

      if (mode === "create") {
        await createMutation.mutateAsync(submitData);
      } else {
        await updateMutation.mutateAsync({ id: data.id, data: submitData });
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Project Type
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Bathroom Remodeling"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              {imagePreview ? (
                <div className="relative w-full h-40 border rounded overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded p-4 text-center cursor-pointer hover:border-[#2d4a8f]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG (Max 5MB)
                    </p>
                  </label>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="display-order"
                className="block text-sm font-medium mb-1"
              >
                Display Order
              </label>
              <input
                id="display-order"
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    displayOrder: parseInt(e.target.value),
                  })
                }
                className="w-full border rounded px-3 py-2"
                min="0"
                aria-label="Display Order"
              />
            </div>

            <div className="flex items-center">
              <input
                id="is-active"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="mr-2"
                aria-label="Active status"
              />
              <label htmlFor="is-active" className="text-sm font-medium">
                Active
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2d4a8f] hover:bg-[#243a73]"
              disabled={isUploading}
            >
              {isUploading
                ? "Uploading..."
                : mode === "create"
                  ? "Create"
                  : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectTypeModal;
