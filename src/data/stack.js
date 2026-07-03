/**
 * stack.js
 * --------
 * Your tech stack displayed in the Stack section.
 * Edit the categories / items here — no component changes needed.
 *
 * Each item has:
 *   label  – display name shown under the icon
 *   icon   – a React component from react-icons (imported below)
 *
 * react-icons docs: https://react-icons.github.io/react-icons/
 * To find an icon: search the site above, then import the matching package.
 */

import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVite,
  SiCplusplus,
  SiExpress,
  SiSupabase,
  SiTinkercad,
  SiPostman,
  SiArduino,
} from "react-icons/si";

/**
 * Stack categories.
 * Each category renders as a labelled group of icon cards.
 * Add / remove items freely — the UI maps over this automatically.
 */
export const stack = [
  {
    category: "Languages",
    items: [
      { label: "JavaScript", icon: SiJavascript },
      { label: "HTML5", icon: SiHtml5 },
      { label: "CSS3", icon: SiCss },
      { label: "C++", icon: SiCplusplus },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { label: "React", icon: SiReact },
      { label: "Node.js", icon: SiNodedotjs },
      { label: "Tailwind", icon: SiTailwindcss },
      { label: "Vite", icon: SiVite },
      { label: "Express", icon: SiExpress },
    ],
  },
  {
    category: "Databases",
    items: [
      { label: "MySQL", icon: SiMysql },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "MongoDB", icon: SiMongodb },
      { label: "Supabase", icon: SiSupabase },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { label: "Git", icon: SiGit },
      { label: "GitHub", icon: SiGithub },
      { label: "Tinkercad", icon: SiTinkercad },
      { label: "Postman", icon: SiPostman },
      { label: "Arduino", icon: SiArduino }
    ],
  },
];
