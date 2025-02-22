import * as m from '@paraglide/messages';
import RefreshIcon from '@mui/icons-material/Refresh';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import type { FC, ReactNode } from 'react';

export interface FilterCardProps {
  children: ReactNode;
  handleClear();
}

const FilterCard: FC<FilterCardProps> = ({ children, handleClear }) => {
  return (
    <Card>
      <form>
        <CardHeader
          action={
            <IconButton color="secondary" onClick={handleClear}>
              <RefreshIcon />
            </IconButton>
          }
          title={m.dashboard_SOvI_() ?? 'Filters'}
        />
        <CardContent>{children}</CardContent>
      </form>
    </Card>
  );
};
FilterCard.displayName = 'FilterCard';
export default FilterCard;
