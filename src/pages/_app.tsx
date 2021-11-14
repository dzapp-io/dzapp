import { AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import "tailwindcss/tailwind.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
