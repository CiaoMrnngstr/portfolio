import { useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { createMailto, validateContact } from "../utils/contact";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState("");
  const form = useRef(null);
  function submit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setDraft("");
    if (Object.keys(nextErrors).length) {
      form.current.elements[Object.keys(nextErrors)[0]].focus();
    } else {
      setDraft(createMailto(values, profile.email));
    }
  }
  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setDraft("");
  }
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <div className="contact-copy reveal"><p className="eyebrow">05 / The next conversation</p><h2 id="contact-title">What are<br />you <em>building?</em></h2><p>I'm open to IT internship opportunities. Tell me about your team, a project, or a problem you're working on.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={23} aria-hidden="true" /></a>
      <div className="contact-socials">
        {[["GitHub", profile.github], ["LinkedIn", profile.linkedin], ["Jobs180", profile.jobs180]].map(([label, href]) => <a className="text-link" key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
      </div>
      <p className="mono contact-location">{profile.location}</p>
    </div>
    <form className="contact-form reveal" ref={form} onSubmit={submit} noValidate aria-label="Contact form">
      <p className="form-title">Leave a little context.</p><p className="form-intro">Compose here, then review and send in your email app.</p>
      <div className="field-row">
        <div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} value={values.name} onChange={update} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>
        <div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} value={values.email} onChange={update} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div>
      </div>
      <div className="field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="A little about your team or idea…" rows={4} required minLength={10} maxLength={2000} value={values.message} onChange={update} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
      <button className="button primary-button" type="submit">Create email draft<ArrowRight size={18} aria-hidden="true" /></button>
      <div className="form-status" role="status" aria-live="polite">{draft && <><p>Your draft is ready. Nothing has been sent yet.</p><a className="text-link" href={draft}>Open email draft<ArrowUpRight size={18} aria-hidden="true" /></a></>}</div>
    </form>
  </section>;
}
