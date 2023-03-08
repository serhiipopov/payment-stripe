import { Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import MobileCard from '../mobile-card/mobile-card';
import { routes } from '../../constants';

const MobileList = ({ list }) => {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap='6'>
      {list.map((mobile) => (
        <GridItem key={mobile.id}>
          <Link href={`${routes.mobile}/${mobile.id}`}>
            <MobileCard
              image={mobile.image}
              price={mobile.price}
              name={mobile.name}
            />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default MobileList;
