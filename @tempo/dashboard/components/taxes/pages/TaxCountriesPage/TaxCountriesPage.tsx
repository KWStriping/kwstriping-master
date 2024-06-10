import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { List, ListHeader, ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import { PageTab, PageTabs } from '@tempo/ui/components/PageTabs';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Grid from '@tempo/ui/components/Grid';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { parseQuery } from '@tempo/dashboard/components/orders/OrderCustomerAddressesEditDialog/utils';
import TaxInput from '@tempo/dashboard/components/taxes/TaxInput';
import type {
  CountryCode,
  TaxClassRateInput,
  TaxCountryConfigurationFragment,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { isLastElement } from '@tempo/dashboard/oldSrc/taxes/utils/utils';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
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
            <PageHeader title={m.dashboard_taxes() ?? 'Taxes'} />
            <PageTabs value="countries" onChange={handleTabChange}>
              <PageTab label={m.dashboard_channelsSection() ?? 'Channels'} value="channels" />
              <PageTab label={m.dashboard_countriesSection() ?? 'Countries'} value="countries" />
              <PageTab
                label={m.dashboard_taxClassesSection() ?? 'Tax classes'}
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
                      m.dashboard_taxClassRatesHeader({
                        country: currentCountry?.country?.country,
                      }) ?? '{{country}} class rates'
                    ) : (
                      <Skeleton />
                    )
                  }
                />
                {countryTaxesData?.length === 0 ? (
                  <CardContent className={styles.greyText ?? ''}>
                    {m.dashboard_addCountryToAccessClass() ?? 'Add country to access tax classes'}
                  </CardContent>
                ) : (
                  <>
                    <CardContent>
                      <TextField
                        value={query}
                        variant="outlined"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={m.dashboard_searchTaxClasses() ?? 'Search tax classes'}
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
                          <ListItemCell>{m.dashboard_taxNameHeader() ?? 'Tax name'}</ListItemCell>
                          <ListItemCell className={styles.right ?? ''}>
                            {m.dashboard_taxRateHeader() ?? 'Tax rate'}
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
