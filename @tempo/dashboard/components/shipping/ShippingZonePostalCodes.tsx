import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { PostalCodeRuleInclusionType } from '@tempo/api/generated/constants';
import type { ShippingMethodFragment } from '@tempo/api/generated/graphql';
import ArrowDropdown from '@tempo/dashboard/oldSrc/icons/ArrowDropdown';
import { renderCollection } from '@tempo/ui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';

export interface ShippingZonePostalCodesProps {
  disabled: boolean;
  initialExpanded?: boolean;
  postalCodes: ShippingMethodFragment['postalCodeRules'] | undefined;
  onPostalCodeInclusionChange: (inclusion: PostalCodeRuleInclusionType) => void;
  onPostalCodeDelete: (code: ShippingMethodFragment['postalCodeRules'][0]) => void;
  onPostalCodeRangeAdd: () => void;
}

const useStyles = makeStyles(
  (theme) => ({
    arrow: {
      transition: theme.transitions.create('transform'),
    },
    arrowRotate: {
      transform: 'scale(-1)',
    },
    colAction: {
      width: 80,
    },
    colCode: {},
    option: {
      marginBottom: theme.spacing(2),
      width: 400,
    },
    radioContainer: {
      paddingBottom: 0,
    },
    skeleton: {
      width: 80,
    },
  }),
  {
    name: 'ShippingZonePostalCodes',
  }
);

const ShippingZonePostalCodes: FC<ShippingZonePostalCodesProps> = ({
  disabled,
  initialExpanded = true,
  postalCodes,
  onPostalCodeDelete,
  onPostalCodeInclusionChange,
  onPostalCodeRangeAdd,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [inclusionType, setInclusionType] = useState(null);
  const styles = {};
  const getInclusionType = () => {
    if (inclusionType) {
      return inclusionType;
    }
    return postalCodes[0]?.inclusionType || PostalCodeRuleInclusionType.Exclude;
  };

  const onInclusionRadioChange = (event: ChangeEvent<unknown>) => {
    const value = event.target.value;
    setInclusionType(value);
    onPostalCodeInclusionChange(value);
  };

  const getPostalCodeRangeLabel = (
    postalCodeRange: ShippingMethodFragment['postalCodeRules'][0]
  ) => {
    if (!postalCodeRange?.start) {
      return <Skeleton />;
    }
    if (postalCodeRange?.end) {
      return `${postalCodeRange.start} - ${postalCodeRange.end}`;
    }
    return postalCodeRange.start;
  };

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_cTTvh() ?? 'Postal codes'
          // postal codes, header
        }
        toolbar={
          <Button onClick={onPostalCodeRangeAdd} data-test-id="add-postal-code-range">
            <>
              {t(
                'dashboard_lk/oS',
                'Add postal code range'
                // button
              )}
            </>
          </Button>
        }
      />
      <CardContent className={clsx(styles.radioContainer)}>
        <RadioGroupField
          alignTop
          choices={[
            {
              label: (
                <div className={styles.option ?? ''}>
                  <Typography variant="body1">
                    <>
                      {/* action */}

                      {m.dashboard_pLVVc() ?? 'Exclude postal codes'}
                    </>
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    <>
                      {m.dashboard_u_zHP() ??
                        'Added postal codes will be excluded from using this delivery methods. If none are added all postal codes will be able to use that shipping rate'}
                    </>
                  </Typography>
                </div>
              ),
              value: PostalCodeRuleInclusionType.Exclude,
            },
            {
              label: (
                <div className={styles.option ?? ''}>
                  <Typography variant="body1">
                    <>
                      {/* action */}

                      {m.dashboard_qsOwa() ?? 'Include postal codes'}
                    </>
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    <>
                      {t(
                        '/Zee1r',
                        'Only added postal codes will be able to use this shipping rate'
                      )}
                    </>
                  </Typography>
                </div>
              ),
              value: PostalCodeRuleInclusionType.Include,
            },
          ]}
          name="includePostalCodes"
          value={getInclusionType()}
          onChange={onInclusionRadioChange}
        />
      </CardContent>
      <ResponsiveTable>
        <colgroup>
          <col />
          <col className={styles.colAction ?? ''} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>
              {postalCodes === undefined ? (
                <Skeleton className={styles.skeleton ?? ''} />
              ) : (
                <Typography variant="caption">
                  <Trans t={t} i18nKey={'ud0w8h'} count={postalCodes?.length ?? 0}>
                    {'{{count}} postal code ranges'}
                  </Trans>
                </Typography>
              )}
            </TableCell>
            <TableCell>
              <IconButton color="secondary" onClick={() => setExpanded(!expanded)}>
                <ArrowDropdown className={clsx(styles.arrow, expanded && styles.arrowRotate)} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        {expanded && (
          <TableBody>
            {renderCollection(
              postalCodes,
              (postalCodeRange) => (
                <TableRow key={postalCodeRange.id}>
                  <TableCell>{getPostalCodeRangeLabel(postalCodeRange)}</TableCell>
                  <TableCell>
                    <IconButton
                      disabled={disabled}
                      color="secondary"
                      onClick={() => onPostalCodeDelete(postalCodeRange)}
                      data-test-id={'delete-postal-code-' + postalCodeRange?.id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography color="textSecondary">
                      <>
                        {m.dashboard_yjarj() ?? 'This shipping rate has no postal codes assigned'}
                      </>
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        )}
      </ResponsiveTable>
    </Card>
  );
};

ShippingZonePostalCodes.displayName = 'ShippingZonePostalCodes';
export default ShippingZonePostalCodes;
