import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import api from '../../../api';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Nome é obrigatório'),
    email: Yup.string().email('Entre com um email válido').required('Email é obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatório')
      .min(6, 'A senha deve conter de 6 a 10 caracteres')
      .max(10, 'Muito longa'),
    cpf: Yup.string().required('Entre somente com números sem pontos ou traços')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
      cpf: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await api.post('users', {
        nome_usuario: values.firstName,
        email_usuario: values.email,
        senha_usuario: values.password,
        cpf_usuario: values.cpf
      });
      window.alert('Usuário cadastrado com sucesso!');
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nome Completo"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Stack>

          <TextField
            fullWidth
            label="CPF"
            {...getFieldProps('cpf')}
            error={Boolean(touched.cpf && errors.cpf)}
            helperText={touched.cpf && errors.cpf}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cadastre-se
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
