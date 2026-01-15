"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Link from "next/link";

interface AboutContentProps {
  founderName?: string;
  founderTitle?: string;
  content?: string[];
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

const AboutContent = ({
  founderName = "Tomer Blackburn",
  founderTitle = "BBurn Builders founder & owner",
  content = [
    "I started BBurn Builders to bring the focus of the construction industry back where it belongs: on client communication and satisfaction.",
    "We care about turning your vision into reality and making it a great experience for you.",
    "That's why we are honest and transparent about our schedule, your project's timeline, and how we are going to manage your budget.",
    "We keep our costs down because you shouldn't have to pay for unnecessary overhead expenses.",
    "We discuss all the details upfront and prepare accurate estimates to make the most of your money, so you know what to expect from the start, with no surprises.",
    "As the owner, I personally manage every single project, so you can have a direct line of communication with me and the peace of mind of a project manager who doesn't hide from you.",
    "Most importantly, we never start a new job unless we know it can have our full attention.",
  ],
  ctaText = "get in touch for a free quote",
  ctaLink = "/contact",
  image = "/images/about-founder.jpg",
}: AboutContentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
          {/* Left: Text Content - 2/3 width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ABOUT US
              </h3>
              <p className="text-gray-500 italic">
                From {founderName}, {founderTitle}
              </p>
            </div>

            {content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-gray-700 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-700"
            >
              If the BBurn Builders philosophy resonates with you,{" "}
              <Link
                href={ctaLink}
                className="text-[#283878] underline hover:text-[#1f2d5c] font-medium"
              >
                {ctaText}
              </Link>{" "}
              on your project!
            </motion.p>
          </motion.div>

          {/* Right: Image - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 relative h-[600px] rounded-3xl overflow-hidden shadow-xl"
          >
            <ImageWithFallback
              src={image}
              alt={founderName}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
