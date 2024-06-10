import type { ReactNode } from 'react';
import { Component } from 'react';

export interface DebounceProps<T> {
  children: (props: (...args: T[]) => void) => ReactNode;
  debounceFn: (...args: T[]) => void;
  time?: number;
}

export class Debounce<T> extends Component<DebounceProps<T>> {
  timer: any = null;

  handleDebounce = (...args: T[]) => {
    const { debounceFn, time } = this.props;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => debounceFn(...args), time || 200);
  };

  override componentWillUnmount() {
    clearTimeout(this.timer);
  }

  override render() {
    return this.props.children(this.handleDebounce);
  }
}
export default Debounce;
