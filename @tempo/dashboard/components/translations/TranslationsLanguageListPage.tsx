import * as m from '@paraglide/messages';
import type { LanguageFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationsLanguageList from './TranslationsLanguageList';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

export interface TranslationsLanguageListPageProps {
  languages: LanguageFragment[];
}

const TranslationsLanguageListPage: FC<TranslationsLanguageListPageProps> = ({ languages }) => {
  return (
    <Container>
      <PageHeader title={m.dashboard_sBRWL() ?? 'Languages'}>
        {/* <Button color="primary" variant="contained" onClick={onAdd}>
        <>{(m.crvD_X() ?? "Add Language"
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
