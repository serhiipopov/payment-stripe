import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import {
  Input,
  Stack,
  Text,
  Center,
  Button
} from '@chakra-ui/react';
import SpinnerWrapper from '../ui/spinner/spinner';

const ProfileView = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      setIsLoading(false)
      // if(!session) {
      //   window.location.href = '/'
      // }
    })
  }, [])

  if (isLoading) {
    return <SpinnerWrapper />
  }

  return (
    <Stack spacing='4'>
      <Center>
        <Text fontSize='2xl' fontWeight='bold' as='h1'>
          Users Page
        </Text>
      </Center>
      <Center>
        <Text>New Password</Text>
      </Center>
      <Input required />
      <Center>
        <Text>Old Password</Text>
      </Center>
      <Input required />
      <Center>
        <Button size='lg'>Change password</Button>
      </Center>
    </Stack>
  );
};

export default ProfileView;
