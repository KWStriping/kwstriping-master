import 'react';

declare module 'react' {
  export interface HTMLAttributes<T> {
    clienthub_id?: string;
    form_url?: string;
  }
}
