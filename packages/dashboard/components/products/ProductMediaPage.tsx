import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import { ProductMediaType } from '@core/api/constants';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import ProductMediaNavigation from './ProductMediaNavigation';

const useStyles = makeStyles(
  (theme) => ({
    image: {
      height: '100%',
      objectFit: 'contain',
      width: '100%',
    },
    imageContainer: {
      '& iframe': {
        width: '100%',
        maxHeight: 420,
      },
      border: '1px solid #eaeaea',
      borderRadius: theme.spacing(1),
      margin: `0 auto ${theme.spacing(2)}px`,
      width: '100%',
      padding: theme.spacing(2),
    },
  }),
  { name: 'ProductMediaPage' }
);

interface ProductMediaPageProps {
  productId: string;
  mediaObj?: {
    id: string;
    alt: string;
    url: string;
    type: string;
    oembedData?: string;
  };
  media?: Array<{
    id: string;
    url: string;
  }>;
  disabled: boolean;
  product: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onDelete: () => void;
  onRowClick: (id: string) => () => void;
  onSubmit: (data: { description: string }) => void;
}

const ProductMediaPage: FC<ProductMediaPageProps> = (props) => {
  const {
    productId,
    disabled,
    mediaObj,
    media,
    product,
    saveButtonBarState,
    onDelete,
    onRowClick,
    onSubmit,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Form
      initial={{ description: mediaObj ? mediaObj.alt : '' }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, submit }) => (
        <Container>
          <Backlink href={productUrl(productId)}>{product}</Backlink>
          <PageHeader title={t('dashboard.editMedia', 'Edit Media')} />
          <Grid variant="inverted">
            <div>
              <ProductMediaNavigation
                disabled={disabled}
                media={media}
                highlighted={media ? mediaObj.id : undefined}
                onRowClick={onRowClick}
              />
              <Card>
                <CardTitle title={t('dashboard.pageInformation', 'Media Information')} />
                <CardContent>
                  <TextField
                    name="description"
                    label={t('dashboard.description', 'Description')}
                    helperText={t('dashboard.optional', 'Optional')}
                    disabled={disabled}
                    onChange={change}
                    value={data?.description}
                    multiline
                    fullWidth
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardTitle title={t('dashboard.mediaView', 'Media View')} />
                <CardContent>
                  {mediaObj ? (
                    mediaObj?.type === ProductMediaType.Image ? (
                      <div className={styles.imageContainer ?? ''}>
                        <Image
                          className={styles.image ?? ''}
                          src={mediaObj.url}
                          alt={mediaObj.alt}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.imageContainer ?? ''}
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(mediaObj?.oembedData)?.html,
                        }}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </CardContent>
              </Card>
            </div>
          </Grid>
          <SaveBar
            disabled={disabled || !onSubmit}
            state={saveButtonBarState}
            onCancel={() => router.push(productUrl(productId))}
            onDelete={onDelete}
            onSubmit={submit}
          />
        </Container>
      )}
    </Form>
  );
};
ProductMediaPage.displayName = 'ProductMediaPage';
export default ProductMediaPage;
