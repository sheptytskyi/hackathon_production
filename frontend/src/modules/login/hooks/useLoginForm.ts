import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Errors } from '@constants';

export type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email(Errors.EmailInvalid).required(Errors.Required),
  password: yup.string().required(Errors.Required),
});

const useLoginForm = () => {
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  return { form };
};

export default useLoginForm;
