import { getSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import ProfileView from '../../src/components/profile-view/profile-view';

const Profile = () => {
  return (
    <Container
      minW='full'
      minH='full'
      paddingY='48'
      paddingX={{ base: '6', lg: '12' }}
    >
      <ProfileView />
    </Container>
  );
};

export const getServerSideProps = async(context) => {
  const session = await getSession({ req: context.req })

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

export default Profile;
