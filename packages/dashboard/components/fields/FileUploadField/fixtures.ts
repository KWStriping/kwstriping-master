import type { FileFragment } from '@core/api/graphql';

export const UPLOADED_FILE: FileFragment = {
  __typename: 'File',
  contentType: 'image/png',
  url: 'some_url_to_image.png',
};
