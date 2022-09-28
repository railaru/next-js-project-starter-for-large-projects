import { Alert, Collapse, Snackbar } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteListItem } from 'api/mutations/example-list';
import { useGetListItems } from 'api/queries/example-list';
import ListItem from 'components/presentationals/examples/ListItem/ListItem';
import { QUERY_KEYS } from 'constants/api';

import { TransitionGroup } from 'react-transition-group';

import React, { useState } from 'react';
import useModalsStore from 'store/modals';

function List() {
  const queryClient = useQueryClient();
  const { data } = useGetListItems();
  const { setIsEditListItemModalOpened, setEditListItemId } = useModalsStore();
  const [deletingItemId, setDeletingItemId] = useState<null | string>(null);
  const [isFailureSnackbarOpened, setIsFailureSnackbarOpened] = useState(false);

  const deleteListItemMutation = useMutation(deleteListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureSnackbarOpened(true);
      } else {
        queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST.INDEX]);
      }
    },
  });

  const handleDeleteClick = (id: string) => {
    setDeletingItemId(id);
    deleteListItemMutation.mutate({ id });
  };

  const handleEditClick = (id: string) => {
    setIsEditListItemModalOpened(true);
    setEditListItemId(id);
  };

  const handleSnackBarClose = () => {
    setIsFailureSnackbarOpened(false);
  };

  if (!data?.values) {
    return null;
  }

  return (
    <>
      <ul>
        <TransitionGroup>
          {data.values.map((item, index) => (
            <Collapse key={index}>
              <ListItem
                key={index}
                data={item}
                onDeleteClick={() => handleDeleteClick(item.id)}
                onEditClick={() => handleEditClick(item.id)}
                isLoading={
                  deleteListItemMutation.isLoading && item.id === deletingItemId
                }
                className="mb-6"
              />
            </Collapse>
          ))}
        </TransitionGroup>
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
