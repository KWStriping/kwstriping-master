import { Button } from '@core/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import Grid from '@core/ui/components/Grid';

// import { useExtendedAttributeStyles } from "./styles";

interface ExtendedAttributeRowProps {
  label: string;
  selectLabel: string;
  disabled: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const ExtendedAttributeRow: FC<ExtendedAttributeRowProps> = (props) => {
  const { label, selectLabel, disabled, onSelect, children } = props;
  // const styles = useExtendedAttributeStyles(props);
  const styles = {};

  return (
    <>
      <Grid className={styles.attributeSection ?? ''} variant="uniform">
        <div className={styles.attributeSectionLabel ?? ''} data-test-id="attribute-label">
          <Typography>{label}</Typography>
        </div>
        <div data-test-id="attribute-selector">
          <Button
            className={styles.attributeSectionButton ?? ''}
            disabled={disabled}
            color="secondary"
            data-test-id="button-attribute-selector"
            onClick={onSelect}
          >
            {selectLabel}
          </Button>
        </div>
      </Grid>
      <div data-test-id="attribute-value">{children}</div>
    </>
  );
};

ExtendedAttributeRow.displayName = 'ExtendedAttributeRow';
export default ExtendedAttributeRow;
