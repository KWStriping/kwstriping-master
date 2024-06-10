import * as m from '@paraglide/messages';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { LanguageFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationsLanguageList from './TranslationsLanguageList';

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
