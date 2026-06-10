type Props = {
  flag: string;
  location: string;
  eventName: string;
};

export default function CommunityEventCard({
  flag,
  location,
  eventName,
}: Props) {
  return (
    <article className="location-card">
      <span className="location-card__flag" aria-hidden="true">
        {flag}
      </span>
      <h3 className="location-card__location">{location}</h3>
      <p className="location-card__event">{eventName}</p>
    </article>
  );
}
