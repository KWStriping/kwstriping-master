import * as m from '@paraglide/messages';
import { List, ListHeader, ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import Button from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import type { TaxClassFragment } from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';
import { isLastElement } from '@tempo/dashboard/oldSrc/taxes/utils/utils';
import { taxClassesListUrl } from '@tempo/dashboard/oldSrc/taxes/urls';
import ListItemLink from '@tempo/dashboard/components/core/ListItemLink';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const isCreatingNew = selectedTaxClassId === 'new';

  return (
    <Card className={styles.menu ?? ''}>
      <CardTitle
        title={m.dashboard_taxClassList() ?? 'Tax classes'}
        toolbar={
          <Button color="secondary" onClick={onCreateNew} disabled={isCreatingNew}>
            {m.dashboard_addTaxClassLabel() ?? 'Create class'}
          </Button>
        }
      />

      {taxClasses?.length !== 0 ? (
        <>
          <ListHeader>
            <ListItem className={styles.tableRow ?? ''}>
              <ListItemCell>{m.dashboard_taxClassNameHeader() ?? 'Tax class label'}</ListItemCell>
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
          {m.dashboard_oTaxClasses() ?? 'There are no tax classes'}
        </CardContent>
      )}
    </Card>
  );
};

export default TaxClassesMenu;
