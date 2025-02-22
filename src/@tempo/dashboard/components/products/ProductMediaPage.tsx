import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { makeStyles } from '@tempo/ui/theme/styles';
import { ProductMediaType } from '@tempo/api/generated/constants';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import ProductMediaNavigation from './ProductMediaNavigation';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import Form from '@tempo/dashboard/components/forms/Form';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
          <PageHeader title={m.dashboard_editMedia() ?? 'Edit Media'} />
          <Grid variant="inverted">
            <div>
              <ProductMediaNavigation
                disabled={disabled}
                media={media}
                highlighted={media ? mediaObj.id : undefined}
                onRowClick={onRowClick}
              />
              <Card>
                <CardTitle title={m.dashboard_pageInformation() ?? 'Media Information'} />
                <CardContent>
                  <TextField
                    name="description"
                    label={m.dashboard_description() ?? 'Description'}
                    helperText={m.dashboard_optional() ?? 'Optional'}
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
                <CardTitle title={m.dashboard_mediaView() ?? 'Media View'} />
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
