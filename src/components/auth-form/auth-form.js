import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { method } from '../../constants';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: method.POST,
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data;
}

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModelHandler = () => setIsLogin(prevState => !prevState);

  const submitHandler = async(e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      })

      if (!result.error ) {
        // set some auth state
      }

    } else {
      try {
        await createUser(enteredEmail, enteredPassword);
      } catch (e) {
        console.log(e)
      }
    }
    onClose();
  }

  return (
    <form onSubmit={submitHandler}>
      <Stack spacing='4' p='4'>
        <Center>
          <Text fontWeight='bold' fontSize='2xl'>
            {isLogin ? 'Login' : 'Sign Up'}
          </Text>
        </Center>
        <Box>
          <Center>
            <Text fontSize='xl'>Email</Text>
          </Center>
          <Input
            id='email-auth'
            type='email'
            variant='outline'
            placeholder='Your email'
            size='lg'
            ref={emailRef}
            required
          />
        </Box>
        <Box>
          <Center>
            <Text fontSize='xl'>Password</Text>
          </Center>
          <Input
            id='password-auth'
            type='password'
            variant='outline'
            placeholder='Your password'
            size='lg'
            ref={passwordRef}
            required
          />
        </Box>
        <Box>
          <Center>
            <Button size='lg' type='submit' maxW='48'>
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </Center>
          <Center>
            <Text
              color='orange.500'
              as='button'
              onClick={switchAuthModelHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </Text>
          </Center>
        </Box>
      </Stack>
    </form>
  );
};

export default AuthForm;
