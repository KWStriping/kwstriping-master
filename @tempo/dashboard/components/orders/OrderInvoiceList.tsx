import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { InvoiceFragment } from '@tempo/api/generated/graphql';
import { CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Date from '@tempo/dashboard/components/core/Date';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

const useStyles = makeStyles(
  () => ({
    card: {
      overflow: 'hidden',
    },
    cardContentTable: {
      '&:last-child': {
        padding: 0,
      },
      padding: 0,
    },
    colAction: {
      button: {
        padding: '0',
      },
      padding: '0 0.5rem',
      width: 'auto',
    },
    colNumber: { width: '100%' },
    colNumberClickable: {
      cursor: 'pointer',
      width: '100%',
    },
    invoicesTable: {
      display: 'flex',
    },
    invoicesTableBody: {
      width: '100%',
    },
  }),
  { name: 'OrderInvoiceList' }
);

export interface OrderInvoiceListProps {
  invoices: Maybe<InvoiceFragment[]>;
  onInvoiceGenerate: () => void;
  onInvoiceClick?: (invoiceId: string) => void;
  onInvoiceSend: (invoiceId: string) => void;
}

const OrderInvoiceList: FC<OrderInvoiceListProps> = (props) => {
  const { invoices, onInvoiceGenerate, onInvoiceClick, onInvoiceSend } = props;
  // const styles = useStyles();
  const styles = {};
  const generatedInvoices = invoices?.filter((invoice) => invoice.status === 'SUCCESS');

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={m.dashboard_sectionHeaders_invoices() ?? 'Invoices'}
        // toolbar={}
      />
      <CardContent className={clsx(generatedInvoices?.length && styles.cardContentTable)}>
        {!generatedInvoices ? (
          <Skeleton />
        ) : !generatedInvoices?.length ? (
          <Typography color="textSecondary">
            {m.dashboard_PB__Y() ?? 'No invoices to be shown'}
          </Typography>
        ) : (
          <ResponsiveTable className={styles.invoicesTable ?? ''}>
            <TableBody className={styles.invoicesTableBody ?? ''}>
              {generatedInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover={!!invoice}>
                  <TableCell
                    className={onInvoiceClick ? styles.colNumberClickable : styles.colNumber}
                    onClick={() => onInvoiceClick?.(invoice.id)}
                  >
                    {m.dashboard_invoiceNumberPrefix() ?? 'Invoice'} {invoice.number}
                    <Typography variant="caption">
                      <>
                        {/* invoice create date prefix */}

                        {m.dashboard__AXNs() ?? 'created'}
                      </>{' '}
                      <Date date={invoice.createdAt} plain />
                    </Typography>
                  </TableCell>
                  {onInvoiceSend && (
                    <TableCell
                      className={styles.colAction ?? ''}
                      onClick={() => onInvoiceSend(invoice.id)}
                    >
                      <Button>{m.dashboard_end() ?? 'Send'}</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        )}
      </CardContent>
      <CardActions>
        {onInvoiceGenerate && (
          <Button onClick={onInvoiceGenerate}>
            {m.dashboard_generateInvoice() ?? 'Generate'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

OrderInvoiceList.displayName = 'OrderInvoiceList';
export default OrderInvoiceList;
