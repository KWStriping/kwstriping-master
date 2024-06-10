import { useTranslation } from '@core/i18n';
import { useRouter } from 'next/router';
import { parse as parseQs } from 'qs';
import type { FC } from 'react';

import GiftCardSettings from './GiftCardSettings';
import GiftCardListComponent from './GiftCardsList';
import type { GiftCardListUrlQueryParams } from './GiftCardsList/types';
import { GiftCardUrlOrdering } from './GiftCardsList/types';
import GiftCardUpdateComponent from './GiftCardUpdate';
import type { GiftCardUpdatePageUrlQueryParams } from './GiftCardUpdate/types';
import { giftCardPath, giftCardSettingsUrl, giftCardsListPath } from './urls';
import { asSortParams } from '@dashboard/oldSrc/utils/sort';
import { sectionNames } from '@dashboard/oldSrc/intl';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';

const GiftCardUpdatePage: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const qs = parseQs(location.search.substr(1));
  const params: GiftCardUpdatePageUrlQueryParams = qs;

  return <GiftCardUpdateComponent id={decodeURIComponent(id)} params={params} />;
};

const GiftCardList: FC = () => {
  const router = useRouter();
  const qs = parseQs(location.search.substr(1));
  const params: GiftCardListUrlQueryParams = asSortParams(
    qs,
    GiftCardUrlOrdering,
    GiftCardUrlOrdering.usedBy
  );

  return <GiftCardListComponent params={params} />;
};

const Component: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <WindowTitle title={t('dashboard.giftCards', sectionNames.giftCards.defaultMessage)} />
      <Routes>
        <Route path={giftCardSettingsUrl} element={<GiftCardSettings />} />
        <Route path={giftCardsListPath} element={<GiftCardList />} />
        <Route path={giftCardPath(':id')} element={<GiftCardUpdatePage />} />
      </Routes>
    </>
  );
};

export default Component;
