import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';

export const NoChannels = () => (
  <Typography variant="subtitle2">
    {m.dashboard_oChannels() ??
      'No channels to assign. Please first assign them for the product.'}
  </Typography>
);
