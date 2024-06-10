import Typography from '@mui/material/Typography';

export const NoChannels = () => (
  <Typography variant="subtitle2">
    {t('dashboard.oChannels', 'No channels to assign. Please first assign them for the product.')}
  </Typography>
);
