export type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error';

export type FormAction<FormData> =
  | { type: 'reset' }
  | { type: 'update'; payload: Partial<FormData> };
