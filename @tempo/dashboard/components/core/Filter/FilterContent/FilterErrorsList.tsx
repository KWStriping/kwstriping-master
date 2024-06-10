import * as m from '@paraglide/messages';
import InlineAlert from '@tempo/ui/components/AlertCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { validationMessages } from '../messages';
import type {
  FilterElement,
  FilterErrorMessages,
  FilterErrors,
  ValidationErrorCode,
} from '../types';

interface FilterErrorsListProps<T extends string = string> {
  filter: FilterElement<T>;
  errors?: FilterErrors;
  errorMessages?: FilterErrorMessages<T>;
}

const FilterErrorsList: FC<FilterErrorsListProps> = ({
  filter: { dependencies },
  errors = [],
  errorMessages,
}) => {
  const getErrorMessage = (code: keyof typeof validationMessages) => {
    try {
      return m[errorMessages?.[code] || validationMessages[code]]({
        dependencies: dependencies?.join(),
      });
    } catch (e) {
      // errorTracker.captureException(e as Error);
      console.warn('Translation missing for filter error code: ', code);
      return m.dashboard_NKNOWN_ERROR() ?? 'Unknown error occurred';
    }
  };

  if (!errors?.length) return null;

  return (
    <div>
      {!!errors?.length && (
        <InlineAlert>
          {errors.map((code) => (
            <Box
              key={code}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '100%',
                  height: 8,
                  minHeight: 8,
                  width: 8,
                  minWidth: 8,
                }}
              />
              <Typography>{getErrorMessage(code as ValidationErrorCode)}</Typography>
            </Box>
          ))}
        </InlineAlert>
      )}
    </div>
  );
};

export default FilterErrorsList;
