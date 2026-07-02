/**
 * projects.js
 * -----------
 * All portfolio projects live here as a plain array of objects.
 * To add a new project, just push a new object following the same shape.
 * The Projects component reads this array and renders cards automatically.
 *
 * Fields:
 *   id          – unique string key (used as React key)
 *   title       – project name shown on the card
 *   description – 1-2 sentence summary shown on the card
 *   image       – path to a screenshot/thumbnail (relative to /public or a URL)
 *   tags        – array of technology/category label strings
 *   previewLink – (optional) live URL; button shown only if provided
 *   videoLink   – (optional) YouTube demo URL; button shown only if provided
 *   githubLink  – (optional) GitHub repo URL; button shown only if provided
 */

export const projects = [
  {
    id: "project-1",
    title: "CineFlix ( Movie List App )",
    description:
      "An elegant, premium, MERN stack movie discovery web application designed with a sleek dark-mode user interface reminiscent of premium streaming services. Users can browse popular movies, search for specific titles, view detailed metadata, and curate their personal favorites list which is persisted in a backend database.",
    image: "/images/project-placeholder-1.png",
    tags: ["React", "Node.js","Express.js", "MongoDB","Tailwind CSS", "TMDB API", "Upstash Redis"],
    videoLink: "https://www.youtube.com/watch?v=g7_PTb8kPj8",
    githubLink: "https://github.com/tenenggg/CinexFlix-MERN-stack-movie-app.git",
  },
  {
    id: "project-2",
    title: "eTicketing System ( ongoing )",
    description:
      "eTicketing is an internal real-time support and eTicketing platform with a Node.js + Express + MySQL backend, a vanilla HTML/CSS/JavaScript frontend ( currently migrating to React ).",
    image: "/images/project-placeholder-2.png",
    tags: ["React", "Node.js","Express.js", "MySQL", "JWT Authentication", "Bycrypt","Socket.io"],
    videoLink: "https://youtu.be/vaC4OYSJ43U?si=NjYOsKikOyFzUQ08",
    githubLink: "https://github.com/tenenggg/eTicketing-webbased-system--with-.exe-.git",
  },  
  {
    id: "project-3",
    title: "IoT Enabled Web Based Automated Hydroponics System",
    description:  
      "A full-stack IoT hydroponic solution for real-time monitoring and automated control of pH, EC, and water temperature, built using ESP32, Supabase, ReactJS, and Telegram Bot API. Designed for small to medium-scale hydroponic farms to improve resource efficiency, yield consistency, and ease of management.",
    image: "/images/project-placeholder-3.png",
    tags: ["React", "Node.js","Express.js", "Tailwindcss", "Supabase", "ArduinoIDE", "ESP32", "C++", "Telegram Bot API"],
    videoLink: "https://www.youtube.com/watch?v=VKwoa2XDkek",
    githubLink: "https://github.com/tenenggg/IoT-Enabled-Web-Based-Automated-Hydroponic-System.git",
  },
  {
    id: "project-4",
    title: "File Management System",
    description:
      "FileNest isa full-stack file storage platform with web and Electron desktop interfaces, featuring a RESTful MVC backend with controllers for organizing folders, uploading files, previewing documents, searching content, and managing records.",
    image: "/images/project-placeholder-4.png",
    tags: ["JavaScript", "HTML", "CSS", "Redux", "CSS", "Node.js", "Express.js", "PostgreSQL", "Multer", "Electron"],
    githubLink: "https://github.com/tenenggg/Document-Management-System.git",
    videoLink: null,
  },
  {
    id: "project-5",
    title: "Javascript Mastery (Learning Template/Guides)",
    description:
      "My personal Javascript learning journey based on W3Schools. Code, detailed comments, and syllabus tracking.",
    image: "/images/project-placeholder-5.png",
    tags: ["JavaScript", "HTML", "CSS", "W3Schools", "Learning Template", "Code Comments", "Syllabus Tracking"],
    videoLink: null,
    githubLink: "https://github.com/tenenggg/javascript-mastery-notes.git",
  },
  {
    id: "project-6",
    title: "NodeJS Mastery (Learning Template/Guides)",  
    description:
      " A complete, well-organized template with detailed code comments and structure guides to help you understand how to build a professional Node.js backend featuring MySQL, JWT auth, and Socket.io. Whether you're learning for the first time or building your first real project, this template shows you exactly how everything fits together.",
    image: "/images/project-placeholder-6.png",
    tags: ["Node.js", "Express.js", "JavaScript", "MySQL", "JWT Authentication", "Socket.io"],
    videoLink: null,
    githubLink: "https://github.com/tenenggg/nodejs-expressjs-template.git",
  },
];






