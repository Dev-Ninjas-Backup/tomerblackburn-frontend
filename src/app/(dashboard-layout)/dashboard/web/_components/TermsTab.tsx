"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

export const TermsTab = () => {
  const [termsContent, setTermsContent] = useState(`
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using BBurn Builders' services, you accept and agree to be bound by the terms and provision of this agreement.</p>
    
    <h2>2. Services</h2>
    <p>BBurn Builders provides construction and renovation services including:</p>
    <ul>
      <li>Bathroom renovations and remodeling</li>
      <li>Construction consultations</li>
      <li>Project estimates and quotes</li>
      <li>Custom construction solutions</li>
    </ul>
    
    <h2>3. Payment Terms</h2>
    <p>Payment terms will be specified in individual project contracts.</p>
    
    <h2>4. Contact Information</h2>
    <p>For questions about these Terms of Service, please contact us at info@bburnbuilders.com</p>
  `);

  const handlePublish = () => {
    console.log("Publishing Terms of Service...", { termsContent });
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Terms of Service</h2>
      
      <div className="mb-6 md:mb-8">
        <RichTextEditor
          value={termsContent}
          onChange={setTermsContent}
          placeholder="Enter your terms of service content..."
        />
      </div>

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