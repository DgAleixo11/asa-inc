import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: number;
  showText?: boolean;
}

export default function BrandLogo({
  size = 40,
  showText = true,
}: BrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/icons/asa-logo.png"
        alt="Logo ASA Inc."
        width={size}
        height={size}
        className="rounded-full"
      />

      {showText ? (
        <div>
          <p className="text-base font-bold text-slate-900">ASA Inc.</p>
          <p className="text-xs text-slate-500">Aprender é evoluir.</p>
        </div>
      ) : null}
    </Link>
  );
}