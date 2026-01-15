import React from "react";
import ProjectSection from "./_components/ProjectSection";

export const metadata = {
  title: "Portfolio - BBurn Builders",
  description: "View our completed projects and see the quality of our work.",
};

const PortfolioPage = () => {
  // TODO: Replace with API data
  const projects = [
    {
      id: "lakeview-1",
      title: "Lakeview",
      images: [
        "/images/portfolio/lakeview-1.jpg",
        "/images/portfolio/lakeview-2.jpg",
        "/images/portfolio/lakeview-3.jpg",
        "/images/portfolio/lakeview-4.jpg",
        "/images/portfolio/lakeview-5.jpg",
        "/images/portfolio/lakeview-6.jpg",
        "/images/portfolio/lakeview-7.jpg",
        "/images/portfolio/lakeview-8.jpg",
        "/images/portfolio/lakeview-9.jpg",
        "/images/portfolio/lakeview-10.jpg",
        "/images/portfolio/lakeview-11.jpg",
        "/images/portfolio/lakeview-12.jpg",
      ],
    },
    {
      id: "lakeview-2",
      title: "Lakeview",
      images: [
        "/images/portfolio/lakeview2-1.jpg",
        "/images/portfolio/lakeview2-2.jpg",
        "/images/portfolio/lakeview2-3.jpg",
        "/images/portfolio/lakeview2-4.jpg",
        "/images/portfolio/lakeview2-5.jpg",
        "/images/portfolio/lakeview2-6.jpg",
        "/images/portfolio/lakeview2-7.jpg",
        "/images/portfolio/lakeview2-8.jpg",
      ],
    },
  ];

  return (
    <div>
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </div>
  );
};

export default PortfolioPage;
