import { Component } from 'react';
import type { ReactElement } from 'react';

interface MenuToggleProps {
  ariaOwns?: string;
  children: (props: {
    actions: {
      open: () => void;
      close: () => void;
    };
    open: boolean;
  }) => ReactElement<unknown>;
}

interface MenuToggleState {
  open: boolean;
}

class MenuToggle extends Component<MenuToggleProps, MenuToggleState> {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  override render() {
    const { children } = this.props;
    const { open } = this.state;

    return children({
      actions: { close: this.handleClose, open: this.handleClick },
      open,
    });
  }
}

export default MenuToggle;
