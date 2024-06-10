import Button from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import PlusSmallIcon from '@mui/icons-material/Add';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import FullScreenIcon from '@tempo/dashboard/oldSrc/icons/FullScreenIcon';
import clsx from 'clsx';
import type { MouseEventHandler, FC, PropsWithChildren, ReactNode } from 'react';
import styles from './index.module.css';

interface ButtonFullScreenProps {
  isOpen: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const ButtonFullScreen: FC<ButtonFullScreenProps> = ({ isOpen, onToggle }) => {
  return (
    <IconButton
      data-test-id="button-exit-fullscreen"
      onClick={onToggle}
      title={isOpen ? 'Exit full screen' : 'Full screen'}
    >
      <FullScreenIcon className={clsx(isOpen && 'rotate-180')} />
    </IconButton>
  );
};

interface ButtonAddRowProps {
  onAddRow: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const ButtonAddRow: FC<ButtonAddRowProps> = ({ onAddRow, children }) => {
  return (
    <Button
      data-test-id="button-add-variant"
      className={styles.headerBtn ?? ''}
      variant="text"
      onClick={onAddRow}
    >
      <PlusSmallIcon />
      {children}
    </Button>
  );
};

interface HeaderProps {
  title: string;
}

interface GridHeader extends FC<PropsWithChildren<HeaderProps>> {
  ButtonFullScreen: typeof ButtonFullScreen;
  ButtonAddRow: typeof ButtonAddRow;
}

const Header: GridHeader = ({ title, children }) => {
  return (
    <CardTitle
      title={title}
      toolbar={<div className={'flex flex-row-reverse gap-1'}>{children}</div>}
    />
  );
};

Header.ButtonFullScreen = ButtonFullScreen;
Header.ButtonAddRow = ButtonAddRow;

export { Header };
