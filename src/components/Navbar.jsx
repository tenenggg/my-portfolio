/**
 * Navbar.jsx
 * ----------
 * Fixed navigation bar that:
 *  - Smooth-scrolls to each section when a link is clicked
 *  - Highlights the link of the currently-visible section (via activeSection prop)
 *  - Collapses into an animated hamburger menu on small screens
 *  - Gains a backdrop-blur background once the user scrolls past the Hero
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The nav links map a display label to a section ID (must match the id
// attribute on each <section> element in the page).
const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Track whether user has scrolled past the hero so we can show the bg
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll helper — uses the native scrollIntoView API
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close mobile menu after click
  };

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="banner"
    >
      <nav className="navbar__inner" aria-label="Main navigation">
        {/* Logo / brand name */}
        <button
          className="navbar__logo"
          onClick={() => scrollTo("hero")}
          aria-label="Back to top"
        >
          IY<span className="navbar__logo-dot">.</span>
        </button>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`navbar__link ${activeSection === link.id ? "navbar__link--active" : ""}`}
                onClick={() => scrollTo(link.id)}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button (visible only on mobile) */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {/* Three bars that animate into an X */}
          <span className={`bar ${menuOpen ? "bar--top-open" : ""}`} />
          <span className={`bar ${menuOpen ? "bar--mid-open" : ""}`} />
          <span className={`bar ${menuOpen ? "bar--bot-open" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
          >
            <ul role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    className={`mobile-link ${activeSection === link.id ? "mobile-link--active" : ""}`}
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
