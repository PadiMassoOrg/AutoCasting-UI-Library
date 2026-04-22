import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { OverflowMenu } from '../../Actions/Menus/OverflowMenu';
import type { OverflowMenuAlign, OverflowMenuItem, OverflowMenuSide } from '../../Actions/Menus/OverflowMenu';
import { ChevronLeft, ChevronRight } from '../../Navigation/Indicators/Chevron';

type DataGridAlign = 'left' | 'center' | 'right';

export type DataGridColumn<T> = {
  id?: string;
  name?: keyof T;
  stringCode?: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  render?: (row: T) => ReactNode;
  width?: number | string;
  flex?: number;
  headerAlignment?: DataGridAlign;
  contentAlignment?: DataGridAlign;
  cellClassName?: string;
  headerCellClassName?: string;
  cellContentClassName?: string;
  headerContentClassName?: string;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: () => void;
};

export type DataGridActions<T> = {
  header?: ReactNode;
  items: (row: T) => OverflowMenuItem[];
  columnWidth?: number | string;
  align?: OverflowMenuAlign;
  side?: OverflowMenuSide;
  headerCellClassName?: string;
  cellClassName?: string;
  headerContentClassName?: string;
  triggerClassName?: string;
  menuClassName?: string;
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
  enableBulkSelection?: boolean;
  selection?: DataGridSelection;
  className?: string;
  tableClassName?: string;
  emptyMessage?: ReactNode;
  pagination?: DataGridPagination;
};

function resolveCell<T>(column: DataGridColumn<T>, row: T): ReactNode {
  if (column.render) return column.render(row);

  if (column.name) {
    const value = row[column.name];
    return value == null ? null : String(value);
  }

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

function resolveJustifyClass(align: DataGridAlign = 'left') {
  if (align === 'center') return 'justify-center';
  if (align === 'right') return 'justify-end';
  return 'justify-start';
}

function resolveColumnKey<T>(column: DataGridColumn<T>, index: number): string {
  if (column.id) return column.id;
  if (column.stringCode) return column.stringCode;
  if (column.name) return String(column.name);
  return `column-${index}`;
}

function resolveHeaderAlign<T>(column: DataGridColumn<T>): DataGridAlign {
  return column.headerAlignment ?? 'left';
}

function resolveContentAlign<T>(column: DataGridColumn<T>): DataGridAlign {
  return column.contentAlignment ?? 'left';
}

function resolveSizeValue(value?: number | string): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

function resolveColumnStyle<T>(column: DataGridColumn<T>, totalFlex: number): CSSProperties | undefined {
  const width = resolveSizeValue(column.width);
  if (width) {
    return { width, minWidth: width };
  }

  const columnFlex = column.flex ?? 1;
  if (columnFlex > 0 && totalFlex > 0) {
    return {
      width: `${(columnFlex / totalFlex) * 100}%`,
      minWidth: 'max-content',
    };
  }

  return { minWidth: 'max-content' };
}

function resolveFixedWidthStyle(width?: number | string): CSSProperties | undefined {
  const resolvedWidth = resolveSizeValue(width);
  if (!resolvedWidth) return undefined;
  return { width: resolvedWidth, minWidth: resolvedWidth };
}

function resolveActionsColumnStyle(width?: number | string): CSSProperties {
  if (width != null) return resolveFixedWidthStyle(width) ?? { width: '1%', minWidth: 'max-content' };
  return { width: '1%', minWidth: 'max-content' };
}

const DataGrid = <T,>({
  columns,
  data,
  rowKey,
  actions,
  enableBulkSelection = false,
  selection,
  className,
  tableClassName,
  emptyMessage = 'No data',
  pagination,
}: Props<T>) => {
  const selectionColumnClassName = 'w-[72px]';
  const leadingGutterColumnClassName = 'w-[24px]';
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<string[]>([]);

  const resolvedRowKeys = useMemo(
    () =>
      data.map((row, index) => {
        if (typeof rowKey === 'function') return rowKey(row, index);
        const value = row[rowKey];
        return value == null ? `${index}` : String(value);
      }),
    [data, rowKey]
  );

  const effectiveSelection = useMemo<DataGridSelection | undefined>(() => {
    if (!enableBulkSelection) return undefined;
    if (selection) return selection;

    return {
      selectedRowKeys: internalSelectedRowKeys,
      onSelectedRowKeysChange: setInternalSelectedRowKeys,
    };
  }, [enableBulkSelection, internalSelectedRowKeys, selection]);

  const selectedKeySet = useMemo(
    () => new Set(effectiveSelection?.selectedRowKeys ?? []),
    [effectiveSelection?.selectedRowKeys]
  );

  const selectableRowKeys = useMemo(
    () =>
      effectiveSelection ? resolvedRowKeys.filter((key) => !effectiveSelection.isRowDisabled?.(key)) : resolvedRowKeys,
    [effectiveSelection, resolvedRowKeys]
  );

  const allVisibleSelected = selectableRowKeys.length > 0 && selectableRowKeys.every((key) => selectedKeySet.has(key));
  const someVisibleSelected = selectableRowKeys.some((key) => selectedKeySet.has(key));

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate = !allVisibleSelected && someVisibleSelected;
  }, [allVisibleSelected, someVisibleSelected]);

  const showLeadingGutter = !effectiveSelection;
  const colCount = columns.length + (actions ? 1 : 0) + (effectiveSelection ? 1 : 0) + (showLeadingGutter ? 1 : 0);
  const totalFlex = useMemo(
    () => columns.reduce((acc, column) => acc + (column.width == null ? (column.flex ?? 1) : 0), 0),
    [columns]
  );

  const handleToggleAll = () => {
    if (!effectiveSelection) return;
    if (selectableRowKeys.length === 0) return;
    if (allVisibleSelected) {
      const next = effectiveSelection.selectedRowKeys.filter((key) => !selectableRowKeys.includes(key));
      effectiveSelection.onSelectedRowKeysChange(next);
      return;
    }
    const next = Array.from(new Set([...effectiveSelection.selectedRowKeys, ...selectableRowKeys]));
    effectiveSelection.onSelectedRowKeysChange(next);
  };

  const handleToggleRow = (key: string, isDisabled: boolean) => {
    if (!effectiveSelection) return;
    if (isDisabled) return;
    if (selectedKeySet.has(key)) {
      effectiveSelection.onSelectedRowKeysChange(effectiveSelection.selectedRowKeys.filter((it) => it !== key));
      return;
    }
    effectiveSelection.onSelectedRowKeysChange([...effectiveSelection.selectedRowKeys, key]);
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
              {effectiveSelection ? (
                <th className={[selectionColumnClassName, 'p-0 text-center align-middle'].join(' ')}>
                  {effectiveSelection.showSelectAll === false ? null : (
                    <div className="flex h-14 items-center justify-center px-4">
                      <span className="relative inline-flex items-center justify-center h-6 w-6">
                        <input
                          ref={headerCheckboxRef}
                          type="checkbox"
                          checked={allVisibleSelected}
                          onChange={handleToggleAll}
                          disabled={selectableRowKeys.length === 0}
                          aria-label={effectiveSelection.headerAriaLabel ?? 'Select all rows'}
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
              {showLeadingGutter ? (
                <th className={[leadingGutterColumnClassName, 'px-1 align-middle'].join(' ')} />
              ) : null}

              {columns.map((column, columnIndex) => {
                const columnKey = resolveColumnKey(column, columnIndex);
                const headerAlign = resolveHeaderAlign(column);
                const alignClass = resolveAlignClass(headerAlign);
                const isSortable = Boolean(column.sortable && column.onSort);
                const sortIndicator =
                  column.sortDirection === 'asc' ? ' ↑' : column.sortDirection === 'desc' ? ' ↓' : '';

                return (
                  <th
                    key={columnKey}
                    style={resolveColumnStyle(column, totalFlex)}
                    className={[
                      'p-0 text-sm font-semibold text-[var(--color-primary-black)] align-middle',
                      alignClass,
                      column.headerCellClassName,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div
                      className={[
                        'flex h-14 items-center px-2',
                        resolveJustifyClass(headerAlign),
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
                <th
                  style={resolveActionsColumnStyle(actions.columnWidth)}
                  className={[
                    'whitespace-nowrap p-0 text-center text-sm font-semibold text-[var(--color-primary-black)] align-middle',
                    actions.headerCellClassName,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div
                    className={['flex h-14 items-center justify-center px-4', actions.headerContentClassName]
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
                    {effectiveSelection ? (
                      <td className={[selectionColumnClassName, 'p-0 text-center align-middle'].join(' ')}>
                        <span className="relative inline-flex h-14 w-full items-center justify-center px-4">
                          <input
                            type="checkbox"
                            checked={selectedKeySet.has(key)}
                            onChange={() => handleToggleRow(key, Boolean(effectiveSelection.isRowDisabled?.(key)))}
                            disabled={Boolean(effectiveSelection.isRowDisabled?.(key))}
                            aria-label={effectiveSelection.rowAriaLabel?.(key) ?? `Select row ${key}`}
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
                    {showLeadingGutter ? (
                      <td className={[leadingGutterColumnClassName, 'p-0 align-middle'].join(' ')} />
                    ) : null}

                    {columns.map((column, columnIndex) => {
                      const columnKey = resolveColumnKey(column, columnIndex);
                      const contentAlign = resolveContentAlign(column);
                      const alignClass = resolveAlignClass(contentAlign);
                      return (
                        <td
                          key={`${key}-${columnKey}`}
                          style={resolveColumnStyle(column, totalFlex)}
                          className={[
                            'p-0 text-sm text-[var(--color-primary-black)] align-middle',
                            alignClass,
                            column.cellClassName,
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <div
                            className={[
                              'flex h-14 items-center px-2',
                              resolveJustifyClass(contentAlign),
                              column.cellContentClassName,
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
                        style={resolveActionsColumnStyle(actions.columnWidth)}
                        className={['whitespace-nowrap p-0 text-center align-middle', actions.cellClassName]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <OverflowMenu
                          items={actions.items(row)}
                          align={actions.align ?? 'end'}
                          side={actions.side ?? 'bottom'}
                          triggerClassName={[
                            'inline-flex h-14 w-full items-center justify-center px-4',
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
