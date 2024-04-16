import type { ClassNames } from '@core/types';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';
import type { FC } from 'react';

import labelStyles from '../Label/Label.module.css';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  label?: string;
  classNames?: ClassNames<'container' | 'toggle' | 'label'>;
  onChange(checked: boolean): void;
}

export const Switch: FC<SwitchProps> = ({ checked = false, label, classNames, onChange }) => (
  <div className={classNames?.container}>
    <HeadlessSwitch.Group>
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={clsx(styles.toggle, checked && styles['toggle-active'], classNames?.toggle)}
      >
        <span aria-hidden="true" className={clsx(styles.dot, checked && styles['dot-active'])} />
      </HeadlessSwitch>
      {label && (
        <HeadlessSwitch.Label
          className={clsx(labelStyles.label, styles.label ?? '', classNames?.label)}
        >
          {label}
        </HeadlessSwitch.Label>
      )}
    </HeadlessSwitch.Group>
  </div>
);
