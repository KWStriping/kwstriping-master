import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PriceField from '@tempo/dashboard/components/fields/PriceField';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type { ProductChannelListingErrorFragment } from '@tempo/api/generated/graphql';
import type {
  ChannelData,
  ChannelPriceAndPreorderArgs,
  ChannelPriceArgs,
} from '@tempo/dashboard/oldSrc/channels/utils';
import { getFormChannelError, getFormChannelErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getProductErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/product';
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
  const formErrors = getFormChannelErrors(['price', 'costPrice'], errors);

  if (disabled || !ProductChannelListings.length) {
    return (
      <Card>
        <CardTitle
          title={
            m.dashboard_m_qOu() ?? 'Pricing'
            // product pricing, section header
          }
        />
        <CardContent>
          <Typography variant="caption">
            {disabledMessage
              ? m[disabledMessage]
              : m.e__Igh() ??
                'Assign this variant to a channel in the product channel manager to define prices'}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_m_qOu() ?? 'Pricing'
          // product pricing, section header
        }
      />
      <CardContent>
        <Typography variant="body2">
          {m.dashboard_productVariantPriceInfoText() ??
            'Channels that don’t have assigned prices will use their parent channel to define the price. Price will be converted to channel’s currency.'}
        </Typography>
      </CardContent>
      <ResponsiveTable className={styles.table ?? ''}>
        <TableHead>
          <TableRow>
            <TableCell>{m.dashboard_channelNameColumnHeader() ?? 'Channel name'}</TableCell>
            <TableCell className={styles.colType ?? ''}>
              <>
                {/* table column header */}

                {m.dashboard_q_O__() ?? 'Selling price'}
              </>
            </TableCell>
            <TableCell className={styles.colType ?? ''}>
              <>
                {/* table column header */}

                {m.dashboard_H_whQ() ?? 'Cost price'}
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
                        label={m.dashboard__zuN_() ?? 'Price'}
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
                        label={
                          m.dashboard_YFhhK() ?? 'Cost'
                          // table column header
                        }
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
                  {m._glQgs() ?? 'No channels found'}
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
