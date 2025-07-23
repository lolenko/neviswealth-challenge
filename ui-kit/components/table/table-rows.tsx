import { TableRowData, TableRowsProps, TableRowState, Key } from './types';
import { Fragment } from 'react';
import clsx from 'clsx';
import styles from './table-rows.module.css';
import { TableCell } from './table-cell';

const TableRows = <T extends TableRowData>(props: TableRowsProps<T>) => {
  const {
    data,
    columns,
    getSubRows,
    rowKey,
    expanded,
    toggleExpanded,
    nestingLevel = 0,
    rowHeaderKey,
    onRowClick,
    isRowClickable: isRowClickableProp,
    selectedRow,
  } = props;

  return (
    <>
      {data.map((row) => {
        const key =
          typeof rowKey === 'function' ? rowKey(row) : (row[rowKey] as Key);
        const subRows = getSubRows?.(row);
        const hasSubRows = subRows?.length > 0;
        const isRowExpanded = hasSubRows && expanded.has(key);
        const isRowClickable = isRowClickableProp?.(row);
        const isRowSelected = selectedRow === key;
        const rowState: TableRowState = {
          isExpandable: hasSubRows,
          isExpanded: isRowExpanded,
          isSelected: isRowSelected,
          nestingLevel,
        };

        return (
          <Fragment key={key}>
            <tr
              aria-expanded={hasSubRows ? isRowExpanded : undefined}
              className={clsx(
                styles.__row,
                isRowSelected && styles.__row_selected,
                isRowClickable && styles.__row_clickable,
              )}
            >
              {columns.map((column) => {
                const isRowHeader = column.key === rowHeaderKey;
                const handleClick = () => {
                  if (hasSubRows && isRowHeader) {
                    toggleExpanded?.(key);
                  }
                  if (isRowClickable) {
                    onRowClick?.({
                      rowKey: key,
                      columnKey: column.key,
                      row,
                      rowState,
                    });
                  }
                };
                return (
                  <TableCell
                    className={clsx(isRowHeader && styles.__rowHeader)}
                    key={column.key}
                    align={column.align}
                    headScope={isRowHeader ? 'row' : undefined}
                    isExpandable={hasSubRows && isRowHeader}
                    onClick={handleClick}
                    nestingLevel={isRowHeader ? nestingLevel : undefined}
                    isExpanded={isRowExpanded}
                  >
                    {column.cell(row, rowState)}
                  </TableCell>
                );
              })}
            </tr>

            {isRowExpanded && (
              <TableRows
                {...props}
                data={subRows}
                nestingLevel={nestingLevel + 1}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export { TableRows };
