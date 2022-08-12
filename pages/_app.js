import { useRouter } from 'next/router';
import { QueryClientProvider, QueryClient } from 'react-query';

import Loading from '../components/Loading';
import { NextShield } from '../components/NextShield';

require('../styles/variables.less');

const queryClient = new QueryClient({});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextShield
        router={router}
        loginRoute='/login'
        accessRoute='/bookmark'
        privateRoutes={['/bookmark']}
        LoadingComponent={<Loading />}
        publicRoutes={['/', '/login', '/register']}>
        <Component {...pageProps} />;
      </NextShield>
    </QueryClientProvider>
  );
}

export default MyApp;
