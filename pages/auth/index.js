import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react'
import { Container } from '@chakra-ui/react';
import AuthForm from '../../src/components/auth-form/auth-form';
import SpinnerWrapper from '../../src/components/ui/spinner/spinner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) return <SpinnerWrapper />

  return (
    <Container
      minW='full'
      minH='full'
      paddingY='48'
      paddingX={{ base: '6', lg: '96' }}
    >
      <AuthForm />
    </Container>
  );
};

export default Auth;
