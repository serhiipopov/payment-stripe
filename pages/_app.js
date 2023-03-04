import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import BaseLayout from '../src/components/base-layout/base-layout';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </SessionProvider>
  )
}
