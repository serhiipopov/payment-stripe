import { Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import MobileCard from '../mobile-card/mobile-card';

const MobileList = ({ list }) => {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap='6'>
      {list.map((mobile) => (
        <GridItem key={mobile.id}>
          <Link href={`/mobile/${mobile.id}`}>
            <MobileCard image={mobile.image} price={mobile.price} name={mobile.name} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default MobileList;
