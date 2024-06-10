import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SignOut = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) signOut();
  }, [session]);
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={5}
        p={5}
        flexDirection="column"
      >
        <Typography className="text-center">Signing out...</Typography>
      </Box>
    </Container>
  );
};

export default SignOut;
