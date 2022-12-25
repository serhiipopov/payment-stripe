import { Center, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import MobileCard from '../../src/components/mobile-card/mobile-card';

const Mobile = ({ mobiles }) => {
  return (
    <Container
      minW='full'
      minH='full'
      paddingY='16'
      paddingX={{ base: '6', lg: '40' }}
    >
      <Center>
        <Heading pb='6' as='h1' fontWeight='extrabold' textTransform='uppercase'>Apple</Heading>
      </Center>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap='6'>
        {mobiles?.map((mobile) => (
          <GridItem key={mobile.id}>
            <Link href={`/mobile/${mobile.id}`}>
              <MobileCard image={mobile.image} price={mobile.price} name={mobile.name} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Mobile;

export const getServerSideProps = async () => {
  const { mobiles } = await import('/data/data.json')

  return { props: { mobiles } }
}
