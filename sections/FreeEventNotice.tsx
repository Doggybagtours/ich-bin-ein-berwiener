type Props = {
  label: string;
  message: string;
};

export default function FreeEventNotice({ label, message }: Props) {
  return (
    <div className="relative mx-auto max-w-xl pt-3">
      <div className="flyer-sticker overflow-hidden border-2 border-accent bg-bg-primary">
        <p className="bg-accent px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.2em] text-white">
          {label}
        </p>
        <p className="px-6 py-5 font-sans text-base leading-relaxed text-text-primary sm:text-lg">
          {message}
        </p>
      </div>
    </div>
  );
}
