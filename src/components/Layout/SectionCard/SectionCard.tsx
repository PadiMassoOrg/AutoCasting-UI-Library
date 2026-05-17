import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SectionCardProps = ComponentPropsWithoutRef<'article'> & {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function SectionCard({ children, className = '', contentClassName = '', ...props }: SectionCardProps) {
  return (
    <article
      {...props}
      className={[
        'lg:flex lg:flex-col lg:gap-6 bg-[var(--color-primary-white)]',
        'rounded-2xl border border-[var(--color-secondary-outline)]',
        className,
      ].join(' ')}
    >
      <div className={['p-6', contentClassName].join(' ')}>{children}</div>
    </article>
  );
}
