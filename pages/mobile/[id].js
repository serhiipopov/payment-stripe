import { useState } from 'react';
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

const MobileItem = ({ mobile }) => {
  const [isCount, setCount] = useState(0);

  const { name, description, price, image } = mobile;

  const increment = () => setCount((prevState) => prevState + 1);
  const decrement = () => setCount((prevState) => (prevState === 0 ? prevState : prevState - 1));

  const isTotalPrice = `Total $ ${isCount * price}`;

  return (
    <Box
      h='full'
      paddingX='80'
      paddingY='28'
    >
      <Stack spacing='4'>
        <Heading
          as='h2'
          fontWeight='extrabold'
          fontSize='3xl'
          textTransform='uppercase'
          letterSpacing='wider'
        >
          {name}
        </Heading>
        <Center w='60' h='80' borderRadius='md' overflow='hidden'>
          <Image src={image} alt={name} w='full' h='full' />
        </Center>
        <Text>{description}</Text>
        <Text fontWeight='bold' fontSize='2xl'>{price}</Text>

        <Flex justifyContent='space-between' alignItems='center'>
          <Button variant='outline' size='lg' bg='blue.200' disabled={isCount === 0} onClick={decrement}>-</Button>
          <Text fontWeight='medium' fontSize='xl'>{isCount}</Text>
          <Button variant='outline' size='lg' bg='blue.300' onClick={increment}>+</Button>
        </Flex>

        <Flex justifyContent='space-between' alignItems='center'>
          <Text fontWeight='bold' fontSize='2xl'>{isTotalPrice}</Text>
          <Button variant='outline' w='40' size='lg' bg='gray.400' disabled={isCount === 0}>Buy</Button>
        </Flex>
      </Stack>
    </Box>
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
