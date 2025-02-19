import type { Location } from 'history';
import { useEffect } from 'react';

interface BlockerControl {
  confirm: () => void;
  cancel: () => void;
  location: Location;
}

interface Blocker {
  onBlock: (control: BlockerControl) => void;
  enabled?: boolean;
}

export const useBlocker = ({ enabled, onBlock }: Blocker) => {
  useEffect(() => {
    if (enabled) {
      const confirmed = confirm('Are you sure you want to leave?');
    }
  }, [enabled]);
};
