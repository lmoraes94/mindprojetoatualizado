// material
import { Box, Container, Typography } from '@mui/material';
// components
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import api from '../api';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      // setUsers(await api.get('users'));
      const data = await api.get('users');
      setUsers(data.data);
    })();
  }, []);
  return (
    <Page title="| Dashboard |">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Bem vindo!</Typography>
          <lu>
            {users.map((user) => (
              <li> {`${user.nome_usuario} - ${user.email_usuario} - ${user.cpf_usuario}`}</li>
            ))}
          </lu>
        </Box>
      </Container>
    </Page>
  );
}
