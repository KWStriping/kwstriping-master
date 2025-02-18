import type { ProductDetailsFragment } from '@tempo/api/generated/graphql';
import { notNullable } from '@tempo/ui/utils/money';

/**
 * If a variant has been selected by the user and this variant has media, return only those items.
 * Otherwise, all product media are returned.
 * @param product  The product object
 * @param selectedVariant   The selected variant object
 */

export const getGalleryMedia = ({
  product,
  selectedVariant,
}: {
  product: Maybe<ProductDetailsFragment>;
  selectedVariant?: Maybe<ProductDetailsFragment>;
}) => {
  if (selectedVariant && selectedVariant.media?.length !== 0)
    return selectedVariant.media?.filter(notNullable) || [];
  return product?.media?.filter(notNullable) || [];
};

export const getYouTubeIDFromURL = (url: string) => {
  /* eslint-disable-next-line  regexp/no-unused-capturing-group */
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7]?.length === 11 ? match[7] : undefined;
};

export const getVideoThumbnail = (videoUrl: string) => {
  const videoId = getYouTubeIDFromURL(videoUrl);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
