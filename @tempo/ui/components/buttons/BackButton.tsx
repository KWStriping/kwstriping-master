import * as m from '@paraglide/messages';
import type { FC } from 'react';
import type { ButtonProps } from '@tempo/ui/components/buttons/Button';
import { Button } from '@tempo/ui/components/buttons/Button';

const BackButton: FC<ButtonProps> = (props) => {
  return (
    <Button data-test-id="back" color="secondary" {...props}>
      {m.back() ?? 'Back'}
    </Button>
  );
};

BackButton.displayName = 'BackButton';
export default BackButton;
