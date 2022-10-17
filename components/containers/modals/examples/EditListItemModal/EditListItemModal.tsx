import { Alert, Grow, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useGetListItem } from 'api/queries/example-list';
import IconDisplay, {
  IconNames,
  IconSizes,
} from 'components/presentationals/IconDisplay/IconDisplay';
import InputFieldSet from 'components/presentationals/InputFieldSet/InputFieldSet';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import * as yup from 'yup';

import useModalsStore from 'store/modals';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from 'constants/api';
import Button from 'components/presentationals/Button/Button';
import { patchListItem } from 'api/mutations/example-list';
import EditListModalSkeleton from './EditListItemModalSkeleton';

function EditListItemModal() {
  const {
    isEditListItemModalOpened,
    setIsEditListItemModalOpened,
    editListItemId,
  } = useModalsStore();

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetListItem(editListItemId);
  const [isFailureAlertOpened, setIsFailureAlertOpened] = useState(false);

  const validationSchema = yup.object({
    title: yup
      .string()
      .min(4, 'Minimum 4 characters')
      .required('Field is required'),
    description: yup
      .string()
      .min(4, 'Minimum 4 characters')
      .required('Field is required'),
  });

  const patchListItemMutation = useMutation(patchListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureAlertOpened(true);
      } else {
        await queryClient.invalidateQueries([
          QUERY_KEYS.EXAMPLE_LIST.ITEM(editListItemId),
        ]);
        await queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST.INDEX]);
        setIsEditListItemModalOpened(false);
      }
    },
  });

  const handleClose = () => {
    setIsEditListItemModalOpened(false);
  };

  const handleAlertClose = () => {
    setIsFailureAlertOpened(false);
  };

  const formik = useFormik({
    initialValues: {
      title: data?.values?.title || '',
      description: data?.values?.description || '',
    },
    validationSchema,
    onSubmit: (values) => {
      patchListItemMutation.mutate({
        id: data?.values?.id || '',
        title: values.title,
        description: values.description,
      });
    },
    enableReinitialize: true,
  });

  const {
    handleChange,
    values: { title, description },
    handleSubmit,
    errors,
  } = formik;

  return (
    <>
      <Dialog
        open={isEditListItemModalOpened}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className="flex items-center justify-between py-4 pl-6 pr-4 dark:bg-slate-600 dark:text-white">
          <h3 className="text-xl font-medium">Edit list item</h3>
          <IconButton
            onClick={() => setIsEditListItemModalOpened(false)}
            size="large"
          >
            <IconDisplay
              name={IconNames.Cross}
              size={IconSizes.Large}
              className="dark:stroke-white"
            />
          </IconButton>
        </div>

        <DialogContent className="w-[600px] dark:bg-slate-600">
          {isLoading && <EditListModalSkeleton />}
          {data?.values && (
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <InputFieldSet
                  labelContent={'Title'}
                  name={'title'}
                  value={title}
                  onChange={handleChange}
                  validationMessageContent={errors.title}
                />
                <InputFieldSet
                  labelContent={'Description'}
                  name={'description'}
                  value={description}
                  onChange={handleChange}
                  validationMessageContent={errors.description}
                />
              </form>
              {isFailureAlertOpened && (
                <Grow in={isFailureAlertOpened} timeout={400}>
                  <Alert
                    className="mt-8"
                    onClose={handleAlertClose}
                    severity="error"
                    sx={{ width: '100%' }}
                  >
                    Failed to update the item!
                  </Alert>
                </Grow>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions className="dark:bg-slate-600">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditListItemModal;
