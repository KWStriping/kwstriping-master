import type {
  ProductDetailsFragment,
  ProductMediaItemFragment,
} from '@tempo/api/generated/graphql';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { getGalleryMedia, getVideoThumbnail } from '@tempo/ui/utils/media';
import { VideoExpand } from '@tempo/ui/components/product/VideoExpand';
import { ImageExpand } from '@tempo/ui/components/product/ImageExpand';

export interface ProductGalleryProps {
  product: Maybe<ProductDetailsFragment>;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [expandedImage, setExpandedImage] = useState<ProductMediaItemFragment | undefined>(
    undefined
  );
  const [videoToPlay, setVideoToPlay] = useState<ProductMediaItemFragment | undefined>(undefined);

  const galleryMedia = getGalleryMedia({ product });

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
        {galleryMedia?.map((media: ProductMediaItemFragment) => {
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
