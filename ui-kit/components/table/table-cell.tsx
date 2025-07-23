import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './table-cell.module.css';
import { IconChevronRight } from '@/ui-kit/components';

type TableCellProps = {
  className?: string;
  align?: 'left' | 'center' | 'right';
  headScope?: 'col' | 'row';
  children: ReactNode;
  nestingLevel?: number;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
};

const TableCell = ({
  align,
  headScope,
  children,
  nestingLevel,
  isExpandable,
  isExpanded,
  className,
  onClick,
}: TableCellProps) => {
  const El = headScope ? 'th' : 'td';

  return (
    <El
      className={clsx(
        className,
        styles.root,
        styles[`_align_${align}`],
        isExpandable && styles._expandable,
        isExpandable && isExpanded && styles._expanded,
      )}
      scope={headScope}
      onClick={onClick}
    >
      <div className={styles.__cellWrapper}>
        {nestingLevel !== undefined && (
          <div
            className={styles.__tabulation}
            style={{ paddingLeft: `calc(var(--size-lg) * ${nestingLevel})` }}
          >
            {isExpandable && <IconChevronRight className={styles.__chevron} />}
          </div>
        )}
        <div className={styles.__content}>{children}</div>
      </div>
    </El>
  );
};

export { TableCell };
export type { TableCellProps };
