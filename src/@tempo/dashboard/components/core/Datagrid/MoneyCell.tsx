import type {
  CustomCell,
  CustomCellRenderer,
  ProvideEditorCallback,
} from '@glideapps/glide-data-grid';
import { getMiddleCenterBias } from '@glideapps/glide-data-grid';
import type { Locale } from '../Locale';
import { usePriceField } from '@tempo/dashboard/components/fields/PriceField/usePriceField';

interface MoneyCellProps {
  readonly kind: 'money-cell';
  readonly currency: string;
  readonly value: number | null;
}

export type MoneyCell = CustomCell<MoneyCellProps>;

const MoneyCellEdit: ReturnType<ProvideEditorCallback<MoneyCell>> = ({
  value: cell,
  onChange: onChangeBase,
}) => {
  const { onChange, onKeyDown, minValue, step } = usePriceField(cell.data?.currency, (event) =>
    onChangeBase({
      ...cell,
      data: {
        ...cell.data,
        value: event.target.value,
      },
    })
  );

  return (
    <input
      type="number"
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={cell.data?.value ?? ''}
      min={minValue}
      step={step}
      autoFocus
    />
  );
};

const getFractionDigits = (locale: Locale, currency: string) => {
  try {
    const numberFormat = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });

    return numberFormat.resolvedOptions().maximumFractionDigits;
  } catch (e) {
    return 2;
  }
};

export const moneyCellRenderer = (locale: Locale): CustomCellRenderer<MoneyCell> => ({
  isMatch: (c): c is MoneyCell => (c.data as unknown).kind === 'money-cell',
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { currency, value } = cell.data;
    const hasValue = value === 0 ? true : !!value;
    const currencyFractionDigits = getFractionDigits(locale, currency);
    const formatted =
      value?.toLocaleString(locale, {
        maximumFractionDigits: currencyFractionDigits,
        minimumFractionDigits: currencyFractionDigits,
      }) ?? '-';

    ctx.fillStyle = theme.textDark;
    ctx.textAlign = 'right';
    ctx.fillText(
      formatted,
      rect.x + rect.width - 8,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
    );

    ctx.save();
    ctx.fillStyle = theme.textMedium;
    ctx.textAlign = 'left';
    ctx.font = [theme.baseFontStyle.replace(/bold/g, 'normal'), theme.fontFamily].join(' ');
    ctx.fillText(
      hasValue ? currency : '-',
      rect.x + 8,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
    );
    ctx.restore();

    return true;
  },
  provideEditor: () => ({
    editor: MoneyCellEdit,
    disablePadding: true,
    deletedValue: (cell) => ({
      ...cell,
      copyData: '',
      data: {
        ...cell.data,
        value: cell.data?.value ?? null,
      },
    }),
  }),
  onPaste: (value, data) => ({
    ...data,
    value: parseFloat(value),
  }),
});
