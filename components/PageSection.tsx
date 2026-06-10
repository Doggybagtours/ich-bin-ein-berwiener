import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  showMediaPlaceholder?: boolean;
  variant?: "default" | "flyer";
};

export default function PageSection({
  title,
  children,
  showMediaPlaceholder = false,
  variant = "default",
}: Props) {
  return (
    <section
      className={`page-section ${variant === "flyer" ? "page-section--flyer" : ""}`}
    >
      <h2 className="page-section__title">{title}</h2>
      <div className="page-section__content">{children}</div>
      {showMediaPlaceholder && (
        <div
          className="media-placeholder mt-6"
          role="presentation"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
