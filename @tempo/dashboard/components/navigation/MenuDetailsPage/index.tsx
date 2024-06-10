import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Grid from '@tempo/ui/components/Grid';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Form from '@tempo/dashboard/components/forms/Form';
import type { MenuDetailsFragment, MenuErrorFragment } from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';

import type { MenuItemType } from '../MenuItemDialog';
import type { TreeOperation } from '../MenuItems';
import MenuItems from '../MenuItems';
import MenuProperties from '../MenuProperties';
import { computeRelativeTree } from './tree';

export interface MenuDetailsFormData {
  name: string;
}

export interface MenuDetailsSubmitData extends MenuDetailsFormData {
  operations: TreeOperation[];
}

export interface MenuDetailsPageProps {
  saveButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: MenuErrorFragment[];
  menu: Maybe<MenuDetailsFragment>;
  onDelete: () => void;
  onItemAdd: () => void;
  onItemClick: (id: string, type: MenuItemType) => void;
  onItemEdit: (id: string) => void;
  onSubmit: (data: MenuDetailsSubmitData) => SubmitPromise;
}

const MenuDetailsPage: FC<MenuDetailsPageProps> = ({
  disabled,
  errors,
  menu,
  saveButtonState,
  onDelete,
  onItemAdd,
  onItemClick,
  onItemEdit,
  onSubmit,
}) => {
  const router = useRouter();

  const initialForm: MenuDetailsFormData = {
    name: menu?.name ?? '',
  };

  const [treeOperations, setTreeOperations] = useState<TreeOperation[]>([]);

  const removeSimulatedMoves = (operations: TreeOperation[]) =>
    operations.filter((operation) => !operation.simulatedMove);

  const handleSubmit = async (data: MenuDetailsFormData) => {
    const result = await onSubmit({
      name: data?.name,
      operations: removeSimulatedMoves(treeOperations),
    });

    if (result) {
      setTreeOperations([]);
    }

    return result;
  };

  const handleChange = (operations: TreeOperation[]) => {
    setTreeOperations([...treeOperations, ...operations]);
  };
  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, submit }) => (
        <Container>
          <Backlink href={'/navigation'}>{m.dashboard_navigation() ?? 'Navigation'}</Backlink>
          <Grid variant="inverted">
            <div>
              <Typography variant="h5">{m.dashboard_navigation() ?? 'Navigation'}</Typography>
              <Typography>
                <>
                  {m.dashboard___eoT() ??
                    'Creating the navigation structure is done by dragging and dropping. Simply create a new menu item and then drag it into its destined place. You can move items inside one another to create a tree structure and drag items up and down to create a hierarchy'}
                </>
              </Typography>
            </div>
            <div>
              <MenuProperties data={data} disabled={disabled} errors={errors} onChange={change} />
              <CardSpacer />
              <MenuItems
                canUndo={treeOperations?.length}
                items={menu?.items ? computeRelativeTree(menu.items, treeOperations) : []}
                onChange={handleChange}
                onItemAdd={onItemAdd}
                onItemClick={onItemClick}
                onItemEdit={onItemEdit}
                onUndo={() =>
                  setTreeOperations((operations) => {
                    if (
                      operations.length > 1 &&
                      operations[operations.length - 2]?.simulatedMove
                    ) {
                      return operations.slice(0, operations.length - 2);
                    }
                    return operations.slice(0, operations.length - 1);
                  })
                }
              />
            </div>
          </Grid>
          <SaveBar
            onCancel={() => router.push('/navigation')}
            disabled={disabled || treeOperations.length === 0}
            onDelete={onDelete}
            onSubmit={submit}
            state={saveButtonState}
          />
        </Container>
      )}
    </Form>
  );
};
MenuDetailsPage.displayName = 'MenuDetailsPage';
export default MenuDetailsPage;
