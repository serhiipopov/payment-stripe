import Link from 'next/link';
import { Box, Divider, HStack } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg='gray.50'>
      <HStack spacing='6' px='10' py='6' fontSize='lg' fontWeight='medium'>
        <Link href='/'>Main</Link>
        <Link href='/mobile'>Mobile</Link>
      </HStack>
      <Divider orientation='horizontal' w='full' borderColor='gray.400' opacity='1' />
    </Box>
  );
};

export default Navbar;
