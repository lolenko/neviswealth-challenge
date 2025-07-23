import { ReactNode } from 'react';
import styles from './surface.module.css';
import clsx from 'clsx';

type Padding = 'sm' | 'md' | 'lg' | 'none';

type SurfaceProps = {
  className?: string;
  children: ReactNode;
  padding?: Padding;
  scroll?: boolean;
};

const Surface = ({
  className,
  children,
  padding = 'none',
  scroll,
}: SurfaceProps) => {
  return (
    <div
      className={clsx(
        className,
        styles.root,
        styles[`_padding_${padding}`],
        scroll && styles._scroll,
      )}
    >
      {children}
    </div>
  );
};

export { Surface };
