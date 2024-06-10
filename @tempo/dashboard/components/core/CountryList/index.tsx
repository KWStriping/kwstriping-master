import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type { CountryCode, CountryFragment } from '@tempo/api/generated/graphql';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import { renderCollection } from '@tempo/ui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Card from '@mui/material/Card';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export interface CountryListProps {
  countries: CountryFragment[];
  disabled: boolean;
  emptyText: ReactNode;
  title: ReactNode;
  onCountryAssign: () => void;
  onCountryUnassign: (countryCode: CountryCode) => void;
}

const CountryList: FC<CountryListProps> = (props) => {
  const { countries, disabled, emptyText, title, onCountryAssign, onCountryUnassign } = props;
  const [isCollapsed, setCollapseStatus] = useState(true);
  const toggleCollapse = () => setCollapseStatus(!isCollapsed);
  function sortCountries(countries: CountryFragment[]): CountryFragment[] {
    return [...countries].sort((a, b) => a.country.localeCompare(b.country));
  }

  return (
    <Card>
      <CardTitle
        title={title}
        toolbar={
          <Button disabled={disabled} onClick={onCountryAssign} data-test-id="assign-country">
            {m.dashboard_ZCCqz() ?? 'Assign countries'}
          </Button>
        }
      />
      <ResponsiveTable>
        <TableBody>
          <TableRow className={styles.pointer ?? ''} onClick={toggleCollapse}>
            <TableCell className={clsx(styles.wideColumn)}>
              <Trans
                t={t}
                i18nKey={'nCountries'}
                count={countries?.length || 0}
                values={{
                  cookedCount: getStringOrPlaceholder(countries?.length.toString()),
                }}
              >
                {countries?.length === 1 ? '{{count}} country' : '{{cookedCount}} countries'}
              </Trans>
            </TableCell>
            <TableCell className={clsx(styles.textRight, styles.iconCell)}>
              <IconButton color="secondary">
                <ArrowDropDownIcon
                  data-test-id="countries-drop-down-icon"
                  className={clsx(!isCollapsed && styles.rotate)}
                />
              </IconButton>
            </TableCell>
          </TableRow>
          {!isCollapsed &&
            renderCollection(
              sortCountries(countries),
              (country, countryIndex) => (
                <TableRow key={country ? country.code : 'skeleton'}>
                  <TableCell className={styles.offsetCell ?? ''}>
                    <>
                      {(countryIndex === 0 ||
                        countries[countryIndex]?.country[0] !==
                          countries[countryIndex - 1]?.country[0]) && (
                        <span className={styles.indicator ?? ''}>{country.name[0]}</span>
                      )}
                      {country.name}
                    </>
                  </TableCell>
                  <TableCell className={clsx(styles.textRight, styles.iconCell)}>
                    <IconButton
                      data-test-id="delete-icon"
                      color="secondary"
                      disabled={!country || disabled}
                      onClick={() => onCountryUnassign(country.code)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell className={styles.toLeft ?? ''} colSpan={2}>
                    {emptyText}
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
export default CountryList;
