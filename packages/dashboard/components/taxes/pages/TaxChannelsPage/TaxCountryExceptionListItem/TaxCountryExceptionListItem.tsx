import IconButton from '@core/ui/components/buttons/IconButton';
import { ListItem, ListItemCell } from '@core/ui/components/list/List';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type {
  TaxConfigurationPerCountryFragment,
  TaxConfigurationUpdateInput,
} from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';
import { useStyles } from '../styles';

interface TaxCountryExceptionListItemProps {
  country: TaxConfigurationPerCountryFragment | undefined;
  onDelete: () => void;
  onChange: FormChange;
  divider: boolean;
  strategyChoices: Choice[];
}

export const TaxCountryExceptionListItem: FC<TaxCountryExceptionListItemProps> = ({
  country,
  onDelete,
  onChange,
  strategyChoices,
  divider = true,
}) => {
  const styles = useStyles();
  if (!country) return null;
  return (
    <>
      <ListItem hover={false} className={styles.noDivider ?? ''}>
        <ListItemCell>{country.country.name}</ListItemCell>
        <ListItemCell className={styles.center ?? ''}>
          <ControlledCheckbox
            className={styles.center ?? ''}
            checked={country.chargeTaxes}
            name={'chargeTaxes' as keyof TaxConfigurationUpdateInput}
            onChange={onChange}
          />
          <SingleSelectField
            className={styles.selectField ?? ''}
            choices={strategyChoices}
            disabled={!country.chargeTaxes}
            value={country.taxCalculationStrategy}
            name={'taxCalculationStrategy' as keyof TaxConfigurationUpdateInput}
            onChange={onChange}
          />
        </ListItemCell>
        <ListItemCell className={styles.center ?? ''}>
          <ControlledCheckbox
            className={styles.center ?? ''}
            checked={country.displayGrossPrices}
            name={'displayGrossPrices' as keyof TaxConfigurationUpdateInput}
            onChange={onChange}
          />
        </ListItemCell>
        <ListItemCell>
          <IconButton onClick={onDelete} color="secondary">
            <DeleteIcon />
          </IconButton>
        </ListItemCell>
      </ListItem>
      {divider && <Divider />}
    </>
  );
};
export default TaxCountryExceptionListItem;
