import { Box, Center, Input, Stack } from '@chakra-ui/react';
import Button from '../ui/button';
import { method } from '../../constants';
import { useRef } from 'react';

const NewsletterRegistration = () => {
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current?.value;

    fetch('/api/newsletter', {
      method: method.POST,
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
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
