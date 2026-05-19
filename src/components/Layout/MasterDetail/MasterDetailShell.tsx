import type { ReactNode, Ref } from 'react';
import { useChromeBoxHeights } from '../../../hooks/useChromeBoxHeights';
import { LG_SCREEN_SIZE, useMedia } from '../../../hooks/useMedia';
import SectionCard from '../SectionCard/SectionCard';

export type MasterDetailShellProps = {
  title?: ReactNode;
  titleActions?: ReactNode;
  topBar?: ReactNode;
  menu: ReactNode;
  content: ReactNode;
  menuHeader?: ReactNode;
  menuActions?: ReactNode;
  contentHeader?: ReactNode;
  contentActions?: ReactNode;
  menuContentRef?: Ref<HTMLDivElement>;
  desktopPaneHeight?: string;
};

function renderHeaderContent(content?: ReactNode, fallbackTag: 'h1' | 'h2' = 'h2') {
  if (!content) return null;
  if (typeof content !== 'string') return content;

  if (fallbackTag === 'h1') {
    return <h1 className="text-2xl font-semibold text-(--color-primary-black) leading-tight">{content}</h1>;
  }

  return <h2 className="text-xl font-semibold text-(--color-primary-black) leading-tight">{content}</h2>;
}

function PaneHeader({ title, actions }: { title?: ReactNode; actions?: ReactNode }) {
  if (!title && !actions) return null;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-(--color-secondary-outline) px-6 py-5">
      <div className="min-w-0">{renderHeaderContent(title)}</div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}

export default function MasterDetailShell({
  title,
  titleActions,
  topBar,
  menu,
  content,
  menuHeader,
  menuActions,
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
      <div className="flex h-full min-h-0 w-full flex-col gap-6">
        {(title || titleActions) && (
          <header className="flex items-center justify-between gap-4">
            <div className="min-w-0">{renderHeaderContent(title, 'h1')}</div>
            {titleActions ? <div className="shrink-0">{titleActions}</div> : null}
          </header>
        )}

        {topBar ? <div className="shrink-0">{topBar}</div> : null}

        <div
          className="flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch"
          style={isDesktop ? { height: desktopViewportHeight } : undefined}
        >
          {/* Menu */}
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-none border-0 bg-transparent lg:w-[390px]">
            <PaneHeader title={menuHeader} actions={menuActions} />
            <div ref={menuContentRef} className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
              {menu}
            </div>
          </aside>

          {/* Content */}
          <SectionCard className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" withContentWrapper={false}>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex min-h-full flex-col">
                <div className="sticky top-0 z-10 bg-(--color-primary-white)">
                  <PaneHeader title={contentHeader} actions={contentActions} />
                </div>
                <div className="flex-1 p-6">{content}</div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
