"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/dashboard/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CostCodeCategoriesTab from "./_tabs/CostCodeCategoriesTab";
import CostCodesTab from "./_tabs/CostCodesTab";
import CostCodeOptionsTab from "./_tabs/CostCodeOptionsTab";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

const CostManagementPage = () => {
  const [activeTab, setActiveTab] = useState("cost-codes");
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingCatalog, setIsExportingCatalog] = useState(false);

  const handleExportBuildertrend = async () => {
    setIsExporting(true);
    try {
      const response = await api.get('/cost-codes/export/buildertrend', { responseType: 'blob' });
      const filename = `buildertrend-cost-codes-${new Date().toISOString().slice(0, 10)}.xlsx`;
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Buildertrend export downloaded successfully');
    } catch {
      toast.error('Failed to export for Buildertrend');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportBuildertrendCatalog = async () => {
    setIsExportingCatalog(true);
    try {
      const response = await api.get('/cost-codes/export/buildertrend-catalog', { responseType: 'blob' });
      const filename = `buildertrend-catalog-${new Date().toISOString().slice(0, 10)}.xlsx`;
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Catalog export downloaded successfully');
    } catch {
      toast.error('Failed to export catalog for Buildertrend');
    } finally {
      setIsExportingCatalog(false);
    }
  };

  return (
    <div>
      <Navbar title="Cost Codes Management" />

      <div className="p-6">
        <div className="flex justify-end gap-3 mb-4">
          <Button
            onClick={handleExportBuildertrend}
            disabled={isExporting || isExportingCatalog}
            className="bg-[#2d4a8f] hover:bg-[#243a73] flex items-center gap-2"
          >
            <Download size={16} />
            {isExporting ? 'Exporting...' : 'Export for Buildertrend'}
          </Button>

          <Button
            onClick={handleExportBuildertrendCatalog}
            disabled={isExporting || isExportingCatalog}
            className="bg-[#107c41] hover:bg-[#0e6b38] flex items-center gap-2 text-white"
          >
            <Download size={16} />
            {isExportingCatalog ? 'Exporting...' : 'Export Catalog for Buildertrend'}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="cost-codes">Cost Codes</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="cost-codes">
            <CostCodesTab />
          </TabsContent>

          <TabsContent value="categories">
            <CostCodeCategoriesTab />
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
