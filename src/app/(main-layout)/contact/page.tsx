import React from "react";
import ContactSection from "./_components/ContactSection";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/contact", {
    title: "Contact BBurn Builders — Start Your Renovation Journey Today",
    description:
      "Connect with our team to schedule an on-site consultation, discuss project timelines, or request information regarding your upcoming home remodeling project.",
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
