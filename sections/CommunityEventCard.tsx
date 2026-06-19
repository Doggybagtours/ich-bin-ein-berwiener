import { Link } from "@/i18n/navigation";

type Props = {
  flag: string;
  location: string;
  eventName: string;
  href?: "/" | "/when";
};

export default function CommunityEventCard({
  flag,
  location,
  eventName,
  href,
}: Props) {
  const content = (
    <>
      <span className="location-card__flag" aria-hidden="true">
        {flag}
      </span>
      <h3 className="location-card__location">{location}</h3>
      <p className="location-card__event">{eventName}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="location-card location-card--link">
        {content}
      </Link>
    );
  }

  return <article className="location-card">{content}</article>;
}
