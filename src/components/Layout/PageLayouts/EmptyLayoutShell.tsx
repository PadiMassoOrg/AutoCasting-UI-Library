import type { ReactNode } from 'react';

type EmptyLayoutShellProps = {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
};

export default function EmptyLayoutShell({
  children,
  className = 'min-h-screen w-full bg-[var(--color-secondary-white)]',
  mainClassName = 'flex min-h-screen w-full max-w-[1366px] p-4 m-auto items-center justify-center',
}: EmptyLayoutShellProps) {
  return (
    <div className={className}>
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
