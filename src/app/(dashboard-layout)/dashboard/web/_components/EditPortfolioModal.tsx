"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Portfolio {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface EditPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: { name: string; slug: string; description?: string }) => void;
  portfolio: Portfolio | null;
}

export const EditPortfolioModal = ({ isOpen, onClose, onSave, portfolio }: EditPortfolioModalProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (portfolio) {
      setName(portfolio.name);
      setSlug(portfolio.slug);
      setDescription(portfolio.description || "");
    }
  }, [portfolio]);

  if (!portfolio) return null;

  const handleSave = () => {
    if (name.trim() && slug.trim()) {
      onSave(portfolio.id, { 
        name: name.trim(), 
        slug: slug.trim(),
        description: description.trim() || undefined,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lake View"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="lake-view"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Project description"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};