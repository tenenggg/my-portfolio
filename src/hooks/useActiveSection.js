/**
 * useActiveSection.js
 * -------------------
 * Custom hook that observes all section elements on the page and returns
 * the ID of the section currently most visible in the viewport.
 *
 * How it works:
 *   1. We select all elements that have a data-section attribute.
 *   2. IntersectionObserver fires whenever a section enters or leaves the
 *      viewport with at least 30% visibility.
 *   3. We track which sections are currently visible and pick the first
 *      one in DOM order (i.e. topmost visible).
 *
 * Usage:
 *   const activeSection = useActiveSection();
 *   // activeSection === "hero" | "about" | "stack" | "projects" | "contact"
 */

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;
      let currentSection = sectionIds[0];

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= activationLine) {
          currentSection = id;
        }
      });

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
