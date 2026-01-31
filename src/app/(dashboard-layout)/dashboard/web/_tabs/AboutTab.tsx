"use client";

import React, { useState, useEffect } from "react";
import { RichTextEditor } from "../_components/RichTextEditor";
import { useAboutUsData, useUpdateAboutUs } from "@/hooks/useAboutUs";
import { uploadService } from "@/services/upload.service";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const AboutTab = () => {
  const { data, isLoading } = useAboutUsData();
  const updateAboutUs = useUpdateAboutUs();

  const [title, setTitle] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setOwnerInfo(data.ownerInfo || "");
      setDescription(data.description || "");
      setImageUrl(data.image?.url || "");
    }
  }, [data]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handlePublish = async () => {
    try {
      let imageId = data?.imageId;

      // Upload image if changed
      if (imageFile) {
        const uploadedImage = await uploadService.uploadSingle(imageFile);
        imageId = uploadedImage.id;
      }

      // Update about us
      await updateAboutUs.mutateAsync({
        title,
        ownerInfo,
        description,
        imageId,
      });
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        About Us
      </h2>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title..."
        />
      </div>

      {/* Owner Info */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Owner Info / Subtitle
        </label>
        <input
          type="text"
          value={ownerInfo}
          onChange={(e) => setOwnerInfo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter owner info..."
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Write about your company..."
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label
          htmlFor="about-image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Owner / Team Image
        </label>
        {imageUrl && (
          <div className="mb-4">
            <Image
              src={imageUrl}
              alt="About us"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        )}
        <input
          id="about-image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          disabled={updateAboutUs.isPending}
          className="w-full md:w-auto px-6 md:px-8 py-3 bg-[#2D4A8F] text-white font-medium rounded-md hover:bg-[#3461c9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {updateAboutUs.isPending && (
            <Loader2 className="w-5 h-5 animate-spin" />
          )}
          Publish
        </button>
      </div>
    </div>
  );
};
