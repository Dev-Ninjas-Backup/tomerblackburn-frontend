"use client";

import React, { useRef } from "react";
import { FileUpload } from "./FileUpload";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface ServiceSectionProps {
  title: string;
  serviceName: string;
  serviceDetails: string;
  onServiceNameChange: (value: string) => void;
  onServiceDetailsChange: (value: string) => void;
  onImageUpload: (file: File) => void;
  uploadedImage?: string;
  onDelete?: () => void;
}

export const ServiceSection = ({
  title,
  serviceName,
  serviceDetails,
  onServiceNameChange,
  onServiceDetailsChange,
  onImageUpload,
  uploadedImage,
  onDelete,
}: ServiceSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete Service"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="grid md:grid-cols-[200px_1fr] gap-4">
          {/* Left: Image */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Service Image
            </label>
            {uploadedImage ? (
              <div className="space-y-2">
                <div className="relative w-full aspect-3/4 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={uploadedImage}
                    alt="Service image"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Change service image"
                />
                <button
                  onClick={handleChangeImage}
                  className="w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  type="button"
                >
                  <Pencil size={14} />
                  Change Image
                </button>
              </div>
            ) : (
              <FileUpload onFileSelect={onImageUpload} />
            )}
          </div>

          {/* Right: Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Service Name
              </label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => onServiceNameChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Kitchen Remodeling"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                value={serviceDetails}
                onChange={(e) => onServiceDetailsChange(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe the service..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
