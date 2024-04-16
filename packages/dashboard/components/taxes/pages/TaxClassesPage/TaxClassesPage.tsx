import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { List, ListHeader, ListItem, ListItemCell } from '@core/ui/components/list/List';
import { PageTab, PageTabs } from '@core/ui/components/PageTabs';
import { getById } from '@core/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { parseQuery } from '@dashboard/components/orders/OrderCustomerAddressesEditDialog/utils';
import TaxInput from '@dashboard/components/taxes/TaxInput';
import type { TaxClassFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { taxesMessages } from '@dashboard/oldSrc/taxes/messages';
import type { TaxClassesPageFormData } from '@dashboard/oldSrc/taxes/types';
import { useAutofocus } from '@dashboard/oldSrc/taxes/utils/useAutofocus';
import { isLastElement } from '@dashboard/oldSrc/taxes/utils/utils';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getTaxesErrorMessage from '@dashboard/oldSrc/utils/errors/taxes';
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

import TaxClassesForm from './form';
import TaxClassesMenu from './TaxClassesMenu';

interface TaxClassesPageProps {
  taxClasses: TaxClassFragment[] | undefined;
  selectedTaxClassId: string;
  handleTabChange: (tab: string) => void;
  savebarState: ConfirmButtonTransitionState;
  disabled: boolean;
  onCreateNewButtonClick: () => void;
  onTaxClassDelete: (id: string) => SubmitPromise;
  onTaxClassCreate: (data: TaxClassesPageFormData) => SubmitPromise;
  onTaxClassUpdate: (data: TaxClassesPageFormData) => SubmitPromise;
}

export const TaxClassesPage: FC<TaxClassesPageProps> = (props) => {
  const {
    taxClasses,
    selectedTaxClassId,
    handleTabChange,
    savebarState,
    disabled,
    onCreateNewButtonClick,
    onTaxClassDelete,
    onTaxClassCreate,
    onTaxClassUpdate,
  } = props;
  const { t } = useTranslation();
  const router = useRouter();

  const [query, setQuery] = useState('');

  const currentTaxClass = useMemo(
    () => taxClasses?.find(getById(selectedTaxClassId)),
    [selectedTaxClassId, taxClasses]
  );

  const nameInputRef = useAutofocus(currentTaxClass?.id === 'new', [currentTaxClass?.id]);

  return (
    <TaxClassesForm
      taxClass={currentTaxClass}
      onTaxClassCreate={onTaxClassCreate}
      onTaxClassUpdate={onTaxClassUpdate}
      disabled={disabled}
    >
      {({ data, validationErrors, handlers, submit, change }) => {
        const filteredRates = data?.updateTaxClassRates?.filter(
          (rate) => rate.label.search(new RegExp(parseQuery(query), 'i')) >= 0
        );

        const formErrors = getFormErrors(['name'], validationErrors);

        return (
          <Container>
            <PageHeader title={t('dashboard.taxes', 'Taxes')} />
            <PageTabs value="tax-classes" onChange={handleTabChange}>
              <PageTab label={t('dashboard.channelsSection', 'Channels')} value="channels" />
              <PageTab label={t('dashboard.countriesSection', 'Countries')} value="countries" />
              <PageTab
                label={t('dashboard.taxClassesSection', 'Tax classes')}
                value="tax-classes"
              />
            </PageTabs>
            <Grid variant="inverted">
              <TaxClassesMenu
                taxClasses={taxClasses}
                selectedTaxClassId={selectedTaxClassId}
                onTaxClassDelete={onTaxClassDelete}
                onCreateNew={onCreateNewButtonClick}
              />
              {taxClasses?.length !== 0 && (
                <div>
                  <Card>
                    <CardTitle title={t('dashboard.generalInformation', 'General information')} />
                    <CardContent>
                      <TextField
                        value={data?.name}
                        onChange={change}
                        name="name"
                        variant="outlined"
                        placeholder={t('dashboard.taxRateName', 'Tax rate name')}
                        fullWidth
                        inputProps={{ className: styles.namePadding }}
                        inputRef={nameInputRef}
                        error={!!formErrors.name}
                        helperText={getTaxesErrorMessage(formErrors.name, t)}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardTitle title={t('dashboard.taxClassRates', 'Tax class rates')} />
                    {currentTaxClass?.countries.length === 0 ? (
                      <CardContent className={styles.supportText ?? ''}>
                        <Trans
                          {...taxesMessages.noRatesInTaxClass}
                          values={{
                            tab: <b>{t('dashboard.countriesSection', 'Countries')}</b>,
                          }}
                        />
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
                            inputProps={{ className: styles.searchPadding }}
                          />
                        </CardContent>
                        <List gridTemplate={['5fr 2fr']}>
                          <ListHeader>
                            <ListItem>
                              <ListItemCell>
                                {t('dashboard.countryNameHeader', 'Country name')}
                              </ListItemCell>
                              <ListItemCell className={styles.right ?? ''}>
                                {t('dashboard.taxRateHeader', 'Tax rate')}
                              </ListItemCell>
                            </ListItem>
                          </ListHeader>
                          <Divider />
                          {filteredRates?.map((countryRate, countryRateIndex) => (
                            <Fragment key={countryRate.id}>
                              <ListItem hover={false} className={styles.noDivider ?? ''}>
                                <ListItemCell>{countryRate.label}</ListItemCell>
                                <ListItemCell>
                                  <TaxInput
                                    value={countryRate.value}
                                    change={(e) =>
                                      handlers.handleRateChange(countryRate.id, e.target.value)
                                    }
                                  />
                                </ListItemCell>
                              </ListItem>
                              {!isLastElement(filteredRates, countryRateIndex) && <Divider />}
                            </Fragment>
                          )) ?? (
                            <>
                              <Skeleton />
                            </>
                          )}
                        </List>
                      </>
                    )}
                  </Card>
                  <Metadata data={data} onChange={handlers.changeMetadata} />
                </div>
              )}
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
    </TaxClassesForm>
  );
};

export default TaxClassesPage;
