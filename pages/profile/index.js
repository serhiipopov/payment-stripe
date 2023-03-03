import { Container } from '@chakra-ui/react';
import ProfileView from '../../src/components/profile-view/profile-view';

const Profile = () => {
  return (
    <Container
      minW='full'
      minH='full'
      paddingY='48'
      paddingX={{ base: '6', lg: '72' }}
    >
      <ProfileView />
    </Container>
  );
};

export default Profile;
