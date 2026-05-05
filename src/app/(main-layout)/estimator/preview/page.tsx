"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useTips } from "@/hooks/useTips";
import { useCostCodes } from "@/hooks/useCostManagement";
import { useServicesByCategory } from "@/hooks/useProjectManagement";
import {
  Upload,
  X,
  Video as VideoIcon,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { submissionService } from "@/services/submission.service";
import { uploadService } from "@/services/upload.service";
import {
  buildingTypeService,
  BuildingType,
} from "@/services/building-type.service";
import { hearAboutUsService, HearAboutUsOption } from "@/services/hear-about-us.service";
import { FloatingPriceCard } from "../_components/FloatingPriceCard";
import { EstimatorBreadcrumb } from "../_components/EstimatorBreadcrumb";

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
    serviceCategoryId,
    userInfo,
    setUserInfo,
    totalPrice,
    basePrice,
    step1Selections,
    step2Selections,
    setSubmissionData,
  } = useEstimatorStore();

  const { data: tips } = useTips();
  const { data: services } = useServicesByCategory(
    serviceCategoryId || undefined,
  );
  const serviceName = services?.find((s) => s.id === serviceId)?.name;
  const { data: costCodes } = useCostCodes({
    serviceId: serviceId || undefined,
    includeCategory: true,
  });

  const [openSummaryCategories, setOpenSummaryCategories] = useState<
    Set<string>
  >(new Set());

  const toggleSummaryCategory = useCallback((cat: string) => {
    setOpenSummaryCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }, []);

  const [fullName, setFullName] = useState(userInfo.fullName);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [zipCode, setZipCode] = useState(userInfo.zipCode);
  const [address, setAddress] = useState(userInfo.address);
  const [notes, setNotes] = useState(userInfo.notes);
  const [desiredStartDate, setDesiredStartDate] = useState(
    userInfo.desiredStartDate || "",
  );
  const [buildingTypeId, setBuildingTypeId] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);
  const [buildingTypesLoaded, setBuildingTypesLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [buildingTypeFieldValues, setBuildingTypeFieldValues] = useState<
    Record<string, string>
  >({});
  const [hearAboutUsOptions, setHearAboutUsOptions] = useState<HearAboutUsOption[]>([]);
  const [hearAboutUsEnabled, setHearAboutUsEnabled] = useState(false);
  const [hearAboutUs, setHearAboutUs] = useState(userInfo.hearAboutUs || "");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    buildingTypeService
      .getActive()
      .then((res) => {
        const types = res.data.data || [];
        setBuildingTypes(types);
        setBuildingTypesLoaded(true);
      })
      .catch(() => {
        setBuildingTypesLoaded(true);
      });
  }, []);

  useEffect(() => {
    Promise.all([
      hearAboutUsService.getSetting(),
      hearAboutUsService.getActiveOptions(),
    ]).then(([settingRes, optionsRes]) => {
      setHearAboutUsEnabled(settingRes.data.data?.isEnabled ?? false);
      setHearAboutUsOptions(optionsRes.data.data || []);
    }).catch(() => {});
  }, []);

  // After both hydrated + buildingTypes loaded, sync from store
  useEffect(() => {
    if (!hydrated || !buildingTypesLoaded) return;
    const storedId = useEstimatorStore.getState().userInfo.buildingTypeId;
    const storedName = useEstimatorStore.getState().userInfo.buildingType;
    if (storedId) {
      setBuildingTypeId(storedId);
      setBuildingType(storedName || "");
    }
  }, [hydrated, buildingTypesLoaded]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
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
  }, [
    hydrated,
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
        const currentPhotoIds =
          useEstimatorStore.getState().userInfo.photoIds || [];
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
        const currentVideoIds =
          useEstimatorStore.getState().userInfo.videoIds || [];
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
          photoIds: (currentUserInfo.photoIds || []).filter(
            (photoId) => photoId !== id,
          ),
        });
      } else {
        setUserInfo({
          videoIds: (currentUserInfo.videoIds || []).filter(
            (videoId) => videoId !== id,
          ),
        });
      }
    }
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const selectedBuildingType = buildingTypes.find(
    (bt) => bt.id === buildingTypeId,
  );

  const handleBuildingTypeChange = (id: string) => {
    setBuildingTypeId(id);
    const bt = buildingTypes.find((b) => b.id === id);
    setBuildingType(bt?.name || "");
    setBuildingTypeFieldValues({});
    setUserInfo({
      buildingType: bt?.name || "",
      buildingTypeId: id,
      buildingTypePrice: Number(bt?.price) || 0,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const fieldValuesArray =
        selectedBuildingType?.fields
          .filter((f) => buildingTypeFieldValues[f.id])
          .map((f) => ({
            fieldId: f.id,
            value: buildingTypeFieldValues[f.id],
          })) || [];

      // Prepare submission data
      const submissionData = {
        serviceId,
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        projectAddress: address,
        zipCode,
        desiredStartDate,
        buildingType,
        buildingTypeId: buildingTypeId || undefined,
        buildingTypeFieldValues: fieldValuesArray.length
          ? fieldValuesArray
          : undefined,
        basePrice,
        additionalItemsTotal: totalPrice - basePrice,
        totalAmount:
          Number(totalPrice) + (Number(selectedBuildingType?.price) || 0),
        projectNotes: notes,
        hearAboutUs: hearAboutUs || undefined,
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

      // Submit to API
      const response = await submissionService.create(submissionData);
      const submissionId = response.data.data?.id;
      const submissionNumber = response.data.data?.submissionNumber;
      const pdfUrl = response.data.data?.pdfUrl || null;

      // Save submission data to store
      if (submissionId && submissionNumber) {
        setSubmissionData(submissionId, submissionNumber, pdfUrl);
      }

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
        desiredStartDate,
        buildingType,
        buildingTypeId,
        hearAboutUs,
      });

      router.push("/estimator/confirmation");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      alert(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    fullName &&
    email &&
    phone &&
    zipCode &&
    address &&
    desiredStartDate &&
    buildingTypeId;

  // Build a map of costCodeId -> category name
  const costCodeCategoryMap = (costCodes || []).reduce(
    (acc, cc) => {
      acc[cc.id] = cc.category?.name || "Other";
      return acc;
    },
    {} as Record<string, string>,
  );

  // Calculate additional costs from selections (exclude items with 0 or null price)
  const additionalCosts = [
    ...step1Selections
      .filter((s) => s.isEnabled && s.unitPrice && Number(s.unitPrice) > 0)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || "Step 1 Item",
        cost: Number(s.unitPrice) * (s.quantity || 1),
        category: costCodeCategoryMap[s.costCodeId] || "Step 1",
      })),
    ...step2Selections
      .filter((s) => s.isEnabled && s.unitPrice && Number(s.unitPrice) > 0)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || "Step 2 Item",
        cost: Number(s.unitPrice) * (s.quantity || 1),
        category: costCodeCategoryMap[s.costCodeId] || "Step 2",
      })),
  ];

  // Group by category
  const groupedAdditionalCosts = additionalCosts.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof additionalCosts>,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />

      <div className="lg:flex lg:justify-center">
        <div className="px-4 w-full max-w-4xl lg:mr-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Service Title */}
            <div className="-mt-4 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {serviceName || "Estimate Preview"}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Review your selections before submitting
              </p>
            </div>

            {/* Breadcrumb */}
            <EstimatorBreadcrumb currentStep="preview" />

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

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Desired Start Date*
                  </label>
                  <Input
                    type="date"
                    value={desiredStartDate}
                    onChange={(e) => setDesiredStartDate(e.target.value)}
                    className="h-12 px-4"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="buildingType"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Building Type*
                  </label>
                  <select
                    id="buildingType"
                    value={buildingTypeId}
                    onChange={(e) => handleBuildingTypeChange(e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#283878] focus:border-transparent"
                    required
                  >
                    <option value="">Select Building Type</option>
                    {buildingTypes.map((bt) => (
                      <option key={bt.id} value={bt.id}>
                        {bt.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic fields for selected building type */}
                {selectedBuildingType?.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {field.label}
                      {field.isRequired ? "*" : ""}
                    </label>
                    <Input
                      type={field.fieldType === "number" ? "number" : "text"}
                      value={buildingTypeFieldValues[field.id] || ""}
                      onChange={(e) =>
                        setBuildingTypeFieldValues((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      className="h-12 px-4"
                      required={field.isRequired}
                    />
                  </div>
                ))}

                {/* How did you hear about us */}
                {hearAboutUsEnabled && hearAboutUsOptions.length > 0 && (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hearAboutUs"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAboutUs"
                      value={hearAboutUs}
                      onChange={(e) => setHearAboutUs(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#283878] focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      {hearAboutUsOptions.map((opt) => (
                        <option key={opt.id} value={opt.label}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Project Notes */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Project Notes (optional)
              </h2>
              <div className="bg-[#283878]/5 border border-[#283878]/15 rounded-xl px-4 py-3 mb-4 flex gap-3 items-start">
                <span className="text-lg shrink-0">✏️</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This is your chance to add anything you weren&apos;t sure about, special requests, or additional details.
                  <span className="font-medium text-[#283878]"> We read every note carefully.</span> A real person will review your estimate and follow up with you directly.
                </p>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Not sure about the tile size — we currently have 12x24 but might want something different. Also interested in a floating vanity if possible."
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
                        uploadedFiles.filter((f) => f.type === "image")
                          .length >= 10
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
                        uploadedFiles.filter((f) => f.type === "video")
                          .length >= 2
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

                {tips && tips.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      💡 Tips:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {tips
                        .sort((a, b) => a.position - b.position)
                        .map((tip) => (
                          <li key={tip.id} className="text-sm text-blue-800">
                            {tip.message}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Estimate Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Estimate Summary
              </h2>

              <div className="space-y-3">
                {/* Base Price */}
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Base Price</span>
                  <span className="font-semibold text-gray-900">
                    ${basePrice.toLocaleString()}
                  </span>
                </div>

                {/* Additional Items grouped by category */}
                {Object.keys(groupedAdditionalCosts).length > 0 && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                      Additional Items
                    </p>
                    {Object.entries(groupedAdditionalCosts).map(
                      ([categoryName, items]) => {
                        const isOpen = openSummaryCategories.has(categoryName);
                        const categoryTotal = items.reduce(
                          (sum, c) => sum + c.cost,
                          0,
                        );
                        return (
                          <div
                            key={categoryName}
                            className={`border rounded-xl overflow-hidden transition-colors ${
                              isOpen ? "border-[#283878]/20" : "border-gray-200"
                            }`}
                          >
                            {/* Category Header */}
                            <button
                              type="button"
                              onClick={() =>
                                toggleSummaryCategory(categoryName)
                              }
                              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 group-hover:text-[#283878] transition-colors">
                                  {categoryName}
                                </span>
                                <span className="text-[11px] font-medium text-[#283878] bg-[#283878]/10 px-2 py-0.5 rounded-full">
                                  {items.length} item
                                  {items.length > 1 ? "s" : ""}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-700">
                                  +${categoryTotal.toLocaleString()}
                                </span>
                                <motion.div
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.22 }}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                    isOpen
                                      ? "bg-[#283878] text-white"
                                      : "bg-gray-200 text-gray-500 group-hover:bg-[#283878]/10 group-hover:text-[#283878]"
                                  }`}
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </motion.div>
                              </div>
                            </button>

                            {/* Category Items */}
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="items"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                  }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <div className="px-4 py-3 space-y-2 border-t border-gray-100">
                                    {items.map((cost, index) => (
                                      <div
                                        key={`${cost.id}-${index}`}
                                        className="flex justify-between items-center text-sm"
                                      >
                                        <div className="flex items-center gap-2">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                          <span className="text-gray-600">
                                            {cost.name}
                                          </span>
                                        </div>
                                        <span className="font-medium text-gray-800 shrink-0 ml-4">
                                          +${cost.cost.toLocaleString()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}

                {/* Additions Total */}
                {additionalCosts.length > 0 && (
                  <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">
                      Additions Total
                    </span>
                    <span className="font-semibold text-gray-900">
                      +$
                      {additionalCosts
                        .reduce((sum, c) => sum + c.cost, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Building Type */}
                {selectedBuildingType &&
                  Number(selectedBuildingType.price) > 0 && (
                    <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-xs text-gray-400 block">
                          Building Type
                        </span>
                        <span className="text-gray-700 font-medium">
                          {selectedBuildingType.name}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        +${Number(selectedBuildingType.price).toLocaleString()}
                      </span>
                    </div>
                  )}

                {/* Grand Total */}
                <div className="border-t-2 border-[#283878] pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#283878]">
                      $
                      {(
                        Number(totalPrice) +
                        (Number(selectedBuildingType?.price) || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-right">
                    * Final price may vary based on site conditions
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex sm:flex-row flex-col-reverse justify-between items-center gap-4">
                <Button
                  onClick={() => router.back()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-6 text-lg rounded-full px-8 w-full sm:w-auto"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 sm:text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Estimate Budget →"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to receive communication from BBurn
                Builders regarding your estimate.
              </p>
            </div>
          </motion.div>
        </div>
        {/* Spacer for floating card on desktop */}
        <div className="hidden lg:block lg:w-80 lg:shrink-0" />
      </div>
    </div>
  );
}
