import { useRef, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import SocialLinks from "../components/SocialLinks";
import { profile } from "../data/profile";
import { createMailto, submitContact, validateContact } from "../utils/contact";
import "./Contact.css";

const endpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT || "";
const emptyValues = { name: "", email: "", message: "" };
export default function Contact({ formEndpoint = endpoint }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [draft, setDraft] = useState("");
  const form = useRef(null);
  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      form.current.elements[Object.keys(nextErrors)[0]].focus();
      return;
    }
    if (!formEndpoint) {
      setDraft(createMailto(values, profile.email));
      setStatus("draft");
      return;
    }
    setStatus("sending");
    try {
      await submitContact(values, formEndpoint);
      setStatus("success");
      setValues(emptyValues);
    } catch {
      setStatus("error");
    }
  }
  function update(event) {
    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setErrors((previous) => ({ ...previous, [event.target.name]: undefined }));
    if (status !== "sending") setStatus("idle");
  }
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-label="Get in Touch"
    >
      <div className="container contact-grid">
        <div>
          <SectionHeading
            number="04"
            eyebrow="Get in touch"
            title={
              <>
                Have an idea?
                <br />
                Let's <span className="gradient-text">build it.</span>
              </>
            }
          />
          <p className="contact-intro">
            I'd love to connect! Feel free to reach out or follow me online.
          </p>
          <div className="contact-info">
            <a href={`mailto:${profile.email}`}>
              <span className="contact-icon">
                <Mail size={19} aria-hidden="true" />
              </span>
              <span>
                <small>Email</small>
                {profile.email}
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div>
              <span className="contact-icon">
                <MapPin size={19} aria-hidden="true" />
              </span>
              <span>
                <small>Location</small>
                {profile.location}
              </span>
            </div>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <span className="contact-icon">
                <Phone size={19} aria-hidden="true" />
              </span>
              <span>
                <small>Mobile Number</small>
                {profile.phone}
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="connect-label mono">ELSEWHERE ON THE INTERNET</p>
          <SocialLinks />
        </div>
        <form
          ref={form}
          className="contact-form reveal"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          aria-busy={status === "sending"}
        >
          <div className="form-heading">
            <h3>Start a conversation</h3>
            <span className="form-spark" aria-hidden="true">
              ↗
            </span>
          </div>
          <p>
            {formEndpoint
              ? "A project, a question, or just a hello."
              : "Write a message, then send it with your email app."}
          </p>
          <div className="form-fields">
            <div className="field">
              <label htmlFor="contact-name">
                Your name <span>*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="What should I call you?"
                value={values.name}
                onChange={update}
                required
                maxLength={100}
                disabled={status === "sending"}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="field-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contact-email">
                Email address <span>*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={update}
                required
                maxLength={254}
                disabled={status === "sending"}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-message">
              Your message <span>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell me a little about your idea…"
              value={values.message}
              onChange={update}
              required
              minLength={10}
              maxLength={2000}
              disabled={status === "sending"}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span className="field-error" id="message-error">
                {errors.message}
              </span>
            )}
          </div>
          <button
            className="button button-primary submit-button"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : formEndpoint
                ? "Send Message"
                : "Create email draft"}
            <Send size={17} aria-hidden="true" />
          </button>
          <p className="form-note">
            {formEndpoint
              ? "Your message is only used to reply to your enquiry."
              : "You’ll review and send the draft in your email app."}
          </p>
          <div
            className={`form-status status-${status}`}
            role="status"
            aria-live="polite"
          >
            {status === "invalid" && (
              <p>Please check the highlighted fields.</p>
            )}
            {status === "success" && (
              <p>
                <CheckCircle2 size={18} aria-hidden="true" />
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p>
                Unable to send your message. Your text is saved here. Try again
                or <a href={`mailto:${profile.email}`}>email me directly</a>.
              </p>
            )}
            {status === "draft" && (
              <>
                <p>
                  Your draft is ready. Open your email app to review and send
                  it.
                </p>
                <a className="button button-secondary" href={draft}>
                  Open email draft
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p className="form-note">
                  If no email app opens, copy your message and email{" "}
                  {profile.email}.
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
