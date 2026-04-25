interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-cyan-200">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>

      {description ? (
        <p className="mt-3 max-w-3xl text-slate-200">{description}</p>
      ) : null}
    </div>
  );
}