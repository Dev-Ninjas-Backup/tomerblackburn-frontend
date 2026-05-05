"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useProjectTypes } from "@/hooks/useProjectManagement";

const BathroomTypesSection = () => {
  const router = useRouter();
  const { setProjectTypeId } = useEstimatorStore();
  const { data: projectTypes, isLoading } = useProjectTypes(true);

  const handleSelect = (typeId: string) => {
    setProjectTypeId(typeId);
    router.push("/estimator/choose-service-category");
  };

  const activeProjectTypes =
    projectTypes?.filter((type) => type.isActive) || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            Choose Your Project Type
          </h2>
          <p className="text-gray-600 text-lg">
            Select the type of project you're planning to get started
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project types...</p>
          </div>
        ) : activeProjectTypes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No project types available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjectTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onClick={() => !type.isComingSoon && handleSelect(type.id)}
                  whileHover={
                    type.isComingSoon
                      ? {}
                      : { y: -10, transition: { duration: 0.3 } }
                  }
                  className={`w-full bg-white rounded-2xl overflow-hidden relative transition-all ${
                    type.isComingSoon
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:shadow-lg"
                  }`}
                >
                  {/* Coming Soon Overlay */}
                  {type.isComingSoon && (
                    <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                      <span className="bg-white text-[#283878] text-sm font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <div className="relative h-72 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                    {type.image?.url ? (
                      <img
                        src={type.image.url}
                        alt={type.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-6xl font-bold opacity-20">
                          {type.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {type.description ||
                        `Complete ${type.name.toLowerCase()} services`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BathroomTypesSection;
