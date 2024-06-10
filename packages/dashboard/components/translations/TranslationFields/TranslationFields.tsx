import { Trans, useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import IconButton from '@core/ui/components/buttons/IconButton';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import TablePaginationWithContext from '@dashboard/components/tables/TablePagination';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { TranslationFieldType } from '@dashboard/oldSrc/translations/types';
import type { TranslationField } from '@dashboard/oldSrc/translations/types';
import type { ListProps } from '@dashboard/oldSrc/types';
import type { OutputData } from '@editorjs/editorjs';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import type { FC } from 'react';

import TranslationFieldsLong from './TranslationFieldsLong';
import TranslationFieldsRich from './TranslationFieldsRich';
import TranslationFieldsShort from './TranslationFieldsShort';

type Pagination = Pick<ListProps, Exclude<keyof ListProps, 'getRowHref' | 'disabled'>>;

export interface TranslationFieldsProps {
  activeField: string;
  disabled: boolean;
  title: string;
  fields: TranslationField[];
  initialState: boolean;
  saveButtonState: ConfirmButtonTransitionState;
  pagination?: Pagination;
  richTextResetKey: string; // temporary workaround TODO: fix rich text editor
  onEdit: (field: string) => void;
  onDiscard: () => void;
  onSubmit: (field: TranslationField, data: string | OutputData) => SubmitPromise;
}

const useStyles = makeStyles(
  (theme) => ({
    cardCaption: {
      fontSize: 14,
    },
    cardContent: {
      '&:last-child': {
        paddingBottom: theme.spacing(1),
      },
    },
    columnHeader: {
      marginBottom: theme.spacing(0.5),
    },
    content: {
      // "& a": {
      //   color: theme.vars.palette.textHighlighted.active,
      // },
      '& blockquote': {
        borderLeft: `2px solid ${theme.vars.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1, 2),
      },
      '& h2': {
        fontSize: 22,
        marginBottom: theme.spacing(1),
      },
      '& h3': {
        fontSize: 19,
        marginBottom: theme.spacing(1),
      },
      '& p': {
        '&:last-child': {
          marginBottom: 0,
        },
        marginBottom: theme.spacing(1),
        marginTop: 0,
      },
      paddingBottom: theme.spacing(2),
    },
    editButtonContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    fieldName: {
      color: theme.typography.caption.color,
      fontSize: 14,
      fontWeight: 500,
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
      textTransform: 'uppercase',
    },
    grid: {
      gridRowGap: 0,
    },
    hr: {
      gridColumnEnd: 'span 2',
    },

    rotate: {
      transform: 'rotate(180deg)',
    },
  }),
  { name: 'TranslationFields' }
);

const numberOfColumns = 2;

const TranslationFields: FC<TranslationFieldsProps> = (props) => {
  const {
    activeField,
    disabled,
    fields,
    initialState,
    title,
    saveButtonState,
    pagination,
    richTextResetKey,
    onEdit,
    onDiscard,
    onSubmit,
  } = props;
  const styles = useStyles(props);

  const [expanded, setExpandedState] = useState(initialState);
  const { t } = useTranslation();
  return (
    <Card>
      <CardTitle
        title={title}
        toolbar={
          <IconButton color="secondary" onClick={() => setExpandedState(!expanded)}>
            <ArrowIcon className={clsx(expanded && styles.rotate)} />
          </IconButton>
        }
      />
      {expanded ? (
        <CardContent className={styles.cardContent ?? ''}>
          <Grid className={styles.grid ?? ''} variant="uniform">
            <Typography className={styles.columnHeader ?? ''} variant="body1">
              {t('dashboard.td0AT', 'Original String')}
            </Typography>
            <Typography className={styles.columnHeader ?? ''} variant="body1">
              <>
                {/* Translated Name */}

                {t('dashboard.VY7j0', 'Translation')}
              </>
            </Typography>
            {fields.map((field) => (
              <Fragment key={field.name}>
                <Divider className={styles.hr ?? ''} />
                <Typography className={styles.fieldName ?? ''} variant="body1">
                  {field.displayName}
                </Typography>
                <div className={styles.editButtonContainer ?? ''}>
                  <Button data-test-id={`edit-${field.name}`} onClick={() => onEdit(field.name)}>
                    {t('dashboard.edit', 'Edit')}
                  </Button>
                </div>
                <div className={styles.content ?? ''}>
                  {field && field.value !== undefined ? (
                    field.type === TranslationFieldType.Short ? (
                      <TranslationFieldsShort
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    ) : field.type === TranslationFieldType.Long ? (
                      <TranslationFieldsLong
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    ) : (
                      <TranslationFieldsRich
                        resetKey={richTextResetKey}
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </div>
                <Typography className={styles.content ?? ''}>
                  {field && field.translation !== undefined ? (
                    field.type === TranslationFieldType.Short ? (
                      <TranslationFieldsShort
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={(data) => onSubmit(field, data)}
                      />
                    ) : field.type === TranslationFieldType.Long ? (
                      <TranslationFieldsLong
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={(data) => onSubmit(field, data)}
                      />
                    ) : // FIXME
                    // For now this is the only way to fix the issue
                    // of initializing the editor with fetched data.
                    // Without this the editor doesn't get the saved data
                    // and is empty
                    disabled ? (
                      <Skeleton />
                    ) : (
                      <TranslationFieldsRich
                        resetKey={richTextResetKey}
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={(data) => onSubmit(field, data)}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </Typography>
              </Fragment>
            ))}
          </Grid>
          {pagination && (
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={pagination.settings}
              onUpdateListSettings={pagination.onUpdateListSettings}
              component="div"
            />
          )}
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={styles.cardCaption ?? ''} variant="caption">
            <Trans
              id="bh+Keo"
              defaultMessage="{numberOfFields} Translations, {numberOfTranslatedFields} Completed"
              values={{
                numberOfFields: fields.length,
                numberOfTranslatedFields: fields.reduce(
                  (acc, field) => acc + +(field.translation !== null),
                  0
                ),
              }}
            />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};
TranslationFields.displayName = 'TranslationFields';
export default TranslationFields;
