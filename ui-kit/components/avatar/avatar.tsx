import styles from './avatar.module.css';
import clsx from 'clsx';
import { getColorFromString, getInitialsFromName } from '@/utils/user';

type AvatarProps = {
  src?: string;
  name: string;
  showName?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

const Avatar = ({
  src,
  name,
  size = 'md',
  className,
  showName,
}: AvatarProps) => {
  const initials = !src ? getInitialsFromName(name) : undefined;
  const backgroundColor = !src ? getColorFromString(initials) : undefined;

  return (
    <span className={clsx(className, styles.root, styles[`_size_${size}`])}>
      {src ? (
        <img className={styles.__image} src={src} alt={name} />
      ) : (
        <span
          className={styles.__initials}
          style={{ backgroundColor }}
          role="img"
          aria-label={name}
        >
          {initials}
        </span>
      )}
      {showName && name}
    </span>
  );
};

export { Avatar };
