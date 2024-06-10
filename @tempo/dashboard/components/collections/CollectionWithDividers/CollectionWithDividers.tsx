import Divider from '@mui/material/Divider';
import type { FC, ReactNode } from 'react';

interface CollectionWithDividersProps<T> {
  DividerComponent?: FC;
  renderEmpty?: (collection: T[]) => unknown;
  withOuterDividers?: boolean;
  collection: T[];
  renderItem: (item: T | undefined, index: number | undefined, collection: T[]) => unknown;
}

const Wrapper: FC<{
  withOuterDividers?: boolean;
  SelectedDivider?: FC;
  children: ReactNode;
}> = ({ withOuterDividers, SelectedDivider, children }) => (
  <div>
    {withOuterDividers && SelectedDivider ? (
      <>
        <SelectedDivider />
        {children}
        <SelectedDivider />
      </>
    ) : (
      <>{children}</>
    )}
  </div>
);

function CollectionWithDividers<T>({
  withOuterDividers = false,
  collection,
  renderItem,
  DividerComponent,
  renderEmpty,
}: CollectionWithDividersProps<T>) {
  const hasNoItemsAndPlaceholder = !renderEmpty && !collection.length;

  if (hasNoItemsAndPlaceholder) return null;

  if (!collection.length) {
    return renderEmpty ? renderEmpty(collection) : null;
  }

  const SelectedDividerComponent = DividerComponent || Divider;

  return (
    <Wrapper withOuterDividers={withOuterDividers} SelectedDivider={SelectedDividerComponent}>
      <>
        {collection.map((item, index) => (
          <>
            {renderItem(item, index, collection)}
            <SelectedDividerComponent />
          </>
        ))}
      </>
    </Wrapper>
  );
}

export default CollectionWithDividers;
