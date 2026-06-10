type Props = {
  label: string;
};

export default function FirstEditionTicker({ label }: Props) {
  const segment = `${label} · `;
  const tickerText = segment.repeat(8);

  return (
    <div className="first-edition-ticker" aria-hidden="true">
      <div className="first-edition-ticker__track">
        <span className="first-edition-ticker__text">{tickerText}</span>
        <span className="first-edition-ticker__text">{tickerText}</span>
      </div>
    </div>
  );
}
