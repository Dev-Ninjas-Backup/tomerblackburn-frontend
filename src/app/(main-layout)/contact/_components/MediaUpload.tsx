"use client";

import { useState } from "react";
import { X, Upload, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadService } from "@/services/upload.service";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "PHOTO" | "VIDEO";
  uploading: boolean;
  fileInstanceId?: string;
}

interface MediaUploadProps {
  onMediaChange: (media: Array<{ fileInstanceId: string; mediaType: "PHOTO" | "VIDEO" }>) => void;
}

export default function MediaUpload({ onMediaChange }: MediaUploadProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      
      if (!isVideo && !isImage) {
        toast.error("Only images and videos are allowed");
        continue;
      }

      const mediaFile: MediaFile = {
        id: Math.random().toString(36),
        file,
        preview: URL.createObjectURL(file),
        type: isVideo ? "VIDEO" : "PHOTO",
        uploading: true,
      };

      setMediaFiles(prev => [...prev, mediaFile]);

      try {
        const uploadedFile = isVideo 
          ? await uploadService.uploadVideo(file)
          : await uploadService.uploadSingle(file);

        setMediaFiles(prev => 
          prev.map(m => 
            m.id === mediaFile.id 
              ? { ...m, uploading: false, fileInstanceId: uploadedFile.id }
              : m
          )
        );

        updateParent([...mediaFiles, { ...mediaFile, fileInstanceId: uploadedFile.id }]);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        setMediaFiles(prev => prev.filter(m => m.id !== mediaFile.id));
      }
    }
  };

  const updateParent = (files: MediaFile[]) => {
    const uploadedMedia = files
      .filter(f => f.fileInstanceId)
      .map(f => ({ fileInstanceId: f.fileInstanceId!, mediaType: f.type }));
    onMediaChange(uploadedMedia);
  };

  const removeFile = (id: string) => {
    setMediaFiles(prev => {
      const updated = prev.filter(m => m.id !== id);
      updateParent(updated);
      return updated;
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Photos & Videos (Optional)
      </label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          id="media-upload"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor="media-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Click to upload photos or videos
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports: JPG, PNG, MP4, MOV
          </p>
        </label>
      </div>

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {mediaFiles.map(media => (
            <div key={media.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {media.type === "PHOTO" ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {media.uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(media.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
