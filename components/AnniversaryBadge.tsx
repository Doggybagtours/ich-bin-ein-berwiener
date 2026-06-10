type Props = {
  label: string;
  sublabel: string;
};

export default function AnniversaryBadge({ label, sublabel }: Props) {
  return (
    <div className="anniversary-badge" role="presentation">
      <span className="anniversary-badge__label">{label}</span>
      <span className="anniversary-badge__sublabel">{sublabel}</span>
    </div>
  );
}
