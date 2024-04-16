import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import type { AttributePageFormData } from '@dashboard/components/attributes/AttributePage';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type { MeasurementUnit } from '@core/api/constants';
import type { UseFormResult } from '@dashboard/hooks/useForm';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FC, ChangeEvent } from 'react';

import * as M from './messages';
import type { UnitSystem, UnitType } from './utils';
import { getUnitChoices, unitMapping, unitSystemChoices, unitTypeChoices } from './utils';

const useStyles = makeStyles(
  (theme) => ({
    unitsRow: {
      columnGap: theme.spacing(2),
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexFlow: 'wrap',
        rowGap: theme.spacing(3),
      },
    },
    hr: {
      border: 'none',
      borderTop: `1px solid ${theme.vars.palette.divider}`,
      height: 0,
      margin: '0.5rem 0',
      width: '100%',
    },
  }),
  { name: 'NumericUnits' }
);

interface UnitData {
  unit?: MeasurementUnit;
  system?: UnitSystem;
  type?: UnitType;
}

interface NumericUnitsProps
  extends Pick<
    UseFormResult<AttributePageFormData>,
    'set' | 'setError' | 'data' | 'errors' | 'clearErrors'
  > {
  disabled: boolean;
}

export const NumericUnits: FC<NumericUnitsProps> = ({
  data,
  disabled,
  errors,
  set,
  setError,
  clearErrors,
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const [unitData, setUnitData] = useState<UnitData>({
    unit: data?.unit ?? null,
  });

  const { unit, system, type } = unitData;
  const errorProps = {
    error: !!errors.unit,
    hint: t('requiredField', 'This field is required'),
  };
  const [typeChoices, systemChoices, unitChoices] = useMemo(
    () => [
      unitTypeChoices.map((choice) => ({
        ...choice,
        label: t(choice.label),
      })),
      unitSystemChoices.map((choice) => ({
        ...choice,
        label: t(choice.label),
      })),
      getUnitChoices(t),
    ],
    []
  );

  useEffect(() => set({ unit }), [unit]);

  useEffect(() => {
    if (data?.unit) {
      const selectInitialUnitData = () => {
        const initialData: UnitData = { unit: data?.unit };

        Object.entries(unitChoices).some(([system, types]) => {
          const systemMatch = Object.entries(types).some(([type, units]) => {
            const unitMatch = units.some(({ value }) => value === data?.unit);
            if (unitMatch) {
              initialData.type = type as UnitType;
            }
            return unitMatch;
          });
          if (systemMatch) {
            initialData.system = system as UnitSystem;
          }
          return systemMatch;
        });

        return initialData;
      };

      setUnitData(selectInitialUnitData());
    }
  }, []);

  useEffect(() => {
    if (unit === undefined && !errors.unit) {
      setError('unit', t('requiredField', 'This field is required'));
    }
    if (errors.unit && (unit || unit === null)) {
      clearErrors('unit');
    }
  }, [unitData, errors]);

  return (
    <div>
      <div className={styles.hr ?? ''} />
      <ControlledCheckbox
        data-test-id="numeric-with-unit"
        name="selectUnit"
        label={t(M.messages.selectUnit.id, M.messages.selectUnit.defaultMessage)}
        checked={data?.unit !== null}
        onChange={({ target }) => setUnitData({ unit: target.value ? undefined : null })}
        disabled={disabled}
      />
      {data?.unit !== null && (
        <div className={styles.unitsRow ?? ''}>
          <SingleSelectField
            {...(!system && errorProps)}
            testId="unit-system"
            label={t(M.messages.unitSystem.id, M.messages.unitSystem.defaultMessage)}
            choices={systemChoices}
            onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
              setUnitData({ system: target.value as UnitSystem })
            }
            value={system}
            disabled={disabled}
          />
          <SingleSelectField
            {...(system && !type && errorProps)}
            testId="unit-of"
            label={t(M.messages.unitOf.id, M.messages.unitOf.defaultMessage)}
            choices={typeChoices}
            onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
              setUnitData(({ system }) => ({
                system,
                type: target.value as UnitType,
              }))
            }
            disabled={!system || disabled}
            value={type}
          />
          <SingleSelectField
            {...(type && !unit && errorProps)}
            testId="unit"
            label={t(M.messages.unit.id, M.messages.unit.defaultMessage)}
            choices={type ? unitChoices[system][type] : []}
            onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
              setUnitData((data) => ({
                ...data,
                unit: target.value as MeasurementUnit,
              }))
            }
            disabled={!type || disabled}
            value={type && unitMapping[system][type].includes(unit) ? unit : undefined}
          />
        </div>
      )}
    </div>
  );
};
