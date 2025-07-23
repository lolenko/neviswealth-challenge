import { ReactNode } from 'react';
import styles from './legend-entry.module.css';
import clsx from 'clsx';
import { Stack } from '@/ui-kit/components';

type LegendEntryProps = {
  className?: string;
  color: string;
  children: ReactNode;
};

const LegendEntry = ({ color, children, className }: LegendEntryProps) => {
  return (
    <Stack
      size="xs"
      direction="row"
      alignItems="center"
      className={clsx(className)}
    >
      <span
        className={styles.__icon}
        style={{ backgroundColor: color }}
        role="presentation"
      />
      {children}
    </Stack>
  );
};

export { LegendEntry };
