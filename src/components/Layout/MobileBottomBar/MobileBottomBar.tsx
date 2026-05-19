import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type MobileBottomBarProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

export default function MobileBottomBar({ children, className = '', ...props }: MobileBottomBarProps) {
  return (
    <div
      {...props}
      className={[
        'fixed inset-x-0 bottom-0 z-[20] flex justify-center bg-white px-3 pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.07)] lg:hidden',
        className,
      ].join(' ')}
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
      }}
    >
      <div className="flex w-full max-w-[460px] items-center justify-center">{children}</div>
    </div>
  );
}
