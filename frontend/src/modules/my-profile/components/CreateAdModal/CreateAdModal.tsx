import React, { FC, useEffect } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  DialogProps,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import useAdForm from '@modules/my-profile/components/CreateAdModal/hooks/useAdForm.ts';
import { ControlledDatePicker, ControlledTextField } from '@ui';
import useCreateAd from '@modules/my-profile/components/CreateAdModal/hooks/useCreateAd.ts';
import { FormProvider } from 'react-hook-form';
import { ControlledFilesUpload } from '@ui/inputs/ControlledFilesUpload.tsx';
import SelectLocation from '@modules/my-profile/components/CreateAdModal/SelectLocation.tsx';

type Props = Pick<DialogProps, 'open'> & {
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  {
    children,
    ...props
  }: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {children}
    </Slide>
  );
});

const CreateAdModal: FC<Props> = (props) => {
  const { form } = useAdForm();
  const { handleCreateAd, isLoading } = useCreateAd(props.onClose);

  useEffect(() => {
    form.reset();
  }, [props.open, form]);

  return (
    <FormProvider {...form}>
      <Dialog fullScreen TransitionComponent={Transition} {...props}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>

            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h4"
              color="common.white"
            >
              Додати оголошення
            </Typography>

            <Button
              color="inherit"
              onClick={() => {
                handleCreateAd(form.getValues());
              }}
              disabled={!form.formState.isValid || isLoading}
            >
              Зберегти
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container spacing={4} px={5} py={10} maxWidth={900}>
          <Grid item xs={12} md={6}>
            <ControlledTextField
              name="lost_person_first_name"
              label={"Ім'я зниклої особи"}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledTextField
              name="lost_person_second_name"
              label={'Фамілія зниклої особи'}
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledTextField
              name="description"
              label={'Опис'}
              multiline
              minRows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledDatePicker
              name="date_lost"
              label={'Коли зникла людина?'}
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledTextField
              name="location_data"
              label={'Повна адреса локації, де зникла людина'}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectLocation />
          </Grid>

          <Grid item xs={12}>
            <Typography mb={2} variant="h6">
              Завантажте фотографії людини
            </Typography>

            <ControlledFilesUpload name="pictures" />
          </Grid>
        </Grid>
      </Dialog>
    </FormProvider>
  );
};

export default CreateAdModal;
