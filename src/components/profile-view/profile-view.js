import { useRef } from 'react';
import {
  Input,
  Stack,
  Text,
  Center,
  Button,
  Box
} from '@chakra-ui/react';

const ProfileView = ({ onChangePassword }) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredOldPassword = oldPasswordRef.current?.value;
    const enteredNewPassword = newPasswordRef.current?.value;

    // optional: Add validation

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })

    e.target.reset()
  }

  return (
    <Center>
      <form onSubmit={submitHandler}>
        <Stack spacing='4' w={96}>
          <Text textAlign='center' fontSize='2xl' fontWeight='bold' as='h1'>Users Page</Text>
          <Box>
            <Text textAlign='center'>Old Password</Text>
            <Input id='old-password' type='password' ref={oldPasswordRef} required />
          </Box>
          <Box>
            <Text textAlign='center'>New Password</Text>
            <Input id='new-password' type='password' ref={newPasswordRef} required />
          </Box>
          <Button
            bg='cyan.700'
            color='gray.100'
            _hover={{ bg: 'cyan.500' }}
            size='lg'
            type='submit'
          >
            Change password
          </Button>
        </Stack>
      </form>
    </Center>
  )
};

export default ProfileView;
