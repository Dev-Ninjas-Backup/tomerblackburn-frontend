"use client";

import React, { useState, useEffect } from "react";
import { RichTextEditor } from "../_components/RichTextEditor";
import { useTermsOfService, useSaveTermsOfService } from "@/hooks/useLegal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileCheck, Calendar, FileText, Save } from "lucide-react";

export const TermsTab = () => {
  const [title, setTitle] = useState("Terms of Service");
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [body, setBody] = useState("");

  const { data, isLoading } = useTermsOfService();
  const saveTermsOfService = useSaveTermsOfService();

  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title);
      setEffectiveDate(data.data.effectiveDate.split("T")[0]);
      setBody(data.data.body);
    }
  }, [data]);

  const handlePublish = () => {
    saveTermsOfService.mutate({ title, effectiveDate, body });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading Terms of Service...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-linear-to-r from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <FileCheck className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Terms of Service</h2>
        </div>
        <p className="text-green-100">
          Define the terms and conditions for using your services
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-gray-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Terms of Service"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Effective Date Field */}
          <div className="space-y-2">
            <Label
              htmlFor="effectiveDate"
              className="flex items-center gap-2 text-gray-700 font-medium"
            >
              <Calendar className="w-4 h-4" />
              Effective Date
            </Label>
            <Input
              id="effectiveDate"
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700 font-medium">
            <FileText className="w-4 h-4" />
            Terms Content
          </Label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <RichTextEditor
              value={body}
              onChange={setBody}
              placeholder="Enter your terms of service content here..."
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {data?.data?.updatedAt && (
              <p>
                Last updated:{" "}
                <span className="font-medium text-gray-900">
                  {new Date(data.data.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={handlePublish}
            disabled={saveTermsOfService.isPending}
            className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {saveTermsOfService.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Publish Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
