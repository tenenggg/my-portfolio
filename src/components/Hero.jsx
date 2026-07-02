/**
 * Hero.jsx
 * --------
 * Full-viewport landing section with:
 *  - Staggered Framer Motion entrance animation for name, tagline, and CTA
 *  - A monogram avatar placeholder (replace with <img> if you have a photo)
 *  - Scroll-down indicator at the bottom
 *
 * To add a photo:
 *   1. Drop your image into src/assets/ (e.g. profile.jpg)
 *   2. Import it: import profilePhoto from "../assets/profile.jpg";
 *   3. Replace the <div className="hero__avatar"> block with:
 *      <img src={profilePhoto} alt="Imam Yunos" className="hero__photo" />
 */

import { motion } from "framer-motion";
import profilePhoto from "../assets/hero_photo2.jpg";

// Framer Motion variants — parent staggers children 0.15s apart
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero" aria-label="Hero">
      {/* Subtle background texture grid */}
      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="hero__inner">
        {/* Avatar / monogram placeholder */}
        <motion.img
          className="hero__photo"
          src={profilePhoto}
          alt="Imam Yunos"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-hidden="true"
        />

        {/* Staggered text content */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting label */}
          <motion.p className="hero__greeting" variants={itemVariants}>
            Hello, I&apos;m
          </motion.p>

          {/* Main name */}
          <motion.h1 className="hero__name" variants={itemVariants}>
            Imam Yunos
          </motion.h1>

          {/* Tagline — TODO: replace with your exact wording */}
          <motion.p className="hero__tagline" variants={itemVariants}>
            IT Guy with passion and experience in Web Development and IoT.
            <br />
            I am more keen on Backend Development, but I also enjoy Fullstack Development and IoT.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div className="hero__cta" variants={itemVariants}>
            <button
              className="btn btn--primary"
              onClick={scrollToProjects}
              id="hero-cta-projects"
            >
              View My Work
            </button>
            <button
              className="btn btn--ghost"
              onClick={scrollToAbout}
              id="hero-cta-about"
            >
              About Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.button
        className="hero__scroll-indicator"
        onClick={scrollToAbout}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="scroll-chevron" />
      </motion.button>
    </section>
  );
}
