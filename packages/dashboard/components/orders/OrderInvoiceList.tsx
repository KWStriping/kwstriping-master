import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import Date from '@dashboard/components/core/Date';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { InvoiceFragment } from '@core/api/graphql';
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
  const { t } = useTranslation();
  const generatedInvoices = invoices?.filter((invoice) => invoice.status === 'SUCCESS');

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={t('dashboard.sectionHeaders.invoices', 'Invoices')}
        // toolbar={}
      />
      <CardContent className={clsx(generatedInvoices?.length && styles.cardContentTable)}>
        {!generatedInvoices ? (
          <Skeleton />
        ) : !generatedInvoices?.length ? (
          <Typography color="textSecondary">
            {t('dashboard.PB89Y', 'No invoices to be shown')}
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
                    {t('dashboard.invoiceNumberPrefix', 'Invoice')} {invoice.number}
                    <Typography variant="caption">
                      <>
                        {/* invoice create date prefix */}

                        {t('dashboard.0AXNs', 'created')}
                      </>{' '}
                      <Date date={invoice.createdAt} plain />
                    </Typography>
                  </TableCell>
                  {onInvoiceSend && (
                    <TableCell
                      className={styles.colAction ?? ''}
                      onClick={() => onInvoiceSend(invoice.id)}
                    >
                      <Button>{t('dashboard.end', 'Send')}</Button>
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
            {t('dashboard.generateInvoice', 'Generate')}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

OrderInvoiceList.displayName = 'OrderInvoiceList';
export default OrderInvoiceList;
