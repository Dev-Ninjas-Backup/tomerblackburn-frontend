"use client";

import React from "react";
import { X, User, Calendar } from "lucide-react";
import Image from "next/image";

interface Portfolio {
  id: number;
  name: string;
  date: string;
  images: string[];
}

interface PortfolioDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio | null;
}

export const PortfolioDetailsModal = ({ isOpen, onClose, portfolio }: PortfolioDetailsModalProps) => {
  if (!isOpen || !portfolio) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <User className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{portfolio.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{portfolio.date}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Photos</h3>
              <span className="text-sm text-gray-500">{portfolio.images.length}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {portfolio.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${portfolio.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};