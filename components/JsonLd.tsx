import type { StructuredDataGraph } from "@/lib/json-ld";

type Props = {
  data: StructuredDataGraph;
};

/** Server-only JSON-LD — rendered as static script, no client hydration. */
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
