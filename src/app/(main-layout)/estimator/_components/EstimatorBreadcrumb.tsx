"use client";

import { useEstimatorStore } from "@/store/estimatorStore";
import {
  useProjectTypes,
  useServiceCategoriesByProjectType,
  useServicesByCategory,
} from "@/hooks/useProjectManagement";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface EstimatorBreadcrumbProps {
  currentStep: "step-1" | "step-2" | "preview";
}

export const EstimatorBreadcrumb = ({ currentStep }: EstimatorBreadcrumbProps) => {
  const router = useRouter();
  const { projectTypeId, serviceCategoryId, serviceId } = useEstimatorStore();

  const { data: projectTypes } = useProjectTypes(true);
  const { data: serviceCategories } = useServiceCategoriesByProjectType(
    projectTypeId || undefined,
  );
  const { data: services } = useServicesByCategory(serviceCategoryId || undefined);

  const projectTypeName = projectTypes?.find((p) => p.id === projectTypeId)?.name;
  const serviceCategoryName = serviceCategories?.find((c) => c.id === serviceCategoryId)?.name;
  const serviceName = services?.find((s) => s.id === serviceId)?.name;

  const crumbs: BreadcrumbItem[] = [
    {
      label: projectTypeName || "Project Type",
      href: "/estimator/choose-project-type",
    },
    {
      label: serviceCategoryName || "Category",
      href: "/estimator/choose-service-category",
    },
    {
      label: serviceName || "Service",
      href: "/estimator/choose-service",
    },
    {
      label: "Step 1: Rough",
      href: currentStep !== "step-1" ? "/estimator/step-1" : undefined,
      active: currentStep === "step-1",
    },
    ...(currentStep === "step-2" || currentStep === "preview"
      ? [
          {
            label: "Step 2: Finishes",
            href: currentStep !== "step-2" ? "/estimator/step-2" : undefined,
            active: currentStep === "step-2",
          },
        ]
      : []),
    ...(currentStep === "preview"
      ? [{ label: "Preview", active: true }]
      : []),
  ];

  return (
    <nav
      aria-label="Estimator progress"
      className="flex items-center flex-wrap gap-1 text-xs mb-6"
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          )}
          {crumb.href && !crumb.active ? (
            <button
              type="button"
              onClick={() => router.push(crumb.href!)}
              className="text-gray-400 hover:text-[#283878] transition-colors truncate max-w-[120px]"
              title={crumb.label}
            >
              {crumb.label}
            </button>
          ) : (
            <span
              className={`truncate max-w-[140px] font-semibold ${
                crumb.active ? "text-[#283878]" : "text-gray-400"
              }`}
              title={crumb.label}
            >
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};
