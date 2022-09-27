import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconDisplay, {
  IconNames,
  IconSizes,
} from 'components/presentationals/IconDisplay/IconDisplay';
import React, { useEffect } from 'react';

import useModalsStore from 'store/modals';

export default function ScrollDialog() {
  const { isExampleModalOpened, setIsExampleModalOpened } = useModalsStore();

  const handleClose = () => {
    setIsExampleModalOpened(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (isExampleModalOpened) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isExampleModalOpened]);

  return (
    <>
      <Dialog
        open={isExampleModalOpened}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className="flex items-center justify-between py-4 pl-6 pr-4">
          <h3 className="text-xl font-medium">Subscribe</h3>
          <IconButton
            onClick={() => setIsExampleModalOpened(false)}
            size="large"
          >
            <IconDisplay name={IconNames.Cross} size={IconSizes.Large} />
          </IconButton>
        </div>

        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
