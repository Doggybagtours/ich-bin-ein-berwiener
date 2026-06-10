type Props = {
  label: string;
};

export default function FirstEditionTicker({ label }: Props) {
  const segment = `${label} · `;
  const tickerText = segment.repeat(6);

  return (
    <div className="first-edition-ticker first-edition-ticker--hero" aria-hidden="true">
      <div className="first-edition-ticker__viewport">
        <div className="first-edition-ticker__track">
          <span className="first-edition-ticker__text">{tickerText}</span>
          <span className="first-edition-ticker__text" aria-hidden="true">
            {tickerText}
          </span>
        </div>
      </div>
    </div>
  );
}
