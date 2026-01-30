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
              image: {
                ...service.image,
                url: URL.createObjectURL(value),
              } as any,
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
        const uploadedImage =
          await uploadService.uploadSingle(heroBackgroundImage);
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
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading home page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Page</h1>
          <p className="text-gray-600 mt-1">
            Manage your homepage content and sections
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={
            updateHomePage.isPending ||
            createService.isPending ||
            updateService.isPending
          }
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
        >
          {updateHomePage.isPending ||
          createService.isPending ||
          updateService.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish Changes"
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Hero Section
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Main banner content visible on homepage
            </p>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Welcome to Our Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Building Excellence Since 2020"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>
              {heroBackgroundImageUrl ? (
                <div className="relative">
                  <img
                    src={heroBackgroundImageUrl}
                    alt="Hero background"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <label
                      htmlFor="hero-background-image"
                      className="cursor-pointer px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-all inline-block"
                    >
                      Change Image
                    </label>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="hero-background-image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 font-medium">
                      Click to upload background image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
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
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Mission Section
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Your company's mission and values
            </p>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Title
              </label>
              <input
                type="text"
                value={ourMissionTitle}
                onChange={(e) => setOurMissionTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Our Mission"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Content
              </label>
              <RichTextEditor
                value={ourMissionSubTitle}
                onChange={setOurMissionSubTitle}
                placeholder="Describe your company's mission and values..."
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Services</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {services.length} service(s) configured
              </p>
            </div>
            <button
              onClick={handleAddService}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          <div className="p-6">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">
                  No services added yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add Service" to create your first service
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <ServiceSection
                    key={service.id}
                    title={`Service ${index + 1}`}
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
                    onDelete={() =>
                      handleDeleteService(service.id, service.isNew)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
