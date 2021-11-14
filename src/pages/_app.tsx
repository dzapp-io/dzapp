import { AnimatePresence } from "framer-motion";
import { AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import "tailwindcss/tailwind.css";
import "styles/global.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
