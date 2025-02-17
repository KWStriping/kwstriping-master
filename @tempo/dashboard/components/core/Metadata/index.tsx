import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import type { MetadataInput } from '@tempo/api/generated/graphql';
import type { FC } from 'react';

import type { MetadataCardProps } from './MetadataCard';
import MetadataCard from './MetadataCard';
import { EventDataAction, EventDataField } from './types';
import { getDataKey, parseEventData } from './utils';
import { removeAtIndex, updateAtIndex } from '@tempo/dashboard/oldSrc/utils/lists';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

export * from './types';

export interface MetadataProps extends Omit<MetadataCardProps, 'data' | 'isPrivate'> {
  data: Record<'metadata' | 'privateMetadata', MetadataInput[]>;
}

const Metadata: FC<MetadataProps> = ({ data, onChange }) => {
  const { enableMetadata } = useShopSettings();
  if (!enableMetadata) {
    console.log('Metadata is disabled.');
    return null;
  }
  const change = (event: ChangeEvent, isPrivate: boolean) => {
    const { action, field, fieldIndex, value } = parseEventData(event);
    const key = getDataKey(isPrivate);
    const dataToUpdate = data[key];

    onChange({
      target: {
        name: key,
        value:
          action === EventDataAction.update
            ? updateAtIndex(
                {
                  ...dataToUpdate[fieldIndex],
                  key: field === EventDataField.name ? value : dataToUpdate[fieldIndex]?.key,
                  value: field === EventDataField.value ? value : dataToUpdate[fieldIndex]?.value,
                },
                dataToUpdate,
                fieldIndex
              )
            : action === EventDataAction.add
              ? [
                  ...dataToUpdate,
                  {
                    key: '',
                    value: '',
                  },
                ]
              : removeAtIndex(dataToUpdate, fieldIndex),
      },
    });
  };

  return (
    <>
      <MetadataCard
        data={data?.metadata}
        isPrivate={false}
        onChange={(event) => change(event, false)}
      />
      <CardSpacer />
      <MetadataCard
        data={data?.privateMetadata}
        isPrivate={true}
        onChange={(event) => change(event, true)}
      />
    </>
  );
};

Metadata.displayName = 'Metadata';
export default Metadata;
