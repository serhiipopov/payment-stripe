import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  Box,
  Divider,
  Flex,
  HStack,
  Button as ChakraButton
} from '@chakra-ui/react';
import Button from '../ui/button/button';

const Navbar = () => {
  const { data: session, status } = useSession();

  const logoutHandler = () => signOut();

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' bg='gray.50' px='4'>
        <HStack spacing='6' px='10' py='6' fontSize='lg' fontWeight='medium'>
          <Link href='/'>Main</Link>
          <Link href='/mobile'>Mobile</Link>
          { session && <Link href='/profile'>Profile</Link> }
        </HStack>

        { !session && status !== 'loading' &&  <Button link='/auth'>Login</Button> }
        { session &&
          <ChakraButton
            bg='cyan.700'
            color='gray.50'
            _hover={{ bg: 'cyan.500' }}
            onClick={logoutHandler}
          >
            Logout
          </ChakraButton>
        }

      </Flex>
      <Divider orientation='horizontal' w='full' borderColor='gray.400' opacity='1' />
    </Box>
  );
};

export default Navbar;
