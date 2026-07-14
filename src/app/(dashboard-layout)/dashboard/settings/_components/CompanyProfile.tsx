"use client";

import React, { useState, useEffect } from "react";
import { Camera, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/types/site-settings.types";
import { uploadService } from "@/services/upload.service";
import { toast } from "sonner";

interface CompanyProfileProps {
  settings?: SiteSettings;
  onUpdate: (data: {
    siteTitle: string;
    contactEmail: string;
    contactNumber: string;
    siteDescription: string;
    location: string;
    logoImageId?: string;
    guidePdfId?: string;
    ctaBannerText?: string;
    ctaBannerEnabled?: boolean;
  }) => void;
  isLoading?: boolean;
}

export const CompanyProfile = ({
  settings,
  onUpdate,
  isLoading,
}: CompanyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [pdfName, setPdfName] = useState<string>("");
  const [formData, setFormData] = useState({
    siteTitle: "",
    contactEmail: "",
    contactNumber: "",
    siteDescription: "",
    location: "",
    logoImageId: "",
    guidePdfId: "",
    ctaBannerText: "",
    ctaBannerEnabled: true,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteTitle: settings.siteTitle || "",
        contactEmail: settings.contactEmail || "",
        contactNumber: settings.contactNumber || "",
        siteDescription: settings.siteDescription || "",
        location: settings.location || "",
        logoImageId: settings.logoImageId || "",
        guidePdfId: settings.guidePdfId || "",
        ctaBannerText: settings.ctaBannerText || "Get Your Free Live Estimate Now!",
        ctaBannerEnabled: settings.ctaBannerEnabled ?? true,
      });
      setLogoPreview(settings.logoImage?.url || "");
      setPdfName(settings.guidePdf?.originalFilename || settings.guidePdf?.filename || "");
    }
  }, [settings]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    try {
      const uploaded = await uploadService.uploadSingle(file);
      setFormData({ ...formData, logoImageId: uploaded.id });
      setLogoPreview(uploaded.url);
      toast.success("Logo uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setUploadingPdf(true);
    try {
      const uploaded = await uploadService.uploadSingle(file);
      setFormData({ ...formData, guidePdfId: uploaded.id });
      setPdfName(uploaded.originalFilename || uploaded.filename);
      toast.success("Guide PDF uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload guide PDF");
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt={formData.siteTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Logo
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera size={14} className="text-white" />
                )}
              </label>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {formData.siteTitle}
            </h2>
            <p className="text-sm text-gray-600">{formData.contactEmail}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#2d4a8f] hover:bg-[#243d75]"
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#2d4a8f] hover:bg-[#243d75]"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.siteTitle}
            onChange={(e) =>
              setFormData({ ...formData, siteTitle: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Input
            value={formData.siteDescription}
            onChange={(e) =>
              setFormData({ ...formData, siteDescription: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            placeholder="Site description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            placeholder="Chicago, IL"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA Banner Text
          </label>
          <Input
            value={formData.ctaBannerText}
            onChange={(e) =>
              setFormData({ ...formData, ctaBannerText: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            placeholder="Get Your Free Live Estimate Now!"
          />
          <p className="text-xs text-gray-500 mt-1">
            This text appears in the top banner and links to the estimator page
          </p>
          
          {/* CTA Banner Enable/Disable */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="ctaBannerEnabled"
              checked={formData.ctaBannerEnabled}
              onChange={(e) =>
                setFormData({ ...formData, ctaBannerEnabled: e.target.checked })
              }
              disabled={!isEditing}
              className="w-4 h-4 text-[#2d4a8f] border-gray-300 rounded focus:ring-[#2d4a8f] disabled:opacity-50"
            />
            <label htmlFor="ctaBannerEnabled" className="text-sm text-gray-700">
              Enable CTA Banner
            </label>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Estimator Guide PDF
          </label>
          <div className="flex items-center gap-3">
            {isEditing && (
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 text-slate-700 font-semibold text-sm transition-all shadow-sm">
                <Upload size={16} />
                {uploadingPdf ? "Uploading..." : "Upload Guide PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  disabled={uploadingPdf}
                />
              </label>
            )}
            {pdfName ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-medium text-slate-600">
                <span>📄</span>
                <span className="truncate max-w-[200px]" title={pdfName}>{pdfName}</span>
                {isEditing && (
                  <button
                    onClick={() => {
                      setFormData({ ...formData, guidePdfId: "" });
                      setPdfName("");
                    }}
                    className="text-red-500 hover:text-red-700 ml-2 font-bold"
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400">No guide PDF uploaded</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This PDF will be automatically attached to estimate confirmation emails sent to clients.
          </p>
        </div>
      </div>
    </div>
  );
};
