import React, { Suspense, lazy } from 'react';

import useModalsStore from 'store/modals';

const ExampleModal = lazy(() => import('../ExampleModal/ExampleModal'));

function ModalOutlet() {
  const { isExampleModalOpened } = useModalsStore();

  return (
    <>
      {isExampleModalOpened && (
        <Suspense fallback={null}>
          <ExampleModal />
        </Suspense>
      )}
    </>
  );
}

export default ModalOutlet;
