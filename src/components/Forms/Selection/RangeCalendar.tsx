import * as React from 'react';
import { useEffect } from 'react';
import { DayPicker, formatCaption, type DateRange } from 'react-day-picker';

type SharedProps = {
  label?: string;
  weekStartsOn?: 0 | 1;
  className?: string;
  required?: boolean;
  locale?: React.ComponentProps<typeof DayPicker>['locale'];
  language?: string;
  weekdayLabels?: string[];
  displayMode?: 'inline' | 'dropdown';
  placeholder?: string;
  closeOnCommit?: boolean;
};

type SingleProps = SharedProps & {
  selectionMode: 'single';
  value: Date | undefined;
  onChange: (next: Date | undefined) => void;
  onCommit?: (date: Date) => void;
};

type RangeProps = SharedProps & {
  selectionMode: 'range';
  value: DateRange | undefined;
  onChange: (next: DateRange | undefined) => void;
  onCommit?: (from: Date, to: Date) => void;
};

export type RangeCalendarProps = SingleProps | RangeProps;

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const isSameDay = (left?: Date, right?: Date) =>
  !!left &&
  !!right &&
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();
const isSingleProps = (props: RangeCalendarProps): props is SingleProps => props.selectionMode === 'single';
const isRangeProps = (props: RangeCalendarProps): props is RangeProps => props.selectionMode === 'range';

const getTargetMonth = (value?: Date | DateRange) => {
  if (!value) return startOfMonth(new Date());
  if (value instanceof Date) return startOfMonth(value);
  if (value?.from) return startOfMonth(value.from);
  if (value?.to) return startOfMonth(value.to);
  return startOfMonth(new Date());
};

export default function RangeCalendar(props: RangeCalendarProps) {
  const {
    label,
    weekStartsOn = 1,
    className,
    required = false,
    locale,
    language = 'en',
    weekdayLabels,
    displayMode = 'inline',
    placeholder = 'Seleccionar',
    closeOnCommit = true,
  } = props;

  const minDate = React.useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const maxDate = React.useMemo(() => {
    const date = new Date(minDate);
    date.setFullYear(date.getFullYear() + 2);
    return date;
  }, [minDate]);

  const startMonthLimit = React.useMemo(() => startOfMonth(minDate), [minDate]);
  const endMonthLimit = React.useMemo(() => startOfMonth(maxDate), [maxDate]);

  const [month, setMonth] = React.useState<Date>(() => getTargetMonth(props.value));
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const skipNextSingleSelectRef = React.useRef(false);

  useEffect(() => {
    const next = getTargetMonth(props.value);
    setMonth((prev) => {
      if (prev.getFullYear() === next.getFullYear() && prev.getMonth() === next.getMonth()) return prev;
      return next;
    });
  }, [props.value]);

  useEffect(() => {
    if (displayMode !== 'dropdown' || !isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [displayMode, isOpen]);

  const triggerLabel = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (isSingleProps(props)) {
      return props.value ? formatter.format(props.value) : placeholder;
    }

    const rangeValue = props.value;
    if (!rangeValue?.from && !rangeValue?.to) return placeholder;
    if (rangeValue?.from && rangeValue?.to)
      return `${formatter.format(rangeValue.from)} - ${formatter.format(rangeValue.to)}`;
    if (rangeValue?.from) return formatter.format(rangeValue.from);
    if (rangeValue?.to) return formatter.format(rangeValue.to);
    return placeholder;
  }, [language, placeholder, props]);

  const sharedDayPickerProps = {
    navLayout: 'around' as const,
    weekStartsOn,
    month,
    onMonthChange: setMonth,
    locale,
    startMonth: startMonthLimit,
    endMonth: endMonthLimit,
    disabled: [{ before: minDate }, { after: maxDate }],
    formatters: {
      formatWeekdayName: (date: Date) =>
        weekdayLabels?.[date.getDay()] ?? date.toLocaleDateString(language, { weekday: 'short' }),
      formatCaption: (date: Date, options: unknown, dateLib: unknown) => {
        const text = formatCaption(
          date,
          options as Parameters<typeof formatCaption>[1],
          dateLib as Parameters<typeof formatCaption>[2]
        );
        return text ? text[0].toLocaleUpperCase(language) + text.slice(1) : text;
      },
    },
    className: 'w-full p-2',
    classNames: {
      chevron: 'rdp-chevron fill-[var(--color-primary-black)]',
      month_caption: 'rdp-month_caption text-sm font-semibold',
      caption_label: 'rdp-caption_label text-sm font-semibold',
    },
    styles: {
      root: { width: '100%' },
      months: { width: '100%' },
      month: { width: '100%' },
      month_grid: { width: '100%', tableLayout: 'fixed' as const },
    },
    style: {
      '--rdp-accent-color': 'var(--color-primary-purple)',
      '--rdp-accent-background-color': 'var(--color-secondary-offwhite)',
    } as React.CSSProperties,
  };

  const handleRangeSelect = React.useCallback(
    (next: DateRange | undefined) => {
      if (!isRangeProps(props)) return;

      const current = props.value;
      const isClearingSameSingleAnchor =
        !!current?.from && !current?.to && !!next?.from && !next?.to && current.from.getTime() === next.from.getTime();
      const isClearingFromCompletedRange =
        !!current?.from &&
        !!current?.to &&
        !!next?.from &&
        !next?.to &&
        (current.from.getTime() === next.from.getTime() || current.to.getTime() === next.from.getTime());

      if (isClearingSameSingleAnchor || isClearingFromCompletedRange) {
        props.onChange(undefined);
        return;
      }

      props.onChange(next);
      const target = getTargetMonth(next);
      if (month.getFullYear() !== target.getFullYear() || month.getMonth() !== target.getMonth()) {
        setMonth(target);
      }
      if (next?.from && next?.to) {
        props.onCommit?.(next.from, next.to);
        if (displayMode === 'dropdown' && closeOnCommit) setIsOpen(false);
      }
    },
    [closeOnCommit, displayMode, month, props]
  );

  const handleSingleSelect = React.useCallback(
    (next: Date | undefined) => {
      if (!isSingleProps(props)) return;

      if (skipNextSingleSelectRef.current) {
        skipNextSingleSelectRef.current = false;
        return;
      }

      if (next && props.value && next.getTime() === props.value.getTime()) {
        props.onChange(undefined);
        return;
      }

      props.onChange(next);
      const target = getTargetMonth(next);
      if (month.getFullYear() !== target.getFullYear() || month.getMonth() !== target.getMonth()) {
        setMonth(target);
      }
      if (next) {
        props.onCommit?.(next);
        if (displayMode === 'dropdown' && closeOnCommit) setIsOpen(false);
      }
    },
    [closeOnCommit, displayMode, month, props]
  );

  const calendar = (
    <div className="w-full overflow-hidden rounded-2xl border border-(--color-secondary-outline) bg-(--color-secondary-white)">
      {isSingleProps(props) ? (
        <DayPicker
          {...sharedDayPickerProps}
          mode="single"
          selected={props.value}
          onSelect={handleSingleSelect}
          onDayClick={(day) => {
            if (isSameDay(day, props.value)) {
              skipNextSingleSelectRef.current = true;
              props.onChange(undefined);
              if (displayMode === 'dropdown' && closeOnCommit) setIsOpen(false);
            }
          }}
          numberOfMonths={1}
        />
      ) : (
        <DayPicker
          {...sharedDayPickerProps}
          mode="range"
          selected={props.value}
          onSelect={handleRangeSelect}
          resetOnSelect
          numberOfMonths={1}
        />
      )}
    </div>
  );

  return (
    <div ref={rootRef} className={`${className ?? ''} flex w-full flex-col lg:max-w-[350px]`}>
      {label ? (
        <div className="mb-2 text-sm font-semibold">
          {label}
          {required ? (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          ) : null}
        </div>
      ) : null}

      {displayMode === 'dropdown' ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative h-12 w-full rounded-xl border border-(--color-secondary-outline) px-5 pr-10 text-left text-base transition-colors duration-100 ease-in-out focus:border-(--color-primary-purple) focus:outline-none focus:ring-0 ${
              isSingleProps(props)
                ? !props.value
                  ? 'text-(--color-secondary-grey)'
                  : 'text-(--color-primary-black)'
                : !props.value?.from && !props.value?.to
                  ? 'text-(--color-secondary-grey)'
                  : 'text-(--color-primary-black)'
            }`}
            aria-expanded={isOpen}
          >
            {triggerLabel}
            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </button>

          {isOpen ? <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-20">{calendar}</div> : null}
        </div>
      ) : (
        calendar
      )}
    </div>
  );
}

export const toLocalISO = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseLocalISODate = (iso?: string | null): Date | undefined => {
  if (!iso) return undefined;
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};
