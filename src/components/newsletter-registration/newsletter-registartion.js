import { useRef, useContext } from 'react';
import { Box, Center, Input, Stack } from '@chakra-ui/react';
import Button from '../ui/button/button';
import NotificationContext from '../../../store/notification-context';
import { method } from '../../constants';

const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current?.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    })

    fetch('/api/newsletter', {
      method: method.POST,
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter',
          status: 'success',
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <Center>
      <Box w='50%' pt='12'>
        <form onSubmit={registrationHandler}>
          <Stack direction='row' spacing='2'>
            <Input
              size='lg'
              ref={emailInputRef}
              id='email'
              type='email'
              placeholder='Your email'
            />
            <Button type='submit'>Registration</Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default NewsletterRegistration;
