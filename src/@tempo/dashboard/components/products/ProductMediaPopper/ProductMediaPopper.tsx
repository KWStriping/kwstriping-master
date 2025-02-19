import * as m from '@paraglide/messages';
import { ClickAwayListener, Grow, MenuItem, MenuList as Menu } from '@mui/material';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

interface ProductMediaPopperProps {
  anchorRef: HTMLButtonElement;
  imagesUploadRef: HTMLInputElement;
  openMediaUrlModal: () => void;
  popperStatus: boolean;
  setPopperStatus: (popperStatus: boolean) => void;
}

const messages = {
  uploadImages: {
    id: '9CEu8k',
    defaultMessage: 'Upload Images',
    description: 'modal button images upload',
  },
  uploadUrl: {
    id: 'Q2UXlW',
    defaultMessage: 'Upload URL',
    description: 'modal button url upload',
  },
};

export const ProductMediaPopper = ({
  anchorRef,
  imagesUploadRef,
  setPopperStatus,
  openMediaUrlModal,
  popperStatus,
}: ProductMediaPopperProps) => {
  return (
    <Popper open={popperStatus} anchorEl={anchorRef} transition placement="bottom-end">
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={() => setPopperStatus(false)} mouseEvent="onClick">
              <Menu>
                <MenuItem
                  onClick={() => imagesUploadRef.click()}
                  data-test-id="upload-images"
                  key="upload-images"
                >
                  {m.dashboard_ploadImages() ?? 'Upload Images'}
                </MenuItem>
                <MenuItem
                  onClick={openMediaUrlModal}
                  data-test-id="upload-media-url"
                  key="upload-media-url"
                >
                  {m.dashboard_ploadUrl() ?? 'Upload URL'}
                </MenuItem>
              </Menu>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
