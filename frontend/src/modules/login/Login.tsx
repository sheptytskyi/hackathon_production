import { FC } from 'react';
import { Centered, TextLink } from '@ui';
import { Box, Button, Stack, Typography } from '@mui/material';
import useLoginForm from '@modules/login/hooks/useLoginForm.ts';
import { FormProvider } from 'react-hook-form';
import { ControlledTextField } from '@ui';
import useLogIn from '@modules/login/hooks/useLogIn.ts';
import { Routes } from '@router';

const Login: FC = () => {
  const { form } = useLoginForm();
  const { handleLogIn, isLoading } = useLogIn();

  return (
    <FormProvider {...form}>
      <Centered alignItems="flex-start">
        <Typography variant="h2" color="primary.main">
          Увійти
        </Typography>

        <Stack width="100%" pt={5} gap={4}>
          <ControlledTextField
            name="phone_number"
            label="Номер телефону"
            placeholder="+380"
          />
          <ControlledTextField name="password" label="Пароль" />
        </Stack>

        <Button
          fullWidth
          sx={{ mt: 6 }}
          variant="filled"
          onClick={() => handleLogIn(form.getValues())}
          disabled={!form.formState.isValid || isLoading}
        >
          Увійти
        </Button>

        <Box mt={2}>
          Ще не маєте аккаунту?{' '}
          <TextLink to={Routes.Register}>Зареєструватися</TextLink>
        </Box>
      </Centered>
    </FormProvider>
  );
};

export default Login;
