import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import { List, ListHeader, ListItem, ListItemCell } from '@core/ui/components/list/List';
import CardTitle from '@dashboard/components/core/CardTitle';
import ListItemLink from '@dashboard/components/core/ListItemLink';
import type { TaxCountryConfigurationFragment } from '@core/api/graphql';
import { taxCountriesListUrl } from '@dashboard/oldSrc/taxes/urls';
import { isLastElement } from '@dashboard/oldSrc/taxes/utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

interface TaxCountriesMenuProps {
  configurations: TaxCountryConfigurationFragment[] | undefined;
  selectedCountryId: string;
  onCountryDelete: (countryId: string) => void;
  onCountryAdd: () => void;
}

export const TaxCountriesMenu: FC<TaxCountriesMenuProps> = ({
  configurations,
  selectedCountryId,
  onCountryDelete,
  onCountryAdd,
}) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.menu ?? ''}>
      <CardTitle
        title={t('dashboard.countryList', 'Country list')}
        toolbar={
          <Button onClick={onCountryAdd} color="secondary">
            {t('dashboard.addCountryLabel', 'Add country')}
          </Button>
        }
      />
      {configurations?.length === 0 ? (
        <CardContent className={styles.greyText ?? ''}>
          {t('dashboard.oCountriesAssigned', 'There are no countries assigned')}
        </CardContent>
      ) : (
        <List gridTemplate={['1fr']}>
          <ListHeader>
            <ListItem className={styles.tableRow ?? ''}>
              <ListItemCell>{t('dashboard.countryNameHeader', 'Country name')}</ListItemCell>
            </ListItem>
          </ListHeader>
          <Divider />
          {configurations?.map((config, configIndex) => (
            <Fragment key={config.country.code}>
              <ListItemLink
                className={clsx(
                  styles.clickable ?? '',
                  styles.tableRow ?? '',
                  config.country.code === selectedCountryId && styles.selected
                )}
                href={taxCountriesListUrl(config.country.code)}
              >
                <ListItemCell>
                  <div className={styles.spaceBetween ?? ''}>
                    {config.country.name}
                    <IconButton
                      color="secondary"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        onCountryDelete(config.country.code);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </ListItemCell>
              </ListItemLink>
              {!isLastElement(configurations, configIndex) && <Divider />}
            </Fragment>
          )) ?? <Skeleton />}
        </List>
      )}
    </Card>
  );
};

export default TaxCountriesMenu;
