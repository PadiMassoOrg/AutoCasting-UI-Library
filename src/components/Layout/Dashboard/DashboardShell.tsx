import { ChevronLeft, ChevronRight, ChevronUpDown } from '../../Navigation/Indicators/Chevron';
import { OverflowMenu } from '../../Actions/Menus/OverflowMenu';
import type { OverflowMenuItem } from '../../Actions/Menus/OverflowMenu';
import { Icon } from '../../Brand/Identity/Icon';
import MobileBottomBar from '../MobileBottomBar/MobileBottomBar';
import { useChromeBoxHeights } from '../../../hooks/useChromeBoxHeights';
import { LG_SCREEN_SIZE, useMedia } from '../../../hooks/useMedia';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type DashboardSectionMenuAction = {
  label: ReactNode;
  onClick: () => void;
  active?: boolean;
};

export type DashboardSectionMenuItem = {
  key: string;
  label: ReactNode;
  overflowMenuItems?: OverflowMenuItem[];
  onClick?: () => void;
  active?: boolean;
};

export type DashboardSection<Key extends string = string> = {
  key: Key;
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  sectionTitle?: ReactNode;
  sectionActions?: ReactNode;
  menuAction?: DashboardSectionMenuAction;
  menuItems?: DashboardSectionMenuItem[];
  render: () => ReactNode;
};

type DashboardNestedEntry =
  | {
      key: string;
      label: ReactNode;
      active: boolean;
      onClick: () => void;
      leadingIconName: 'plus';
      overflowMenuItems?: undefined;
    }
  | {
      key: string;
      label: ReactNode;
      active: boolean;
      onClick: () => void;
      leadingIconName?: undefined;
      overflowMenuItems?: OverflowMenuItem[];
    };

type DashboardShellProps<Key extends string = string> = {
  title?: ReactNode;
  sections?: DashboardSection<Key>[];
  initialKey?: Key;
  activeKey?: Key | null;
  onActiveSectionChange?: (key: Key | null) => void;
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
    <header className={['w-full flex items-center justify-between', className ?? ''].filter(Boolean).join(' ')}>
      <div className="min-w-0">
        {typeof title === 'string' ? (
          <h1 className="text-lg font-bold text-(--color-primary-black) leading-tight">{title}</h1>
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
  activeKey: controlledActiveKey,
  onActiveSectionChange,
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

  const [uncontrolledActiveKey, setUncontrolledActiveKey] = useState<Key | null>(
    (initialKey as Key) ?? sections?.[0]?.key ?? null
  );
  const [mobileView, setMobileView] = useState<'nav' | 'content'>('nav');
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const activeKey = controlledActiveKey ?? uncontrolledActiveKey;

  const scrollContentToTop = useCallback(() => {
    const target = contentScrollRef.current;
    if (target) {
      target.scrollTo({ top: 0, behavior: 'auto' });
      target.scrollTop = 0;
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const setActiveKey = useCallback(
    (key: Key | null) => {
      if (controlledActiveKey == null) {
        setUncontrolledActiveKey(key);
      }
      onActiveSectionChange?.(key);
    },
    [controlledActiveKey, onActiveSectionChange]
  );

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

  const activateSection = useCallback(
    (section: DashboardSection<Key>) => {
      setActiveKey(section.key);
      section.onSelect?.();
      if (!isDesktop) setMobileView('content');
      requestAnimationFrame(() => scrollContentToTop());
    },
    [isDesktop, scrollContentToTop, setActiveKey]
  );

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
      requestAnimationFrame(() => scrollContentToTop());
    },
    [isDesktop, scrollContentToTop]
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

  const getNestedSectionEntries = useCallback(
    (section: DashboardSection<Key>): DashboardNestedEntry[] => {
      if (!section.menuAction || !section.menuItems) return [];

      return [
        {
          key: `${String(section.key)}-menu-action`,
          label: section.menuAction.label,
          active: Boolean(section.menuAction.active),
          onClick: () => {
            setActiveKey(section.key);
            section.menuAction?.onClick();
            if (!isDesktop) setMobileView('content');
            requestAnimationFrame(() => scrollContentToTop());
          },
          leadingIconName: 'plus',
        },
        ...section.menuItems.map((menuItem) => ({
          key: menuItem.key,
          label: menuItem.label,
          active: Boolean(menuItem.active),
          onClick: () => {
            setActiveKey(section.key);
            menuItem.onClick?.();
            if (!isDesktop) setMobileView('content');
            requestAnimationFrame(() => scrollContentToTop());
          },
          overflowMenuItems: menuItem.overflowMenuItems,
        })),
      ];
    },
    [isDesktop, setActiveKey]
  );

  const sectionUsesShellLayout = Boolean(currentSection?.sectionTitle || currentSection?.sectionActions);
  const mobileSectionHeader = currentSection && sectionUsesShellLayout && (
    <div
      className={
        currentSection.sectionActions
          ? 'flex flex-col gap-3 mb-4'
          : 'flex flex-row gap-4 items-center justify-between mb-4'
      }
    >
      <div className="flex items-center gap-2 min-w-0">
        <button type="button" onClick={goToNav} className="cursor-pointer flex items-center gap-1">
          <ChevronLeft />
          {typeof currentSection.sectionTitle === 'string' ? (
            <h2 className="text-lg font-semibold truncate">{currentSection.sectionTitle}</h2>
          ) : (
            currentSection.sectionTitle
          )}
        </button>
      </div>
      {currentSection.sectionActions ? (
        <div className="w-full [&>*]:w-full">{currentSection.sectionActions}</div>
      ) : null}
    </div>
  );

  const desktopSectionContent = currentSection && (
    <div className="flex w-full flex-col gap-4 lg:h-full lg:min-h-0">
      {contentHeader}
      {sectionUsesShellLayout ? (
        <article className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-xl border border-(--color-secondary-outline) bg-(--color-primary-white)">
          <div ref={contentScrollRef} className="flex-1 min-h-0 overflow-y-auto">
            <header className="h-[76px] shrink-0 border-b border-(--color-secondary-outline) px-6 flex items-center lg:sticky lg:top-0 lg:z-10 bg-(--color-primary-white)">
              <DashboardShellTitle title={currentSection.sectionTitle} actions={currentSection.sectionActions} />
            </header>
            <div className="p-6">{currentSection.render()}</div>
          </div>
        </article>
      ) : (
        currentSection.render()
      )}
    </div>
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

            {/* Mobile: Buttons per Section */}
            <div className="flex w-[90%] m-auto flex-col gap-2">
              {sections!.map((item) => {
                const hasNestedMobileList = Boolean(item.menuAction && item.menuItems);
                const nestedMobileEntries = hasNestedMobileList ? getNestedSectionEntries(item) : [];

                if (hasNestedMobileList) {
                  return (
                    <div
                      key={item.key}
                      className="rounded-xl border overflow-hidden border-(--color-secondary-outline) bg-(--color-primary-white) text-(--color-primary-black)"
                    >
                      <button
                        type="button"
                        onClick={() => activateSection(item)}
                        className="flex items-center justify-between gap-2 rounded-none border-none px-5 pt-5 pb-2 text-sm font-semibold cursor-pointer w-full text-left"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                          <span>{item.label}</span>
                        </span>
                        <span className="text-(--color-primary-black)">
                          <ChevronRight sizePx={24} />
                        </span>
                      </button>

                      <div className="flex flex-col px-2 pb-4">
                        {nestedMobileEntries.map((entry) => (
                          <div key={entry.key} className="flex items-center rounded-xl px-4 py-2">
                            <button
                              type="button"
                              onClick={entry.onClick}
                              className="cursor-pointer min-w-0 flex-1 text-left text-(--color-primary-black)"
                            >
                              <span className="block truncate text-sm leading-none font-semibold">{entry.label}</span>
                            </button>
                            {entry.leadingIconName ? (
                              <button
                                type="button"
                                onClick={entry.onClick}
                                aria-label={typeof entry.label === 'string' ? entry.label : undefined}
                                className="cursor-pointer inline-flex items-center justify-center"
                              >
                                <Icon name={entry.leadingIconName} size={14} variant="default" />
                              </button>
                            ) : null}
                            {entry.overflowMenuItems && entry.overflowMenuItems.length > 0 ? (
                              <OverflowMenu
                                items={entry.overflowMenuItems}
                                align="end"
                                side="bottom"
                                triggerIconSize={14}
                              />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => activateSection(item)}
                    className="flex items-center justify-between gap-2 rounded-xl border border-(--color-secondary-outline) bg-(--color-primary-white) px-5 py-5 text-sm font-semibold text-(--color-primary-black) cursor-pointer w-full text-left"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                      <span>{item.label}</span>
                    </span>
                    <span className="text-(--color-primary-black)">
                      <ChevronRight sizePx={24} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: BottomBar */}
          {mobileNavBottomBar && (
            <MobileBottomBar className="border-t border-(--color-secondary-outline) bg-(--color-primary-white)">
              {mobileNavBottomBar}
            </MobileBottomBar>
          )}
        </section>
      </DashboardShellContext.Provider>
    );
  }

  // Mobile (Content Only) & Desktop (Title + Content)
  return (
    <DashboardShellContext.Provider value={ctxValue}>
      <section
        className="box-border w-full max-w-[1650px] m-auto flex flex-col bg-(--color-secondary-white) lg:px-10 lg:py-6"
        style={
          isDesktop
            ? {
                height: desktopViewportHeight,
                maxHeight: desktopViewportHeight,
                overflow: 'hidden',
              }
            : undefined
        }
      >
        {/* Desktop Title */}
        <div className="w-full shrink-0">
          {isDesktop && <DashboardShellTitle title={title} actions={titleActions} className="pb-4" />}
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-0 flex-1 min-h-0">
          {/* Desktop Menu */}
          {isDesktop && (
            <aside className="hidden lg:flex lg:basis-[250px] lg:min-w-[250px] lg:max-w-[250px] shrink-0 self-stretch min-h-0 bg-transparent overflow-hidden">
              <div className="w-full flex-1 min-h-0 flex flex-col">
                <nav className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 w-full">
                  {/* Destkop Buttons per Section */}
                  {sections!.map((item) => {
                    const selected = item.key === activeKey;
                    const hasNestedDesktopList = Boolean(item.menuAction && item.menuItems);
                    const nestedDesktopEntries = hasNestedDesktopList ? getNestedSectionEntries(item) : [];

                    if (hasNestedDesktopList) {
                      return (
                        <div
                          key={item.key}
                          className={[
                            'rounded-xl border overflow-hidden',
                            selected
                              ? 'shadow-sm border-(--color-primary-purple) text-(--color-primary-purple) bg-(--color-primary-white)'
                              : 'border-(--color-secondary-outline) bg-(--color-primary-white) text-(--color-primary-black)',
                          ].join(' ')}
                        >
                          {/* Main Button */}
                          <button
                            type="button"
                            onClick={() => activateSection(item)}
                            className="flex items-center justify-between gap-2 rounded-none border-none px-4 pt-5 pb-2 text-sm font-semibold cursor-pointer w-full text-left"
                          >
                            <span className="flex items-center gap-2">
                              {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                              <span>{item.label}</span>
                            </span>
                            <span
                              className={selected ? 'text-(--color-primary-purple)' : 'text-(--color-primary-black)'}
                            >
                              <ChevronUpDown open={true} sizePx={24} />
                            </span>
                          </button>

                          {/* Menu Action + Items Buttons */}
                          <div className="flex flex-col px-2 pb-4">
                            {nestedDesktopEntries.map((entry) => (
                              <div
                                key={entry.key}
                                className={[
                                  'flex items-center rounded-xl px-4 py-2',
                                  entry.active ? 'bg-(--color-secondary-white)' : 'bg-transparent',
                                ].join(' ')}
                              >
                                <button
                                  type="button"
                                  onClick={entry.onClick}
                                  className={[
                                    'cursor-pointer min-w-0 flex-1 text-left',
                                    entry.active ? 'text-(--color-primary-purple)' : 'text-(--color-primary-black)',
                                  ].join(' ')}
                                >
                                  <span className="block truncate text-sm leading-none font-semibold">
                                    {entry.label}
                                  </span>
                                </button>
                                {entry.leadingIconName ? (
                                  <button
                                    type="button"
                                    onClick={entry.onClick}
                                    aria-label={typeof entry.label === 'string' ? entry.label : undefined}
                                    className="cursor-pointer inline-flex items-center justify-center"
                                  >
                                    <Icon
                                      name={entry.leadingIconName}
                                      size={14}
                                      variant={entry.active ? 'primary' : 'default'}
                                    />
                                  </button>
                                ) : null}
                                {entry.overflowMenuItems && entry.overflowMenuItems.length > 0 ? (
                                  <OverflowMenu
                                    items={entry.overflowMenuItems}
                                    align="end"
                                    side="bottom"
                                    triggerIconSize={14}
                                  />
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => activateSection(item)}
                        className={[
                          'flex items-center justify-between gap-2 rounded-xl border px-4 py-5 text-sm font-semibold cursor-pointer w-full text-left',
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
                {/* Desktop: BottomSection */}
                {bottomSection && <footer className="mt-auto shrink-0">{bottomSection}</footer>}
              </div>
            </aside>
          )}

          <article className="flex-1 min-w-0 min-h-0 lg:flex lg:flex-col lg:overflow-hidden">
            {/* Container: MAIN CONTENT */}
            <div className="w-full max-w-[1500px] mx-auto pb-6 lg:pb-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:pl-4 lg:py-0">
              {!isDesktop && mobileView === 'content' && currentSection && (
                <div ref={contentScrollRef} className={mobileNavBottomBar ? 'pb-28' : ''}>
                  {contentHeader}
                  {sectionUsesShellLayout ? (
                    <>
                      {mobileSectionHeader}
                      <article className="bg-(--color-primary-white) rounded-xl border border-(--color-secondary-outline)">
                        <div className="p-6">{currentSection.render()}</div>
                      </article>
                    </>
                  ) : (
                    currentSection.render()
                  )}
                </div>
              )}
              {isDesktop && desktopSectionContent}
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
