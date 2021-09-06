import react from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    repo?: string;
    label?: string;
    theme?: string;
  }
}
