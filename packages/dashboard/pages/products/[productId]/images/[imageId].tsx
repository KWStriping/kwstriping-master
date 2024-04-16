import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import ProductMediaPage from '@dashboard/components/products/ProductMediaPage';
import {
  ProductMediaByIdDocument,
  ProductMediaDeleteDocument,
  ProductMediaUpdateDocument,
} from '@core/api/graphql';
import type { ProductImageUrlQueryParams } from '@dashboard/oldSrc/products/urls';
import { productImageUrl, productUrl } from '@dashboard/oldSrc/products/urls';

interface ProductMediaProps {
  mediaItemId: string;
  productId: string;
  params: ProductImageUrlQueryParams;
}

export const ProductImage: FC<ProductMediaProps> = ({ mediaItemId, productId, params }) => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();

  const handleBack = () => router.push(productUrl(productId));

  const [{ data, fetching: loading }] = useQuery(ProductMediaByIdDocument, {
    displayLoader: true,
    variables: {
      mediaItemId,
      productId,
    },
  });

  const [updateImage, updateResult] = useMutation(ProductMediaUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateProductMedia?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [deleteImage, deleteResult] = useMutation(ProductMediaDeleteDocument, {
    onCompleted: handleBack,
  });

  const product = data?.product;

  if (product === null) {
    return <NotFoundPage backHref="/products" />;
  }

  const handleDelete = () => deleteImage({ id: mediaItemId });
  const handleImageClick = (id: string) => () => router.push(productImageUrl(productId, id));
  const handleUpdate = (formData: { description: string }) => {
    updateImage({
      alt: formData.description,
      id: mediaItemId,
    });
  };
  const mediaObj = data?.product?.mainImage;

  return (
    <>
      <ProductMediaPage
        productId={productId}
        disabled={loading}
        product={data?.product?.name}
        mediaObj={mediaObj || null}
        media={data?.product?.media}
        onDelete={() =>
          void router.push(
            productImageUrl(productId, mediaItemId, {
              action: 'remove',
            })
          )
        }
        onRowClick={handleImageClick}
        onSubmit={handleUpdate}
        saveButtonBarState={updateResult.status}
      />
      <ActionDialog
        onClose={() => router.replace(productImageUrl(productId, mediaItemId))}
        onConfirm={handleDelete}
        open={params.action === 'remove'}
        title={t('dashboard.Cn/rd', 'Delete Image')}
        variant="delete"
        confirmButtonState={deleteResult.status}
      >
        <DialogContentText>
          {t('dashboard.Eext+', 'Are you sure you want to delete this image?')}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default ProductImage;
