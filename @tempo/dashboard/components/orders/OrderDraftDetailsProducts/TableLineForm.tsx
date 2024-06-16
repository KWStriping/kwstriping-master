import { makeStyles } from '@tempo/ui/theme/styles';
import DebounceForm from '@tempo/dashboard/components/forms/DebounceForm';
import Form from '@tempo/dashboard/components/forms/Form';
import type { OrderLineFragment, OrderLineInput } from '@tempo/api/generated/graphql';
import createNonNegativeValueChangeHandler from '@tempo/dashboard/oldSrc/utils/handlers/nonNegativeValueChangeHandler';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

const useStyles = makeStyles(
  () => ({
    quantityField: {
      '& input': {
        padding: '12px 12px 10px',
        textAlign: 'right',
      },
      width: 100,
    },
  }),
  { name: 'TableLineForm' }
);

interface TableLineFormProps {
  line: Maybe<OrderLineFragment>;
  onOrderLineChange: (id: string, data: OrderLineInput) => void;
}

const TableLineForm: FC<TableLineFormProps> = ({ line, onOrderLineChange }) => {
  const { id, quantity } = line;
  const styles = {};
  const handleSubmit = (id: string, data: OrderLineInput) => {
    const quantity = data?.quantity >= 1 ? Math.floor(data?.quantity) : 1;
    onOrderLineChange(id, { quantity });
  };

  return (
    <Form initial={{ quantity }} onSubmit={(data) => handleSubmit(id, data)}>
      {({ change, data, submit, set }) => {
        const handleQuantityChange = createNonNegativeValueChangeHandler(change);

        return (
          <DebounceForm change={handleQuantityChange} submit={submit} time={200}>
            {(debounce) => (
              <TextField
                className={styles.quantityField ?? ''}
                fullWidth
                name="quantity"
                type="number"
                value={data?.quantity}
                onChange={debounce}
                onBlur={() => {
                  if (data?.quantity < 1) {
                    set({ quantity: 1 });
                  }
                  submit();
                }}
                inputProps={{ min: 1 }}
              />
            )}
          </DebounceForm>
        );
      }}
    </Form>
  );
};

export default TableLineForm;
