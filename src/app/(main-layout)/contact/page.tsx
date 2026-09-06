import React from "react";
import ContactSection from "./_components/ContactSection";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/contact", {
    title: "Contact Us — Schedule Consultation | BBurn Builders",
    description:
      "Connect with BBurn Builders to schedule an on-site consultation, discuss timelines, or get answers for your upcoming Chicago home remodeling project.",
    keywords:
      "contact bburn builders, hire general contractor chicago, remodel consultation phone 773-403-9950",
  });
}

const ContactPage = () => {
  return (
    <div>
      <ContactSection />
    </div>
  );
};

export default ContactPage;
