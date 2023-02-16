import { ChakraProvider } from '@chakra-ui/react';
import BaseLayout from '../src/components/base-layout/base-layout';
import { NotificationContextProvider } from '../store/notification-context';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NotificationContextProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </NotificationContextProvider>
    </ChakraProvider>
  )
}
