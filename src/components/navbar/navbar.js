import Link from 'next/link';
import { 
  Box,
  Button,
  Divider,
  Flex,
  HStack, 
  useDisclosure 
} from '@chakra-ui/react';
import ModalCustom from '../ui/modal/modal';
import AuthForm from '../auth-form/auth-form';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' bg='gray.50' px='4'>
        <HStack spacing='6' px='10' py='6' fontSize='lg' fontWeight='medium'>
          <Link href='/'>Main</Link>
          <Link href='/mobile'>Mobile</Link>
        </HStack>

        <Box>
          <Button onClick={onOpen}>Login</Button>
          <Button>Logout</Button>
        </Box>

        <ModalCustom isOpen={isOpen} onClose={onClose}>
          <AuthForm onClose={onClose} />
        </ModalCustom>

      </Flex>
      <Divider orientation='horizontal' w='full' borderColor='gray.400' opacity='1' />
    </Box>
  );
};

export default Navbar;
