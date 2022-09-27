import { Alert, Snackbar } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteListItem } from 'api/mutations/example-list';
import { useGetListItems } from 'api/queries/example-list';
import ListItem from 'components/presentationals/examples/ListItem/ListItem';
import { QUERY_KEYS } from 'constants/api';

import React, { useState } from 'react';

function List() {
  const queryClient = useQueryClient();
  const { data } = useGetListItems();
  const [deletingItemId, setDeletingItemId] = useState<null | string>(null);
  const [isFailureSnackbarOpened, setIsFailureSnackbarOpened] = useState(false);

  const deleteListItemMutation = useMutation(deleteListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureSnackbarOpened(true);
      } else {
        queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST]);
      }
    },
  });

  const handleDeleteClick = (id: string) => {
    setDeletingItemId(id);
    deleteListItemMutation.mutate({ id });
  };

  const handleSnackBarClose = () => {
    setIsFailureSnackbarOpened(false);
  };

  if (!data?.values) {
    return null;
  }

  return (
    <>
      <ul className="space-y-4">
        {data.values.map((item, index) => (
          <ListItem
            key={index}
            data={item}
            onDeleteClick={() => handleDeleteClick(item.id)}
            isLoading={
              deleteListItemMutation.isLoading && item.id === deletingItemId
            }
          />
        ))}
      </ul>
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

export default List;
