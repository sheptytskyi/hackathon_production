import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { Centered, ControlledTextField, TextLink } from '@ui';
import { Box, Button, Stack, Typography } from '@mui/material';
import { APP_TITLE } from '@constants';
import { Routes } from '@router';
import useRegisterForm from '@modules/registration/hooks/useRegisterForm.ts';
import useCreateUser from '@modules/registration/hooks/useCreateUser.ts';

const Registration: FC = () => {
  const { form } = useRegisterForm();
  const { handleCreateUser, isLoading } = useCreateUser();

  return (
    <FormProvider {...form}>
      <Centered alignItems="flex-start" py={10}>
        <Typography variant="h2" color="primary.main">
          Вітаємо у {APP_TITLE}!
        </Typography>

        <Stack width="100%" pt={8} gap={4}>
          <Stack flexDirection="row" gap={4}>
            <ControlledTextField name="first_name" label="Ім'я" />
            <ControlledTextField name="last_name" label="Прізвище" />
          </Stack>

          <Stack flexDirection="row" gap={4}>
            <ControlledTextField
              name="password"
              label="Пароль"
              type="password"
              triggerFields={['password_2']}
            />

            <ControlledTextField
              name="password_2"
              label="Повторіть пароль"
              type="password"
            />
          </Stack>

          <ControlledTextField
            name="phone_number"
            label="Номер телефону"
            placeholder="+380"
          />
        </Stack>

        <Button
          fullWidth
          sx={{ mt: 6 }}
          variant="filled"
          onClick={() => handleCreateUser(form.getValues())}
          disabled={!form.formState.isValid || isLoading}
        >
          Стоврити аккаунт
        </Button>

        <Box mt={2}>
          Маєте аккаунт? <TextLink to={Routes.Login}>Увійти</TextLink>
        </Box>
      </Centered>
    </FormProvider>
  );
};

export default Registration;
