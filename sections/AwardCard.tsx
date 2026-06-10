type Props = {
  title: string;
  icon: string;
};

export default function AwardCard({ title, icon }: Props) {
  return (
    <article className="award-card">
      <div className="award-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="award-card__media" role="presentation" aria-hidden="true" />
      <h3 className="award-card__title">{title}</h3>
    </article>
  );
}
