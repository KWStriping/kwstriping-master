import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';

function getMetadata(
  data: MetadataFormData,
  isMetadataModified: boolean,
  isPrivateMetadataModified: boolean
) {
  return {
    metadata: isMetadataModified ? data?.metadata : undefined,
    privateMetadata: isPrivateMetadataModified ? data?.privateMetadata : undefined,
  };
}

export default getMetadata;
