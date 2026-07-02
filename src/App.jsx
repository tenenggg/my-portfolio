/**
 * App.jsx
 * -------
 * Root component. Composes the full one-page layout in order:
 *   Navbar → Hero → About → Stack → Projects → Contact
 *
 * activeSection is tracked by the useActiveSection hook and passed to
 * Navbar so the correct nav link is highlighted as the user scrolls.
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useActiveSection } from "./hooks/useActiveSection";

// Must match the id attributes on each <section> element, in DOM order
const SECTION_IDS = ["hero", "about", "stack", "projects", "contact"];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
