export function AtuaLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Spiral mark - representing growth and continuous improvement */}
      <path
        d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 10c-7.732 0-14 6.268-14 14s6.268 14 14 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 16c-4.418 0-8 3.582-8 8s3.582 8 8 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

export function AtuaLogoMark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AtuaLogo size={32} className="text-atua-accent" />
      <span className="font-display text-sm tracking-wider text-atua-text">
        ATUA <span className="text-atua-accent">·</span> OPS
      </span>
    </div>
  );
}
