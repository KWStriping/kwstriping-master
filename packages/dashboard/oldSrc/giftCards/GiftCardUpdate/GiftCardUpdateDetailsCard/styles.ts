import { makeStyles } from '@core/ui/theme/styles';
export const useGiftCardDetailsBalanceStyles = makeStyles(
  (theme) => ({
    labelsContainer: {
      display: 'flex',
      alignItems: 'baseline',
    },
    wideContainer: {
      justifyContent: 'space-between',
    },
    balanceBar: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: 36,
      padding: '0 4px',
      backgroundColor: theme.vars.palette.background.default,
      borderRadius: 18,
    },
    balanceBarProgress: {
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.vars.palette.primary.light,
    },
  }),
  { name: 'GiftCardUpdateDetailsBalanceSection' }
);
