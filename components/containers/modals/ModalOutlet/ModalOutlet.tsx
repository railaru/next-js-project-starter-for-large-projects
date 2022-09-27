import React, { Suspense, lazy } from 'react';

import useModalsStore from 'store/modals';

const ExampleModal = lazy(
  () => import('../examples/ExampleModal/ExampleModal')
);
const EditListItemModal = lazy(
  () => import('../examples/EditListItemModal/EditListItemModal')
);

function ModalOutlet() {
  const { isExampleModalOpened, isEditListItemModalOpened } = useModalsStore();

  return (
    <>
      {isExampleModalOpened && (
        <Suspense fallback={null}>
          <ExampleModal />
        </Suspense>
      )}
      {isEditListItemModalOpened && (
        <Suspense fallback={null}>
          <EditListItemModal />
        </Suspense>
      )}
    </>
  );
}

export default ModalOutlet;
