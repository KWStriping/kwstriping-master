import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type { LanguageFragment } from '@tempo/api/generated/graphql';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { renderCollection } from '@tempo/ui/utils';
import { languageEntitiesUrl } from '@tempo/dashboard/oldSrc/translations/urls';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

export interface TranslationsLanguageListProps {
  languages: LanguageFragment[];
}

const useStyles = makeStyles(
  {
    capitalize: {
      textTransform: 'capitalize',
    },
    link: {
      cursor: 'pointer',
    },
  },
  { name: 'TranslationsLanguageList' }
);

const TranslationsLanguageList: FC<TranslationsLanguageListProps> = (props) => {
  const { languages } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <Card>
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>{m.dashboard__Z_or() ?? 'Language'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            languages,
            (language) => (
              <TableRow
                data-test-id={language ? language.code : 'skeleton'}
                className={language ? styles.link : undefined}
                hover={!!language}
                key={language ? language.code : 'skeleton'}
                href={language && languageEntitiesUrl(language.code, {})}
              >
                <TableCell className={styles.capitalize ?? ''}>
                  {maybe<ReactNode>(() => language.language, <Skeleton />)}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={1}>{m.dashboard_tPPVk() ?? 'No languages found'}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
TranslationsLanguageList.displayName = 'TranslationsLanguageList';
export default TranslationsLanguageList;
