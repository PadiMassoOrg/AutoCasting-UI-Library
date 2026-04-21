import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { OverflowMenu } from '../../Actions/Menus/OverflowMenu';
import type { OverflowMenuAlign, OverflowMenuItem, OverflowMenuSide } from '../../Actions/Menus/OverflowMenu';
import { ChevronLeft, ChevronRight } from '../../Navigation/Indicators/Chevron';

type DataGridAlign = 'left' | 'center' | 'right';
type DataGridJustify = 'start' | 'center' | 'end';

export type DataGridColumn<T> = {
  id: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  render?: (row: T) => ReactNode;
  align?: DataGridAlign;
  justify?: DataGridJustify;
  headerJustify?: DataGridJustify;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  headerContentClassName?: string;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: () => void;
};

export type DataGridActions<T> = {
  header?: ReactNode;
  items: (row: T) => OverflowMenuItem[];
  align?: OverflowMenuAlign;
  side?: OverflowMenuSide;
  triggerClassName?: string;
  menuClassName?: string;
  widthClassName?: string;
};

export type DataGridPagination = {
  page: number;
  hasNext: boolean;
  onPageChange: (nextPage: number) => void;
  pageLabel?: (ctx: { page: number; hasNext: boolean }) => ReactNode;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
};

export type DataGridSelection = {
  selectedRowKeys: string[];
  onSelectedRowKeysChange: (next: string[]) => void;
  showSelectAll?: boolean;
  rowAriaLabel?: (rowKey: string) => string;
  headerAriaLabel?: string;
  isRowDisabled?: (rowKey: string) => boolean;
};

type Props<T> = {
  columns: DataGridColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T, index: number) => string);
  actions?: DataGridActions<T>;
  selection?: DataGridSelection;
  className?: string;
  tableClassName?: string;
  emptyMessage?: ReactNode;
  pagination?: DataGridPagination;
};

function resolveCell<T>(column: DataGridColumn<T>, row: T): ReactNode {
  if (column.render) return column.render(row);

  if (typeof column.accessor === 'function') {
    const value = column.accessor(row);
    return value == null ? null : String(value);
  }

  if (column.accessor) {
    const value = row[column.accessor];
    return value == null ? null : String(value);
  }

  return null;
}

function resolveAlignClass(align: DataGridAlign = 'left') {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function resolveJustifyClass(justify?: DataGridJustify, align: DataGridAlign = 'left') {
  if (justify === 'center') return 'justify-center';
  if (justify === 'end') return 'justify-end';
  if (justify === 'start') return 'justify-start';

  if (align === 'center') return 'justify-center';
  if (align === 'right') return 'justify-end';
  return 'justify-start';
}

const DataGrid = <T,>({
  columns,
  data,
  rowKey,
  actions,
  selection,
  className,
  tableClassName,
  emptyMessage = 'No data',
  pagination,
}: Props<T>) => {
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);

  const resolvedRowKeys = useMemo(
    () =>
      data.map((row, index) => {
        if (typeof rowKey === 'function') return rowKey(row, index);
        const value = row[rowKey];
        return value == null ? `${index}` : String(value);
      }),
    [data, rowKey]
  );

  const selectedKeySet = useMemo(() => new Set(selection?.selectedRowKeys ?? []), [selection?.selectedRowKeys]);

  const selectableRowKeys = useMemo(
    () => (selection ? resolvedRowKeys.filter((key) => !selection.isRowDisabled?.(key)) : resolvedRowKeys),
    [resolvedRowKeys, selection]
  );

  const allVisibleSelected = selectableRowKeys.length > 0 && selectableRowKeys.every((key) => selectedKeySet.has(key));
  const someVisibleSelected = selectableRowKeys.some((key) => selectedKeySet.has(key));

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate = !allVisibleSelected && someVisibleSelected;
  }, [allVisibleSelected, someVisibleSelected]);

  const colCount = columns.length + (actions ? 1 : 0) + (selection ? 1 : 0);

  const handleToggleAll = () => {
    if (!selection) return;
    if (selectableRowKeys.length === 0) return;
    if (allVisibleSelected) {
      const next = selection.selectedRowKeys.filter((key) => !selectableRowKeys.includes(key));
      selection.onSelectedRowKeysChange(next);
      return;
    }
    const next = Array.from(new Set([...selection.selectedRowKeys, ...selectableRowKeys]));
    selection.onSelectedRowKeysChange(next);
  };

  const handleToggleRow = (key: string, isDisabled: boolean) => {
    if (!selection) return;
    if (isDisabled) return;
    if (selectedKeySet.has(key)) {
      selection.onSelectedRowKeysChange(selection.selectedRowKeys.filter((it) => it !== key));
      return;
    }
    selection.onSelectedRowKeysChange([...selection.selectedRowKeys, key]);
  };

  return (
    <div
      className={[
        'w-full overflow-hidden rounded-2xl border border-[var(--color-secondary-outline)] bg-[var(--color-primary-white)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="w-full overflow-x-auto">
        <table className={['w-full table-auto border-collapse', tableClassName].filter(Boolean).join(' ')}>
          <thead>
            <tr className="border-b border-[var(--color-secondary-outline)]">
              {selection ? (
                <th className="w-[56px] p-0 text-center align-middle">
                  {selection.showSelectAll === false ? null : (
                    <div className="flex h-14 items-center justify-center px-4">
                      <span className="relative inline-flex items-center justify-center h-6 w-6">
                        <input
                          ref={headerCheckboxRef}
                          type="checkbox"
                          checked={allVisibleSelected}
                          onChange={handleToggleAll}
                          disabled={selectableRowKeys.length === 0}
                          aria-label={selection.headerAriaLabel ?? 'Select all rows'}
                          className="
                            peer
                            h-6 w-6
                            rounded-lg
                            border
                            border-[var(--color-secondary-outline)]
                            appearance-none
                            cursor-pointer
                            checked:border-[var(--color-primary-purple)]
                            checked:bg-[var(--color-primary-white)]
                            transition-colors
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                          "
                        />
                        <svg
                          viewBox="0 0 16 16"
                          className="
                            pointer-events-none
                            absolute
                            h-3 w-3
                            opacity-0
                            peer-checked:opacity-100
                          "
                        >
                          <path
                            d="M3 8.5L6.5 12L13 4"
                            fill="none"
                            stroke="var(--color-primary-purple)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </th>
              ) : null}

              {columns.map((column) => {
                const alignClass = resolveAlignClass(column.align);
                const isSortable = Boolean(column.sortable && column.onSort);
                const sortIndicator =
                  column.sortDirection === 'asc' ? ' ↑' : column.sortDirection === 'desc' ? ' ↓' : '';

                return (
                  <th
                    key={column.id}
                    className={[
                      'p-0 text-sm font-semibold text-[var(--color-primary-black)] align-middle',
                      alignClass,
                      column.headerClassName,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div
                      className={[
                        'flex h-14 items-center px-6',
                        resolveJustifyClass(column.headerJustify ?? column.justify, column.align),
                        column.headerContentClassName,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          onClick={column.onSort}
                          className="inline-flex items-center gap-1 hover:text-[var(--color-primary-purple)]"
                        >
                          <span>{column.header}</span>
                          <span>{sortIndicator}</span>
                        </button>
                      ) : (
                        column.header
                      )}
                    </div>
                  </th>
                );
              })}

              {actions ? (
                <th className="p-0 text-center text-sm font-semibold text-[var(--color-primary-black)] align-middle">
                  <div
                    className={['flex h-14 items-center justify-center px-6', actions.widthClassName]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {actions.header ?? 'Actions'}
                  </div>
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                const key = resolvedRowKeys[index];

                return (
                  <tr key={key} className="h-14 border-b border-[var(--color-secondary-outline)] last:border-b-0">
                    {selection ? (
                      <td className="w-[56px] p-0 text-center align-middle">
                        <span className="relative inline-flex h-14 w-full items-center justify-center">
                          <input
                            type="checkbox"
                            checked={selectedKeySet.has(key)}
                            onChange={() => handleToggleRow(key, Boolean(selection.isRowDisabled?.(key)))}
                            disabled={Boolean(selection.isRowDisabled?.(key))}
                            aria-label={selection.rowAriaLabel?.(key) ?? `Select row ${key}`}
                            className="
                              peer
                              h-6 w-6
                              rounded-lg
                              border
                              border-[var(--color-secondary-outline)]
                              appearance-none
                              cursor-pointer
                              checked:border-[var(--color-primary-purple)]
                              checked:bg-[var(--color-primary-white)]
                              transition-colors
                              disabled:opacity-50
                              disabled:cursor-not-allowed
                            "
                          />
                          <svg
                            viewBox="0 0 16 16"
                            className="
                              pointer-events-none
                              absolute
                              h-3 w-3
                              opacity-0
                              peer-checked:opacity-100
                            "
                          >
                            <path
                              d="M3 8.5L6.5 12L13 4"
                              fill="none"
                              stroke="var(--color-primary-purple)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </td>
                    ) : null}

                    {columns.map((column) => {
                      const alignClass = resolveAlignClass(column.align);
                      return (
                        <td
                          key={`${key}-${column.id}`}
                          className={[
                            'p-0 text-sm text-[var(--color-primary-black)] align-middle',
                            alignClass,
                            column.className,
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <div
                            className={[
                              'flex h-14 items-center px-6',
                              resolveJustifyClass(column.justify, column.align),
                              column.contentClassName,
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            {resolveCell(column, row)}
                          </div>
                        </td>
                      );
                    })}

                    {actions ? (
                      <td
                        className={['p-0 text-center align-middle', actions.widthClassName].filter(Boolean).join(' ')}
                      >
                        <OverflowMenu
                          items={actions.items(row)}
                          align={actions.align ?? 'end'}
                          side={actions.side ?? 'bottom'}
                          triggerClassName={[
                            'inline-flex h-14 w-full items-center justify-center',
                            actions.triggerClassName,
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          menuClassName={actions.menuClassName}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-6 py-10 text-center text-sm text-[var(--color-secondary-grey-fonts)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <footer className="flex items-center justify-end gap-4 border-t border-[var(--color-secondary-outline)] px-6 py-4">
          <span className="text-sm text-[var(--color-primary-black)]">
            {pagination.pageLabel?.({ page: pagination.page, hasNext: pagination.hasNext }) ??
              `Page ${pagination.page + 1}`}
          </span>
          <div className="flex items-center gap-1 text-[var(--color-primary-black)]">
            <button
              type="button"
              onClick={() => pagination.onPageChange(0)}
              disabled={pagination.page <= 0}
              aria-label="First page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft double sizePx={18} />
            </button>
            <button
              type="button"
              onClick={() => pagination.onPageChange(Math.max(0, pagination.page - 1))}
              disabled={pagination.page <= 0}
              aria-label="Previous page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft sizePx={18} />
            </button>
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              aria-label="Next page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight sizePx={18} />
            </button>
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              aria-label="Last page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight double sizePx={18} />
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  );
};

export default DataGrid;
