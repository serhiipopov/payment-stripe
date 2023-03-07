import { getSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import ProfileView from '../../src/components/profile-view/profile-view';
import {apiRoutes, method, routes} from '../../src/constants';

const Profile = () => {
  const changePasswordHandler = async(passwordData) => {
    const response = await fetch(apiRoutes.changePassword, {
      method: method.PATCH,
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = response.json();
  }

  return (
    <Container
      minW='full'
      minH='full'
      paddingY='48'
      paddingX={{ base: '6', lg: '12' }}
    >
      <ProfileView onChangePassword={changePasswordHandler} />
    </Container>
  );
};

export const getServerSideProps = async(context) => {
  const session = await getSession({ req: context.req })

  if(!session) {
    return {
      redirect: {
        destination: routes.auth,
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

export default Profile;
