/**
 * About.jsx
 * ---------
 * "About Me" section broken into three clearly-labelled cards:
 *   1. Education        — your academic background
 *   2. Work Experience  — your professional background
 *   3. Current Role     — what you're doing right now / current job
 *
 * Each list item is now { text, date } instead of one raw string.
 * The date renders in its own column (see .about__card-list li in
 * index.css) so it lines up in the same place on every row, in every
 * card — no more dates trailing off wherever the sentence happens to end.
 *
 * Edit the TODO content arrays below — no JSX knowledge required.
 * Cards animate in from below as they enter the viewport (useInView).
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Shared animation variants for the card container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Content ──────────────────────────────────────────────────────────────
// TODO: Replace the placeholder strings below with your real information.
// Each line item is { text, date }. Leave `date` as null for lines that
// shouldn't show one (e.g. a paragraph of responsibilities) — it'll just
// take the full width instead of leaving an empty gap.

const aboutCards = [
  {
    id: "education",
    icon: "🎓",
    title: "Education",
    items: [
      {
        text: "Bachelor of Computer Science (Hons.) Netcentric Computing — UiTM Jasin",
        date: "2022–2026",
      },
      {
        text: "Awarded High Impact Project for my Bachelor's Final Year Project (FYP)",
        date: "2025",
      },
      {
        text: "Foundation in Engineering — UiTM Dengkil",
        date: "2021–2022",
      },
      {
        text: "MRSM Baling — SPM",
        date: "2016–2021",
      },
    ],
  },
  {
    id: "work-experience",
    icon: "🏆",
    title: "Work Experience",
    items: [
      {
        text: "Internship at Qaizer Consultancy — Administrative Support",
        date: "Sept–Dec 2025",
      },
      {
        text: "Assisted in preparing project proposals, reports, and client presentations; managed office inventory; coordinated team meetings and appointments.",
        date: null,
      },
    ],
  },
  {
    id: "current-role",
    icon: "💼",
    title: "Current Role",
    items: [
      {
        text: "Protege IT Executive — Rangkaian Bekalan Sdn Bhd",
        date: "Apr 2026–Present",
      },
      {
        text: "Maintain, troubleshoot, and repair 100+ PCs, laptops, servers, UPS units, printers, monitors, and TVs across biweekly site visits — component-level repairs, CLI network diagnostics, Kaspersky-based security monitoring, and OS deployment via Ghost imaging.",
        date: null,
      },
      {
        text: "Side project: building a Ticketing System proposal with React and Node.js.",
        date: null,
      },
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

function AboutCard({ card }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="about__card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-labelledby={`about-${card.id}-heading`}
    >
      <div className="about__card-icon" aria-hidden="true">
        {card.icon}
      </div>

      <h3 id={`about-${card.id}-heading`} className="about__card-title">
        {card.title}
      </h3>

      <ul className="about__card-list" role="list">
        {card.items.map((item, i) => (
          <li key={i}>
            <span className="about__card-text">{item.text}</span>
            {item.date && (
              <span className="about__card-date">{item.date}</span>
            )}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section about" aria-label="About Me">
      <div className="section__inner">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          className="section__heading"
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="section__label">Get to know me</p>
          <h2 className="section__title">About Me</h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          {aboutCards.map((card) => (
            <AboutCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}