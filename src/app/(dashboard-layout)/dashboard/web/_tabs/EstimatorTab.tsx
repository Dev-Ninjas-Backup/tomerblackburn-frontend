"use client";

import { useState } from "react";
import { Pencil, Trash2, Upload } from "lucide-react";
import {
  useCompleteEstimatorPageData,
  useUpdateEstimatorPage,
  useCreateHowItWorksStep,
  useUpdateHowItWorksStep,
  useDeleteHowItWorksStep,
  useCreateWhyChooseUsFeature,
  useUpdateWhyChooseUsFeature,
  useDeleteWhyChooseUsFeature,
} from "@/hooks/useEstimatorPage";
import { uploadService } from "@/services/upload.service";
import { HowItWorksStep, WhyChooseUsFeature } from "@/types/estimator.types";

export default function EstimatorTab() {
  const { data, isLoading } = useCompleteEstimatorPageData();
  const updateMainPage = useUpdateEstimatorPage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [howItWorksTitle, setHowItWorksTitle] = useState("");
  const [whyChooseUsTitle, setWhyChooseUsTitle] = useState("");
  const [bgImageFile, setBgImageFile] = useState<File | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string>("");
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  const [stepForm, setStepForm] = useState<Partial<HowItWorksStep>>({});
  const [editingStep, setEditingStep] = useState<string | null>(null);

  const [featureForm, setFeatureForm] = useState<Partial<WhyChooseUsFeature>>(
    {},
  );
  const [editingFeature, setEditingFeature] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>("");
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);

  const createStep = useCreateHowItWorksStep();
  const updateStep = useUpdateHowItWorksStep();
  const deleteStep = useDeleteHowItWorksStep();

  const createFeature = useCreateWhyChooseUsFeature();
  const updateFeature = useUpdateWhyChooseUsFeature();
  const deleteFeature = useDeleteWhyChooseUsFeature();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.page) return <div>No data</div>;

  const { page: estimatorPage, howItWorksSteps, whyChooseUsFeatures } = data;

  // Populate form with existing data
  if (estimatorPage && !title && !description) {
    setTitle(estimatorPage.title || "");
    setDescription(estimatorPage.description || "");
    setHowItWorksTitle(estimatorPage.howItWorksTitle || "");
    setWhyChooseUsTitle(estimatorPage.whyChooseUsTitle || "");
    setBgImageUrl(estimatorPage.backgroundImage?.url || "");
  }

  const handleMainPageUpdate = async () => {
    let backgroundImageId = estimatorPage?.backgroundImageId;

    if (bgImageFile) {
      setIsUploadingBg(true);
      try {
        const uploaded = await uploadService.uploadSingle(bgImageFile);
        backgroundImageId = uploaded.id;
      } catch (error) {
        setIsUploadingBg(false);
        return;
      }
      setIsUploadingBg(false);
    }

    updateMainPage.mutate({
      title,
      description,
      howItWorksTitle,
      whyChooseUsTitle,
      backgroundImageId,
    });
    setBgImageFile(null);
  };

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBgImageFile(file);
      setBgImageUrl(URL.createObjectURL(file));
    }
  };

  const handleStepSubmit = () => {
    if (editingStep) {
      updateStep.mutate({ id: editingStep, payload: stepForm });
    } else {
      createStep.mutate(stepForm);
    }
    setStepForm({});
    setEditingStep(null);
  };

  const handleEditStep = (step: HowItWorksStep) => {
    setEditingStep(step.id);
    setStepForm({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
    });
  };

  const handleFeatureSubmit = async () => {
    let iconId = featureForm.iconId;

    if (iconFile) {
      setIsUploadingIcon(true);
      try {
        const uploaded = await uploadService.uploadSingle(iconFile);
        iconId = uploaded.id;
      } catch (error) {
        setIsUploadingIcon(false);
        return;
      }
      setIsUploadingIcon(false);
    }

    if (editingFeature) {
      updateFeature.mutate({
        id: editingFeature,
        payload: { ...featureForm, iconId },
      });
    } else {
      createFeature.mutate({ ...featureForm, iconId });
    }
    setFeatureForm({});
    setEditingFeature(null);
    setIconFile(null);
    setIconPreview("");
  };

  const handleEditFeature = (feature: WhyChooseUsFeature) => {
    setEditingFeature(feature.id);
    setFeatureForm({
      title: feature.title,
      description: feature.description,
      order: feature.order,
    });
    setIconPreview(feature.icon?.url || "");
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Page Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Main Page Content
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Hero section and page titles
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
                placeholder="e.g., Estimate Your Bathroom Remodel Cost"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="e.g., Professional bathroom remodels - real quotes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How It Works Section Title
              </label>
              <input
                type="text"
                placeholder="e.g., How It Works"
                value={howItWorksTitle}
                onChange={(e) => setHowItWorksTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose Us Section Title
              </label>
              <input
                type="text"
                placeholder="e.g., Why Choose Us"
                value={whyChooseUsTitle}
                onChange={(e) => setWhyChooseUsTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image
            </label>
            {bgImageUrl ? (
              <div className="relative">
                <img
                  src={bgImageUrl}
                  alt="Background"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <label
                    htmlFor="bg-image"
                    className="cursor-pointer px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-all inline-block"
                  >
                    Change Image
                  </label>
                </div>
              </div>
            ) : (
              <label
                htmlFor="bg-image"
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
              id="bg-image"
              type="file"
              accept="image/*"
              onChange={handleBgImageChange}
              className="hidden"
            />
          </div>
          <button
            onClick={handleMainPageUpdate}
            disabled={isUploadingBg || updateMainPage.isPending}
            className="px-6 py-2.5 bg-[#2D4A8F] text-white rounded-lg hover:bg-[#3461C9] disabled:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isUploadingBg || updateMainPage.isPending
              ? "Updating..."
              : "Update Main Page"}
          </button>
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            How It Works Steps
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            {howItWorksSteps.length} step(s) configured
          </p>
        </div>
        <div className="p-6 space-y-4">
          {howItWorksSteps.length > 0 && (
            <div className="space-y-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Step {step.stepNumber}: {step.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditStep(step)}
                      aria-label="Edit step"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteStep.mutate(step.id)}
                      aria-label="Delete step"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-5 mt-5 space-y-4">
            <h4 className="font-medium text-gray-900">
              {editingStep ? "Edit Step" : "Add New Step"}
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Number
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1"
                  value={stepForm.stepNumber || ""}
                  onChange={(e) =>
                    setStepForm({
                      ...stepForm,
                      stepNumber: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Submit Your Details"
                  value={stepForm.title || ""}
                  onChange={(e) =>
                    setStepForm({ ...stepForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe this step..."
                value={stepForm.description || ""}
                onChange={(e) =>
                  setStepForm({ ...stepForm, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleStepSubmit}
                disabled={createStep.isPending || updateStep.isPending}
                className="px-6 py-2.5 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#3461c9] disabled:bg-gray-400 transition-colors shadow-sm"
              >
                {editingStep ? "Update Step" : "Add Step"}
              </button>
              {editingStep && (
                <button
                  onClick={() => {
                    setEditingStep(null);
                    setStepForm({});
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Why Choose Us Features
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            {whyChooseUsFeatures.length} feature(s) configured
          </p>
        </div>
        <div className="p-6 space-y-4">
          {whyChooseUsFeatures.length > 0 && (
            <div className="space-y-3">
              {whyChooseUsFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    {feature.icon?.url && (
                      <img
                        src={feature.icon.url}
                        alt={feature.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {feature.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Order: {feature.order}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditFeature(feature)}
                      aria-label="Edit feature"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFeature.mutate(feature.id)}
                      aria-label="Delete feature"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-5 mt-5 space-y-4">
            <h4 className="font-medium text-gray-900">
              {editingFeature ? "Edit Feature" : "Add New Feature"}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Transparent Pricing"
                  value={featureForm.title || ""}
                  onChange={(e) =>
                    setFeatureForm({ ...featureForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1"
                  value={featureForm.order || ""}
                  onChange={(e) =>
                    setFeatureForm({
                      ...featureForm,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe this feature..."
                value={featureForm.description || ""}
                onChange={(e) =>
                  setFeatureForm({
                    ...featureForm,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              {iconPreview ? (
                <div className="relative inline-block">
                  <img
                    src={iconPreview}
                    alt="Icon"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <label
                    htmlFor="icon-image"
                    className="absolute top-2 right-2 cursor-pointer p-1.5 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                  >
                    <Pencil className="w-3 h-3" />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="icon-image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">
                    Click to upload icon
                  </p>
                </label>
              )}
              <input
                id="icon-image"
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="hidden"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFeatureSubmit}
                disabled={
                  isUploadingIcon ||
                  createFeature.isPending ||
                  updateFeature.isPending
                }
                className="px-6 py-2.5 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#3461c9] disabled:bg-gray-400 transition-colors shadow-sm"
              >
                {editingFeature ? "Update Feature" : "Add Feature"}
              </button>
              {editingFeature && (
                <button
                  onClick={() => {
                    setEditingFeature(null);
                    setFeatureForm({});
                    setIconFile(null);
                    setIconPreview("");
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
