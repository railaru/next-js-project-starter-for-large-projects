import React, { useState } from 'react';

import type { AppProps } from 'next/app';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'styles/globals.css';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
