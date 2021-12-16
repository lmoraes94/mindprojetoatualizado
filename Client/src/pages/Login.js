import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="| Login |">
      <AuthLayout>
        Ainda não tem conta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Cadastre-se
        </Link>
      </AuthLayout>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Acesse sua conta
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entre com seus dados abaixo</Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
