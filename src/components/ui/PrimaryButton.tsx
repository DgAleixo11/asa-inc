import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-teal-400 px-6 py-3 font-semibold text-sky-950 transition hover:bg-teal-300"
    >
      {children}
    </Link>
  );
}