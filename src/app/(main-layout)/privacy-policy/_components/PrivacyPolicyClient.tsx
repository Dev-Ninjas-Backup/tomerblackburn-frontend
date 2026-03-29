"use client";

import { Shield, Calendar, AlertCircle } from "lucide-react";
import { PrivacyPolicy } from "@/types/legal.types";
import { EditorPreview } from "@/components/Editor";
import { TableOfContents } from "@/components/TableOfContents";

interface PrivacyPolicyClientProps {
  privacyPolicy: PrivacyPolicy | null;
  error: string | null;
}

export function PrivacyPolicyClient({ privacyPolicy, error }: PrivacyPolicyClientProps) {
  if (error || !privacyPolicy) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy Not Available</h1>
            <p className="text-gray-600">
              The privacy policy is currently not available. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                <Shield className="w-10 h-10 text-blue-50" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{privacyPolicy.title}</h1>
            </div>
            <div className="flex items-center gap-2 text-blue-100/90 font-medium ml-1">
              <Calendar className="w-4 h-4" />
              <p>
                Effective Date:{" "}
                {new Date(privacyPolicy.effectiveDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Layout with Main Content and TOC Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-14 w-full min-w-0 privacy-policy-content-wrapper transition-all duration-300">
            <EditorPreview content={privacyPolicy.body} bare />
          </div>

          {/* Right Sidebar - Table of Contents */}
          <div className="w-full lg:w-[320px] shrink-0 sticky top-28 self-start hidden lg:block">
            <TableOfContents contentSelector=".privacy-policy-content-wrapper" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-400 font-medium">
          <p>
            Last updated:{" "}
            {new Date(privacyPolicy.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
