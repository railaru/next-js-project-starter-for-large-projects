import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEYS } from 'constants/api';
import { errorLogger } from 'error-logging/logger';
import { ExampleItem } from 'models/api';

export async function fetchListItems() {
  try {
    const { data } = await axios.get<ExampleItem[]>(
      `${process.env.NEXT_PUBLIC_MOCK_API_ROOT}/list`,
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
      errorLogger('fetchListItems error message: ', error.message);

      return {
        values: null,
        errorMessage: error.message,
      };
    } else {
      errorLogger('fetchListItems unexpected error: ', error);

      return {
        values: null,
        errorMessage: 'An unexpected error occurred',
      };
    }
  }
}

export function useGetListItems() {
  return useQuery([QUERY_KEYS.EXAMPLE_LIST.INDEX], () => fetchListItems());
}

export async function fetchListItem(id: string) {
  try {
    const { data } = await axios.get<ExampleItem>(
      `${process.env.NEXT_PUBLIC_MOCK_API_ROOT}/list/${id}`,
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
      errorLogger('fetchListItem error message: ', error.message);

      return {
        values: null,
        errorMessage: error.message,
      };
    } else {
      errorLogger('fetchListItem unexpected error: ', error);

      return {
        values: null,
        errorMessage: 'An unexpected error occurred',
      };
    }
  }
}

export function useGetListItem(id: string) {
  return useQuery([QUERY_KEYS.EXAMPLE_LIST.ITEM(id)], () => fetchListItem(id));
}
