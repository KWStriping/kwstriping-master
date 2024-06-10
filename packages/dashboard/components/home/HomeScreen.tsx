import { useTranslation } from '@core/i18n';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';
import PageHeader from '@dashboard/components/core/PageHeader';

interface HomeScreenProps {
  user: {
    email: string;
  };
}

export const HomeScreen: FC<HomeScreenProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader
        title={t('dashboard.y5ZBp', 'Hello there, {userName}', { userName: user.email })}
      />
      <Card>
        <CardTitle
          title={t(
            'dashboard.L6Fy2',
            'Disclaimer'
            // header
          )}
        />
        <CardContent>
          <Typography>
            <>
              {t(
                'dashboard.LRkEs',
                'The new dashboard and the GraphQL API are preview-quality software.'
              )}
            </>
          </Typography>
          <Typography>
            <>
              {t(
                'dashboard.7mu0y',
                'The GraphQL API is beta quality. It is not fully optimized and some mutations or queries may be missing.'
              )}
            </>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
