import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import InputFieldSet from 'components/presentationals/InputFieldSet/InputFieldSet';
import Button from 'components/presentationals/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postListItem } from 'api/mutations/example-list';
import { QUERY_KEYS } from 'constants/api';

function Form() {
  const queryClient = useQueryClient();

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
        // should display the error in the UI using something like a toast or error alert, because the mutation failed
        // can also be used to display BE validation in the UI
      } else {
        queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST]);
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

  return (
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
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form;
