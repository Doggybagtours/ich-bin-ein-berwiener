import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  background?: "white" | "alt";
  width?: "default" | "wide";
};

export default function PageShell({
  title,
  children,
  background = "white",
  width = "default",
}: Props) {
  return (
    <div
      className={`page-bg ${background === "alt" ? "page-bg--alt" : "page-bg--white"}`}
    >
      <main
        className={`mx-auto px-5 pb-16 pt-10 sm:px-8 sm:pt-12 ${width === "wide" ? "max-w-5xl" : "max-w-3xl"}`}
      >
        <article>
          <h1 className="font-sans text-3xl font-bold leading-tight text-text-primary md:text-4xl">
            {title}
          </h1>
          <div
            className="mb-10 mt-4 h-1 w-16 bg-accent"
            aria-hidden="true"
          />
          <div className="space-y-6 font-sans text-base leading-relaxed text-text-primary/90 md:text-lg">
            {children}
          </div>
        </article>
      </main>
    </div>
  );
}
