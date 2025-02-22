import { getById, getByUnmatchingId } from '@tempo/utils';
import { getUpdatedIdsWithNewId, getUpdatedIdsWithoutNewId } from './utils';
import type { FormData } from '@tempo/dashboard/components/channels/ChannelForm';
import type { ReorderAction, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import { move } from '@tempo/dashboard/oldSrc/utils/lists';

export function createShippingZoneAddHandler(
  data: FormData,
  searchShippingZonesData: SearchData,
  set: (data: Partial<FormData>) => void,
  triggerChange: () => void
) {
  return (zoneId: string) => {
    triggerChange();

    set({
      ...data,
      shippingZonesIdsToRemove: getUpdatedIdsWithoutNewId(data?.shippingZonesIdsToRemove, zoneId),
      shippingZonesIdsToAdd: getUpdatedIdsWithNewId(data?.shippingZonesIdsToAdd, zoneId),
      shippingZonesToDisplay: [
        ...data?.shippingZonesToDisplay,
        getParsedSearchData({ data: searchShippingZonesData }).find(getById(zoneId)),
      ],
    });
  };
}

export function createShippingZoneRemoveHandler(
  data: FormData,
  set: (data: Partial<FormData>) => void,
  triggerChange: () => void
) {
  return (zoneId: string) => {
    triggerChange();

    set({
      ...data,
      shippingZonesIdsToAdd: getUpdatedIdsWithoutNewId(data?.shippingZonesIdsToAdd, zoneId),
      shippingZonesIdsToRemove: getUpdatedIdsWithNewId(data?.shippingZonesIdsToRemove, zoneId),
      shippingZonesToDisplay: data?.shippingZonesToDisplay?.filter(getByUnmatchingId(zoneId)),
    });
  };
}

export function createWarehouseAddHandler(
  data: FormData,
  searchWarehousesData: SearchData,
  set: (data: Partial<FormData>) => void,
  triggerChange: () => void
) {
  return (warehouseId: string) => {
    triggerChange();

    set({
      ...data,
      warehousesIdsToRemove: getUpdatedIdsWithoutNewId(data?.warehousesIdsToRemove, warehouseId),
      warehousesIdsToAdd: getUpdatedIdsWithNewId(data?.warehousesIdsToAdd, warehouseId),
      warehousesToDisplay: [
        ...data?.warehousesToDisplay,
        getParsedSearchData({ data: searchWarehousesData }).find(getById(warehouseId)),
      ],
    });
  };
}

export function createWarehouseRemoveHandler(
  data: FormData,
  set: (data: Partial<FormData>) => void,
  triggerChange: () => void
) {
  return (warehouseId: string) => {
    triggerChange();

    set({
      ...data,
      warehousesIdsToAdd: getUpdatedIdsWithoutNewId(data?.warehousesIdsToAdd, warehouseId),
      warehousesIdsToRemove: getUpdatedIdsWithNewId(data?.warehousesIdsToRemove, warehouseId),
      warehousesToDisplay: data?.warehousesToDisplay?.filter(getByUnmatchingId(warehouseId)),
    });
  };
}

export function createWarehouseReorderHandler(
  data: FormData,
  set: (data: Partial<FormData>) => void
): ReorderAction {
  return ({ oldIndex, newIndex }: ReorderEvent) => {
    const updatedWarehousesToDisplay = move(
      data?.warehousesToDisplay[oldIndex],
      data?.warehousesToDisplay,
      (a, b) => a.id === b.id,
      newIndex
    );

    set({
      ...data,
      warehousesToDisplay: updatedWarehousesToDisplay,
    });
  };
}
