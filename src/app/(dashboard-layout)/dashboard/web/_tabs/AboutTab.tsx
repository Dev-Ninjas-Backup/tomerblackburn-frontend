"use client";

import React, { useState, useEffect, useRef } from "react";
import { RichTextEditor, EditorPreview } from "@/components/Editor";
import { useAboutUsData, useUpdateAboutUs } from "@/hooks/useAboutUs";
import { uploadService } from "@/services/upload.service";
import {
  Loader2,
  Upload,
  X,
  ImageIcon,
  Sparkles,
  User,
  FileText,
  Eye,
  Settings,
  Tv,
  Tablet,
  Smartphone,
  Trash2,
  Info,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Lock,
  Globe,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import { AboutTabSkeleton } from "./_skeleton/AboutTabSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export const AboutTab = () => {
  const { data, isLoading } = useAboutUsData();
  const updateAboutUs = useUpdateAboutUs();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // UI States
  const [activeMode, setActiveMode] = useState<"edit" | "preview">("edit");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setOwnerInfo(data.ownerInfo || "");
      setDescription(data.description || "");
      setImageUrl(data.image?.url || "");
    }
  }, [data]);

  // Check for unsaved changes
  const hasChanges = 
    title !== (data?.title || "") ||
    ownerInfo !== (data?.ownerInfo || "") ||
    description !== (data?.description || "") ||
    imageFile !== null ||
    imageUrl !== (data?.image?.url || "");

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handlePublish = async () => {
    try {
      let imageId = data?.imageId;
      if (imageFile) {
        const uploadedImage = await uploadService.uploadSingle(imageFile);
        imageId = uploadedImage.id;
      }
      await updateAboutUs.mutateAsync({ title, ownerInfo, description, imageId });
      setImageFile(null); // Reset local file since it's now updated
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  const handleDiscardChanges = () => {
    if (confirm("Are you sure you want to discard your unsaved changes?")) {
      setTitle(data?.title || "");
      setOwnerInfo(data?.ownerInfo || "");
      setDescription(data?.description || "");
      setImageUrl(data?.image?.url || "");
      setImageFile(null);
    }
  };

  if (isLoading) return <AboutTabSkeleton />;

  return (
    <div className="flex flex-col h-full gap-0 bg-gray-50/50">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200/80 gap-4 shrink-0">
        <div>
          {/* Breadcrumb path */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
            <span>Web</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#2D4A8F] font-semibold">About Us Page</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            About Us Settings
            {hasChanges ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 animate-pulse">
                <AlertCircle className="w-3 h-3" /> Unsaved changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-150">
                <CheckCircle2 className="w-3 h-3" /> Saved to website
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Customize your company philosophy, biography, and media content.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {hasChanges && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={handleDiscardChanges}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 hover:text-gray-900 active:scale-95 transition-all duration-200"
            >
              Discard Edits
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePublish}
            disabled={updateAboutUs.isPending || (!hasChanges && activeMode === "edit")}
            className={`
              px-5 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-all duration-200
              ${hasChanges 
                ? "bg-[#2D4A8F] text-white hover:bg-[#203975] shadow-md shadow-blue-900/10 cursor-pointer" 
                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"}
            `}
          >
            {updateAboutUs.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                Publish to Live Page
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* MODE TOGGLER */}
      <div className="flex items-center justify-between py-4 shrink-0">
        {/* Toggle between Edit and Preview */}
        <div className="flex p-1 bg-gray-100 rounded-xl border border-gray-200/50">
          <button
            onClick={() => setActiveMode("edit")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeMode === "edit"
                ? "bg-white text-[#2D4A8F] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Edit Content
          </button>
          <button
            onClick={() => setActiveMode("preview")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeMode === "preview"
                ? "bg-white text-[#2D4A8F] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>

        {/* Viewport size switcher for Live Preview */}
        {activeMode === "preview" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/50"
          >
            <button
              onClick={() => setViewport("desktop")}
              title="Desktop view"
              className={`p-1.5 rounded-lg transition-all ${
                viewport === "desktop" ? "bg-white text-[#2D4A8F] shadow-xs" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Tv className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              title="Tablet view"
              className={`p-1.5 rounded-lg transition-all ${
                viewport === "tablet" ? "bg-white text-[#2D4A8F] shadow-xs" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              title="Mobile view"
              className={`p-1.5 rounded-lg transition-all ${
                viewport === "mobile" ? "bg-white text-[#2D4A8F] shadow-xs" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* DYNAMIC CONTENT CONTAINER */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeMode === "edit" ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-8"
            >
              {/* LEFT & CENTER — Form Cards */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* General Info Card */}
                <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300 p-6 space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <div className="p-1.5 bg-[#2D4A8F]/10 rounded-lg text-[#2D4A8F]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Company & Founder Header</h3>
                      <p className="text-[11px] text-gray-400">Header info displayed in the Philosophy and Introduction sections.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                        Philosophy Title
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2D4A8F]/10 focus:border-[#2D4A8F] transition-all duration-200"
                          placeholder="e.g., Our Philosophy"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                        Owner Profile / Subtitle
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={ownerInfo}
                          onChange={(e) => setOwnerInfo(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2D4A8F]/10 focus:border-[#2D4A8F] transition-all duration-200"
                          placeholder="e.g., From Tomer Blackburn, Founder & Owner"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rich Editor Card */}
                <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#2D4A8F]/10 rounded-lg text-[#2D4A8F]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-800">Biographical Description</h3>
                        <p className="text-[11px] text-gray-400">Provide an in-depth story, philosophy, and details about your service focus.</p>
                      </div>
                    </div>
                    
                    <div className="group relative flex items-center">
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 bg-gray-900 text-white text-[10px] p-2.5 rounded-lg shadow-xl z-20 leading-relaxed">
                        Use headings, bold highlights, and spacing to write clean, easily readable content. It automatically scales for browser views.
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                    <RichTextEditor
                      value={description}
                      onChange={setDescription}
                      placeholder="Write your company background and philosophy..."
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT — Media upload card */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full space-y-4 min-h-[350px]">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <div className="p-1.5 bg-[#2D4A8F]/10 rounded-lg text-[#2D4A8F]">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Owner / Team Portrait</h3>
                      <p className="text-[11px] text-gray-400">Visible on the main About Us web section.</p>
                    </div>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 p-4
                      ${isDragging 
                        ? "border-[#2D4A8F] bg-[#2D4A8F]/5 scale-[0.99]" 
                        : imageUrl 
                          ? "border-gray-200 bg-gray-50" 
                          : "border-gray-200 hover:border-[#2D4A8F] hover:bg-[#2D4A8F]/5 bg-gray-50/50"}
                    `}
                  >
                    {imageUrl ? (
                      <>
                        <div className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden shadow-inner group">
                          <Image src={imageUrl} alt="Owner portrait preview" fill className="object-cover" />
                          
                          {/* Hover Blur Panel */}
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              type="button"
                              className="px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            >
                              <Upload className="w-3.5 h-3.5" />
                              Replace Photo
                            </button>
                            <button
                              type="button"
                              className="px-4 py-2 bg-red-650 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageUrl("");
                                setImageFile(null);
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Photo
                            </button>
                          </div>
                        </div>

                        {/* Floating quick control for quick mobile accessibility */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 md:hidden">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setImageUrl(""); setImageFile(null); }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 rounded-full p-1.5 shadow-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-10 px-4 group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-gray-100 group-hover:scale-110 group-hover:text-[#2D4A8F] text-gray-400 transition-all duration-300 mb-3">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">Drag & drop or Click to upload</span>
                        <span className="text-[10px] text-gray-400 mt-1 max-w-[200px]">Supports PNG, JPG, or WEBP. Portrait format (Aspect 4:6) is recommended.</span>
                      </div>
                    )}
                  </div>

                  {imageUrl && (
                    <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                      <Info className="w-3 h-3 text-[#2D4A8F]" /> Hover image or click to change portrait file.
                    </p>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    title="Upload portrait image"
                    aria-label="Upload portrait image"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            // PREVIEW MODE
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-full pb-8"
            >
              {/* Simulated Device Frame Container */}
              <div 
                className={`
                  bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden w-full transition-all duration-300
                  ${viewport === "desktop" ? "max-w-5xl" : viewport === "tablet" ? "max-w-3xl" : "max-w-sm"}
                `}
              >
                {/* Browser Mock Top bar */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
                  {/* Windows control dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-3 h-3 bg-red-400 rounded-full inline-block"></span>
                    <span className="w-3 h-3 bg-amber-400 rounded-full inline-block"></span>
                    <span className="w-3 h-3 bg-emerald-400 rounded-full inline-block"></span>
                  </div>

                  {/* Browser URL Input Simulation */}
                  <div className="flex-1 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 font-medium select-none shadow-2xs">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">https://bburnbuilders.com/about</span>
                    <RefreshCw className="w-3 h-3 text-gray-400 hover:text-gray-600 ml-auto cursor-pointer transition-colors" />
                  </div>

                  <div className="text-[10px] bg-gray-200 text-gray-600 px-2.5 py-1 rounded-md font-bold select-none hidden sm:inline-block">
                    {viewport === "desktop" ? "1024px (Desktop)" : viewport === "tablet" ? "768px (Tablet)" : "375px (Mobile)"}
                  </div>
                </div>

                {/* Webpage Body Simulation */}
                <div className="h-[520px] overflow-y-auto bg-white flex flex-col">
                  
                  {/* Replicated Philosophy Section */}
                  <section className={`pt-8 pb-0 bg-white border-b border-gray-100 ${viewport === "mobile" ? "px-4" : "px-6"}`}>
                    <div className="max-w-6xl mx-auto">
                      <div className="flex items-center justify-center gap-4 animate-fade-in">
                        {viewport === "desktop" && (
                          <div className="flex-1 h-px bg-gray-200 max-w-[120px]"></div>
                        )}
                        <h2 className={`font-bold text-[#283878] text-center tracking-tight font-serif ${
                          viewport === "mobile" ? "text-lg px-2" : viewport === "tablet" ? "text-xl px-4" : "text-2xl px-6"
                        }`}>
                          {title || "Our Philosophy"}
                        </h2>
                        {viewport === "desktop" && (
                          <div className="flex-1 h-px bg-gray-200 max-w-[120px]"></div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Replicated AboutContent Section */}
                  <section className={`bg-white flex-1 ${viewport === "mobile" ? "py-4 px-4" : "py-6 px-6"}`}>
                    <div className="max-w-6xl mx-auto">
                      <div className={`
                        ${viewport === "desktop" 
                          ? "grid grid-cols-3 gap-8 items-start" 
                          : "flex flex-col gap-6"}
                      `}>
                        
                        {/* Left column: Text */}
                        <div className={`
                          ${viewport === "desktop" 
                            ? "col-span-2 order-1 space-y-5" 
                            : "order-2 space-y-4"}
                        `}>
                          <div>
                            <h3 className={`font-black tracking-widest text-[#283878] uppercase mb-1 ${
                              viewport === "mobile" ? "text-[10px]" : "text-xs"
                            }`}>
                              ABOUT US
                            </h3>
                            <p className={`text-gray-500 italic leading-relaxed border-l-2 border-[#283878]/30 pl-3 ${
                              viewport === "mobile" ? "text-xs" : "text-sm"
                            }`}>
                              {ownerInfo || "From Tomer Blackburn, BBurn Builders founder & owner"}
                            </p>
                          </div>

                          {/* Quill preview block */}
                          <div className={`text-gray-600 leading-relaxed antialiased ${
                            viewport === "mobile" ? "text-xs" : "text-sm"
                          }`}>
                            {description ? (
                              <EditorPreview content={description} bare />
                            ) : (
                              <p className="text-gray-400 italic">No biographical description available.</p>
                            )}
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-700 font-medium">
                              If the BBurn Builders philosophy resonates with you,{" "}
                              <span className="text-[#283878] underline hover:text-[#1d2a5c] font-semibold cursor-pointer inline-flex items-center gap-0.5">
                                get in touch for a free quote <ExternalLink className="w-3 h-3 inline" />
                              </span>{" "}
                              on your project!
                            </p>
                          </div>
                        </div>

                        {/* Right column: Image */}
                        <div className={`
                          ${viewport === "desktop" 
                            ? "col-span-1 order-2" 
                            : `order-1 w-full mx-auto ${viewport === "tablet" ? "max-w-md" : "max-w-xs"}`}
                        `}>
                          <div 
                            className="relative w-full rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 aspect-3/4"
                            style={{
                              height: viewport === "mobile" ? "280px" : viewport === "tablet" ? "380px" : "420px"
                            }}
                          >
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt="Owner biography portrait"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                <ImageIcon className="w-8 h-8 mb-2" />
                                <span className="text-xs">No image uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

