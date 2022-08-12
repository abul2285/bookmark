import { QueryClientProvider, QueryClient } from 'react-query';

require('../styles/variables.less');

const queryClient = new QueryClient({});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
