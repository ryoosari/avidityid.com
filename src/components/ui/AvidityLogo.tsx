import Image from 'next/image';

interface AvidityLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LOGO_SIZES = {
  sm: { width: 60, height: 24 },
  md: { width: 80, height: 32 },
  lg: { width: 120, height: 48 }
} as const;

export default function AvidityLogo({ className = '', size = 'md' }: AvidityLogoProps) {
  const dimensions = LOGO_SIZES[size];

  return (
    <div className={className}>
      <Image
        src="/images/logo.png"
        alt="Avidity Id Logo"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority={size === 'sm'}
      />
    </div>
  );
}