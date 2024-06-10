import type { IconButtonProps } from '@core/ui/components/buttons/IconButton';
import IconButton from '@core/ui/components/buttons/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import styles from './index.module.css';

interface NavIconButtonProps extends IconButtonProps {
  icon: 'login' | 'user' | 'bag' | 'spyglass' | 'menu' | 'close';
  counter?: number;
}

const getIcon = (iconName: NavIconButtonProps['icon']) => {
  switch (iconName) {
    case 'login':
      return <LoginIcon />;
    case 'user':
      return <PersonIcon />;
    case 'bag':
      return <ShoppingBasketIcon />;
    case 'spyglass':
      return <SearchIcon />;
    case 'menu':
      return <MenuIcon />;
    case 'close':
      return <CloseIcon />;
    default:
      return iconName;
  }
};

function NavIconButton({ icon, counter, ...rest }: NavIconButtonProps) {
  return (
    <IconButton type="button" className={styles['nav-icon-button'] ?? ''} {...rest}>
      {getIcon(icon)}
      {!!counter && <span className={styles['nav-icon-counter'] ?? ''}>{counter}</span>}
    </IconButton>
  );
}

export default NavIconButton;
