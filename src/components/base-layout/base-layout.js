import { Container } from '@chakra-ui/react';
import Navbar from '../navbar/navbar';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Container
        minW='full'
        maxW='full'
        px='0'
        as='header'
        position='fixed'
        bg='transparent'
        zIndex={15}
      >
        <Navbar />
      </Container>
      <Container
        minW='full'
        maxW='full'
        px='0'
      >
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
