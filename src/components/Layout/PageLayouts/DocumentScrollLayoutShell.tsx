import type { ReactNode } from 'react';

type DocumentScrollLayoutShellProps = {
  children: ReactNode;
  contentClassName: string;
  header?: ReactNode;
  headerOffset?: number;
  footerOffset?: number;
  rootClassName?: string;
};

export default function DocumentScrollLayoutShell({
  children,
  contentClassName,
  header,
  headerOffset = 0,
  footerOffset = 0,
  rootClassName = 'w-full min-h-[calc(var(--app-vh,1vh)*100)] bg-(--color-secondary-white)',
}: DocumentScrollLayoutShellProps) {
  return (
    <div className={rootClassName}>
      {header && (
        <header data-site-header className="fixed inset-x-0 top-0 z-[120]">
          {header}
        </header>
      )}

      <main
        className="w-full"
        style={{
          paddingTop: `${headerOffset}px`,
          paddingBottom: `${footerOffset}px`,
        }}
      >
        <div className={contentClassName}>{children}</div>
      </main>
    </div>
  );
}
