"use client";

import React, { useState, useRef } from "react";
import { User, Calendar, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useAddPortfolioImage, useDeletePortfolioImage } from "@/hooks/usePortfolio";
import { uploadService } from "@/services/upload.service";
import { showToast } from "@/lib/toast";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Portfolio {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  images?: Array<{
    id: string;
    caption?: string;
    displayOrder: number;
    file?: {
      id: string;
      url: string;
      filename: string;
    };
  }>;
}

interface PortfolioDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio | null;
}

export const PortfolioDetailsModal = ({ isOpen, onClose, portfolio }: PortfolioDetailsModalProps) => {
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const addImageMutation = useAddPortfolioImage();
  const deleteImageMutation = useDeletePortfolioImage();

  if (!portfolio) return null;

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      const uploadResponse = await uploadService.uploadSingle(files[0]);
      const fileId = uploadResponse.data.data.id;

      await addImageMutation.mutateAsync({
        categoryId: portfolio.id,
        data: {
          fileId,
          displayOrder: portfolio.images?.length || 0,
        },
      });

      showToast.success("Image added successfully");
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to add image:", error);
      showToast.error("Failed to add image", "Please try again later.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setImageToDelete(imageId);
    setIsDeleteImageModalOpen(true);
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;

    try {
      await deleteImageMutation.mutateAsync(imageToDelete);
      showToast.success("Image deleted successfully");
      setIsDeleteImageModalOpen(false);
      setImageToDelete(null);
    } catch (error) {
      console.error("Failed to delete image:", error);
      showToast.error("Failed to delete image", "Please try again later.");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Portfolio Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{portfolio.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Slug</p>
                  <p className="font-medium">{portfolio.slug}</p>
                </div>
              </div>

              {portfolio.description && (
                <div className="flex items-center space-x-3 md:col-span-2">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{portfolio.description}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium">{new Date(portfolio.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    portfolio.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {portfolio.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">Images</h3>
                  <p className="text-sm text-gray-500">{portfolio.images?.length || 0} images</p>
                </div>
                <button
                  onClick={handleAddImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
                  disabled={isUploading}
                >
                  <Plus size={16} />
                  {isUploading ? "Uploading..." : "Add Image"}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload image file"
                title="Upload image file"
              />

              {portfolio.images && portfolio.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolio.images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image.file?.url || ''}
                          alt={image.caption || portfolio.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.caption && (
                        <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
                      )}
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Delete image"
                        aria-label="Delete image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">No images yet</p>
                  <button
                    onClick={handleAddImage}
                    className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Add your first image
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        isOpen={isDeleteImageModalOpen}
        onClose={() => {
          setIsDeleteImageModalOpen(false);
          setImageToDelete(null);
        }}
        onConfirm={confirmDeleteImage}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        isLoading={deleteImageMutation.isPending}
      />
    </>
  );
};