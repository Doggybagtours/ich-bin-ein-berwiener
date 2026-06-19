import Image from "next/image";
import { Link } from "@/i18n/navigation";

const PROFILE_IMAGE_WIDTH = 400;
const PROFILE_IMAGE_HEIGHT = 500;

type Props = {
  id: string;
  title: string;
  titleHref?: string;
  badge: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
  priority?: boolean;
};

export default function FeaturedProfileSection({
  id,
  title,
  titleHref,
  badge,
  paragraphs,
  imageSrc,
  imageAlt,
  imageFirst = true,
  priority = false,
}: Props) {
  return (
    <section
      className={`profile-feature ${imageFirst ? "" : "profile-feature--reverse"}`}
      aria-labelledby={id}
    >
      <div className="profile-feature__grid">
        <div className="profile-feature__image-wrap">
          <div className="profile-feature__image-slot">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={PROFILE_IMAGE_WIDTH}
              height={PROFILE_IMAGE_HEIGHT}
              className="profile-feature__image"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 400px"
              priority={priority}
            />
          </div>
        </div>

        <div className="profile-feature__content">
          <div className="profile-feature__header">
            <h2 id={id} className="profile-feature__title">
              {titleHref ? (
                <Link href={titleHref} className="text-inherit no-underline hover:text-accent">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <span className="profile-badge profile-badge--inline">{badge}</span>
          </div>

          <div className="profile-feature__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
