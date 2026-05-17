import type { ReactNode, Ref } from 'react';
import { useChromeBoxHeights } from '../../../hooks/useChromeBoxHeights';
import { LG_SCREEN_SIZE, useMedia } from '../../../hooks/useMedia';

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
  rootClassName?: string;
  panesClassName?: string;
  menuPaneClassName?: string;
  menuContentClassName?: string;
  menuContentRef?: Ref<HTMLDivElement>;
  contentPaneClassName?: string;
  menuPaneWidthClassName?: string;
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
  rootClassName = 'w-full min-h-0 bg-(--color-secondary-white)',
  panesClassName = '',
  menuPaneClassName = '',
  menuContentClassName = '',
  menuContentRef,
  contentPaneClassName = '',
  menuPaneWidthClassName = 'lg:w-[36rem]',
  desktopPaneHeight,
}: MasterDetailShellProps) {
  const isDesktop = useMedia(LG_SCREEN_SIZE);
  const { header, footer } = useChromeBoxHeights();
  const desktopViewportHeight = desktopPaneHeight ?? `calc(var(--app-vh, 1vh) * 100 - ${header + footer}px)`;

  return (
    <section className={rootClassName}>
      <div className="flex h-full min-h-0 w-full flex-col gap-6">
        {(title || titleActions) && (
          <header className="flex items-center justify-between gap-4">
            <div className="min-w-0">{renderHeaderContent(title, 'h1')}</div>
            {titleActions ? <div className="shrink-0">{titleActions}</div> : null}
          </header>
        )}

        {topBar ? <div className="shrink-0">{topBar}</div> : null}

        <div
          className={['flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:items-stretch', panesClassName]
            .filter(Boolean)
            .join(' ')}
          style={isDesktop ? { height: desktopViewportHeight } : undefined}
        >
          <aside
            className={[
              'flex min-h-0 flex-col overflow-hidden rounded-2xl border border-(--color-secondary-outline) bg-(--color-primary-white)',
              menuPaneWidthClassName,
              menuPaneClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {(menuHeader || menuActions) && (
              <header className="flex items-center justify-between gap-4 border-b border-(--color-secondary-outline) px-6 py-5">
                <div className="min-w-0">{renderHeaderContent(menuHeader)}</div>
                {menuActions ? <div className="shrink-0">{menuActions}</div> : null}
              </header>
            )}
            <div
              ref={menuContentRef}
              className={['min-h-0 flex-1 overflow-y-auto', menuContentClassName].filter(Boolean).join(' ')}
            >
              {menu}
            </div>
          </aside>

          <article
            className={[
              'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-(--color-secondary-outline) bg-(--color-primary-white)',
              contentPaneClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {(contentHeader || contentActions) && (
              <header className="flex items-center justify-between gap-4 border-b border-(--color-secondary-outline) px-6 py-5">
                <div className="min-w-0">{renderHeaderContent(contentHeader)}</div>
                {contentActions ? <div className="shrink-0">{contentActions}</div> : null}
              </header>
            )}
            <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
          </article>
        </div>
      </div>
    </section>
  );
}
