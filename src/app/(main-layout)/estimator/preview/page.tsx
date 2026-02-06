"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEstimatorStore } from "@/store/estimatorStore";
import {
  Upload,
  X,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import { submissionService } from "@/services/submission.service";
import { uploadService } from "@/services/upload.service";
import { FloatingPriceCard } from "../_components/FloatingPriceCard";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  uploaded: boolean;
  type: "image" | "video";
}

export default function PreviewPage() {
  const router = useRouter();
  const {
    serviceId,
    userInfo,
    setUserInfo,
    totalPrice,
    basePrice,
    step1Selections,
    step2Selections,
  } = useEstimatorStore();

  const [fullName, setFullName] = useState(userInfo.fullName);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [zipCode, setZipCode] = useState(userInfo.zipCode);
  const [address, setAddress] = useState(userInfo.address);
  const [notes, setNotes] = useState(userInfo.notes);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!serviceId) {
      router.push("/estimator/choose-service");
    }

    // Load previously uploaded files from store
    const loadUploadedFiles = async () => {
      const photoIds = userInfo.photoIds || [];
      const videoIds = userInfo.videoIds || [];

      const loadedFiles: UploadedFile[] = [];

      // Load photos
      for (const photoId of photoIds) {
        try {
          const response = await uploadService.getFileUrl(photoId);
          loadedFiles.push({
            id: photoId,
            file: null as any, // No file object for previously uploaded
            preview: response.url,
            progress: 100,
            uploaded: true,
            type: "image",
          });
        } catch (error) {
          console.error("Failed to load photo:", photoId, error);
        }
      }

      // Load videos
      for (const videoId of videoIds) {
        try {
          const response = await uploadService.getFileUrl(videoId);
          loadedFiles.push({
            id: videoId,
            file: null as any, // No file object for previously uploaded
            preview: response.url,
            progress: 100,
            uploaded: true,
            type: "video",
          });
        } catch (error) {
          console.error("Failed to load video:", videoId, error);
        }
      }

      if (loadedFiles.length > 0) {
        setUploadedFiles(loadedFiles);
      }
    };

    loadUploadedFiles();

    // Debug log
    console.log("Preview page loaded with:", {
      serviceId,
      basePrice,
      totalPrice,
      step1Count: step1Selections.length,
      step2Count: step2Selections.length,
      userInfo,
    });
  }, [
    serviceId,
    router,
    basePrice,
    totalPrice,
    step1Selections,
    step2Selections,
    userInfo,
  ]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 10 - uploadedFiles.filter((f) => f.type === "image").length);

    for (const file of imageFiles) {
      const id = Math.random().toString(36);
      const preview = URL.createObjectURL(file);

      setUploadedFiles((prev) => [
        ...prev,
        {
          id,
          file,
          preview,
          progress: 0,
          uploaded: false,
          type: "image",
        },
      ]);

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === id && f.progress < 90
                ? { ...f, progress: f.progress + 10 }
                : f,
            ),
          );
        }, 200);

        const uploaded = await uploadService.uploadSingle(file);

        clearInterval(progressInterval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, id: uploaded.id, progress: 100, uploaded: true }
              : f,
          ),
        );

        // Save photo ID to store - get current state first
        const currentPhotoIds = useEstimatorStore.getState().userInfo.photoIds || [];
        setUserInfo({
          photoIds: [...currentPhotoIds, uploaded.id],
        });
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
        alert("Failed to upload image");
      }
    }
    e.target.value = "";
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const videoFiles = files
      .filter((f) => f.type.startsWith("video/"))
      .slice(0, 2 - uploadedFiles.filter((f) => f.type === "video").length);

    for (const file of videoFiles) {
      const id = Math.random().toString(36);
      const preview = URL.createObjectURL(file);

      setUploadedFiles((prev) => [
        ...prev,
        {
          id,
          file,
          preview,
          progress: 0,
          uploaded: false,
          type: "video",
        },
      ]);

      try {
        const progressInterval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === id && f.progress < 90
                ? { ...f, progress: f.progress + 10 }
                : f,
            ),
          );
        }, 200);

        const uploaded = await uploadService.uploadVideo(file);

        clearInterval(progressInterval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, id: uploaded.id, progress: 100, uploaded: true }
              : f,
          ),
        );

        // Save video ID to store - get current state first
        const currentVideoIds = useEstimatorStore.getState().userInfo.videoIds || [];
        setUserInfo({
          videoIds: [...currentVideoIds, uploaded.id],
        });
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
        alert("Failed to upload video");
      }
    }
    e.target.value = "";
  };

  const handleRemoveFile = (id: string) => {
    const file = uploadedFiles.find((f) => f.id === id);
    if (file) {
      // Remove from store - get current state first
      const currentUserInfo = useEstimatorStore.getState().userInfo;
      if (file.type === "image") {
        setUserInfo({
          photoIds: (currentUserInfo.photoIds || []).filter((photoId) => photoId !== id),
        });
      } else {
        setUserInfo({
          videoIds: (currentUserInfo.videoIds || []).filter((videoId) => videoId !== id),
        });
      }
    }
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submissionData = {
        serviceId,
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        projectAddress: address,
        zipCode,
        basePrice,
        additionalItemsTotal: totalPrice - basePrice,
        totalAmount: totalPrice,
        projectNotes: notes,
        items: [
          ...step1Selections
            .filter((s) => s.isEnabled)
            .map((s) => ({
              costCodeId: s.costCodeId,
              selectedOptionId: s.selectedOptionId,
              quantity: s.quantity || 1,
              unitPrice: s.unitPrice,
              isEnabled: s.isEnabled,
              userInputValue: s.userInputValue,
              notes: s.notes,
            })),
          ...step2Selections
            .filter((s) => s.isEnabled)
            .map((s) => ({
              costCodeId: s.costCodeId,
              selectedOptionId: s.selectedOptionId,
              quantity: s.quantity || 1,
              unitPrice: s.unitPrice,
              isEnabled: s.isEnabled,
              userInputValue: s.userInputValue,
              notes: s.notes,
            })),
        ],
      };

      console.log("=== SUBMISSION DEBUG ===");
      console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      console.log("Submission Data:", JSON.stringify(submissionData, null, 2));
      console.log("========================");
      console.log("User Information:", {
        fullName,
        email,
        phone,
        zipCode,
        address,
      });
      console.log("Pricing Details:", {
        basePrice,
        totalPrice,
        additionalItemsTotal: totalPrice - basePrice,
      });
      console.log("Files:", {
        photos: uploadedFiles.filter((f) => f.type === "image").length,
        videos: uploadedFiles.filter((f) => f.type === "video").length,
      });
      console.log("Selections:", {
        step1: step1Selections.length,
        step2: step2Selections.length,
      });
      console.log("Full Submission Data:", submissionData);
      console.log("==========================");

      // Submit to API
      const response = await submissionService.create(submissionData);
      const submissionId = response.data.data?.id;

      // Add media files to submission if any
      if (submissionId) {
        const uploadedMediaFiles = uploadedFiles.filter((f) => f.uploaded);
        if (uploadedMediaFiles.length > 0) {
          for (const file of uploadedMediaFiles) {
            try {
              await submissionService.addMedia(submissionId, {
                fileInstanceId: file.id,
                mediaType: file.type === "image" ? "PHOTO" : "VIDEO",
              });
            } catch (error) {
              console.error("Failed to add media:", error);
            }
          }
        }
      }

      // Update user info in store
      setUserInfo({
        fullName,
        email,
        phone,
        zipCode,
        address,
        notes,
      });

      router.push("/estimator/confirmation");
    } catch (error: any) {
      console.error("=== SUBMISSION ERROR ===");
      console.error("Full error:", error);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      console.error("========================");

      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      alert(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = fullName && email && phone && zipCode && address;
  const additionalTotal = totalPrice - basePrice;

  // Calculate additional costs from selections
  const additionalCosts = [
    ...step1Selections
      .filter((s) => s.isEnabled)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || `Step 1 Item`,
        cost: Number(s.unitPrice) * (s.quantity || 1),
      })),
    ...step2Selections
      .filter((s) => s.isEnabled)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || `Step 2 Item`,
        cost: Number(s.unitPrice) * (s.quantity || 1),
      })),
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* User Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name*
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="h-12 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address*
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="h-12 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number*
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(773) 555-0123"
                  className="h-12 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zip Code*
                </label>
                <Input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="60614"
                  className="h-12 px-4"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Address*
                </label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="example address"
                  className="h-12 px-4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Project Notes */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Project Notes (optional)
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Share any additional details, preferences, or questions about your
              project
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="example address"
              className="w-full min-h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283878] focus:border-transparent"
            />
          </div>

          {/* Upload Photos & Videos */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Photos & Videos
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Help us understand your space better (Max 10 photos, 2 videos)
            </p>

            <div className="space-y-6">
              {/* Photos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Photos (
                  {uploadedFiles.filter((f) => f.type === "image").length}/10)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#283878] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={
                      uploadedFiles.filter((f) => f.type === "image").length >=
                      10
                    }
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload images
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG (Max 10MB each)
                    </p>
                  </label>
                </div>
              </div>

              {/* Videos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Videos (
                  {uploadedFiles.filter((f) => f.type === "video").length}/2)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#283878] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                    disabled={
                      uploadedFiles.filter((f) => f.type === "video").length >=
                      2
                    }
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload videos
                    </p>
                    <p className="text-xs text-gray-500">
                      MP4, MOV (Max 50MB each)
                    </p>
                  </label>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        {file.type === "image" ? (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <VideoIcon className="w-12 h-12 text-gray-400" />
                          </div>
                        )}

                        {/* Progress Overlay */}
                        {!file.uploaded && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin mb-2"></div>
                              <p className="text-white text-sm font-medium">
                                {file.progress}%
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* File Type Badge */}
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {file.type === "image" ? "Photo" : "Video"}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Tip: Include photos of the entire bathroom, fixtures, any
                  problem areas, and measurements if available.
                </p>
              </div>
            </div>
          </div>

          {/* Estimate Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Estimate Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-semibold">
                  ${basePrice.toLocaleString()}
                </span>
              </div>

              {additionalCosts.length > 0 && (
                <>
                  <div className="border-t pt-3">
                    <p className="text-gray-600 mb-3">Additional Items:</p>
                    <div className="space-y-2 pl-4">
                      {additionalCosts.map((cost) => (
                        <div key={cost.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{cost.name}:</span>
                          <span className="font-medium">+${cost.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Additions Total:</span>
                      <span className="font-semibold">
                        ${additionalCosts.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t-2 border-[#283878] pt-4">
                <div className="flex justify-between text-2xl">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-[#283878]">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  * Final price may vary based on site conditions
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Estimate Budget →"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting, you agree to receive communication from BBurn
              Builders regarding your estimate.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
