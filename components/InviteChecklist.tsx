type Props = {
  items: string[];
};

export default function InviteChecklist({ items }: Props) {
  return (
    <ul className="invite-checklist">
      {items.map((item) => (
        <li key={item} className="invite-checklist__item">
          <span className="invite-checklist__mark" aria-hidden="true">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
