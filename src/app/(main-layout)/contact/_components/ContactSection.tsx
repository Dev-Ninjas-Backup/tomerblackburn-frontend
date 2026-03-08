"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import ContactForm from "./ContactForm";
import { BuilderTrendEmbed } from "./BuilderTrendEmbed";
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface ContactSectionProps {
  title?: string;
  mapEmbedUrl?: string;
}

const ContactSection = ({
  title = "Get in Touch",
}: ContactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { data: settings } = useSiteSettings();

  const getMapEmbedUrl = () => {
    // Chicago-centered map showing service area
    // Coordinates: 41.8781° N, 87.6298° W (Chicago downtown)
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.5385582!2d-87.8!3d41.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";
  };

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const handleFormSubmit = () => {
    if (formData) {
      // Create a hidden iframe for BuilderTrend submission
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "buildertrend-submit-frame";
      document.body.appendChild(iframe);

      // Create a hidden form that submits to BuilderTrend
      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        "https://buildertrend.net/leads/contactforms/ContactFormFrame.aspx?builderID=61725";
      form.target = "buildertrend-submit-frame"; // Submit to hidden iframe
      form.style.display = "none";

      // Add all form fields
      const fields = {
        builderID: "61725",
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Phone: formData.phone,
        Address: formData.address,
        City: formData.city,
        State: formData.state,
        Zip: formData.zipCode,
        ScopeOfWork: formData.message,
        ProjectStartDate: formData.projectStartDate,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value || "";
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Cleanup after 3 seconds
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 3000);
    }
  };

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-12">
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#283878] text-center px-8"
          >
            {title}
          </motion.h2>
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left: Contact Form */}
          <div>
            <ContactForm
              onFormDataChange={handleFormDataChange}
              onFormSubmit={handleFormSubmit}
            />
          </div>

          {/* Right: Map and Service Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={getMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area"
                className="w-full h-full"
              />
            </div>
            <div className="bg-[#283878] text-white p-6 rounded-2xl shadow-lg text-center">
              <p className="text-lg font-semibold">
                Serving Chicago and surrounding suburbs
              </p>
            </div>
          </motion.div>
        </div>

        {/* BuilderTrend Embedded Form - Hidden for reference only */}
        {/* <div className="mt-16 max-w-7xl mx-auto">
          <BuilderTrendEmbed iframeRef={iframeRef} />
        </div> */}
      </div>
    </section>
  );
};

export default ContactSection;
