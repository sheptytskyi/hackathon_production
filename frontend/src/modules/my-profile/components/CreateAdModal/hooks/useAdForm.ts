import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Errors } from '@constants';
import dayjs, { Dayjs } from 'dayjs';
import { ICreateAdRequest } from '@app/services/ads/types.ts';

const schema = yup.object().shape({
  lost_person_first_name: yup.string().required(Errors.Required),
  lost_person_second_name: yup.string().required(Errors.Required),

  description: yup.string().required(Errors.Required),
  location_data: yup.string().required(Errors.Required),
  date_lost: yup.mixed<Dayjs>().required(Errors.Required),

  latitude: yup.number().required(Errors.Required),
  longitude: yup.number().required(Errors.Required),

  pictures: yup.mixed().required(Errors.Required),
});

const useAdForm = () => {
  const form = useForm<ICreateAdRequest>({
    mode: 'onChange',
    resolver: yupResolver(schema) as unknown as Resolver<ICreateAdRequest>,
    defaultValues: {
      lost_person_first_name: '',
      lost_person_second_name: '',
      description: '',
      location_data: '',
      date_lost: dayjs(),
      latitude: 0,
      longitude: 0,
      pictures: null,
    },
  });

  return { form };
};

export default useAdForm;
