/**
 * Stack.jsx
 * ---------
 * Displays your tech stack in grouped icon-card grids.
 * Data lives in src/data/stack.js — edit categories/items there.
 *
 * Each category renders a heading + a responsive grid of icon cards.
 * Cards animate in on scroll with a stagger effect.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stack } from "../data/stack";

// Stagger the cards within each category
const categoryVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Single icon card ─────────────────────────────────────────────────────────

function StackCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div className="stack__card" variants={cardVariants} role="listitem">
      <div className="stack__card-icon" aria-hidden="true">
        <Icon />
      </div>
      <span className="stack__card-label">{item.label}</span>
    </motion.div>
  );
}

// ─── One category block ───────────────────────────────────────────────────────

function StackCategory({ group }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="stack__category" ref={ref}>
      <h3 className="stack__category-title">{group.category}</h3>
      <motion.div
        className="stack__grid"
        role="list"
        aria-label={group.category}
        variants={categoryVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {group.items.map((item) => (
          <StackCard key={item.label} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Stack() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="section stack" aria-label="Tech Stack">
      <div className="section__inner">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          className="section__heading"
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="section__label">What I work with</p>
          <h2 className="section__title">Tech Stack</h2>
        </motion.div>

        {/* Category groups */}
        <div className="stack__categories">
          {stack.map((group) => (
            <StackCategory key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
