import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { List, ListHeader, ListItem, ListItemCell } from '@core/ui/components/list/List';
import { PageTab, PageTabs } from '@core/ui/components/PageTabs';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { parseQuery } from '@dashboard/components/orders/OrderCustomerAddressesEditDialog/utils';
import TaxInput from '@dashboard/components/taxes/TaxInput';
import type {
  CountryCode,
  TaxClassRateInput,
  TaxCountryConfigurationFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { isLastElement } from '@dashboard/oldSrc/taxes/utils/utils';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { Fragment, useMemo, useState } from 'react';

import TaxCountriesForm from './form';
import TaxCountriesMenu from './TaxCountriesMenu';

export interface TaxCountriesPageProps {
  countryTaxesData: TaxCountryConfigurationFragment[] | undefined;
  selectedCountryId: string;
  handleTabChange: (tab: string) => void;
  openDialog: (action?: string) => void;
  onSubmit: (input: TaxClassRateInput[]) => SubmitPromise;
  onDeleteConfiguration: (countryCode: CountryCode) => SubmitPromise;
  savebarState: ConfirmButtonTransitionState;
  disabled: boolean;
}

export const TaxCountriesPage: FC<TaxCountriesPageProps> = (props) => {
  const {
    countryTaxesData,
    selectedCountryId,
    handleTabChange,
    openDialog,
    onSubmit,
    onDeleteConfiguration,
    savebarState,
    disabled,
  } = props;
  const { t } = useTranslation();
  const router = useRouter();

  const [query, setQuery] = useState('');

  const currentCountry = useMemo(
    () => countryTaxesData?.find((country) => country.country.code === selectedCountryId),
    [selectedCountryId, countryTaxesData]
  );

  return (
    <TaxCountriesForm country={currentCountry} onSubmit={onSubmit} disabled={disabled}>
      {({ data, handlers, submit }) => {
        const filteredRates = data?.filter(
          (rate) => rate.label.search(new RegExp(parseQuery(query), 'i')) >= 0
        );

        return (
          <Container>
            <PageHeader title={t('dashboard.taxes', 'Taxes')} />
            <PageTabs value="countries" onChange={handleTabChange}>
              <PageTab label={t('dashboard.channelsSection', 'Channels')} value="channels" />
              <PageTab label={t('dashboard.countriesSection', 'Countries')} value="countries" />
              <PageTab
                label={t('dashboard.taxClassesSection', 'Tax classes')}
                value="tax-classes"
              />
            </PageTabs>
            <Grid variant="inverted">
              <TaxCountriesMenu
                configurations={countryTaxesData}
                selectedCountryId={selectedCountryId}
                onCountryDelete={onDeleteConfiguration}
                onCountryAdd={() => openDialog('add-country')}
              />
              <Card>
                <CardTitle
                  title={
                    currentCountry ? (
                      t('dashboard.taxClassRatesHeader', '{{country}} class rates', {
                        country: currentCountry?.country?.country,
                      })
                    ) : (
                      <Skeleton />
                    )
                  }
                />
                {countryTaxesData?.length === 0 ? (
                  <CardContent className={styles.greyText ?? ''}>
                    {t('dashboard.addCountryToAccessClass', 'Add country to access tax classes')}
                  </CardContent>
                ) : (
                  <>
                    <CardContent>
                      <TextField
                        value={query}
                        variant="outlined"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('dashboard.searchTaxClasses', 'Search tax classes')}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{ className: styles.inputPadding }}
                      />
                    </CardContent>
                    <List gridTemplate={['5fr 2fr']}>
                      <ListHeader>
                        <ListItem>
                          <ListItemCell>{t('dashboard.taxNameHeader', 'Tax name')}</ListItemCell>
                          <ListItemCell className={styles.right ?? ''}>
                            {t('dashboard.taxRateHeader', 'Tax rate')}
                          </ListItemCell>
                        </ListItem>
                      </ListHeader>
                      <Divider />
                      {filteredRates?.map((rate, rateIndex) => (
                        <Fragment key={rate.id}>
                          <ListItem hover={false} className={styles.noDivider ?? ''}>
                            <ListItemCell>{rate.label}</ListItemCell>
                            <ListItemCell>
                              <TaxInput
                                placeholder={data[0]?.rate}
                                value={rate?.value}
                                change={(e) => handlers.handleRateChange(rate.id, e.target.value)}
                              />
                            </ListItemCell>
                          </ListItem>
                          {!isLastElement(filteredRates, rateIndex) && <Divider />}
                        </Fragment>
                      )) ?? <Skeleton />}
                    </List>
                  </>
                )}
              </Card>
            </Grid>
            <SaveBar
              state={savebarState}
              disabled={disabled}
              onSubmit={submit}
              onCancel={() => router.push('/configuration')}
            />
          </Container>
        );
      }}
    </TaxCountriesForm>
  );
};

export default TaxCountriesPage;
