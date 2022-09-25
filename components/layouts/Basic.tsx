import React, { ReactNode } from 'react';
import Head from 'next/head';

import { HtmlHead } from 'models/common';

interface Props {
  head: HtmlHead;
  children: ReactNode;
}

function Basic({ head, children }: Props) {
  return (
    <>
      <Head>
        <title>{head.title}</title>
        {head.description && (
          <meta name="description" content={head.description} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-4 py-12">{children}</div>
    </>
  );
}

export default Basic;
