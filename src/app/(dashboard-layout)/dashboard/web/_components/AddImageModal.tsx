"use client";

import React, { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { useAddPortfolioImage } from "@/hooks/usePortfolio";
import { uploadService } from "@/services/upload.service";
import { toast } from "sonner";

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}

interface UploadingFile {
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
}

export const AddImageModal = ({
  isOpen,
  onClose,
  categoryId,
}: AddImageModalProps) => {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const addImage = useAddPortfolioImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: UploadingFile[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      try {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: "uploading" as const, progress: 0 } : f,
          ),
        );

        const uploadedFile = await uploadService.uploadSingle(files[i].file);

        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, progress: 50 } : f)),
        );

        await addImage.mutateAsync({
          categoryId,
          data: { fileId: uploadedFile.id, caption: "" },
        });

        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: "success" as const, progress: 100 } : f,
          ),
        );
        successCount++;
      } catch (error) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: "error" as const } : f,
          ),
        );
      }
    }

    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`${successCount} image(s) uploaded successfully`);
      setTimeout(() => {
        onClose();
        setFiles([]);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Add Images</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Images
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload multiple images
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 10MB each
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                {files.length} image(s) selected
              </p>
              {files.map((fileItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={fileItem.preview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {fileItem.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(fileItem.file.size / 1024).toFixed(1)} KB
                      </p>
                      {fileItem.status === "uploading" && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{fileItem.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${fileItem.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {fileItem.status === "success" && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Uploaded
                        </p>
                      )}
                      {fileItem.status === "error" && (
                        <p className="text-xs text-red-600 mt-1">✗ Failed</p>
                      )}
                    </div>
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || files.length === 0}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isUploading ? "Uploading..." : `Upload ${files.length} Image(s)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
