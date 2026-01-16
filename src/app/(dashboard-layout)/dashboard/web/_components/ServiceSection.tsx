"use client";

import React, { useState } from "react";
import { FileUpload } from "./FileUpload";
import Image from "next/image";

interface ServiceSectionProps {
  title: string;
  serviceName: string;
  serviceDetails: string;
  onServiceNameChange: (value: string) => void;
  onServiceDetailsChange: (value: string) => void;
  onImageUpload: (file: File) => void;
  uploadedImage?: string;
}

export const ServiceSection = ({
  title,
  serviceName,
  serviceDetails,
  onServiceNameChange,
  onServiceDetailsChange,
  onImageUpload,
  uploadedImage,
}: ServiceSectionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">{title}</h3>
      
      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Name *
          </label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => onServiceNameChange(e.target.value)}
            className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Details *
          </label>
          <textarea
            value={serviceDetails}
            onChange={(e) => onServiceDetailsChange(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Write description"
          />
        </div>

        <div>
          {uploadedImage ? (
            <div className="space-y-4">
              <div className="relative w-full h-32 md:h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt="Uploaded service image"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => onImageUpload(new File([], ""))}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Change Image
              </button>
            </div>
          ) : (
            <FileUpload onFileSelect={onImageUpload} />
          )}
        </div>
      </div>
    </div>
  );
};