import { useTranslation } from '@core/i18n';
import { NavigationCard } from '@core/ui/components/Layout/NavigationCard';
import { makeStyles } from '@core/ui/theme/styles';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { UserFragment } from '@core/api/graphql';
import type { MenuSection } from '@dashboard/oldSrc/configuration/types';
import { hasUserMenuItemPermissions } from '@dashboard/oldSrc/configuration/utils';
import { sectionNames } from '@dashboard/oldSrc/intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    configurationCategory: {
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      borderTop: `solid 1px ${theme.vars.palette.divider}`,
      display: 'grid',
      gap: theme.spacing(4),
      gridTemplateColumns: '1fr 3fr',
      padding: theme.spacing(4, 0),
    },

    configurationItem: {
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      display: 'grid',
      gap: theme.spacing(4),
      gridTemplateColumns: '1fr 1fr',
    },
    configurationLabel: {
      paddingBottom: 20,
    },

    link: {
      display: 'contents',
      marginBottom: theme.spacing(4),
    },
    icon: {
      '& path': {
        fill: theme.vars.palette.primary.main,
      },
      fontSize: 48,
    },
    sectionDescription: {},
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as const,
    },
  }),
  { name: 'ConfigurationPage' }
);

export interface ConfigurationPageProps {
  menu: MenuSection[];
  user: Maybe<UserFragment>;
}

export const ConfigurationPage: FC<ConfigurationPageProps> = ({ menu: menus, user }) => {
  // const styles = useStyles({});
  const styles = {};
  const { t } = useTranslation();
  return (
    <Container>
      <PageHeader
        title={t('dashboard.configuration', sectionNames.configuration.defaultMessage)}
      ></PageHeader>
      {menus
        .filter((menu) =>
          menu.menuItems.some((menuItem) => hasUserMenuItemPermissions(menuItem, user))
        )
        .map((menu, menuIndex) => (
          <div className={styles.configurationCategory ?? ''} key={menuIndex}>
            <div className={styles.configurationLabel ?? ''}>
              <Typography>{menu.label}</Typography>
            </div>
            <div className={styles.configurationItem ?? ''}>
              {menu.menuItems
                .filter((menuItem) => hasUserMenuItemPermissions(menuItem, user))
                .map((item, itemIndex) => (
                  <Link key={itemIndex} className={styles.link ?? ''} href={item.url as string}>
                    <NavigationCard
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      data-test-id={
                        item.testId + '-settings-subsection-' + item.title.toLowerCase()
                      }
                    />
                  </Link>
                ))}
            </div>
          </div>
        ))}
    </Container>
  );
};
ConfigurationPage.displayName = 'ConfigurationPage';
export default ConfigurationPage;
