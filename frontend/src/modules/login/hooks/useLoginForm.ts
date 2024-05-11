import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Errors } from '@constants';
import { PhoneNumber } from '@constants/regexp.ts';

export type FormValues = {
  phone_number: string;
  password: string;
};

const schema = yup.object().shape({
  phone_number: yup
    .string()
    .required(Errors.Required)
    .test('phone', Errors.PhoneInvalid, (value) => PhoneNumber.test(value)),
  password: yup.string().required(Errors.Required),
});

const useLoginForm = () => {
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { phone_number: '', password: '' },
  });

  return { form };
};

export default useLoginForm;
