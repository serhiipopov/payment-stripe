import { useState } from 'react';
import { Box, Button, Center, Input, Stack, Text } from '@chakra-ui/react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModelHandler = () => setIsLogin(prevState => !prevState);

  return (
    <Stack spacing='4' p='4'>
      <Center>
        <Text fontWeight='bold' fontSize='2xl'>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </Center>
      <Box>
        <Center>
          <Text fontSize='xl'>Email</Text>
        </Center>
        <Input id='email' size='lg' type='email' variant='outline' placeholder='Your email'/>
      </Box>
      <Box>
        <Center>
          <Text fontSize='xl'>Password</Text>
        </Center>
        <Input id='password' size='lg' type='password' variant='outline' placeholder='Your password'/>
      </Box>
      <Box>
        <Center>
          <Button size='lg' maxW='48'>{isLogin ? 'Login' : 'Create Account'}</Button>
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
  );
};

export default AuthForm;
