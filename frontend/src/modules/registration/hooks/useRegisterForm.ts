import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Errors } from '@constants';
import { ICreateUserRequest } from '@app/services/users/types.ts';
import { PhoneNumber } from '@constants/regexp.ts';

const schema = yup.object().shape({
  first_name: yup.string().required(Errors.Required),
  last_name: yup.string().required(Errors.Required),
  phone_number: yup
    .string()
    .required(Errors.Required)
    .test('phone', Errors.PhoneInvalid, (value) => PhoneNumber.test(value)),
  password: yup.string().required(Errors.Required),
  password_2: yup
    .string()
    .required(Errors.Required)
    .test('passwords-match', Errors.PasswordsMatch, function (value) {
      return this.parent.password === value;
    }),
});

const useRegisterForm = () => {
  const form = useForm<ICreateUserRequest>({
    mode: 'onChange',
    resolver: yupResolver(schema) as Resolver<ICreateUserRequest>,
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
      password_2: '',
    },
  });

  return { form };
};

export default useRegisterForm;
