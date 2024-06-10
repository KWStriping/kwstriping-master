import { useTranslation } from '@core/i18n';
import EditIcon from '@mui/icons-material/Edit';
import AddressFormatter from '@dashboard/components/core/AddressFormatter';
import type { AddressFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';

export interface CustomerAddressChoiceCardProps {
  address: Maybe<AddressFragment>;
  selected?: boolean;
  editable?: boolean;
  onSelect?: () => void;
  onEditClick?: () => void;
}

const CustomerAddressChoiceCard: FC<CustomerAddressChoiceCardProps> = (props) => {
  const { address, selected, editable, onSelect, onEditClick } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card
      className={clsx(
        styles.card ?? '',
        selected && (styles.cardSelected ?? ''),
        !editable && !selected && styles.selectableCard
      )}
      onClick={onSelect}
    >
      <CardContent className={styles.cardContent ?? ''}>
        <AddressFormatter address={address} />
        {editable && (
          <div onClick={onEditClick}>
            <EditIcon className={styles.editIcon ?? ''} />
          </div>
        )}
        {selected && (
          <Typography color="primary" className={styles.selectedLabel ?? ''}>
            {t('dashboard.selected', 'Selected')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
CustomerAddressChoiceCard.displayName = 'CustomerAddressChoiceCard';
export default CustomerAddressChoiceCard;
