import { useTranslation } from '@core/i18n';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import CardAddItemsFooter from '@dashboard/components/products/ProductStocks/CardAddItemsFooter';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { AssignItem, AssignmentListProps } from './types';

const messages = {
  addItemTitle: {
    id: 'EuOXmr',
    defaultMessage: 'Add {itemsName}',
    description: 'add items title',
  },
};

type AssignmentListFooterProps = AssignmentListProps;

const AssignmentListFooter: FC<AssignmentListFooterProps> = ({
  items,
  itemsChoices,
  itemsName,
  inputName,
  dataTestId,
  addItem,
  searchItems,
  fetchMoreItems,
}) => {
  const { t } = useTranslation();

  const [isChoicesSelectShown, setIsChoicesSelectShown] = useState(false);
  const itemsRef = useRef<AssignItem[]>(items);

  // select holds value and displays it so it needs remounting
  // to display empty input after adding new zone
  useEffect(() => {
    if (items.length > itemsRef.current.length) {
      setIsChoicesSelectShown(true);
    }

    itemsRef.current = items;
  }, [items]);

  const handleChoice = ({ target }) => {
    setIsChoicesSelectShown(false);
    addItem(target.value);
  };

  const handleFooterClickAway = () => {
    setIsChoicesSelectShown(false);
    searchItems('');
  };

  return isChoicesSelectShown ? (
    <ClickAwayListener onClickAway={handleFooterClickAway}>
      <div className={styles.root ?? ''}>
        <SingleAutocompleteSelectField
          data-test-id={`${dataTestId}-auto-complete-select`}
          value=""
          displayValue=""
          nakedInput
          name={inputName}
          choices={mapNodeToChoice(itemsChoices)}
          fetchChoices={searchItems}
          onChange={handleChoice}
          {...fetchMoreItems}
        />
      </div>
    </ClickAwayListener>
  ) : (
    <CardAddItemsFooter
      onAdd={() => setIsChoicesSelectShown(true)}
      title={t('dashboard.addItemTitle', 'Add {{itemsName}}', {
        itemsName,
      })}
      testIds={{
        link: `${dataTestId}-add-link`,
        button: `${dataTestId}-add-button`,
      }}
    />
  );
};

export default AssignmentListFooter;
