import { useTranslation } from '@core/i18n';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { LanguageFragment } from '@core/api/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationsLanguageList from './TranslationsLanguageList';

export interface TranslationsLanguageListPageProps {
  languages: LanguageFragment[];
}

const TranslationsLanguageListPage: FC<TranslationsLanguageListPageProps> = ({ languages }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader title={t('dashboard.sBRWL', 'Languages')}>
        {/* <Button color="primary" variant="contained" onClick={onAdd}>
        <>{t(
    "crvD6X",
    "Add Language"
    // button
)}</>

      </Button> */}
      </PageHeader>
      <TranslationsLanguageList languages={languages} />
    </Container>
  );
};
TranslationsLanguageListPage.displayName = 'TranslationsLanguageListPage';
export default TranslationsLanguageListPage;
