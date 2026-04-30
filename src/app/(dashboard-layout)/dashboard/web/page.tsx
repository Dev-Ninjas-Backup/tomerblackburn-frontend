"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WebTabs } from "./_components/WebTabs";
import { HomeTab } from "./_tabs/HomeTab";
import { AboutTab } from "./_tabs/AboutTab";
import { PortfolioTabNew } from "./_tabs/PortfolioTabNew";
import EstimatorTab from "./_tabs/EstimatorTab";
import BuildingTypesTab from "./_tabs/BuildingTypesTab";
import { TermsTab } from "./_tabs/TermsTab";
import { PrivacyTab } from "./_tabs/PrivacyTab";
import SiteStatusTab from "./_tabs/SiteStatusTab";

const WebPage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab />;
      case "About Us":
        return <AboutTab />;
      case "Portfolio":
        return <PortfolioTabNew />;
      case "Estimator":
        return <EstimatorTab />;
      case "Building Types":
        return <BuildingTypesTab />;
      case "Terms of Service":
        return <TermsTab />;
      case "Privacy Policy":
        return <PrivacyTab />;
      case "Site Status":
        return <SiteStatusTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 bg-gray-50 min-h-screen"
    >
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-3rem)]"
        >
          {/* Fixed Header */}
          <div className="border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-between p-4"
            >
              <h1 className="text-xl font-semibold text-gray-900">Web</h1>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </motion.div>
          </div>

          {/* Fixed Tabs and Scrollable Content */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:sticky md:top-0 md:self-start bg-white z-10"
            >
              <WebTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 p-4 md:p-6 overflow-y-auto"
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WebPage;
