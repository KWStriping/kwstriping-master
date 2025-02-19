import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import type { MetadataInput } from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';

import styles from './index.module.css';
import { EventDataAction, EventDataField } from './types';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface MetadataCardProps {
  data: MetadataInput[];
  isPrivate: boolean;
  onChange: FormChange;
}

export const nameSeparator = ':';
export const nameInputPrefix = EventDataField.name;
export const valueInputPrefix = EventDataField.value;

export const MetadataCard: FC<MetadataCardProps> = ({ data, isPrivate, onChange }) => {
  const loaded = useRef(false);
  const [expanded, setExpanded] = useState(true);
  const dataIsUndefined = data === undefined;
  useEffect(() => {
    if (!dataIsUndefined) {
      loaded.current = true;
      if (data?.length) {
        setExpanded(false);
      }
    }
  }, [dataIsUndefined]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      data-test-id="metadata-editor"
      data-test-is-private={isPrivate}
      data-test-expanded={expanded}
    >
      <CardTitle
        className={styles.header ?? ''}
        title={
          <>
            {isPrivate
              ? (m.dashboard_THnjq() ?? 'Private Metadata')
              : (m.dashboard_cI() + Zh ?? 'Metadata')}
            <IconButton
              className={clsx(styles.expandBtn, expanded && styles.rotate)}
              hoverOutline={false}
              color="secondary"
              data-test-id="expand"
              onClick={() => setExpanded(!expanded)}
            >
              <OpenInFullIcon />
            </IconButton>
          </>
        }
      />
      {data === undefined ? (
        <CardContent>
          <Skeleton />
        </CardContent>
      ) : (
        <>
          <CardContent className={styles.content ?? ''}>
            {!!data?.length && (
              <Typography color="textSecondary" variant="body2">
                <Trans t={t} i18nKey={'2+v1wX'} count={data?.length}>
                  {data?.length === 1 ? '{{count}} string' : '{{count}} strings'}
                </Trans>
              </Typography>
            )}
          </CardContent>
          {expanded && (
            <>
              {data?.length === 0 ? (
                <CardContent className={styles.emptyContainer ?? ''}>
                  <Typography variant="body2" color="textSecondary">
                    {m.dashboard_emptyMetadataText() ??
                      'No metadata created for this element. Use the button below to add new metadata field.'}
                  </Typography>
                </CardContent>
              ) : (
                <Table className={styles.table ?? ''}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.colNameHeader ?? ''}>
                        <>
                          {/* metadata field name, header */}

                          {m.dashboard_udPsY() ?? 'Field'}
                        </>
                      </TableCell>
                      <TableCell className={styles.colValue ?? ''}>
                        <>
                          {/* metadata field value, header */}

                          {m.dashboard_kuDEb() ?? 'Value'}
                        </>
                      </TableCell>
                      <TableCell className={styles.colActionHeader ?? ''}>
                        <>
                          {/* table action */}

                          {m.dashboard_Eixpu() ?? 'Actions'}
                        </>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((field, fieldIndex) => (
                      <TableRow data-test-id="field" key={fieldIndex}>
                        <TableCell className={styles.colName ?? ''}>
                          <TextField
                            InputProps={{
                              classes: {
                                input: styles.nameInput ?? '',
                              },
                            }}
                            inputProps={{
                              'aria-label': `${nameInputPrefix}${nameSeparator}${fieldIndex}`,
                            }}
                            name={`${nameInputPrefix}${nameSeparator}${fieldIndex}`}
                            fullWidth
                            onChange={onChange}
                            value={field.key}
                          />
                        </TableCell>
                        <TableCell className={styles.colValue ?? ''}>
                          <TextField
                            InputProps={{
                              classes: {
                                root: styles.input ?? '',
                              },
                            }}
                            inputProps={{
                              'aria-label': `${valueInputPrefix}${nameSeparator}${fieldIndex}`,
                            }}
                            multiline
                            name={`${valueInputPrefix}${nameSeparator}${fieldIndex}`}
                            fullWidth
                            onChange={onChange}
                            value={field.value}
                          />
                        </TableCell>
                        <TableCell className={styles.colAction ?? ''}>
                          <IconButton
                            color="secondary"
                            data-test-id={'delete-field-' + fieldIndex}
                            onClick={() =>
                              onChange({
                                target: {
                                  name: EventDataAction.delete,
                                  value: fieldIndex,
                                },
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <CardActions className={styles.actions ?? ''}>
                <Button
                  color="secondary"
                  data-test-id="add-field"
                  onClick={() =>
                    onChange({
                      target: {
                        name: EventDataAction.add,
                        value: null,
                      },
                    })
                  }
                >
                  {m.dashboard_iDxS_() ?? 'Add Field'}
                </Button>
              </CardActions>
            </>
          )}
        </>
      )}
    </Card>
  );
};

MetadataCard.displayName = 'MetadataCard';
export default MetadataCard;
