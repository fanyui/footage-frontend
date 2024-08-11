'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

type Props = {
  children?: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
