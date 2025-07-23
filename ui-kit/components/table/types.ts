import { ReactNode } from 'react';

type Key = string | number;

type TableRowExpandedState = Set<Key>;

type TableRowData = Record<string, unknown>;

type TableRowState = {
  isExpandable: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  nestingLevel: number;
};

type TableColumnWidth = number | `${number}px` | `${number}%` | 'auto';

type TableColumnDef<T extends TableRowData> = {
  key: Key;
  header?: ReactNode;
  cell: (row: T, state: TableRowState) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: TableColumnWidth;
};

type TableRowClickParams<T extends TableRowData> = {
  rowKey: Key;
  columnKey: Key;
  row: T;
  rowState: TableRowState;
};

type BaseTableRowProps<T extends TableRowData> = {
  data: T[];
  columns: TableColumnDef<T>[];
  getSubRows?: (row: T) => T[];
  rowKey:
    | {
        [K in keyof T]: T[K] extends Key ? K : never;
      }[keyof T]
    | ((row: T) => Key);
  rowHeaderKey?: Key;
  onRowClick?: (params: TableRowClickParams<T>) => void;
  isRowClickable?: (row: T) => boolean;
  selectedRow?: Key;
};

type TableRowsProps<T extends TableRowData> = BaseTableRowProps<T> & {
  nestingLevel?: number;
  expanded?: TableRowExpandedState;
  toggleExpanded?: (key: Key) => void;
};

type TableProps<T extends TableRowData> = BaseTableRowProps<T> & {
  className?: string;
  defaultExpanded?: TableRowExpandedState;
  noWrap?: boolean;
};

export {
  TableColumnDef,
  TableRowData,
  TableRowState,
  TableRowsProps,
  TableProps,
  TableRowClickParams,
  Key,
};
