"use client";

import { Shield, Calendar, AlertCircle } from "lucide-react";
import { PrivacyPolicy } from "@/types/legal.types";

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">{privacyPolicy.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
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

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: privacyPolicy.body }}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
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
