/**
 * Contact.jsx
 * -----------
 * Contact section with two parts:
 *   1. Social links — icon + label for Email, Phone, LinkedIn, GitHub
 *   2. EmailJS contact form — Name, Email, Message fields with validation
 *
 * ─── HOW TO SET UP EMAILJS ─────────────────────────────────────────────────
 *  1. Sign up free at https://www.emailjs.com
 *  2. Create a Service (e.g. Gmail) → copy the Service ID
 *  3. Create an Email Template → copy the Template ID
 *     Template variables to use: {{from_name}}, {{from_email}}, {{message}}
 *  4. Go to Account → copy your Public Key
 *  5. Paste those three values into the EMAILJS_* constants below.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * TODO: Replace the placeholder social link values with your real details.
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

// ─── EmailJS credentials — set these in your .env file ───────────────────────
// Vite exposes VITE_-prefixed variables to the browser via import.meta.env
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── TODO: Replace with your real contact details ─────────────────────────────
const SOCIAL_LINKS = [
  {
    id: "email",
    label: "imamyunos7@email.com",
    href: "mailto:imamyunos7@email.com",
    icon: FiMail,
    ariaLabel: "Send an email",
  },
  {
    id: "phone",
    label: "+60 13-303 1378",
    href: "tel:+60133031378",
    icon: FiPhone,
    ariaLabel: "Call via phone",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imamyunos",
    icon: FiLinkedin,
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/tenenggg",
    icon: FiGithub,
    ariaLabel: "Visit GitHub profile",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const formRef = useRef(null);

  // Form field state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // UI state: idle | sending | success | error
  const [status, setStatus] = useState("idle");
  // Field-level validation errors
  const [errors, setErrors] = useState({});

  // Update a single field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Basic client-side validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="section__inner">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          className="section__heading"
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="section__label">Let&apos;s connect</p>
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            Have a project in mind, a question, or an offer ?
            <br />
            My inbox is always open.
          </p>
        </motion.div>

        <div className="contact__layout">
          {/* ── Social links ── */}
          <motion.div
            className="contact__social"
            initial={{ opacity: 0, x: -24 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="contact__social-title">Find me on</h3>
            <ul className="contact__social-list" role="list">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="contact__social-link"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={link.ariaLabel}
                    >
                      <Icon className="contact__social-icon" aria-hidden="true" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 24 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          >
            {status === "success" ? (
              /* Success message */
              <div className="contact__feedback contact__feedback--success" role="alert">
                <FiCheckCircle className="contact__feedback-icon" aria-hidden="true" />
                <div>
                  <p className="contact__feedback-title">Message sent!</p>
                  <p className="contact__feedback-body">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
                <button
                  className="btn btn--ghost"
                  onClick={() => setStatus("idle")}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {/* Error state banner */}
                {status === "error" && (
                  <div className="contact__feedback contact__feedback--error" role="alert">
                    <FiAlertCircle aria-hidden="true" />
                    <p>
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}

                {/* Name */}
                <div className="form__group">
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form__input ${errors.name ? "form__input--error" : ""}`}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="form__error" role="alert">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form__input ${errors.email ? "form__input--error" : ""}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="form__error" role="alert">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div className="form__group">
                  <label htmlFor="message" className="form__label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form__textarea ${errors.message ? "form__input--error" : ""}`}
                    placeholder="Your message…"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="form__error" role="alert">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === "sending"}
                  id="contact-submit-btn"
                >
                  {status === "sending" ? (
                    <>
                      <span className="btn__spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <p>Thanks for visiting!</p>
      </div>
    </section>
  );
}
