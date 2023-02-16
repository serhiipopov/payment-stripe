import { useContext } from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from '../navbar/navbar';
import Notification from '../ui/notification/notification';
import NotificationContext from '../../../store/notification-context';

const BaseLayout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification

  return (
    <>
      <Container
        minW='full'
        maxW='full'
        px='0'
        as='header'
        position='fixed'
        bg='transparent'
        zIndex={15}
      >
        <Navbar />
      </Container>
      <Container
        minW='full'
        maxW='full'
        px='0'
      >
        {children}
      </Container>

      {activeNotification &&
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      }
    </>
  );
};

export default BaseLayout;
