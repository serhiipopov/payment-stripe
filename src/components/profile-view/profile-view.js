import {
  Input,
  Stack,
  Text,
  Center,
  Button, Box
} from '@chakra-ui/react';

const ProfileView = () => {
  return (
    <Center>
      <Stack spacing='4' w={96}>
        <Center>
          <Text fontSize='2xl' fontWeight='bold' as='h1'>
          Users Page
          </Text>
        </Center>
        <Center>
          <Text>New Password</Text>
        </Center>
        <Input required />
        <Center>
          <Text>Old Password</Text>
        </Center>
        <Input required />
        <Center>
          <Button
            bg='cyan.700'
            color='gray.100'
            _hover={{ bg: 'cyan.500' }}
            size='lg'
          >
            Change password
          </Button>
        </Center>
      </Stack>
    </Center>
  );
};

export default ProfileView;
