"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactService } from "@/services/contact.service";
import { toast } from "sonner";

interface ContactFormProps {
  onSubmit?: (data: any) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    message: "",
    projectStartDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await contactService.submitContactForm(formData);
        toast.success("Message sent successfully!");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          message: "",
          projectStartDate: "",
        });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <Input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <Input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <Input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-6"
        />
      </div>

      {/* City, State, Zip Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <Input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zip Code
          </label>
          <Input
            type="text"
            name="zipCode"
            placeholder="Enter Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full p-6"
          />
        </div>
      </div>

      {/* Project Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Start Date
        </label>
        <Input
          type="date"
          name="projectStartDate"
          value={formData.projectStartDate}
          onChange={handleChange}
          required
          className="w-full p-6"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <Textarea
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={10}
          className="w-full p-6"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-16 py-6 text-lg rounded-full disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
