export default function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">
        <span>{number}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
