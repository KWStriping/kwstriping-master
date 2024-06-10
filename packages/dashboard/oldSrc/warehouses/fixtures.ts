import { shippingZones } from '../shipping/fixtures';
import type {
  WarehouseDetailsFragment,
  WarehouseWithShippingFragment,
} from '@core/api/graphql';
import { WarehouseClickAndCollectOption } from '@core/api/constants';
import { address } from '@dashboard/oldSrc/fixtures';

export const warehouseList: WarehouseWithShippingFragment[] = [
  {
    __typename: 'Warehouse',
    id: 'V2FyZWhvdXNlOmEzMThmMGZlLTcwMmYtNDNjYy1hYmFjLWZmZmMzN2Y3ZTliYw==',
    name: 'C our wares',
    shippingZones: {
      __typename: 'ShippingZoneConnection',
      edges: shippingZones.map((node) => ({
        __typename: 'ShippingZoneCountableEdge',
        node,
      })),
    },
  },
  {
    __typename: 'Warehouse',
    id: 'V2FyZWhvdXNlOjJmN2UyOTlmLWEwMzMtNDhjZS1iYmM5LTFkZDM4NjU2ZjMwYw==',
    name: 'Be stocked',
    shippingZones: {
      __typename: 'ShippingZoneConnection',
      edges: shippingZones.map((node) => ({
        __typename: 'ShippingZoneCountableEdge',
        node,
      })),
    },
  },
  {
    __typename: 'Warehouse',
    id: 'V2FyZWhvdXNlOmM0ZmQ3Nzc0LWZlMjYtNDE1YS1hYjk1LWFlYTFjMjI0NTgwNg==',
    name: 'A Warehouse',
    shippingZones: {
      __typename: 'ShippingZoneConnection',
      edges: shippingZones.map((node) => ({
        __typename: 'ShippingZoneCountableEdge',
        node,
      })),
    },
  },
  {
    __typename: 'Warehouse',
    id: 'V2FyZWhvdXNlOmNlMmNiZDhhLWRkYmQtNDhiNS1hM2UxLTNmZGVkZGI5MWZkMg==',
    name: 'Darkwares',
    shippingZones: {
      __typename: 'ShippingZoneConnection',
      edges: shippingZones.map((node) => ({
        __typename: 'ShippingZoneCountableEdge',
        node,
      })),
    },
  },
];

export const warehouse: WarehouseDetailsFragment = {
  ...warehouseList[0],
  isPrivate: true,
  clickAndCollectOption: WarehouseClickAndCollectOption.Disabled,
  address,
};

export const warehouseForPickup: WarehouseDetailsFragment = {
  ...warehouseList[0],
  isPrivate: false,
  clickAndCollectOption: WarehouseClickAndCollectOption.All,
  address,
};
