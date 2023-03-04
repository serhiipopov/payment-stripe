import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Box,
  Button,
  Center, Flex,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import { createUser } from '../../api/user';
import {useRouter} from 'next/router';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

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
        await router.replace('/profile')
      }

    } else {
      try {
        await createUser(enteredEmail, enteredPassword);
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Center borderRadius='lg' borderColor='gray.200' borderWidth='1px' py='6' bg='gray.100'>
      <form onSubmit={submitHandler}>
        <Stack spacing='4' p='4' w='96'>
          <Center>
            <Text fontWeight='semibold' fontSize='4xl'>
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
              bg='gray.50'
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
              bg='gray.50'
              ref={passwordRef}
              required
            />
          </Box>
          <Box>
            <Center>
              <Button
                size='lg'
                type='submit'
                maxW='48'
                bg='cyan.700'
                color='gray.100'
                _hover={{ bg: 'cyan.500' }}
              >
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </Center>
            <Center>
              <Text
                color='cyan.700'
                _hover={{ color: 'cyan.500' }}
                as='button'
                onClick={switchAuthModelHandler}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </Text>
            </Center>
          </Box>
        </Stack>
      </form>
    </Center>
  );
};

export default AuthForm;
