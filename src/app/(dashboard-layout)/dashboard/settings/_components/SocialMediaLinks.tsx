"use client";

import React, { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Save } from "lucide-react";

interface SocialMediaLinksProps {
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  onUpdate: (links: any) => void;
}

export const SocialMediaLinks = ({ socialLinks, onUpdate }: SocialMediaLinksProps) => {
  const [links, setLinks] = useState(socialLinks);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(links);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLinks(socialLinks);
    setIsEditing(false);
  };

  const socialPlatforms = [
    { key: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage" },
    { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourpage" },
    { key: "twitter", label: "Twitter", icon: Twitter, placeholder: "https://twitter.com/yourpage" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/yourpage" },
    { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/channel/yourpage" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Social Media Links</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Edit Links
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Icon size={16} className="text-gray-500" />
                <span>{label}</span>
              </div>
            </label>
            {isEditing ? (
              <input
                type="url"
                value={links[key as keyof typeof links]}
                onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                {links[key as keyof typeof links] || "Not set"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};