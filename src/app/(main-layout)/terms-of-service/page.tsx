"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, Mail, Phone } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="w-8 h-8 text-[#2d4a8f]" />
            <h1 className="text-3xl font-bold text-gray-900">
              Terms of Service
            </h1>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600">
                By accessing and using BBurn Builders' services, you accept and
                agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Services
              </h2>
              <p className="text-gray-600 mb-4">
                BBurn Builders provides construction and renovation services
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Bathroom renovations and remodeling</li>
                <li>Construction consultations</li>
                <li>Project estimates and quotes</li>
                <li>Custom construction solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Payment Terms
              </h2>
              <p className="text-gray-600 mb-4">
                Payment terms will be specified in individual project contracts.
                Generally:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Deposits may be required before work begins</li>
                <li>Progress payments are due as specified in contracts</li>
                <li>Final payment is due upon project completion</li>
                <li>Late payments may incur additional fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Warranties
              </h2>
              <p className="text-gray-600">
                We provide warranties on our workmanship as specified in
                individual project contracts. Warranty terms vary by project
                type and scope.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                BBurn Builders' liability is limited to the contract value of
                the specific project. We are not liable for indirect,
                incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Changes to Terms
              </h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-[#2d4a8f]" />
                  <span className="text-gray-700">info@bburnbuilders.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-[#2d4a8f]" />
                  <span className="text-gray-700">(773) 555-0100</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
