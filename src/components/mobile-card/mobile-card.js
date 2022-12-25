import { Box, Center, Heading, Image, Text } from '@chakra-ui/react';

const MobileCard = ({ image, price, name }) => {
  return (
    <Box borderRadius='lg' borderColor='gray.300' borderWidth='1px' p='6'>
      <Heading
        as='h2'
        fontWeight='extrabold'
        fontSize='xl'
        textTransform='uppercase'
      >
        {name}
      </Heading>
      <Center w='60' h='80' borderRadius='md' overflow='hidden'>
        <Image src={image} alt={name} w='full' h='full' />
      </Center>
      <Text fontWeight='bold' fontSize='xl'>{`Price$ ${price}`}</Text>
    </Box>
  )
}

export default MobileCard;
