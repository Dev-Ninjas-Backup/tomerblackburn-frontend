"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface WebTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  "Home",
  "About Us",
  "Portfolio",
  "Estimator",
  "Building Types",
  "Terms of Service",
  "Privacy Policy",
  "Site Status",
];

export const WebTabs = ({ activeTab, onTabChange }: WebTabsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-48 bg-gray-50 border-r border-gray-200 h-screen sticky top-0">
        <div className="p-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm mb-1
                transition-colors duration-200
                ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className="md:hidden w-full border-b border-gray-200 bg-white"
        ref={dropdownRef}
      >
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span>{activeTab}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`
                    w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-b-0
                    transition-colors duration-200
                    ${
                      activeTab === tab
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
