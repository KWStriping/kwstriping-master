import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import type {
  CollectionErrorFragment,
  PageErrorFragment,
  ProductErrorFragment,
} from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import slugify from 'slugify';

import FormSpacer from '../Form/FormSpacer';
import styles from './index.module.css';
import getPageErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/page';
import { getFieldError, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

enum SeoField {
  slug = 'slug',
  title = 'seoTitle',
  description = 'seoDescription',
}

const SLUG_REGEX = /^[\w\-]+$/;
const maxSlugLength = 255;
const maxTitleLength = 70;
const maxDescriptionLength = 300;

interface SeoFormProps {
  description?: string | null;
  descriptionPlaceholder: string;
  disabled?: boolean;
  errors?: Array<PageErrorFragment | ProductErrorFragment | CollectionErrorFragment>;
  loading?: boolean;
  helperText?: string;
  allowEmptySlug?: boolean;
  title: string | null;
  slug: string;
  slugPlaceholder?: string;
  titlePlaceholder: string;
  onChange(event: unknown);
  onClick?();
}

const SeoForm: FC<SeoFormProps> = (props) => {
  const {
    description,
    descriptionPlaceholder,
    disabled,
    errors = [],
    helperText,
    allowEmptySlug = false,
    loading,
    title,
    slug,
    slugPlaceholder,
    titlePlaceholder,
    onChange,
  } = props;

  const [expanded, setExpansionStatus] = useState(false);

  const toggleExpansion = () => setExpansionStatus(!expanded);

  const shouldDisplayHelperText = helperText && !expanded;

  const { seoFieldMessage } = {
    seoFieldMessage: {
      id: 's/sTT6',
      defaultMessage: 'If empty, the preview shows what will be autogenerated.',
    },
  };

  const getSlugHelperMessage = () => {
    const error = !!getError(SeoField.slug);

    if (allowEmptySlug && !error) {
      return m[seoFieldMessage.id] ?? seoFieldMessage.defaultMessage;
    }

    return error ? getSlugErrorMessage() : '';
  };

  const getSlugErrorMessage = () => {
    const error = getError(SeoField.slug);
    const { __typename: type } = error;

    return type === 'ProductError'
      ? getProductErrorMessage(error as ProductErrorFragment, t)
      : getPageErrorMessage(error as PageErrorFragment, t);
  };

  const handleSlugChange = (event: ChangeEvent<unknown>) => {
    const { value } = event.target;

    if (value === '' || SLUG_REGEX.test(value)) {
      onChange(event);
    }
  };

  const getError = (fieldName: SeoField) => getFieldError(errors, fieldName);

  return (
    <Card>
      <CardTitle
        title={m.dashboard_GX_T_() ?? 'Search Engine Preview'}
        toolbar={
          <Button variant="tertiary" onClick={toggleExpansion} data-test-id="edit-seo">
            {m.dashboard_editWebsiteSEO() ?? 'Edit website SEO'}
          </Button>
        }
      />
      <CardContent>
        {shouldDisplayHelperText && (
          <Typography className={clsx(expanded && styles.helperText)}>{helperText}</Typography>
        )}
        {expanded && (
          <div className={styles.container ?? ''}>
            <TextField
              error={!!getError(SeoField.slug) || slug.length > maxSlugLength}
              name={SeoField.slug}
              label={
                <div className={styles.labelContainer ?? ''}>
                  <div className={styles.label ?? ''}>{m.dashboard_oDlcd() ?? 'Slug'}</div>
                  {!!slug?.length && (
                    <span>
                      <Trans
                        t={t}
                        i18nKey={'ChAjJu'}
                        maxCharacters={maxSlugLength}
                        numberOfCharacters={slug?.length}
                      >
                        {'{numberOfCharacters} of {maxCharacters} characters'}
                      </Trans>
                    </span>
                  )}
                </div>
              }
              InputProps={{
                inputProps: {
                  maxLength: maxSlugLength,
                },
              }}
              helperText={getSlugHelperMessage()}
              value={slug}
              disabled={loading || disabled}
              placeholder={slug || slugify(slugPlaceholder, { lower: true })}
              onChange={handleSlugChange}
              fullWidth
            />
            <FormSpacer />
            <TextField
              error={title?.length > maxTitleLength}
              name={SeoField.title}
              label={
                <div className={styles.labelContainer ?? ''}>
                  <div className={styles.label ?? ''}>
                    {m.dashboard__Cewo() ?? 'Search engine title'}
                  </div>
                  {!!title?.length && (
                    <span>
                      <Trans
                        t={t}
                        i18nKey={'ChAjJu'}
                        maxCharacters={maxTitleLength}
                        numberOfCharacters={title.length}
                      >
                        {'{numberOfCharacters} of {maxCharacters} characters'}
                      </Trans>
                    </span>
                  )}
                </div>
              }
              InputProps={{
                inputProps: {
                  maxLength: maxTitleLength,
                },
              }}
              helperText={m[seoFieldMessage]}
              value={title ?? ''}
              disabled={loading || disabled}
              placeholder={titlePlaceholder}
              onChange={onChange}
              fullWidth
            />
            <FormSpacer />
            <TextField
              error={description?.length > maxDescriptionLength}
              name={SeoField.description}
              label={
                <div className={styles.labelContainer ?? ''}>
                  <div className={styles.label ?? ''}>
                    {m.dashboard_XTIq_() ?? 'Search engine description'}
                  </div>
                  {!!description?.length && (
                    <span>
                      <Trans
                        t={t}
                        i18nKey={'ChAjJu'}
                        maxCharacters={maxDescriptionLength}
                        numberOfCharacters={description.length}
                      >
                        {'{numberOfCharacters} of {maxCharacters} characters'}
                      </Trans>
                    </span>
                  )}
                </div>
              }
              helperText={m[seoFieldMessage]}
              InputProps={{
                inputProps: {
                  maxLength: maxDescriptionLength,
                },
              }}
              value={description ?? ''}
              onChange={onChange}
              disabled={loading || disabled}
              fullWidth
              multiline
              placeholder={descriptionPlaceholder}
              rows={10}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
SeoForm.displayName = 'SeoForm';
export default SeoForm;
