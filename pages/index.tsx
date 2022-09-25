import React, { useEffect } from 'react';

import { testQuery } from 'api/queries/test-query';

import Button from 'components/presentationals/Button/Button';
import Form from 'components/containers/examples/Form/Form';

function Home() {
  useEffect(() => {
    testQuery();
  }, []);

  return (
    <>
      <Form />
      <Button />
    </>
  );
}

export default Home;
