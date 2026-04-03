"use client";

import React, { useState, useEffect, useRef } from "react";
import { RichTextEditor } from "@/components/Editor";
import { useAboutUsData, useUpdateAboutUs } from "@/hooks/useAboutUs";
import { uploadService } from "@/services/upload.service";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { AboutTabSkeleton } from "./_skeleton/AboutTabSkeleton";

export const AboutTab = () => {
  const { data, isLoading } = useAboutUsData();
  const updateAboutUs = useUpdateAboutUs();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (imageFile) {
        const uploadedImage = await uploadService.uploadSingle(imageFile);
        imageId = uploadedImage.id;
      }
      await updateAboutUs.mutateAsync({ title, ownerInfo, description, imageId });
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  if (isLoading) return <AboutTabSkeleton />;

  return (
    <div className="flex flex-col h-full gap-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-base font-semibold text-gray-900">About Us</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage your about page content</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={updateAboutUs.isPending}
          className="px-5 py-2 bg-[#2D4A8F] text-white text-sm font-medium rounded-lg hover:bg-[#3461c9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {updateAboutUs.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Publish
        </button>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">

        {/* LEFT — form fields */}
        <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D4A8F]/20 focus:border-[#2D4A8F] transition"
              placeholder="Enter title..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Owner Info / Subtitle</label>
            <input
              type="text"
              value={ownerInfo}
              onChange={(e) => setOwnerInfo(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D4A8F]/20 focus:border-[#2D4A8F] transition"
              placeholder="Enter owner info..."
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
            <div className="flex-1 min-h-0">
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write about your company..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="w-full md:w-72 shrink-0 flex flex-col gap-2">
          <label className="block text-xs font-medium text-gray-500">Owner / Team Image</label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative flex-1 min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#2D4A8F] transition-colors group bg-gray-50"
          >
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt="About us" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1 text-white">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Change image</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setImageUrl(""); setImageFile(null); }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition z-10"
                >
                  <X className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300 group-hover:text-[#2D4A8F] transition-colors">
                <ImageIcon className="w-10 h-10" />
                <span className="text-xs font-medium">Click to upload</span>
                <span className="text-[11px] text-gray-400">PNG, JPG, WEBP</span>
              </div>
            )}
          </div>

          {imageUrl && (
            <p className="text-[11px] text-gray-400 text-center">Click image to replace</p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </div>
      </div>
    </div>
  );
};
