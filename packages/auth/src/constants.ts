export const WINDOW_EXISTS = typeof window !== 'undefined';
export const LOCAL_STORAGE_EXISTS = WINDOW_EXISTS && !!window.localStorage;
export const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

export const TEMPO_AUTH_PLUGIN_ID = '_tempoAuthPluginId';
export const TEMPO_CSRF_TOKEN = '_tempoCSRFToken';

export const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export const LOCAL_STORAGE_NAMESPACE = 'zzzzzzz';
export const ACCESS_TOKEN_TTL = parseInt(process.env.JWT_TTL_ACCESS ?? '300') * 1000;
export const REFRESH_BUFFER = parseInt(process.env.JWT_TTL_REFRESH_BUFFER ?? '30') * 1000;
export const REFETCH_TOKEN_INTERVAL = ACCESS_TOKEN_TTL - REFRESH_BUFFER + 5000;

export const TEST_AUTH_EMAIL = process.env.TEST_AUTH_EMAIL || '';
export const TEST_AUTH_PASSWORD = process.env.TEST_AUTH_PASSWORD || '';
export const TEST_AUTH_SECOND_EMAIL = 'second+testers+dashboard@tempo.io';
export const TEST_AUTH_SECOND_PASSWORD = 'secondtest1234';
export const TEST_AUTH_EXTERNAL_LOGIN_CALLBACK = 'https://localhost:9000/login/callback/';
export const TEST_AUTH_EXTERNAL_LOGOUT_CALLBACK = 'https://localhost:9000/logout/callback/';
export const TEST_AUTH_EXTERNAL_LOGIN_PLUGIN_ID = 'mirumee.authentication.openidconnect';
export const TEST_AUTH_EXTERNAL_LOGIN_PLUGIN_RESPONSE_CODE = 'Mx1h3u3YFfDVNv5iJL8lzzeHpU_lyCti';
export const TEST_AUTH_EXTERNAL_LOGIN_PLUGIN_RESPONSE_STATE =
  '4/0AX4XfWgK2COkwLueNWzvgkGFfOp_o5FJB4KsRYG3or4lPE0o_3SIvGykNRV7CjU3-7B9sg';
export const TEST_AUTH_EXTERNAL_LOGIN_PLUGIN_RESPONSE_SECOND_CODE =
  'Second3YFfDVNv5iJL8lzzeHpU_lyCti';
export const TEST_AUTH_EXTERNAL_LOGIN_PLUGIN_RESPONSE_SECOND_STATE =
  'SecondXfWgK2COkwLueNWzvgkGFfOp_o5FJB4KsRYG3or4lPE0o_3SIvGykNRV7CjU3-7B9sg';
