import type { MediaFragment } from '@tempo/api/generated/graphql';
import { MediaType } from '@tempo/api/generated/constants';

export const mediaList: MediaFragment[] = [
  {
    __typename: 'MediaItem',
    id: 'Jzx123sEt==',
    isPublished: true,
    alt: 'about',
    title: 'About',
    sortOrder: 1,
    url: 'https://example.com/image.jpg',
    type: MediaType.Image,
  },
  {
    __typename: 'MediaItem',
    id: 'Jzx123sEx==',
    isPublished: false,
    alt: 'about',
    title: 'About',
    sortOrder: 2,
    url: 'https://example.com/image.jpg',
    type: MediaType.Image,
  },
  {
    __typename: 'MediaItem',
    id: 'Jzx123sEu==',
    isPublished: true,
    alt: 'about',
    title: 'About',
    sortOrder: 3,
    url: 'https://example.com/image.jpg',
    type: MediaType.Image,
  },
  {
    __typename: 'MediaItem',
    id: 'Jzx123sEm==',
    isPublished: true,
    alt: 'about',
    title: 'About',
    sortOrder: 4,
    url: 'https://example.com/image.jpg',
    type: MediaType.Video,
  },
];
