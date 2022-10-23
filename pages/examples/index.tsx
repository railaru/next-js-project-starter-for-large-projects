import React from 'react';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import Basic from 'components/layouts/Basic';

import Form from 'components/containers/examples/Form/Form';
import List from 'components/containers/examples/List/List';

import { QUERY_KEYS } from 'constants/api';
import { fetchListItems } from 'api/queries/example-list';
import { i18n, TRANSLATION_NAMESPACES } from '../../next-18next.config';
import { Locales } from '../../models/localization';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const { HEAD, COMMON } = TRANSLATION_NAMESPACES;

function Example() {
  const { t } = useTranslation([COMMON]);

  return (
    <Basic
      head={{
        title: t(`${HEAD}:examples`),
      }}
    >
      <div className="space-y-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Form />
          <List />
        </div>
      </div>
    </Basic>
  );
}

export async function getServerSideProps({ locale }: { locale: Locales }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [QUERY_KEYS.EXAMPLE_LIST.INDEX],
    fetchListItems
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, [HEAD, COMMON], {
        i18n,
      })),
    },
  };
}

export default Example;
