import type { CSSProperties, ReactNode } from 'react';

type NoNavigationLayoutShellMode = 'flow' | 'fixed';

type NoNavigationLayoutShellProps = {
  children: ReactNode;
  mode?: NoNavigationLayoutShellMode;
};

const safeAreaStyle: CSSProperties = {
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)',
  paddingLeft: 'env(safe-area-inset-left)',
  paddingRight: 'env(safe-area-inset-right)',
  scrollbarGutter: 'stable both-edges',
};

export default function NoNavigationLayoutShell({ children, mode = 'flow' }: NoNavigationLayoutShellProps) {
  if (mode === 'fixed') {
    return (
      <div
        className={[
          'fixed inset-0 z-0',
          'w-[100svw] h-[100svh]',
          'lg:w-[100dvw] lg:h-[100dvh]',
          'overflow-x-hidden overscroll-none',
          'bg-[var(--color-primary-white)]',
        ].join(' ')}
        style={safeAreaStyle}
      >
        <div className="w-full h-full grid place-items-center">
          <div className="w-[95%] max-w-[1366px] p-4 lg:p-0">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={['relative z-0', 'w-full min-h-[100svh]', 'lg:min-h-[100dvh]', 'bg-[var(--color-primary-white)]'].join(
        ' '
      )}
      style={safeAreaStyle}
    >
      <div className="w-full min-h-[100svh] lg:min-h-[100dvh] flex">
        <div className="w-[95%] max-w-[1366px] p-4 lg:p-0 m-auto">
          <div className="w-full my-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
