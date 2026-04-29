"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Globe } from "lucide-react";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "sonner";

const SiteStatusTab = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    if (settings) {
      setMaintenanceMode(settings.maintenanceMode ?? false);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ maintenanceMode });
      toast.success(
        maintenanceMode
          ? "Maintenance mode enabled — public site is now hidden"
          : "Site is now live and accessible to visitors",
      );
    } catch {
      toast.error("Failed to update site status");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Site Status</h2>
        <p className="text-sm text-gray-500 mt-1">
          Control whether the public website is accessible to visitors.
        </p>
      </div>

      {/* Status card */}
      <div
        className={`rounded-xl border-2 p-5 flex items-start gap-4 transition-colors ${
          maintenanceMode
            ? "border-orange-300 bg-orange-50"
            : "border-green-300 bg-green-50"
        }`}
      >
        <div
          className={`mt-0.5 rounded-full p-2 ${
            maintenanceMode ? "bg-orange-100" : "bg-green-100"
          }`}
        >
          {maintenanceMode ? (
            <AlertTriangle size={20} className="text-orange-600" />
          ) : (
            <Globe size={20} className="text-green-600" />
          )}
        </div>
        <div className="flex-1">
          <p
            className={`font-semibold ${
              maintenanceMode ? "text-orange-800" : "text-green-800"
            }`}
          >
            {maintenanceMode ? "Maintenance Mode is ON" : "Site is Live"}
          </p>
          <p
            className={`text-sm mt-0.5 ${
              maintenanceMode ? "text-orange-700" : "text-green-700"
            }`}
          >
            {maintenanceMode
              ? "Visitors see a coming soon / maintenance page. The admin dashboard remains fully accessible."
              : "Your website is publicly accessible to all visitors."}
          </p>
        </div>
        <Switch
          checked={maintenanceMode}
          onCheckedChange={setMaintenanceMode}
          aria-label="Toggle maintenance mode"
        />
      </div>

      {maintenanceMode && (
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          <strong>Note:</strong> The admin dashboard at <code>/dashboard</code> is unaffected — only public-facing pages show the maintenance screen.
        </div>
      )}

      <Button
        onClick={handleSave}
        disabled={updateMutation.isPending}
        className={
          maintenanceMode
            ? "bg-orange-600 hover:bg-orange-700"
            : "bg-[#2d4a8f] hover:bg-[#243a73]"
        }
      >
        {updateMutation.isPending ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
};

export default SiteStatusTab;
