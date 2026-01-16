"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

export const PrivacyTab = () => {
  const [privacyContent, setPrivacyContent] = useState(`
    <h2>1. Information We Collect</h2>
    <p>At BBurn Builders, we collect information you provide directly to us, such as when you:</p>
    <ul>
      <li>Request a quote or consultation</li>
      <li>Contact us through our website or phone</li>
      <li>Subscribe to our newsletter</li>
      <li>Provide feedback or reviews</li>
    </ul>
    
    <h2>2. How We Use Your Information</h2>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Provide and improve our construction services</li>
      <li>Respond to your inquiries and requests</li>
      <li>Send you updates about our services</li>
      <li>Comply with legal obligations</li>
    </ul>
    
    <h2>3. Data Security</h2>
    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
    
    <h2>4. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at info@bburnbuilders.com</p>
  `);

  const handlePublish = () => {
    console.log("Publishing Privacy Policy...", { privacyContent });
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Privacy Policy</h2>
      
      <div className="mb-6 md:mb-8">
        <RichTextEditor
          value={privacyContent}
          onChange={setPrivacyContent}
          placeholder="Enter your privacy policy content..."
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