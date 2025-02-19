import IconButton from '@tempo/ui/components/buttons/IconButton';
import { ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import type {
  TaxConfigurationPerCountryFragment,
  TaxConfigurationUpdateInput,
} from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';
import { useStyles } from '../styles';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';

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
