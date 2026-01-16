"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { FileUpload } from "./FileUpload";

export const AboutTab = () => {
  const [aboutContent, setAboutContent] = useState(
    "I started BBurn Builders to bring the focus of the construction industry back where it belongs: on client communication and satisfaction."
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handlePublish = () => {
    console.log("Publishing About Us content...", { aboutContent, uploadedImage });
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">About Us</h2>
      
      {/* Rich Text Editor */}
      <div className="mb-6 md:mb-8">
        <RichTextEditor
          value={aboutContent}
          onChange={setAboutContent}
          placeholder="Write about your company..."
        />
      </div>

      {/* File Upload Section */}
      <div className="mb-6 md:mb-8">
        <FileUpload onFileSelect={handleImageUpload} />
      </div>

      {/* Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          className="w-full px-6 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
};