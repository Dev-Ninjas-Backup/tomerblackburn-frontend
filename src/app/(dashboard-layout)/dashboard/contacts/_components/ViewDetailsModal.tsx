"use client";

import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Home,
  Image,
  Video,
} from "lucide-react";
import { ContactSubmission } from "@/types/contact.types";
import { format } from "date-fns";

interface ViewDetailsModalProps {
  contact: ContactSubmission | null;
  onClose: () => void;
}

export const ViewDetailsModal = ({
  contact,
  onClose,
}: ViewDetailsModalProps) => {
  if (!contact) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Details
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Submitted on{" "}
              {format(
                new Date(contact.createdAt),
                "MMMM dd, yyyy 'at' hh:mm a",
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-900">{contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar size={18} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Project Start Date
                  </p>
                  <p className="font-semibold text-gray-900">
                    {format(
                      new Date(contact.projectStartDate),
                      "MMMM dd, yyyy",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
              Address Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Home size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Street Address</p>
                  <p className="font-semibold text-gray-900">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <MapPin size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">City</p>
                  <p className="font-semibold text-gray-900">{contact.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <MapPin size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">State</p>
                  <p className="font-semibold text-gray-900">{contact.state}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <MapPin size={18} className="text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Zip Code</p>
                  <p className="font-semibold text-gray-900">
                    {contact.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare size={18} className="text-yellow-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase">
                Message
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>

          {/* Media */}
          {contact.contactMedia && contact.contactMedia.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
                Photos & Videos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contact.contactMedia.map((media) => (
                  <a
                    key={media.id}
                    href={media.fileInstance.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-200 hover:opacity-90 transition-opacity"
                  >
                    {media.mediaType === "PHOTO" ? (
                      <img
                        src={media.fileInstance.url}
                        alt={media.fileInstance.originalFilename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <Video size={32} className="text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
