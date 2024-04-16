import type { MenuItemWithChildrenFragment } from '@core/api';
import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export interface LayoutProps {
  children?: ReactNode;
  logo: ReactNode;
  navbarHeight?: string;
  navbarItems: Maybe<Omit<MenuItemWithChildrenFragment, '__typename'>[]>;
  transparentBg?: boolean;
}

export const NAVBAR_HEIGHT = '7rem';

export function Layout({
  logo,
  navbarItems,
  children,
  navbarHeight = NAVBAR_HEIGHT,
}: LayoutProps) {
  return (
    <>
      <Navbar logo={logo} height={navbarHeight} items={navbarItems} />
      <div
        className={`grow flex flex-col shrink-0 align-middle justify-center items-center`}
        style={{
          /* TODO: use CSS var for navbar height? */
          minHeight: `calc(100% - ${navbarHeight})`,
          backgroundImage: `url("/hp_bg.jpg")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* https://fkhadra.github.io/react-toastify/introduction */}
        <ToastContainer />
        <div className="flex flex-col grow items-center w-full pt-1">{children}</div>
        <Footer logo={logo} />
      </div>
    </>
  );
}

export default Layout;
