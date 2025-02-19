import type { TaxedMoney } from '@tempo/api';

export type GrossMoney = Pick<TaxedMoney, 'gross'>;
export type GrossMoneyWithTax = Pick<TaxedMoney, 'gross' | 'tax'>;

export type FormDataBase = Record<string, any>;

export type ClassNames<Keys extends string> = Partial<Record<Keys, string>>;
