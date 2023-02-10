import { Stack, Text } from '@chakra-ui/react';

const Comment = ({ name, text }) => {
  return (
    <Stack
      spacing='0'
      borderWidth='1px'
      borderColor='gray.200'
      borderRadius='lg'
      p='3'
    >
      <Text fontWeight='extrabold'>{name}</Text>
      <Text fontWeight='medium' fontSize='lg'>{text}</Text>
    </Stack>
  );
};

export default Comment;
