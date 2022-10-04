import React from 'react';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import Basic from 'components/layouts/Basic';

import Form from 'components/containers/examples/Form/Form';
import List from 'components/containers/examples/List/List';

import { QUERY_KEYS } from 'constants/api';
import { fetchListItems } from 'api/queries/example-list';

function Example() {
  return (
    <Basic head={{ title: 'Example' }}>
      <div className="space-y-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Form />
          <List />
        </div>
      </div>
    </Basic>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [QUERY_KEYS.EXAMPLE_LIST.INDEX],
    fetchListItems
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Example;
