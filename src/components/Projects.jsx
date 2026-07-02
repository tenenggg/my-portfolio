/**
 * Projects.jsx
 * ------------
 * Renders a horizontally-scrolling slider of project cards from
 * src/data/projects.js.
 *
 * To add a new project: just add one object to the projects array in
 * src/data/projects.js — this component needs NO changes, and the
 * slider will happily scroll through however many you add.
 *
 * Each card shows:
 *   - A thumbnail image (falls back to a gradient placeholder if image errors)
 *   - Title + description
 *   - Tag pills
 *   - Conditional buttons: Live Preview, YouTube Demo, GitHub
 *     (a button only renders if the corresponding link field is non-null)
 *
 * Every card is locked to the same width/height "skeleton" via CSS
 * (see .project__tags / .project__title / .project__description /
 * .project__links in index.css) so tag count, title length, and
 * description length never throw the row out of alignment.
 */

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiYoutube,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { projects } from "../data/projects";

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const handleImgError = (e) => {
    e.currentTarget.style.display = "none";
    e.currentTarget.nextSibling.style.display = "flex";
  };

  return (
    <motion.article
      className="project__card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label={project.title}
    >
      <div className="project__thumbnail">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="project__img"
          onError={handleImgError}
          loading="lazy"
        />
        <div className="project__img-fallback" style={{ display: "none" }}>
          <span>{project.title[0]}</span>
        </div>
      </div>

      <div className="project__body">
        <div className="project__tags" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="project__tag" role="listitem">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>

        <div className="project__links">
          {project.previewLink ? (
            <a
              href={project.previewLink}
              className="project__link-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live preview of ${project.title}`}
            >
              <FiExternalLink aria-hidden="true" />
              Live Preview
            </a>
          ) : null}

          {project.videoLink ? (
            <a
              href={project.videoLink}
              className="project__link-btn project__link-btn--video"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`YouTube demo of ${project.title}`}
            >
              <FiYoutube aria-hidden="true" />
              Demo
            </a>
          ) : null}

          {project.githubLink ? (
            <a
              href={project.githubLink}
              className="project__link-btn project__link-btn--github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository of ${project.title}`}
            >
              <FiGithub aria-hidden="true" />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".project__card");
    const cardWidth = card ? card.getBoundingClientRect().width : 340;
    const gap = 28;
    el.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section id="projects" className="section projects" aria-label="Projects">
      <div className="section__inner">
        <div className="section__heading">
          <p className="section__label">What I&apos;ve built</p>
          <h2 className="section__title">Projects</h2>
        </div>

        <div className="projects__slider">
          <button
            type="button"
            className="projects__nav projects__nav--prev"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll to previous project"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <div className="projects__track" ref={trackRef}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <button
            type="button"
            className="projects__nav projects__nav--next"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Scroll to next project"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
