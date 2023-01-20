import { ChakraProvider } from '@chakra-ui/react';
import BaseLayout from '../src/components/base-layout/base-layout';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  )
}
