import { ReactNode } from 'react';
import styles from './heading.module.css';
import clsx from 'clsx';

type HeadingProps = {
  className?: string;
  level?: 1 | 2;
  children: ReactNode;
};

const Heading = ({ className, level = 1, children }: HeadingProps) => {
  const El = `h${level}` as const;

  return (
    <El className={clsx(className, styles.root, styles[`_level_${level}`])}>
      {children}
    </El>
  );
};

export { Heading };
