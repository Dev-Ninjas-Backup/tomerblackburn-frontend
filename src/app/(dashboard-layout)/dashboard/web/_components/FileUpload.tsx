"use client";

import React, { useRef } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export const FileUpload = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        alert("File size too large. Maximum 5MB allowed.");
        return;
      }
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload file"
      />
      <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-2 md:mb-4" />
      <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">Choose a file or drag & drop it here</p>
      <p className="text-xs md:text-sm text-gray-500">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
      <button
        type="button"
        className="mt-3 md:mt-4 px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Upload File
      </button>
    </div>
  );
};