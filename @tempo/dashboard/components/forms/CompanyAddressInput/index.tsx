import { makeStyles } from '@tempo/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

import type { CompanyAddressFormProps } from './CompanyAddressForm';
import CompanyAddressForm from './CompanyAddressForm';

interface CompanyAddressInputProps extends CompanyAddressFormProps {
  className?: string;
  header: string;
}

const useStyles = makeStyles(
  {
    root: {
      overflow: 'visible',
    },
  },
  { name: 'CompanyAddressInput' }
);

const CompanyAddressInput: FC<CompanyAddressInputProps> = (props) => {
  const { className, header, ...formProps } = props;
  const styles = useStyles(props);

  return (
    <Card className={clsx(styles.root, className)}>
      <CardTitle title={header} />
      <CardContent>
        <CompanyAddressForm {...formProps} />
      </CardContent>
    </Card>
  );
};
CompanyAddressInput.displayName = 'CompanyAddressInput';
export default CompanyAddressInput;
