import Logo from '@tempo/ui/components/Layout/Logo';
import BackgroundArt from '@tempo/dashboard/assets/images/login-background.svg';
import type { FC, ReactNode } from 'react';
import styles from './Layout.module.css';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.root ?? ''}>
      <div
        className={
          'xs:max-sm:p-2 flex flex-col h-screen justify-center w-full pt-5 pb-4 px-6 bg-background-paper'
        }
      >
        <div className={'relative h-[40px] flex mb-4 shrink'}>
          <Logo />
        </div>
        <div className={styles.mainPanelContent ?? ''}>{children}</div>
      </div>
      <div className={'hidden md:flex items-center justify-center'}>
        <BackgroundArt className={styles.sidebarArt ?? ''} />
      </div>
    </div>
  );
};

AuthLayout.displayName = 'Layout';
export default AuthLayout;
