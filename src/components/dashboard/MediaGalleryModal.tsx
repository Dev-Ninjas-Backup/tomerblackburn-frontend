"use client";

import { useState } from "react";
import {
  X,
  Image as ImageIcon,
  Video as VideoIcon,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MediaFile {
  id: string;
  mediaType: "PHOTO" | "VIDEO";
  fileInstance: {
    id: string;
    url: string;
    filename: string;
    originalFilename: string;
    mimeType: string;
  };
}

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaFile[];
  submissionNumber: string;
}

export function MediaGalleryModal({
  isOpen,
  onClose,
  media,
  submissionNumber,
}: MediaGalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const photos = media.filter((m) => m.mediaType === "PHOTO");
  const videos = media.filter((m) => m.mediaType === "VIDEO");

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < media.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedMedia = selectedIndex !== null ? media[selectedIndex] : null;

  return (
    <>
      {/* Gallery Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Media Files</h2>
              <p className="text-sm text-gray-600">
                Submission #{submissionNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {media.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No media files attached</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Photos Section */}
                {photos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Photos ({photos.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((photo, idx) => {
                        const globalIndex = media.findIndex(
                          (m) => m.id === photo.id,
                        );
                        return (
                          <div
                            key={photo.id}
                            onClick={() => handleThumbnailClick(globalIndex)}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                          >
                            <img
                              src={photo.fileInstance.url}
                              alt={photo.fileInstance.originalFilename}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Videos Section */}
                {videos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <VideoIcon className="w-5 h-5" />
                      Videos ({videos.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {videos.map((video, idx) => {
                        const globalIndex = media.findIndex(
                          (m) => m.id === video.id,
                        );
                        return (
                          <div
                            key={video.id}
                            onClick={() => handleThumbnailClick(globalIndex)}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group bg-gray-900"
                          >
                            <video
                              src={video.fileInstance.url}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                <div className="w-0 h-0 border-l-20 border-l-gray-900 border-y-12 border-y-transparent ml-1" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-60 bg-black flex items-center justify-center"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
            aria-label="Close lightbox"
            title="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
              aria-label="Previous image"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {selectedIndex !== null && selectedIndex < media.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
              aria-label="Next image"
              title="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Media Content */}
          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.mediaType === "PHOTO" ? (
              <img
                src={selectedMedia.fileInstance.url}
                alt={selectedMedia.fileInstance.originalFilename}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={selectedMedia.fileInstance.url}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            )}
          </div>

          {/* Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {selectedMedia.fileInstance.originalFilename}
              </p>
              <p className="text-sm text-gray-300">
                {selectedIndex !== null ? selectedIndex + 1 : 0} of{" "}
                {media.length}
              </p>
            </div>
            <a
              href={selectedMedia.fileInstance.url}
              download={selectedMedia.fileInstance.originalFilename}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
      )}
    </>
  );
}
