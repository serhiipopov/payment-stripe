import { Center, Container, Heading, Stack } from '@chakra-ui/react';
import MobileList from '../../src/components/mobile-list/mobile-list';

const Mobiles = ({ mobiles }) => {
  return (
    <Container
      minW='full'
      minH='full'
      paddingY='16'
      paddingX={{ base: '6', lg: '40' }}
    >
      <Stack spacing='6'>
        <Center pt='12'>
          <Heading
            as='h1'
            color='cyan.900'
            fontSize='4xl'
            fontWeight='medium'
            textTransform='uppercase'
          >
            Apple
          </Heading>
        </Center>
        <MobileList list={mobiles} />
      </Stack>
    </Container>
  );
};

export default Mobiles;

export const getServerSideProps = async () => {
  const { mobiles } = await import('/data/data.json')

  return { props: { mobiles } }
}
