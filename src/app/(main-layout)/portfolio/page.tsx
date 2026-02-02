import React from "react";
import ProjectSection from "./_components/ProjectSection";
import { portfolioService } from "@/services/portfolio.service";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Portfolio - BBurn Builders",
  description: "View our completed projects and see the quality of our work.",
};

const PortfolioPage = async () => {
  let projects: any[] = [];

  try {
    const response = await portfolioService.getAllCategories(false);
    projects = response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch portfolio categories:", error);
    // Return empty array on error to prevent page crash
  }

  if (projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No portfolio projects available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </div>
  );
};

export default PortfolioPage;
