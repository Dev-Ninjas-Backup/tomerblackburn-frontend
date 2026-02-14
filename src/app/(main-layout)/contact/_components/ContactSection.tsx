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
    if (settings?.location) {
      const encodedLocation = encodeURIComponent(settings.location);
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedLocation}`;
    }
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1234567890!2d-87.6431!3d41.9308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3b1234567890%3A0x1234567890abcdef!2s330%20W%20Diversey%20Pkwy%20%232604%2C%20Chicago%2C%20IL%2060657%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";
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

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src={getMapEmbedUrl()}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="w-full h-full"
            />
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
