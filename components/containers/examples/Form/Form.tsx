import React, { useState } from 'react';

import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import InputFieldSet from 'components/presentationals/InputFieldSet/InputFieldSet';
import Button from 'components/presentationals/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postListItem } from 'api/mutations/example-list';
import { QUERY_KEYS } from 'constants/api';
import { Alert, Snackbar } from '@mui/material';
import { E2E_TEST_DOM_ELEMENTS } from '../../../../constants/e2e';
import { TRANSLATION_NAMESPACES } from 'next-18next.config';
import { useTranslation } from 'next-i18next';
import { useListItemValidation } from '../../../../hooks/validation/examples/useListItemValidation';

const { COMMON } = TRANSLATION_NAMESPACES;

function Form() {
  const queryClient = useQueryClient();
  const { t } = useTranslation([COMMON]);

  const [isSuccessSnackbarOpened, setIsSuccessSnackbarOpened] = useState(false);
  const [isFailureSnackbarOpened, setIsFailureSnackbarOpened] = useState(false);

  const validationSchema = useListItemValidation();

  const postListItemMutation = useMutation(postListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureSnackbarOpened(true);
      } else {
        await queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST.INDEX]);
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
      <form
        data-test={E2E_TEST_DOM_ELEMENTS.EXAMPLE_FORM}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <InputFieldSet
          labelContent={t(`${COMMON}:title`)}
          name={'title'}
          value={title}
          onChange={handleChange}
          validationMessageContent={errors.title}
        />
        <InputFieldSet
          labelContent={t(`${COMMON}:description`)}
          name={'description'}
          value={description}
          onChange={handleChange}
          validationMessageContent={errors.description}
        />
        <Button isLoading={isLoading} type="submit">
          {isLoading ? t(`${COMMON}:loading`) : t(`${COMMON}:submit`)}
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
          {t(`${COMMON}:item_successfully_added`)}
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
          {t(`${COMMON}:failed_to_add_item`)}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;
