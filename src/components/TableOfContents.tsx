"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector: string;
}

export function TableOfContents({ contentSelector }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Adding slight delay to ensure DOM is fully parsed inside deeply nested innerHTML
    const initTOC = () => {
      const contentElement = document.querySelector(contentSelector);
      if (!contentElement) return;

      const elements = Array.from(
        contentElement.querySelectorAll("h1, h2, h3")
      ) as HTMLElement[];

      if (elements.length === 0) return;

      const newHeadings: TOCItem[] = elements.map((elem, index) => {
        let id = elem.id;
        if (!id) {
          // Generate an ID based on text, replacing special chars with hyphens
          id = (elem.textContent || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          if (!id) id = `heading-${index}`;

          // Ensure uniqueness
          if (document.getElementById(id)) {
            id = `${id}-${index}`;
          }
          elem.id = id;
        }

        // Apply some generic styling logic to headings if they look unstyled
        elem.classList.add("scroll-mt-28"); // Offset for scrolling

        return {
          id,
          text: elem.textContent || "",
          level: Number(elem.tagName.replace("H", "")),
        };
      });

      setHeadings(newHeadings);

      const headingElements = newHeadings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const handleScroll = () => {
        const scrollPosition = window.scrollY + 120; // Active threshold

        let currentActiveId = "";
        for (let i = 0; i < headingElements.length; i++) {
          const heading = headingElements[i];
          if (heading.offsetTop <= scrollPosition) {
            currentActiveId = heading.id;
          } else {
            break;
          }
        }

        // If not scrolled enough for first heading, set active to empty or first one
        if (currentActiveId !== activeId) {
            setActiveId(currentActiveId || (headingElements[0]?.id ?? ""));
        }
      };

      window.addEventListener("scroll", handleScroll);
      // Run once
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    const timer = setTimeout(initTOC, 100);

    return () => clearTimeout(timer);
  }, [contentSelector]);

  if (headings.length === 0) return null;

  return (
    <div className="pt-2 pb-8 max-h-[calc(100vh-7rem)] overflow-y-auto w-full">
      <h3 className="text-lg font-bold mb-5 text-gray-900 border-b pb-3 tracking-tight">
        Table of Contents
      </h3>
      <nav className="flex flex-col relative border-l-2 border-gray-100">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const y = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  history.pushState(null, "", `#${heading.id}`);
                  setActiveId(heading.id);
                }
              }}
              className={cn(
                "text-sm transition-all duration-200 py-2 pr-3 block truncate leading-tight group",
                isActive
                  ? "text-blue-600 font-medium border-l border-blue-600 -ml-[2px] bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-900 border-l border-transparent hover:border-gray-300 -ml-[2px]"
              )}
              style={{
                marginLeft: heading.level > 1 ? `${(heading.level - 1) * 0.75}rem` : "-2px",
                paddingLeft: heading.level > 1 ? "1rem" : "1.25rem",
              }}
              title={heading.text}
            >
              <span className={cn(
                "transition-transform inline-block",
                isActive ? "translate-x-1" : "group-hover:translate-x-1"
              )}>
                {heading.text}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
