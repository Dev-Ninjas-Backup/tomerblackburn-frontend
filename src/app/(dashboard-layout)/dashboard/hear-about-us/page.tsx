"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, GripVertical, ToggleLeft, ToggleRight } from "lucide-react";
import { hearAboutUsService, HearAboutUsOption } from "@/services/hear-about-us.service";
import { toast } from "sonner";

export default function HearAboutUsPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [options, setOptions] = useState<HearAboutUsOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    try {
      const [settingRes, optionsRes] = await Promise.all([
        hearAboutUsService.getSetting(),
        hearAboutUsService.getAllOptions(),
      ]);
      setIsEnabled(settingRes.data.data?.isEnabled ?? false);
      setOptions(optionsRes.data.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleToggleFeature = async () => {
    try {
      await hearAboutUsService.updateSetting(!isEnabled);
      setIsEnabled(!isEnabled);
      toast.success(`Feature ${!isEnabled ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Failed to update setting");
    }
  };

  const handleAddOption = async () => {
    if (!newLabel.trim()) return;
    try {
      await hearAboutUsService.createOption({
        label: newLabel.trim(),
        displayOrder: options.length,
        isActive: true,
      });
      setNewLabel("");
      setShowAddForm(false);
      fetchData();
      toast.success("Option added");
    } catch {
      toast.error("Failed to add option");
    }
  };

  const handleUpdateOption = async (id: string) => {
    if (!editLabel.trim()) return;
    try {
      await hearAboutUsService.updateOption(id, { label: editLabel.trim() });
      setEditingId(null);
      fetchData();
      toast.success("Option updated");
    } catch {
      toast.error("Failed to update option");
    }
  };

  const handleToggleOption = async (opt: HearAboutUsOption) => {
    try {
      await hearAboutUsService.updateOption(opt.id, { isActive: !opt.isActive });
      fetchData();
      toast.success(`Option ${!opt.isActive ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Failed to update option");
    }
  };

  const handleDeleteOption = async (id: string) => {
    if (!confirm("Delete this option?")) return;
    try {
      await hearAboutUsService.deleteOption(id);
      fetchData();
      toast.success("Option deleted");
    } catch {
      toast.error("Failed to delete option");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar title="How Did You Hear About Us?" />
        <div className="p-6 flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d4a8f]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="How Did You Hear About Us?" />
      <div className="p-6 max-w-2xl">

        {/* Feature Toggle */}
        <div className="bg-white rounded-xl border shadow-sm p-5 mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Show on Estimator</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              When enabled, clients will see this question on the preview page.
            </p>
          </div>
          <button
            onClick={handleToggleFeature}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isEnabled
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isEnabled ? (
              <><ToggleRight size={18} /> Enabled</>
            ) : (
              <><ToggleLeft size={18} /> Disabled</>
            )}
          </button>
        </div>

        {/* Options List */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Options</h2>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#2d4a8f] hover:bg-[#243a73] text-sm"
              size="sm"
            >
              <Plus size={15} className="mr-1" /> Add Option
            </Button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
                placeholder="Option label (e.g. Google Search)"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f]/30"
                autoFocus
              />
              <Button onClick={handleAddOption} size="sm" className="bg-[#2d4a8f] hover:bg-[#243a73]">Save</Button>
              <Button onClick={() => { setShowAddForm(false); setNewLabel(""); }} size="sm" variant="outline">Cancel</Button>
            </div>
          )}

          {options.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No options yet. Add your first option above.</p>
          ) : (
            <div className="space-y-2">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${
                    opt.isActive ? "bg-white border-gray-200" : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <GripVertical size={16} className="text-gray-300 shrink-0" />

                  {editingId === opt.id ? (
                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdateOption(opt.id)}
                      className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f]/30"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 text-sm text-gray-800">{opt.label}</span>
                  )}

                  <div className="flex items-center gap-1 shrink-0">
                    {editingId === opt.id ? (
                      <>
                        <Button size="sm" onClick={() => handleUpdateOption(opt.id)} className="bg-[#2d4a8f] hover:bg-[#243a73] h-7 text-xs px-2">Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-7 text-xs px-2">Cancel</Button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleToggleOption(opt)}
                          className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                            opt.isActive
                              ? "text-green-600 bg-green-50 hover:bg-green-100"
                              : "text-gray-400 bg-gray-100 hover:bg-gray-200"
                          }`}
                          title={opt.isActive ? "Disable" : "Enable"}
                        >
                          {opt.isActive ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() => { setEditingId(opt.id); setEditLabel(opt.label); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteOption(opt.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
