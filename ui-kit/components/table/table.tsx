import { useState } from 'react';
import { TableCell } from './table-cell';
import styles from './table.module.css';
import rowStyles from './table-rows.module.css';
import clsx from 'clsx';
import { TableProps, Key } from './types';
import { TableRows } from './table-rows';

const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  getSubRows,
  rowKey,
  defaultExpanded,
  className,
  rowHeaderKey,
  onRowClick,
  isRowClickable,
  selectedRow,
  noWrap,
}: TableProps<T>) => {
  const hasHeadRow = columns.filter((column) => column.header).length > 0;
  const [expanded, setExpanded] = useState(defaultExpanded ?? new Set<Key>());
  const toggleExpanded = (rowKey: Key) => {
    setExpanded((prevExpanded) => {
      const nextExpanded = new Set(prevExpanded);
      if (nextExpanded.has(rowKey)) {
        nextExpanded.delete(rowKey);
      } else {
        nextExpanded.add(rowKey);
      }
      return nextExpanded;
    });
  };

  return (
    <div className={clsx(styles.root, className, { [styles._noWrap]: noWrap })}>
      <table className={styles.__table}>
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
        {hasHeadRow && (
          <thead className={styles.__head}>
            <tr>
              {columns.map((column) => {
                const isRowHeader = column.key === rowHeaderKey;
                return (
                  <TableCell
                    className={clsx(isRowHeader && rowStyles.__rowHeader)}
                    key={column.key}
                    headScope="col"
                    align={column.align}
                  >
                    {column.header}
                  </TableCell>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          <TableRows
            data={data}
            getSubRows={getSubRows}
            columns={columns}
            expanded={expanded}
            rowKey={rowKey}
            toggleExpanded={toggleExpanded}
            rowHeaderKey={rowHeaderKey}
            onRowClick={onRowClick}
            selectedRow={selectedRow}
            isRowClickable={isRowClickable}
          />
        </tbody>
      </table>
    </div>
  );
};

export { Table };
