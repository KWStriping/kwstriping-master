import * as m from '@paraglide/messages';
import DeleteIconButton from '@tempo/ui/components/buttons/DeleteIconButton';
import Link from '@tempo/ui/components/Link';
import { renderCollection } from '@tempo/ui/utils';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { FC } from 'react';

import GiftCardListSearchAndFilters from '../GiftCardListSearchAndFilters';
import { giftCardsListTableMessages as messages } from '../messages';
import { useGiftCardListDialogs } from '../providers/GiftCardListDialogsProvider';
import { useGiftCardList } from '../providers/GiftCardListProvider';
import { canBeSorted } from '../sort';
import { GiftCardUrlOrdering } from '../types';
import GiftCardsListTableFooter from './GiftCardsListTableFooter';
import GiftCardsListTableHeader from './GiftCardsListTableHeader';
import { getTagCellText } from './utils';
import { giftCardListUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import { PLACEHOLDER } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/types';
import { customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import GiftCardStatusChip from '@tempo/dashboard/components/giftCards/GiftCardStatusChip/GiftCardStatusChip';
import Money from '@tempo/dashboard/components/core/Money';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';

const GiftCardsListTable: FC = () => {
  const router = useRouter();

  const { toggle, isSelected, giftCards, numberOfColumns, params } = useGiftCardList();
  const { openDeleteDialog } = useGiftCardListDialogs();

  const isCurrencySelected = !!params.currency;

  useEffect(() => {
    if (!canBeSorted(params.sort, isCurrencySelected)) {
      void router.push(
        giftCardListUrl({
          ...params,
          sort: GiftCardUrlOrdering.usedBy,
        })
      );
    }
  });

  return (
    <Card>
      <GiftCardListSearchAndFilters />
      <ResponsiveTable>
        <GiftCardsListTableHeader isCurrencySelected={isCurrencySelected} />
        <GiftCardsListTableFooter />
        <TableBody>
          {renderCollection(
            giftCards,
            (giftCard) => {
              if (!giftCard) {
                return (
                  <>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={styles.skeleton ?? ''} colSpan={5}>
                      <Skeleton />
                    </TableCell>
                    <TableCell className={styles.colDelete ?? ''}>
                      <DeleteIconButton />
                    </TableCell>
                  </>
                );
              }

              const { id, last4CodeChars, usedBy, usedByEmail, tags, product, currentBalance } =
                giftCard;

              return (
                <TableRow
                  href={{ pathname: '/gift-cards/[id]', query: { id } }}
                  className={styles.row ?? ''}
                  key={id}
                  hover={!!giftCard}
                  data-test-id={'gift-card-row-' + id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      data-test-id="select-gift-card-checkbox"
                      disabled={!giftCard}
                      disableClickPropagation
                      checked={isSelected(id)}
                      onChange={() => toggle(id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colCardCode ?? ''}>
                    <div className={styles.cardCodeContainer ?? ''}>
                      <Typography>
                        {m.dashboard_odeEndingWithLabel({
                          last4CodeChars,
                        }) ?? messages.codeEndingWithLabel.defaultMessage}
                      </Typography>
                      <>
                        <GiftCardStatusChip giftCard={giftCard} />
                      </>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography>{getTagCellText(tags)}</Typography>
                  </TableCell>
                  <TableCell>
                    {product ? (
                      <TableButtonWrapper>
                        {product?.name}
                        {/* <PillLink
                          className={styles.pill ?? ''}
                          component={RouterLink}
                          to={productUrl(product?.id)}
                          onClick={(event) => {
                            event.stopPropagation();
                            void router.push(productUrl(product?.id));
                          }}
                        >
                          {product?.name}
                        </PillLink> */}
                      </TableButtonWrapper>
                    ) : (
                      PLACEHOLDER
                    )}
                  </TableCell>
                  <TableCell>
                    {usedBy ? (
                      <TableButtonWrapper>
                        <Link href={customerUrl(usedBy?.id)}>
                          {`${usedBy?.firstName} ${usedBy?.lastName}`}
                        </Link>
                      </TableButtonWrapper>
                    ) : (
                      <Typography noWrap>{usedByEmail || PLACEHOLDER}</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right" className={styles.colBalance ?? ''}>
                    <Money money={currentBalance} />
                  </TableCell>
                  <TableCell className={styles.colDelete ?? ''}>
                    <DeleteIconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        openDeleteDialog(id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_oGiftCardsFound() ?? messages.noGiftCardsFound.defaultMessage}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

export default GiftCardsListTable;
