"use client";

import React from "react";
import { X, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubmission, useRegeneratePdf } from "@/hooks/useSubmissions";

interface SubmissionDetailModalProps {
  submissionId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionDetailModal = ({
  submissionId,
  isOpen,
  onClose,
}: SubmissionDetailModalProps) => {
  const { data: submission, isLoading } = useSubmission(submissionId);
  const regeneratePdfMutation = useRegeneratePdf();

  const handleRegeneratePdf = () => {
    regeneratePdfMutation.mutate(submissionId);
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!submission) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Submission Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Submission Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Submission #:</span>
                <span className="ml-2 font-medium">
                  {submission.submissionNumber}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Service:</span>
                <span className="ml-2 font-medium">
                  {submission.service?.name}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium">{submission.status}</span>
              </div>
              <div>
                <span className="text-gray-600">Date:</span>
                <span className="ml-2 font-medium">
                  {submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Client Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">
                  {submission.clientName}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">
                  {submission.clientEmail}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium">
                  {submission.clientPhone}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Address:</span>
                <span className="ml-2 font-medium">
                  {submission.projectAddress}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Pricing Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">
                ${submission.basePrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Items:</span>
              <span className="font-medium">
                ${submission.additionalItemsTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-200">
              <span className="font-semibold text-gray-900">Total Amount:</span>
              <span className="font-bold text-lg text-blue-600">
                ${submission.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {submission.submissionItems &&
          submission.submissionItems.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Selected Items
              </h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Cost Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Option
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submission.submissionItems
                      .filter((item) => item.isEnabled)
                      .map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.itemName || item.costCode?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.selectedOptionName ||
                              item.selectedOption?.optionName ||
                              item.userInputValue ||
                              "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">
                            ${Number(item.unitPrice).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            ${Number(item.totalPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {(submission.projectNotes || submission.additionalDetails) && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
            {submission.projectNotes && (
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <p className="text-sm text-gray-700">
                  {submission.projectNotes}
                </p>
              </div>
            )}
            {submission.additionalDetails && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {submission.additionalDetails}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3">
          {submission.pdfUrl && (
            <a
              href={submission.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </a>
          )}
          <Button
            onClick={handleRegeneratePdf}
            variant="outline"
            disabled={regeneratePdfMutation.isPending}
          >
            <RefreshCw size={16} className="mr-2" />
            Regenerate PDF
          </Button>
          <Button onClick={onClose} className="bg-[#2d4a8f] hover:bg-[#243a73]">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
