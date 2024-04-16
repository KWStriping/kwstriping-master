import createCache from '@emotion/cache';

export function createEmotionCache() {
  const cache = createCache({ key: 'css', prepend: true });
  if (!cache) {
    throw new Error('Emotion cache creation failed.');
  }
  return cache;
}
