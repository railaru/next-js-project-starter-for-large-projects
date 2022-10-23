import { Alert, Collapse, Snackbar } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteListItem } from 'api/mutations/example-list';
import { useGetListItems } from 'api/queries/example-list';
import ListItem from 'components/presentationals/examples/ListItem/ListItem';
import { QUERY_KEYS } from 'constants/api';

import { TransitionGroup } from 'react-transition-group';

import React, { useState } from 'react';
import useModalsStore from 'store/modals';
import IconDisplay, {
  IconNames,
} from 'components/presentationals/IconDisplay/IconDisplay';
import { TRANSLATION_NAMESPACES } from '../../../../next-18next.config';
import { useTranslation } from 'next-i18next';

const { COMMON } = TRANSLATION_NAMESPACES;

function List() {
  const queryClient = useQueryClient();
  const { t } = useTranslation([COMMON]);

  const { data } = useGetListItems();
  const { setIsEditListItemModalOpened, setEditListItemId } = useModalsStore();
  const [deletingItemId, setDeletingItemId] = useState<null | string>(null);
  const [isFailureSnackbarOpened, setIsFailureSnackbarOpened] = useState(false);

  const deleteListItemMutation = useMutation(deleteListItem, {
    onSuccess: async (res) => {
      if (res.errorMessage) {
        setIsFailureSnackbarOpened(true);
      } else {
        await queryClient.invalidateQueries([QUERY_KEYS.EXAMPLE_LIST.INDEX]);
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

  if (data.values.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center rounded-lg bg-slate-600">
        <IconDisplay
          name={IconNames.ViewHorizontal}
          className="transform scale-[2.5] mb-8"
        />
        <p>There are no items in the list yet!</p>
      </div>
    );
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
          {t(`${COMMON}:failed_to_add_item`)}
        </Alert>
      </Snackbar>
    </>
  );
}

export default List;
