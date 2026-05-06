import type { ReactNode } from 'react';

type DashboardSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function DashboardSection({ children, className = '' }: DashboardSectionProps) {
  return (
    <section className={`flex flex-col gap-4 pb-12 lg:pb-0 lg:flex-1 lg:min-h-0 ${className}`}>{children}</section>
  );
}
