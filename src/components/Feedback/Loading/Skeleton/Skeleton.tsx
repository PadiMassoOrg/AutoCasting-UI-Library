type SkeletonProps = {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  lines?: number;
  lineClassName?: string;
  pulseMs?: number;
  baseColor?: string;
};

export default function Skeleton({
  className,
  variant = 'rect',
  lines = 1,
  lineClassName,
  pulseMs = 1400,
  baseColor = 'rgba(0, 0, 0, 0.07)',
}: SkeletonProps) {
  const style = {
    animationDuration: `${pulseMs}ms`,
    backgroundColor: baseColor,
  } as CSSProperties;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={['w-full space-y-2', className].filter(Boolean).join(' ')}>
        {Array.from({ length: lines }).map((_, index) => (
          <span
            key={`skeleton-line-${index}`}
            className={['block h-3 rounded-md animate-pulse', index === lines - 1 ? 'w-4/5' : 'w-full', lineClassName]
              .filter(Boolean)
              .join(' ')}
            style={style}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  const shapeClassName =
    variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'h-3 rounded-md w-full' : 'rounded-lg';

  return (
    <span
      aria-hidden="true"
      className={['block animate-pulse', shapeClassName, className].filter(Boolean).join(' ')}
      style={style}
    />
  );
}
import type { CSSProperties } from 'react';
