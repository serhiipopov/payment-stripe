import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import Comments from '../../src/components/comments/comments';
import { apiRoutes } from '../../src/constants';

const publishableKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
const stripePromise = loadStripe(publishableKey);

const MobileItem = ({ mobile }) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(mobile);

  const totalPrice = item.quantity * item.price;

  const changeCount = (value) => {
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const onNumberChange = (e) => {
    changeCount(parseInt(e.target.value));
  };

  const onQuantityPlus = () => {
    changeCount(item.quantity + 1);
  };

  const onQuantityMinus = () => {
    changeCount(item.quantity - 1);
  };

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(apiRoutes.stripeSession, {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
    setLoading(false);
  };

  const isTotalPrice = `Total $ ${totalPrice}`;

  return (
    <Flex
      justifyContent='space-between'
      h='full'
      paddingX={{ base: '6', lg: '32', xl: '80' }}
      paddingY={{ base: '12', lg: '28' }}
    >
      <Box w='50%'>
        <Stack spacing='4' borderRadius='lg' borderColor='gray.400' borderWidth='1px' p='10'>
          <Heading
            as='h2'
            fontWeight='extrabold'
            fontSize='3xl'
            textTransform='uppercase'
            letterSpacing='wider'
          >
            {item.name}
          </Heading>
          <Center w='60' h='80' borderRadius='md' overflow='hidden'>
            <Image src={item.image} alt={item.name} w='full' h='full' />
          </Center>
          <Text>{item.description}</Text>
          <Text fontWeight='bold' fontSize='2xl'>{item.price}</Text>

          <Flex justifyContent='space-between' alignItems='center'>
            <Button
              variant='outline'
              size='lg'
              bg='cyan.600'
              color='gray.100'
              _hover={{ bg: 'cyan.500' }}
              disabled={item.quantity === 0}
              onClick={onQuantityMinus}
            >
              -
            </Button>
            <Text fontWeight='medium' fontSize='xl'  onChange={onNumberChange}>{item.quantity}</Text>
            <Button
              variant='outline'
              size='lg'
              bg='cyan.800'
              color='gray.100'
              _hover={{ bg: 'cyan.500' }}
              onClick={onQuantityPlus}
            >
              +
            </Button>
          </Flex>

          <Flex justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold' fontSize='2xl'>{isTotalPrice}</Text>
            <Button
              variant='outline'
              w='40'
              size='lg'
              bg='cyan.900'
              color='gray.100'
              _hover={{ bg: 'cyan.500' }}
              onClick={createCheckOutSession}
              disabled={item.quantity === 0}
            >
              Buy
            </Button>
          </Flex>
        </Stack>
      </Box>
      <Comments eventId={item.id} />
    </Flex>
  );
};

export default MobileItem;

export async function getServerSideProps({ query }) {

  const id = query.id;
  const { mobiles } = await import('/data/data.json')

  const mobile = mobiles.find((mob) => {
    const mobId = mob.id.toString();
    return  mobId === id;
  })

  return {
    props: { mobile }
  }
}
