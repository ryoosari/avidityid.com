import Image from 'next/image';

interface AvidityLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AvidityLogo({ className = '', size = 'md' }: AvidityLogoProps) {
  const sizeClasses = {
    sm: { width: 60, height: 24 },  // Even smaller header size
    md: { width: 80, height: 32 },  // Medium footer size
    lg: { width: 120, height: 48 }  // Large size
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={className}>
      <Image
        src="/images/logo.png" // Replace with your logo filename
        alt="Avidity Id Logo"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority={size === 'sm'} // Priority for header logo
      />
    </div>
  );
} 