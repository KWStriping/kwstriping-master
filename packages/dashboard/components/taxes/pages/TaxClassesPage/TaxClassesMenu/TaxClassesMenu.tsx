import { useTranslation } from '@core/i18n';
import { List, ListHeader, ListItem, ListItemCell } from '@core/ui/components/list/List';
import Button from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import CardTitle from '@dashboard/components/core/CardTitle';
import ListItemLink from '@dashboard/components/core/ListItemLink';
import type { TaxClassFragment } from '@core/api/graphql';
import { taxClassesListUrl } from '@dashboard/oldSrc/taxes/urls';
import { isLastElement } from '@dashboard/oldSrc/taxes/utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

interface TaxClassesMenuProps {
  taxClasses: TaxClassFragment[] | undefined;
  selectedTaxClassId: string;
  onTaxClassDelete: (taxClassId: string) => void;
  onCreateNew: () => void;
}

export const TaxClassesMenu: FC<TaxClassesMenuProps> = ({
  taxClasses,
  selectedTaxClassId,
  onTaxClassDelete,
  onCreateNew,
}) => {
  const { t } = useTranslation();

  const isCreatingNew = selectedTaxClassId === 'new';

  return (
    <Card className={styles.menu ?? ''}>
      <CardTitle
        title={t('dashboard.taxClassList', 'Tax classes')}
        toolbar={
          <Button color="secondary" onClick={onCreateNew} disabled={isCreatingNew}>
            {t('dashboard.addTaxClassLabel', 'Create class')}
          </Button>
        }
      />

      {taxClasses?.length !== 0 ? (
        <>
          <ListHeader>
            <ListItem className={styles.tableRow ?? ''}>
              <ListItemCell>{t('dashboard.taxClassNameHeader', 'Tax class label')}</ListItemCell>
            </ListItem>
          </ListHeader>
          <Divider />
          <List gridTemplate={['1fr']}>
            {taxClasses?.map((taxClass, taxClassId) => (
              <Fragment key={taxClass.id}>
                <ListItemLink
                  className={clsx(
                    styles.clickable ?? '',
                    styles.tableRow ?? '',
                    taxClass.id === selectedTaxClassId && styles.selected
                  )}
                  href={taxClassesListUrl(taxClass.id)}
                >
                  <ListItemCell>
                    <div className={styles.spaceBetween ?? ''}>
                      {taxClass.name}
                      {taxClass.id !== 'new' && (
                        <IconButton
                          color="secondary"
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            onTaxClassDelete(taxClass.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </ListItemCell>
                </ListItemLink>
                {!isLastElement(taxClasses, taxClassId) && <Divider />}
              </Fragment>
            )) ?? <Skeleton />}
          </List>
        </>
      ) : (
        <CardContent className={styles.greyText ?? ''}>
          {t('dashboard.oTaxClasses', 'There are no tax classes')}
        </CardContent>
      )}
    </Card>
  );
};

export default TaxClassesMenu;
