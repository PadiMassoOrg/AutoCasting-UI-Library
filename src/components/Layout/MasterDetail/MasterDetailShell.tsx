import type { ReactNode, Ref } from 'react';
import { useChromeBoxHeights } from '../../../hooks/useChromeBoxHeights';
import { LG_SCREEN_SIZE, useMedia } from '../../../hooks/useMedia';
import SectionCard from '../SectionCard/SectionCard';

export type MasterDetailShellProps = {
  menuHeader?: ReactNode;
  menuContent: ReactNode;
  menuFooter?: ReactNode;
  content: ReactNode;
  contentHeader?: ReactNode;
  contentActions?: ReactNode;
  menuContentRef?: Ref<HTMLDivElement>;
  desktopPaneHeight?: string;
};

export default function MasterDetailShell({
  menuHeader,
  menuContent,
  menuFooter,
  content,
  contentHeader,
  contentActions,
  menuContentRef,
  desktopPaneHeight,
}: MasterDetailShellProps) {
  const isDesktop = useMedia(LG_SCREEN_SIZE);
  const { header, footer } = useChromeBoxHeights();
  const desktopViewportHeight = desktopPaneHeight ?? `calc(var(--app-vh, 1vh) * 100 - ${header + footer}px)`;

  return (
    <section className="w-full h-full min-h-0 bg-transparent">
      <div className="flex h-full min-h-0 w-full flex-col">
        <div
          className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-stretch"
          style={isDesktop ? { height: desktopViewportHeight } : undefined}
        >
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-none border-0 bg-transparent lg:w-[365px]">
            {menuHeader ? <div className="shrink-0">{menuHeader}</div> : null}
            <div ref={menuContentRef} className="min-h-0 flex-1 overflow-y-auto">
              {menuContent}
            </div>
            {menuFooter ? <div className="shrink-0 pt-4">{menuFooter}</div> : null}
          </aside>

          <SectionCard className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" withContentWrapper={false}>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex min-h-full flex-col">
                {(contentHeader || contentActions) && (
                  <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-(--color-secondary-outline) bg-(--color-primary-white) px-6 py-5">
                    {contentHeader ? <div className="min-w-0">{contentHeader}</div> : <div />}
                    {contentActions ? <div className="shrink-0">{contentActions}</div> : null}
                  </header>
                )}
                <div className="flex-1 p-6">{content}</div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
