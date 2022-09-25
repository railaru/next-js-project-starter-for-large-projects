import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteListItem } from 'api/mutations/example-list';
import { useGetListItems } from 'api/queries/example-list';
import ListItem from 'components/presentationals/examples/ListItem/ListItem';
import { QUERY_KEYS } from 'constants/api';

import React from 'react';

function List() {
  const queryClient = useQueryClient();
  const { data } = useGetListItems();

  const deleteListItemMutation = useMutation(deleteListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        // should display the error in the UI using something like a toast or error alert, because the mutation failed
        // can also be used to display BE validation in the UI
      } else {
        queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST]);
      }
    },
  });

  const handleDeleteClick = (id: string) => {
    deleteListItemMutation.mutate({ id });
  };

  if (!data?.values) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {data.values.map((item, index) => (
        <ListItem
          key={index}
          data={item}
          onDeleteClick={() => handleDeleteClick(item.id)}
        />
      ))}
    </ul>
  );
}

export default List;
