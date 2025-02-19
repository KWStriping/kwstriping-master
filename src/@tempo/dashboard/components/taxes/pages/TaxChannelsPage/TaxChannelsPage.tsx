import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { List, ListHeader, ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import { PageTab, PageTabs } from '@tempo/ui/components/PageTabs';
import Grid from '@tempo/ui/components/Grid';
import { TaxCalculationStrategy } from '@tempo/api/generated/constants';
import type {
  CountryCode,
  CountryFragment,
  TaxConfigurationFragment,
  TaxConfigurationPerCountryFragment,
  TaxConfigurationUpdateInput,
} from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import TaxChannelsMenu from './TaxChannelsMenu';
import TaxCountryExceptionListItem from './TaxCountryExceptionListItem';
import TaxSettingsCard from './TaxSettingsCard';
import { isLastElement } from '@tempo/dashboard/oldSrc/taxes/utils/utils';
import TaxCountryDialog from '@tempo/dashboard/components/taxes/TaxCountryDialog';
import Form from '@tempo/dashboard/components/forms/Form';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface TaxChannelsPageProps {
  taxConfigurations: TaxConfigurationFragment[] | undefined;
  selectedConfigurationId: string;
  handleTabChange: (tab: string) => void;
  allCountries: CountryFragment[] | undefined;
  isDialogOpen: boolean;
  openDialog: (action?: string) => void;
  closeDialog: () => void;
  onSubmit: (input: TaxConfigurationUpdateInput) => void;
  savebarState: ConfirmButtonTransitionState;
  disabled: boolean;
}

export interface TaxConfigurationFormData {
  chargeTaxes: boolean;
  taxCalculationStrategy: TaxCalculationStrategy;
  displayGrossPrices: boolean;
  pricesEnteredWithTax: boolean;
  updateCountriesConfiguration: TaxConfigurationPerCountryFragment[];
  removeCountriesConfiguration: CountryCode[];
}

export const TaxChannelsPage: FC<TaxChannelsPageProps> = (props) => {
  const {
    taxConfigurations,
    selectedConfigurationId,
    handleTabChange,
    allCountries,
    isDialogOpen,
    openDialog,
    closeDialog,
    onSubmit,
    savebarState,
    disabled,
  } = props;

  const router = useRouter();

  const currentTaxConfiguration = taxConfigurations?.find(
    (taxConfigurations) => taxConfigurations.id === selectedConfigurationId
  );

  const initialForm: TaxConfigurationFormData = {
    chargeTaxes: currentTaxConfiguration?.chargeTaxes ?? false,
    taxCalculationStrategy: currentTaxConfiguration?.taxCalculationStrategy,
    displayGrossPrices: currentTaxConfiguration?.displayGrossPrices ?? false,
    pricesEnteredWithTax: currentTaxConfiguration?.pricesEnteredWithTax ?? false,
    updateCountriesConfiguration: currentTaxConfiguration?.countries ?? [],
    removeCountriesConfiguration: [],
  };

  const handleSubmit = (data: TaxConfigurationFormData) => {
    const { updateCountriesConfiguration, removeCountriesConfiguration } = data;
    const parsedUpdate: TaxConfigurationUpdateInput['updateCountriesConfiguration'] =
      updateCountriesConfiguration.map((config) => ({
        countryCode: config.country.code as CountryCode,
        chargeTaxes: config.chargeTaxes,
        taxCalculationStrategy: config.taxCalculationStrategy,
        displayGrossPrices: config.displayGrossPrices,
      }));
    onSubmit({
      chargeTaxes: data?.chargeTaxes,
      taxCalculationStrategy: data?.chargeTaxes ? data?.taxCalculationStrategy : null,
      displayGrossPrices: data?.displayGrossPrices,
      pricesEnteredWithTax: data?.pricesEnteredWithTax,
      updateCountriesConfiguration: parsedUpdate,
      removeCountriesConfiguration,
    });
  };

  const taxStrategyChoices = [
    {
      label: m.dashboard_taxStrategyTaxApp() ?? 'Use tax app',
      value: TaxCalculationStrategy.TaxApp,
    },
    {
      label: m.dashboard_taxStrategyFlatRates() ?? 'Use flat rates',
      value: TaxCalculationStrategy.FlatRates,
    },
  ];

  return (
    <Form initial={initialForm} onSubmit={handleSubmit} mergeData={false}>
      {({ data, change, submit, set, triggerChange }) => {
        const countryExceptions = data?.updateCountriesConfiguration;

        const handleExceptionChange = (event, index) => {
          const { name, value } = event.target;
          const currentExceptions = [...data?.updateCountriesConfiguration];
          const exceptionToChange = {
            ...data?.updateCountriesConfiguration[index],
            [name]: value,
          };
          currentExceptions[index] = exceptionToChange;
          triggerChange();
          set({ updateCountriesConfiguration: currentExceptions });
        };

        const handleCountryChange = (country: CountryFragment) => {
          closeDialog();
          const input: TaxConfigurationPerCountryFragment = {
            __typename: 'TaxConfigurationPerCountry',
            country,
            chargeTaxes: data?.chargeTaxes,
            displayGrossPrices: data?.displayGrossPrices,
            taxCalculationStrategy: data?.taxCalculationStrategy,
          };
          const currentExceptions = data?.updateCountriesConfiguration;
          triggerChange();
          set({
            updateCountriesConfiguration: [input, ...currentExceptions],
          });
        };

        return (
          <Container>
            <PageHeader title={m.dashboard_taxes() ?? 'Taxes'} />
            <PageTabs value="channels" onChange={handleTabChange}>
              <PageTab label={m.dashboard_channelsSection() ?? 'Channels'} value="channels" />
              <PageTab label={m.dashboard_countriesSection() ?? 'Countries'} value="countries" />
              <PageTab
                label={m.dashboard_taxClassesSection() ?? 'Tax classes'}
                value="tax-classes"
              />
            </PageTabs>
            <Grid variant="inverted">
              <div>
                <TaxChannelsMenu
                  configurations={taxConfigurations}
                  selectedConfigurationId={selectedConfigurationId}
                />
              </div>
              <div>
                <TaxSettingsCard
                  values={data}
                  strategyChoices={taxStrategyChoices}
                  onChange={change}
                />
                <Card>
                  <CardTitle
                    className={styles.toolbarMargin ?? ''}
                    title={m.dashboard_countryExceptions() ?? 'Country exceptions'}
                    toolbar={
                      <Button color="secondary" onClick={() => openDialog('add-country')}>
                        {m.dashboard_addCountryLabel() ?? 'Add country'}
                      </Button>
                    }
                  />
                  {countryExceptions?.length === 0 ? (
                    <CardContent>
                      {m.dashboard_oExceptionsForChannel() ??
                        'There are no exceptions for this channel'}
                    </CardContent>
                  ) : (
                    <List gridTemplate={['4fr 3fr 3fr 1fr']}>
                      <ListHeader>
                        <ListItem>
                          <ListItemCell>
                            {m.dashboard_countryNameHeader() ?? 'Country name'}
                          </ListItemCell>
                          <ListItemCell className={styles.left ?? ''}>
                            {m.dashboard_hargeTaxesHeader() ?? 'Charge taxes'}
                          </ListItemCell>
                          <ListItemCell className={styles.center ?? ''}>
                            {m.dashboard_showGrossHeader() ?? 'Show gross prices in storefront'}
                          </ListItemCell>
                          <ListItemCell>
                            {/* This is required for the header row to be aligned with list items */}
                            <div className={styles.dummy ?? ''}></div>
                          </ListItemCell>
                        </ListItem>
                      </ListHeader>
                      <Divider />
                      {countryExceptions?.map((country, countryIndex) => (
                        <TaxCountryExceptionListItem
                          divider={!isLastElement(countryExceptions, countryIndex)}
                          strategyChoices={taxStrategyChoices}
                          country={country}
                          key={country.country.code}
                          onDelete={() => {
                            const currentRemovals = data?.removeCountriesConfiguration;
                            const currentExceptions = [...data?.updateCountriesConfiguration];
                            set({
                              removeCountriesConfiguration: [
                                ...currentRemovals,
                                country.country.code as CountryCode,
                              ],
                              updateCountriesConfiguration: currentExceptions.filter(
                                (exception) => exception.country.code !== country.country.code
                              ),
                            });
                            triggerChange();
                          }}
                          onChange={(event) => handleExceptionChange(event, countryIndex)}
                        />
                      )) ?? <Skeleton />}
                    </List>
                  )}
                </Card>
              </div>
            </Grid>
            <SaveBar
              state={savebarState}
              disabled={disabled}
              onSubmit={submit}
              onCancel={() => router.push('/configuration')}
            />
            {allCountries && (
              <TaxCountryDialog
                open={isDialogOpen}
                countries={allCountries
                  .filter(
                    ({ code }) => !countryExceptions?.some(({ country }) => country.code === code)
                  )
                  .map((country) => ({ checked: false, ...country }))}
                onConfirm={handleCountryChange}
                onClose={closeDialog}
              />
            )}
          </Container>
        );
      }}
    </Form>
  );
};
export default TaxChannelsPage;
