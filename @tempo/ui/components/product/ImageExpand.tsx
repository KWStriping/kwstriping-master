import type { ProductMediaFragment } from '@tempo/api/generated/graphql';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface ImageExpandProps {
  image?: Maybe<ProductMediaFragment>;
  onRemoveExpand: () => void;
}
export function ImageExpand({ image, onRemoveExpand }: ImageExpandProps) {
  if (!image) return null;

  return (
    <div className="min-h-screen absolute overflow-hidden grid grid-cols-1 mx-auto px-8 md:h-full w-full bg-gray-100">
      <div
        role="button"
        tabIndex={0}
        className="absolute grid h-6 justify-end w-full z-40 p-8 lg:px-8 mx-auto"
        onClick={() => onRemoveExpand()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onRemoveExpand();
          }
        }}
      >
        <CloseIcon className="w-6 h-6" />
      </div>
      <div className="w-full h-full md:mt-10">
        <Image src={image.url} alt={image.alt} fill style={{ objectFit: 'scale-down' }} />
      </div>
    </div>
  );
}

export default ImageExpand;
