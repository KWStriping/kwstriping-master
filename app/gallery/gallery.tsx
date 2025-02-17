'use client';

import type { GalleryMediaQuery } from '@tempo/api/generated/graphql';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useWindowSize } from 'rooks';

interface GalleryPageProps {
  media: NonNullable<GalleryMediaQuery['media']>;
}

function Gallery({ media }: GalleryPageProps) {
  const { innerWidth = 1000 } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  console.log(media);
  return (
    <>
      <main className="w-full bg-background flex flex-col items-center justify-center">
        {/* <h1 className="text-center">{`Gallery`}</h1> */}
        {isClient && (
          <div className="text-center">
            {!!innerWidth && media?.edges?.length ? (
              media.edges.map((item) => (
                <div key={item.node.id} className="my-1 w-full relative">
                  {item.node.type === 'IMAGE' ? (
                    item.node.width && item.node.height && item.node.aspectRatio ? (
                      <Image
                        src={item.node.file.url}
                        alt={item.node.alt}
                        className="img-fluid"
                        {...(item.node.placeholder
                          ? { placeholder: 'blur', blurDataURL: item.node.placeholder }
                          : {})}
                        {...(item.node.width > innerWidth
                          ? { width: innerWidth, height: innerWidth / item.node.aspectRatio }
                          : {
                              width: item.node.width,
                              height: item.node.height,
                            })}
                      />
                    ) : null
                  ) : item.node.type === 'VIDEO' ? (
                    <div className="my-1">
                      <video style={{ width: '100%' }} controls>
                        <source src={item.node.file.url} type="video/mp4" />
                      </video>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <Typography>{'No media available'}</Typography>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Gallery;
