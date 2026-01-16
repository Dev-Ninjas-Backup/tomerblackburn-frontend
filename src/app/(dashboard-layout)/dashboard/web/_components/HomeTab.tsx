"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { ServiceSection } from "./ServiceSection";

export const HomeTab = () => {
  const [ourMission, setOurMission] = useState(
    "Manage your tasks efficiently from one place and stay focused on what matters most.Manage your tasks efficiently from one place and stay focused on what matters most.Manage your tasks efficiently from one place and stay focused on what matters most.Manage your tasks efficiently from one place and stay focused on what matters most.Manage your tasks efficiently from one place and stay focused on what matters most."
  );

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Responsive Communication",
      details: "",
      image: null as string | null,
    },
    {
      id: 2,
      name: "ACCURATE BUDGETING",
      details:
        "We create accurate estimates and keep our overhead low, so you can make the most of your money, without unnecessary expenses.",
      image: null as string | null,
    },
    {
      id: 3,
      name: "Responsive Communication",
      details: "",
      image: null as string | null,
    },
  ]);

  const updateService = (id: number, field: string, value: string | File) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          if (field === "image" && value instanceof File) {
            // In a real app, you'd upload the file and get a URL
            const imageUrl = URL.createObjectURL(value);
            return { ...service, image: imageUrl };
          }
          return { ...service, [field]: value };
        }
        return service;
      })
    );
  };

  const handlePublish = () => {
    console.log("Publishing content...", { ourMission, services });
    // Here you would typically send the data to your backend
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Home
      </h2>

      {/* Our Mission Section */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
          Our Mission
        </h3>
        <RichTextEditor
          value={ourMission}
          onChange={setOurMission}
          placeholder="Enter your mission statement..."
        />
      </div>

      {/* Services Section */}
      <div className="mb-6 md:mb-8">
        {services.map((service, index) => (
          <ServiceSection
            key={service.id}
            title={`Service #${index + 1}`}
            serviceName={service.name}
            serviceDetails={service.details}
            onServiceNameChange={(value) =>
              updateService(service.id, "name", value)
            }
            onServiceDetailsChange={(value) =>
              updateService(service.id, "details", value)
            }
            onImageUpload={(file) => updateService(service.id, "image", file)}
            uploadedImage={service.image || undefined}
          />
        ))}
      </div>

      {/* Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          className="w-full md:w-auto px-6 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
};
