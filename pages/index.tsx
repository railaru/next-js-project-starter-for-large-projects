import React from 'react';
import Link from 'next/link';

import { ROUTES } from 'constants/routes';
import { E2E_TEST_DOM_ELEMENTS } from 'constants/e2e';

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={ROUTES.EXAMPLES}>
        <a data-test={E2E_TEST_DOM_ELEMENTS.EXAMPLES_LINK}>Examples page</a>
      </Link>
    </div>
  );
}

export default Home;
