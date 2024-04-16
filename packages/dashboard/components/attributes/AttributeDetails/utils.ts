import type { TFunction } from '@core/i18n';
import { isValidElement } from 'react';
import type { ReactNode } from 'react';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import { MeasurementUnit } from '@core/api/constants';

import * as M from './messages';

export type UnitSystem = 'imperial' | 'metric';
export type UnitType = 'volume' | 'weight' | 'area' | 'distance';

const UNIT_MESSAGES_MAPPING = {
  [MeasurementUnit.CubicFoot]: M.units.cubicFoot,
  [MeasurementUnit.CubicInch]: M.units.cubicInch,
  [MeasurementUnit.CubicYard]: M.units.cubicYard,
  [MeasurementUnit.Qt]: M.units.qt,
  [MeasurementUnit.FlOz]: M.units.flOz,
  [MeasurementUnit.Pint]: M.units.pint,
  [MeasurementUnit.AcreIn]: M.units.acreInch,
  [MeasurementUnit.AcreFt]: M.units.acreFt,
  [MeasurementUnit.Ft]: M.units.ft,
  [MeasurementUnit.Yd]: M.units.yd,
  [MeasurementUnit.Inch]: M.units.inch,
  [MeasurementUnit.Lb]: M.units.lbs,
  [MeasurementUnit.Oz]: M.units.oz,
  [MeasurementUnit.SqFt]: M.units.squareFt,
  [MeasurementUnit.SqYd]: M.units.squareYd,
  [MeasurementUnit.SqInch]: M.units.squareInch,
  [MeasurementUnit.CubicCentimeter]: M.units.cubicCentimeter,
  [MeasurementUnit.CubicDecimeter]: M.units.cubicDecimeter,
  [MeasurementUnit.CubicMeter]: M.units.cubicMeter,
  [MeasurementUnit.Liter]: M.units.liter,
  [MeasurementUnit.Cm]: M.units.centimeter,
  [MeasurementUnit.M]: M.units.meter,
  [MeasurementUnit.Km]: M.units.kilometer,
  [MeasurementUnit.G]: M.units.gram,
  [MeasurementUnit.Kg]: M.units.kilogram,
  [MeasurementUnit.Tonne]: M.units.tonne,
  [MeasurementUnit.SqCm]: M.units.squareCentimeter,
  [MeasurementUnit.SqM]: M.units.squareMeter,
  [MeasurementUnit.SqKm]: M.units.squareKilometer,
};

export const getMeasurementUnitMessage = (
  unit: MeasurementUnit,
  t: TFunction
): ReactNode => {
  const message = UNIT_MESSAGES_MAPPING[unit];
  return typeof message === 'string' || isValidElement(message) ? message : t(message);
};

export const unitSystemChoices: Array<Choice<UnitSystem, MessageDescriptor>> = [
  {
    label: M.unitSystemMessages.metric,
    value: 'metric',
  },
  {
    label: M.unitSystemMessages.imperial,
    value: 'imperial',
  },
];

export const unitTypeChoices: Array<Choice<UnitType, MessageDescriptor>> = [
  {
    label: M.unitTypeMessages.volume,
    value: 'volume',
  },
  {
    label: M.unitTypeMessages.distance,
    value: 'distance',
  },
  {
    label: M.unitTypeMessages.weight,
    value: 'weight',
  },
  {
    label: M.unitTypeMessages.area,
    value: 'area',
  },
];

export const unitMapping = {
  imperial: {
    volume: [
      MeasurementUnit.CubicFoot,
      MeasurementUnit.CubicInch,
      MeasurementUnit.CubicYard,
      MeasurementUnit.Qt,
      MeasurementUnit.FlOz,
      MeasurementUnit.Pint,
      MeasurementUnit.AcreIn,
      MeasurementUnit.AcreFt,
    ],
    distance: [MeasurementUnit.Ft, MeasurementUnit.Yd, MeasurementUnit.Inch],
    weight: [MeasurementUnit.Lb, MeasurementUnit.Oz],
    area: [
      MeasurementUnit.SqFt,
      MeasurementUnit.SqYd,
      MeasurementUnit.SqInch,
    ],
  },
  metric: {
    volume: [
      MeasurementUnit.CubicCentimeter,
      MeasurementUnit.CubicDecimeter,
      MeasurementUnit.CubicMeter,
      MeasurementUnit.Liter,
    ],
    distance: [MeasurementUnit.Cm, MeasurementUnit.M, MeasurementUnit.Km],
    weight: [MeasurementUnit.G, MeasurementUnit.Kg, MeasurementUnit.Tonne],
    area: [
      MeasurementUnit.SqCm,
      MeasurementUnit.SqM,
      MeasurementUnit.SqKm,
    ],
  },
};

const extractTypeChoices = (
  typeEnums: {
    [key in UnitType]: MeasurementUnit[];
  },
  t: TFunction
) =>
  Object.entries(typeEnums).reduce(
    (acc, [type, units]) => ({
      ...acc,
      [type]: units.map((unit) => ({
        value: unit,
        label: getMeasurementUnitMessage(unit, t),
      })),
    }),
    {}
  );

export const getUnitChoices = (
  t: TFunction
): {
  [key in UnitSystem]: {
    [key in UnitType]: Array<Choice<MeasurementUnit>>;
  };
} =>
  Object.entries(unitMapping).reduce(
    (acc, [system, typeEnums]) => ({
      ...acc,
      [system]: extractTypeChoices(typeEnums, t),
    }),
    {}
  ) as {
    [key in UnitSystem]: {
      [key in UnitType]: Array<Choice<MeasurementUnit>>;
    };
  };
