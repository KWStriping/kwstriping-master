import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import PriceField from '@dashboard/components/fields/PriceField';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { ProductChannelListingErrorFragment } from '@core/api/graphql';
import type {
  ChannelData,
  ChannelPriceAndPreorderArgs,
  ChannelPriceArgs,
} from '@dashboard/oldSrc/channels/utils';
import { getFormChannelError, getFormChannelErrors } from '@dashboard/oldSrc/utils/errors';
import getProductErrorMessage from '@dashboard/oldSrc/utils/errors/product';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const useStyles = makeStyles(
  () => ({
    colPrice: {
      textAlign: 'right',
      verticalAlign: 'top',
      width: 200,
    },
    colType: {
      fontSize: 14,
      textAlign: 'right',
      width: 200,
    },
    input: {
      textAlign: 'left',
    },
    pricingContent: {
      '&:last-child': {
        paddingBottom: 0,
      },
      paddingLeft: 0,
      paddingRight: 0,
    },
    table: {
      tableLayout: 'fixed',
    },
  }),
  { name: 'ProductPrice' }
);

interface ProductPriceProps {
  ProductChannelListings?: ChannelData[];
  errors?: Maybe<ProductChannelListingErrorFragment[]>;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (id: string, data: ChannelPriceArgs | ChannelPriceAndPreorderArgs) => void;
  disabledMessage?: MessageDescriptor;
}

const numberOfColumns = 2;

const ProductPrice: FC<ProductPriceProps> = (props) => {
  const {
    disabled = false,
    errors = [],
    ProductChannelListings = [],
    loading,
    onChange,
    disabledMessage,
  } = props;
  const styles = useStyles(props);
  const { t } = useTranslation();
  const formErrors = getFormChannelErrors(['price', 'costPrice'], errors);

  if (disabled || !ProductChannelListings.length) {
    return (
      <Card>
        <CardTitle
          title={t(
            'dashboard.m9qOu',
            'Pricing'
            // product pricing, section header
          )}
        />
        <CardContent>
          <Typography variant="caption">
            {t(
              disabledMessage || {
                id: 'e48Igh',
                defaultMessage:
                  'Assign this variant to a channel in the product channel manager to define prices',
                description: 'variant pricing section subtitle',
              }
            )}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.m9qOu',
          'Pricing'
          // product pricing, section header
        )}
      />
      <CardContent>
        <Typography variant="body2">
          {t(
            'dashboard.productVariantPriceInfoText',
            'Channels that don’t have assigned prices will use their parent channel to define the price. Price will be converted to channel’s currency.'
          )}
        </Typography>
      </CardContent>
      <ResponsiveTable className={styles.table ?? ''}>
        <TableHead>
          <TableRow>
            <TableCell>{t('dashboard.channelNameColumnHeader', 'Channel name')}</TableCell>
            <TableCell className={styles.colType ?? ''}>
              <>
                {/* table column header */}

                {t('dashboard.q4O25', 'Selling price')}
              </>
            </TableCell>
            <TableCell className={styles.colType ?? ''}>
              <>
                {/* table column header */}

                {t('dashboard.H5whQ', 'Cost price')}
              </>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            ProductChannelListings,
            (listing, index) => {
              const priceError = getFormChannelError(formErrors.price, listing.id);
              const costPriceError = getFormChannelError(formErrors.costPrice, listing.id);

              return (
                <TableRow key={listing?.id || `skeleton-${index}`}>
                  <TableCell>{listing?.name || <Skeleton />}</TableCell>
                  <TableCell className={styles.colPrice ?? ''}>
                    {listing ? (
                      <PriceField
                        className={styles.input ?? ''}
                        error={!!priceError}
                        label={t('dashboard.1zuN9', 'Price')}
                        name={`${listing.id}-channel-price`}
                        value={listing.price || ''}
                        currencySymbol={listing.currency}
                        onChange={(e) =>
                          onChange(listing.id, {
                            costPrice: listing.costPrice,
                            price: e.target.value,
                            preorderThreshold: listing.preorderThreshold,
                          })
                        }
                        disabled={loading}
                        required
                        hint={priceError && getProductErrorMessage(priceError, t)}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={styles.colPrice ?? ''}>
                    {listing ? (
                      <PriceField
                        className={styles.input ?? ''}
                        error={!!costPriceError}
                        label={t(
                          'dashboard.YFhhK',
                          'Cost'
                          // table column header
                        )}
                        name={`${listing.id}-channel-costPrice`}
                        value={listing.costPrice || ''}
                        currencySymbol={listing.currency}
                        onChange={(e) =>
                          onChange(listing.id, {
                            costPrice: e.target.value,
                            price: listing.price,
                            preorderThreshold: listing.preorderThreshold,
                          })
                        }
                        disabled={loading}
                        hint={costPriceError ? getProductErrorMessage(costPriceError, t) : ''}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {t('/glQgs', 'No channels found')}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductPrice.displayName = 'ProductPrice';
export default ProductPrice;
