"use client";

import React, { useState, useEffect } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { ServiceSection } from "./ServiceSection";
import {
  useCompleteHomePageData,
  useUpdateHomePage,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/useHomePage";
import { uploadService } from "@/services/upload.service";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { ServiceStandsOut } from "@/types/home.types";

export const HomeTab = () => {
  const { data, isLoading } = useCompleteHomePageData();
  const updateHomePage = useUpdateHomePage();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [heroBackgroundImage, setHeroBackgroundImage] = useState<File | null>(
    null,
  );
  const [heroBackgroundImageUrl, setHeroBackgroundImageUrl] = useState("");
  const [ourMissionTitle, setOurMissionTitle] = useState("");
  const [ourMissionSubTitle, setOurMissionSubTitle] = useState("");
  const [services, setServices] = useState<
    (ServiceStandsOut & { file?: File; isNew?: boolean })[]
  >([]);

  useEffect(() => {
    if (data) {
      setTitle(data.homePage?.title || "");
      setSubTitle(data.homePage?.subTitle || "");
      setHeroBackgroundImageUrl(data.homePage?.homeBackgroundImage?.url || "");
      setOurMissionTitle(data.homePage?.ourMissionTitle || "");
      setOurMissionSubTitle(data.homePage?.ourMissionSubTitle || "");
      setServices(data.services || []);
    }
  }, [data]);

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: `temp-${Date.now()}`,
        title: "",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isNew: true,
      },
    ]);
  };

  const handleUpdateService = (
    id: string,
    field: "title" | "description" | "file",
    value: string | File,
  ) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          if (field === "file" && value instanceof File) {
            return {
              ...service,
              file: value,
              image: { ...service.image, url: URL.createObjectURL(value) } as any,
            };
          }
          return { ...service, [field]: value };
        }
        return service;
      }),
    );
  };

  const handleDeleteService = async (id: string, isNew?: boolean) => {
    if (isNew) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    } else {
      if (confirm("Are you sure you want to delete this service?")) {
        await deleteService.mutateAsync(id);
      }
    }
  };

  const handlePublish = async () => {
    try {
      let homeBackgroundImageId = data?.homePage?.homeBackgroundImageId;

      // Upload hero image if changed
      if (heroBackgroundImage) {
        const uploadedImage = await uploadService.uploadSingle(heroBackgroundImage);
        homeBackgroundImageId = uploadedImage.id;
      }

      // Update home page
      await updateHomePage.mutateAsync({
        title,
        subTitle,
        ourMissionTitle,
        ourMissionSubTitle,
        homeBackgroundImageId,
      });

      // Handle services
      for (const service of services) {
        const formData = new FormData();
        formData.append("title", service.title);
        formData.append("description", service.description);

        if (service.file) {
          formData.append("image", service.file);
        }

        if (service.isNew) {
          await createService.mutateAsync(formData);
        } else {
          await updateService.mutateAsync({ id: service.id, formData });
        }
      }
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
        Home
      </h2>

      {/* Hero Section */}
      <div className="mb-6 md:mb-8 border border-gray-200 rounded-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Hero Section
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hero title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hero subtitle..."
            />
          </div>

          <div>
            <label
              htmlFor="hero-background-image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Hero Background Image
            </label>
            {heroBackgroundImageUrl && (
              <div className="mb-4">
                <img
                  src={heroBackgroundImageUrl}
                  alt="Hero background"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            <input
              id="hero-background-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setHeroBackgroundImage(file);
                  setHeroBackgroundImageUrl(URL.createObjectURL(file));
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Upload hero background image"
            />
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
          Our Mission Title
        </h3>
        <input
          type="text"
          value={ourMissionTitle}
          onChange={(e) => setOurMissionTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter mission title..."
        />

        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
          Our Mission Content
        </h3>
        <RichTextEditor
          value={ourMissionSubTitle}
          onChange={setOurMissionSubTitle}
          placeholder="Enter your mission statement..."
        />
      </div>

      {/* Services Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            Services
          </h3>
          <button
            onClick={handleAddService}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>

        {services.map((service, index) => (
          <div key={service.id} className="relative">
            <button
              onClick={() => handleDeleteService(service.id, service.isNew)}
              className="absolute top-4 right-4 z-10 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              title="Delete Service"
            >
              <Trash2 size={18} />
            </button>
            <ServiceSection
              title={`Service #${index + 1}`}
              serviceName={service.title}
              serviceDetails={service.description}
              onServiceNameChange={(value) =>
                handleUpdateService(service.id, "title", value)
              }
              onServiceDetailsChange={(value) =>
                handleUpdateService(service.id, "description", value)
              }
              onImageUpload={(file) =>
                handleUpdateService(service.id, "file", file)
              }
              uploadedImage={service.image?.url}
            />
          </div>
        ))}
      </div>

      {/* Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          disabled={
            updateHomePage.isPending ||
            createService.isPending ||
            updateService.isPending
          }
          className="w-full md:w-auto px-6 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {(updateHomePage.isPending ||
            createService.isPending ||
            updateService.isPending) && (
            <Loader2 className="w-5 h-5 animate-spin" />
          )}
          Publish
        </button>
      </div>
    </div>
  );
};
