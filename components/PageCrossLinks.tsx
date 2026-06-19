import { Link } from "@/i18n/navigation";

type CrossLink = {
  href: "/" | "/about" | "/when" | "/who" | "/doggybagtours" | "/community" | "/shop" | "/murphy";
  label: string;
};

type Props = {
  ariaLabel: string;
  links: CrossLink[];
  align?: "center" | "start";
};

export default function PageCrossLinks({ ariaLabel, links, align = "start" }: Props) {
  if (links.length === 0) return null;

  return (
    <nav
      className={`page-cross-links ${align === "center" ? "page-cross-links--center" : ""}`}
      aria-label={ariaLabel}
    >
      <ul className="page-cross-links__list">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="page-cross-links__link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
