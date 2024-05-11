import { FC } from 'react';
import { InfoItem, Section } from '@ui';
import useProfile from '@hooks/useProfile.ts';
import { Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { Logout } from '@mui/icons-material';
import useLogout from '@hooks/useLogout.ts';

const MyInfo: FC = () => {
  const [{ first_name, last_name, phone_number, date_joined }] = useProfile();

  const handleLogout = useLogout();

  return (
    <Section title="Мої дані">
      <Grid container spacing={5}>
        <Grid item xs={6} md={3}>
          <InfoItem title="Ім'я">{first_name}</InfoItem>
        </Grid>

        <Grid item xs={6} md={3}>
          <InfoItem title="Прізвище">{last_name}</InfoItem>
        </Grid>

        <Grid item xs={6} md={3}>
          <InfoItem title="Номер телефону">{phone_number}</InfoItem>
        </Grid>

        <Grid item xs={6} md={3}>
          <InfoItem title="Дата реєстрації">
            {dayjs(date_joined).format('DD.MM.YYYY')}
          </InfoItem>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="filled"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Вийти з профілю
          </Button>
        </Grid>
      </Grid>
    </Section>
  );
};

export default MyInfo;
