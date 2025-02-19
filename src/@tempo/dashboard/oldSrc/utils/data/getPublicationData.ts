interface PublicationData {
  publishedAt: string;
  isPublished: boolean;
}

function getPublicationData({ publishedAt, isPublished }: PublicationData): PublicationData {
  return {
    isPublished,
    publishedAt: publishedAt || null,
  };
}

export default getPublicationData;
