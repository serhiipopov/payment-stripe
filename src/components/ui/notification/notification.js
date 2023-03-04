import { Box, Center, Stack, Text } from '@chakra-ui/react';

const Notification = ({ title, message }) => {
  return (
    <Box>
      <Center w='full'bg='green.100' py='6'>
        <Stack spacing='1'>
          <Text fontSize='xl' fontWeight='bold'>{title}</Text>
          <Text fontSize='lg' fontWeight='medium'>{message}</Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default Notification;
