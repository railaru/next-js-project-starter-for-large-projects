import React, { ReactNode } from 'react';
import Head from 'next/head';

import { HtmlHead } from 'models/common';

import ModalOutlet from 'components/containers/modals/ModalOutlet/ModalOutlet';

interface Props {
  head: HtmlHead;
  children: ReactNode;
}

function Basic({ head, children }: Props) {
  const formattedTitle = `${head.title} - ${process.env.NEXT_PUBLIC_PROJECT_NAME}`;

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        {head.description && (
          <meta name="description" content={head.description} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalOutlet />
      <div className="container px-4 py-12">{children}</div>
    </>
  );
}

export default Basic;
