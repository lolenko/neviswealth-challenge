import { ReactNode } from 'react';
import styles from './stack.module.css';
import clsx from 'clsx';

type StackProps = {
  children: ReactNode;
  className?: string;
  direction?: 'column' | 'row';
  size?: 'md' | 'xs' | 'sm';
  justifyContent?: 'start' | 'center' | 'end';
  alignItems?: 'center' | 'stretch';
};

const Stack = ({
  className,
  children,
  direction = 'column',
  size = 'md',
  justifyContent = 'start',
  alignItems = 'stretch',
}: StackProps) => {
  return (
    <div
      className={clsx(
        styles.root,
        className,
        styles[`_direction_${direction}`],
        styles[`_size_${size}`],
        styles[`_justifyContent_${justifyContent}`],
        styles[`_alignItems_${alignItems}`],
      )}
    >
      {children}
    </div>
  );
};

export { Stack };
