import axios from 'axios';

import { ExampleItem } from 'models/api';

import { errorLogger } from 'error-logging/logger';

export async function deleteListItem(payload: { id: string }) {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_MOCK_API_ROOT}/list/${payload.id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return {
      values: data,
      errorMessage: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorLogger('deleteListItem error message: ', error.message);

      return {
        values: null,
        errorMessage: error.message,
      };
    } else {
      errorLogger('deleteListItem unexpected error: ', error);

      return {
        values: null,
        errorMessage: 'An unexpected error occurred',
      };
    }
  }
}

export async function postListItem(payload: ExampleItem) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_MOCK_API_ROOT}/list`,
      payload
    );

    return {
      values: data,
      errorMessage: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorLogger('postListItem error message: ', error.message);

      return {
        values: null,
        errorMessage: error.message,
      };
    } else {
      errorLogger('postListItem unexpected error: ', error);

      return {
        values: null,
        errorMessage: 'An unexpected error occurred',
      };
    }
  }
}
