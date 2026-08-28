type SectionHeadingProps = {
  label?: string;
  title: string;
  text?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ label, title, text, dark = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${dark ? "text-white" : "text-alma-ink"} ${className}`}>
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2>{title}</h2>
      {text ? <p className={dark ? "text-slate-300" : "text-[#62727D]"}>{text}</p> : null}
    </div>
  );
}
