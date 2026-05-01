import { ChevronRight, ChevronUpDown } from '../../Navigation/Indicators/Chevron';
import { useChromeBoxHeights } from '../../../hooks/useChromeBoxHeights';
import { LG_SCREEN_SIZE, useMedia } from '../../../hooks/useMedia';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type DashboardSection<Key extends string = string> = {
  key: Key;
  label: string;
  icon?: ReactNode;
  render: () => ReactNode;
};

type DashboardShellProps<Key extends string = string> = {
  title?: ReactNode;
  sections?: DashboardSection<Key>[];
  initialKey?: Key;
  children?: ReactNode;
  bottomSection?: ReactNode;
  contentHeader?: ReactNode;
  mobileNavBottomBar?: ReactNode;
  titleActions?: ReactNode;
};

type DashboardShellTitleProps = {
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function DashboardShellTitle({ title, actions, className }: DashboardShellTitleProps) {
  if (!title && !actions) return null;

  return (
    <header className={['flex items-center justify-between', className ?? ''].filter(Boolean).join(' ')}>
      <div className="min-w-0">
        {typeof title === 'string' ? (
          <h1 className="text-2xl font-bold text-(--color-primary-black) leading-tight">{title}</h1>
        ) : (
          title
        )}
      </div>
      {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
    </header>
  );
}

function DashboardShell<Key extends string = string>({
  title,
  sections,
  initialKey,
  children,
  bottomSection,
  contentHeader,
  mobileNavBottomBar,
  titleActions,
}: DashboardShellProps<Key>) {
  const isDesktop = useMedia(LG_SCREEN_SIZE);
  const { header, footer } = useChromeBoxHeights();
  const hasSections = !!(sections && sections.length > 0);
  const desktopViewportHeight = `calc(var(--app-vh, 1vh) * 100 - ${header + footer}px)`;

  const [activeKey, setActiveKey] = useState<Key | null>((initialKey as Key) ?? sections?.[0]?.key ?? null);
  const [mobileView, setMobileView] = useState<'nav' | 'content'>('nav');

  useEffect(() => {
    if (!hasSections) {
      setActiveKey(null);
      return;
    }
    if (!activeKey || !sections!.some((s) => s.key === activeKey)) {
      setActiveKey(sections![0].key);
    }
  }, [hasSections, sections, activeKey]);

  useEffect(() => {
    if (isDesktop && hasSections) setMobileView('content');
    else if (!isDesktop && hasSections) setMobileView('nav');
  }, [isDesktop, hasSections]);

  const currentSection = useMemo(() => sections?.find((s) => s.key === activeKey) ?? null, [sections, activeKey]);

  const goToNav = useCallback(() => {
    if (!isDesktop && hasSections) {
      setMobileView('nav');
      return;
    }
    window.history.back();
  }, [isDesktop, hasSections]);

  const goToSection = useCallback(
    (key: string) => {
      setActiveKey(key as Key);
      if (!isDesktop) setMobileView('content');
    },
    [isDesktop]
  );

  const ctxValue = useMemo<DashboardShellContextValue>(
    () => ({
      isDesktop,
      hasSections,
      activeKey: (activeKey as unknown as string) ?? null,
      mobileView,
      goToNav,
      goToSection,
    }),
    [isDesktop, hasSections, activeKey, mobileView, goToNav, goToSection]
  );

  // No Sections
  if (!hasSections) {
    return (
      <DashboardShellContext.Provider value={ctxValue}>
        <section className="w-full flex flex-col bg-(--color-secondary-white)">
          <article className="min-w-0">
            <div className="w-full max-w-[1500px] mx-auto lg:pb-0">{children}</div>
          </article>
        </section>
      </DashboardShellContext.Provider>
    );
  }

  // Mobile Navbar
  if (!isDesktop && mobileView === 'nav') {
    const bottomPad = mobileNavBottomBar ? 'pb-28' : '';

    return (
      <DashboardShellContext.Provider value={ctxValue}>
        <section className="w-full bg-(--color-secondary-white) relative">
          <div className={['w-full max-w-[550px] mx-auto', bottomPad].filter(Boolean).join(' ')}>
            {title && typeof title === 'string' && (
              <h1 className="my-6 text-2xl font-semibold text-(--color-primary-black) text-center">{title}</h1>
            )}
            {title && typeof title !== 'string' && <div className="my-6">{title}</div>}

            <div className="w-full bg-(--color-primary-white) rounded-2xl border border-(--color-secondary-outline) shadow-[0_4px_14px_rgba(16,24,40,0.06)] overflow-hidden">
              {sections!.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveKey(item.key);
                    setMobileView('content');
                  }}
                  className={[
                    'cursor-pointer w-full flex items-center justify-between px-6 py-4 text-[15px] leading-5 font-medium',
                    index !== sections!.length - 1 && 'border-b border-(--color-secondary-outline)',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span>{item.label}</span>
                  <ChevronRight sizePx={24} />
                </button>
              ))}
            </div>
          </div>

          {mobileNavBottomBar && (
            <div className="fixed left-0 right-0 bottom-0 z-50 bg-(--color-primary-white) border-t border-(--color-secondary-outline)">
              <div
                className="w-full mx-auto p-3"
                style={{
                  paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 16px)`,
                }}
              >
                {mobileNavBottomBar}
              </div>
            </div>
          )}
        </section>
      </DashboardShellContext.Provider>
    );
  }

  // Mobile (Content Only) & Desktop (Title + Content)
  return (
    <DashboardShellContext.Provider value={ctxValue}>
      <section className="lg:p-10">
        {/* Desktop Title */}
        <div className="w-full">
          {isDesktop && <DashboardShellTitle title={title} actions={titleActions} className="mb-4" />}
        </div>

        <div
          className="w-full flex flex-col lg:flex-row gap-0"
          style={isDesktop ? { minHeight: desktopViewportHeight } : undefined}
        >
          {/* Desktop Menu */}
          {isDesktop && (
            <aside
              className="hidden lg:block w-[300px] shrink-0 bg-transparent lg:sticky"
              style={{
                top: `${header}px`,
                height: desktopViewportHeight,
              }}
            >
              <div className="h-full flex flex-col">
                <nav className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2">
                  {sections!.map((item) => {
                    const selected = item.key === activeKey;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveKey(item.key)}
                        className={[
                          'flex items-center justify-between gap-2 rounded-2xl border px-4 py-5 text-sm leading-5 font-semibold cursor-pointer w-full text-left',
                          selected
                            ? 'shadow-sm border-(--color-primary-purple) text-(--color-primary-purple) bg-(--color-primary-white)'
                            : 'border-(--color-secondary-outline) bg-(--color-primary-white) text-(--color-primary-black)',
                        ].join(' ')}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                          <span>{item.label}</span>
                        </span>
                        <span className={selected ? 'text-(--color-primary-purple)' : 'text-(--color-primary-black)'}>
                          {selected ? <ChevronRight sizePx={24} /> : <ChevronUpDown open={false} sizePx={24} />}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                {bottomSection && <footer className="mt-auto shrink-0">{bottomSection}</footer>}
              </div>
            </aside>
          )}

          <article className="flex-1 min-w-0 lg:pt-0">
            {/* Container */}
            <div className="w-full max-w-[1500px] mx-auto lg:pl-6 lg:py-0">
              {!isDesktop && mobileView === 'content' && currentSection && (
                <div>
                  {contentHeader}
                  {currentSection.render()}
                </div>
              )}
              {isDesktop && currentSection && (
                <div className="flex flex-col gap-8 m-auto">
                  {contentHeader}
                  {currentSection.render()}
                </div>
              )}
              {children}
            </div>
          </article>
        </div>
      </section>
    </DashboardShellContext.Provider>
  );
}

type DashboardShellContextValue = {
  isDesktop: boolean;
  hasSections: boolean;
  activeKey: string | null;
  mobileView: 'nav' | 'content';
  goToNav: () => void;
  goToSection: (key: string) => void;
};

const DashboardShellContext = createContext<DashboardShellContextValue | undefined>(undefined);

export function useDashboardShell() {
  const ctx = useContext(DashboardShellContext);
  if (!ctx) throw new Error('useDashboardShell must be used within a DashboardShell');
  return ctx;
}

export type { DashboardShellProps, DashboardShellTitleProps };

export default DashboardShell;
