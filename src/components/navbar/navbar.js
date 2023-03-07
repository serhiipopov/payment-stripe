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
import { routes } from '../../constants';

const Navbar = () => {
  const { data: session, status } = useSession();

  const logoutHandler = () => signOut();

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' bg='gray.100' px='12'>
        <HStack spacing='6' px='10' py='6' fontSize='lg' fontWeight='medium'>
          <Link href={routes.main}>Main</Link>
          <Link href={routes.mobile}>Mobile</Link>
          { session && <Link href={routes.profile}>Profile</Link> }
        </HStack>

        { !session && status !== 'loading' &&
          <Box fontSize='lg'fontWeight='medium' color='cyan.800' _hover={{ color: 'cyan.500' }}>
            <Button link={routes.auth}>Login</Button>
          </Box>
        }

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
      <Divider orientation='horizontal' w='full' borderWidth='1px' borderColor='cyan.700' opacity='1' />
    </Box>
  );
};

export default Navbar;
