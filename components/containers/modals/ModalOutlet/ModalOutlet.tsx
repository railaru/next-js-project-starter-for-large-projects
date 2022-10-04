import React, { Suspense, lazy } from 'react';

import useModalsStore from 'store/modals';

const EditListItemModal = lazy(
  () => import('../examples/EditListItemModal/EditListItemModal')
);

function ModalOutlet() {
  const { isEditListItemModalOpened } = useModalsStore();

  return (
    <>
      {isEditListItemModalOpened && (
        <Suspense fallback={null}>
          <EditListItemModal />
        </Suspense>
      )}
    </>
  );
}

export default ModalOutlet;
