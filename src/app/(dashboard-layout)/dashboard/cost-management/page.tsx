"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/dashboard/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CostCodeCategoriesTab from "./_tabs/CostCodeCategoriesTab";
import CostCodesTab from "./_tabs/CostCodesTab";
import CostCodeOptionsTab from "./_tabs/CostCodeOptionsTab";

const CostManagementPage = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div>
      <Navbar title="Cost Codes Management" />

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="cost-codes">Cost Codes</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <CostCodeCategoriesTab />
          </TabsContent>

          <TabsContent value="cost-codes">
            <CostCodesTab />
          </TabsContent>

          <TabsContent value="options">
            <CostCodeOptionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CostManagementPage;
