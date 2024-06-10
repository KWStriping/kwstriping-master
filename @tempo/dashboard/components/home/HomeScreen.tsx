import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

interface HomeScreenProps {
  user: {
    email: string;
  };
}

export const HomeScreen: FC<HomeScreenProps> = ({ user }) => {
  return (
    <Container>
      <PageHeader
        title={m.dashboard_y_ZBp({ userName: user.email }) ?? 'Hello there, {userName}'}
      />
      <Card>
        <CardTitle
          title={
            m.dashboard_L_Fy_() ?? 'Disclaimer'
            // header
          }
        />
        <CardContent>
          <Typography>
            <>
              {m.dashboard_LRkEs() ??
                'The new dashboard and the GraphQL API are preview-quality software.'}
            </>
          </Typography>
          <Typography>
            <>
              {m.dashboard__mu_y() ??
                'The GraphQL API is beta quality. It is not fully optimized and some mutations or queries may be missing.'}
            </>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
