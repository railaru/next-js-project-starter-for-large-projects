import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import InputFieldSet from 'components/presentationals/InputFieldSet/InputFieldSet';
import Button from 'components/presentationals/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postListItem } from 'api/mutations/example-list';
import { QUERY_KEYS } from 'constants/api';
import { Alert, Snackbar } from '@mui/material';

function Form() {
  const queryClient = useQueryClient();

  const [isSuccessSnackbarOpened, setIsSuccessSnackbarOpened] = useState(false);
  const [isFailureSnackbarOpened, setIsFailureSnackbarOpened] = useState(false);

  const validationSchema = yup.object({
    title: yup
      .string()
      .min(8, 'Minimum 8 characters')
      .required('Field is required'),
    description: yup
      .string()
      .min(8, 'Minimum 8 characters')
      .required('Field is required'),
  });

  const postListItemMutation = useMutation(postListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureSnackbarOpened(true);
      } else {
        queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST]);
        setIsSuccessSnackbarOpened(true);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      postListItemMutation.mutate({
        id: uuidv4(),
        title: values.title,
        description: values.description,
      });
    },
  });

  const {
    handleChange,
    values: { title, description },
    handleSubmit,
    errors,
  } = formik;

  const handleSnackBarClose = () => {
    setIsSuccessSnackbarOpened(false);
    setIsFailureSnackbarOpened(false);
  };

  const isLoading = postListItemMutation.isLoading;

  return (
    <>
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
        <Button isLoading={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
      <Snackbar
        open={isSuccessSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Item successfully added!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isFailureSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          Failed to add the item!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;
