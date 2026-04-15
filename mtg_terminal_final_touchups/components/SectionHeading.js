export default function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div style={{ maxWidth: 860, marginBottom: 26 }}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2>{title}</h2>
      {intro ? <p className="lead" style={{ marginTop: 10 }}>{intro}</p> : null}
    </div>
  );
}
