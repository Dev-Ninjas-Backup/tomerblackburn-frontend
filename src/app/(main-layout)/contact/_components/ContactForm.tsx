"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    scopeOfWork: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (onSubmit) {
      await onSubmit(formData);
    } else {
      // TODO: Integrate with API
      console.log("Form submitted:", formData);
    }

    setIsSubmitting(false);
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
          <Select
            value={formData.city}
            onValueChange={(value) => setFormData({ ...formData, city: value })}
          >
            <SelectTrigger className="w-full p-6">
              <SelectValue placeholder="Choose City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="lakeview">Lakeview</SelectItem>
              <SelectItem value="lincoln-park">Lincoln Park</SelectItem>
              <SelectItem value="wicker-park">Wicker Park</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <Input
            type="text"
            name="state"
            placeholder="Auto-filled"
            value="Illinois"
            disabled
            className="w-full p-6 bg-gray-50"
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

      {/* Scope of Work */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scope of Work
        </label>
        <Textarea
          name="scopeOfWork"
          placeholder="Write the purpose of your work..."
          value={formData.scopeOfWork}
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
