import type {
  ProductDetailsFragment,
  ProductMediaFragment,
  ProductDetailsFragment,
} from '@core/api';
import { ImageExpand } from '@core/ui/components/product/ImageExpand';
import { VideoExpand } from '@core/ui/components/product/VideoExpand';
import { getGalleryMedia, getVideoThumbnail } from '@core/ui/utils/media';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export interface ProductGalleryProps {
  product: Maybe<ProductDetailsFragment>;
  selectedVariant?: Maybe<ProductDetailsFragment>;
}

export function ProductGallery({ product, selectedVariant }: ProductGalleryProps) {
  const [expandedImage, setExpandedImage] = useState<ProductMediaFragment | undefined>(undefined);
  const [videoToPlay, setVideoToPlay] = useState<ProductMediaFragment | undefined>(undefined);

  const galleryMedia = getGalleryMedia({ product, selectedVariant });

  return (
    <>
      <div
        className={clsx(
          'mt-1 mb-2 w-full max-h-screen grid grid-cols-1 gap-2 md:h-full h-96 overflow-scroll no-scrollbar',
          galleryMedia.length > 1 && 'md:grid-cols-2 md:col-span-2'
        )}
        style={{
          scrollSnapType: 'both mandatory',
        }}
      >
        {galleryMedia?.map((media: ProductMediaFragment) => {
          const videoThumbnailUrl = getVideoThumbnail(media.url);
          return (
            <div
              key={media.url}
              className="aspect-w-1 aspect-h-1"
              style={{
                scrollSnapAlign: 'start',
              }}
            >
              {media.type === 'IMAGE' && (
                <Image
                  onClick={() => setExpandedImage(media)}
                  src={media.url}
                  alt={media.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  role="button"
                  tabIndex={-2}
                  priority={true}
                />
              )}
              {media.type === 'VIDEO' && (
                <div
                  role="button"
                  tabIndex={-2}
                  onClick={() => {
                    setVideoToPlay(media);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setVideoToPlay(media);
                    }
                  }}
                >
                  {videoThumbnailUrl && (
                    <Image
                      src={videoThumbnailUrl}
                      alt={media.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 absolute w-full h-full flex justify-center items-center bg-transparent">
                    <PlayArrowIcon className="h-12 w-12" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {expandedImage && (
        <div className="absolute min-h-screen min-w-screen h-full w-full top-0 bottom-0 left-0 right-0 z-50">
          <ImageExpand image={expandedImage} onRemoveExpand={() => setExpandedImage(undefined)} />
        </div>
      )}

      {videoToPlay && (
        <div className="absolute min-h-screen min-w-screen top-0 bottom-0 left-0 right-0 z-50">
          <VideoExpand video={videoToPlay} onRemoveExpand={() => setVideoToPlay(undefined)} />
        </div>
      )}
    </>
  );
}
