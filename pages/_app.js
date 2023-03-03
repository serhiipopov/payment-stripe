import { ChakraProvider } from '@chakra-ui/react';
import { NotificationContextProvider } from '../store/notification-context';
import { SessionProvider } from 'next-auth/react';
import BaseLayout from '../src/components/base-layout/base-layout';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <NotificationContextProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </NotificationContextProvider>
      </SessionProvider>
    </ChakraProvider>
  )
}
