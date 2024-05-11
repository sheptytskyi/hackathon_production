import { Dayjs } from 'dayjs';

export type ICreateAdRequest = {
  pictures: FileList | null;
  lost_person_first_name: string;
  lost_person_second_name: string;
  description: string;
  location_data: string;
  latitude: number;
  longitude: number;
  date_lost: Dayjs;
};

export type IMyAd = {
  id: number;
  user_name: string;
  title: string;
  description: string;
};

export type IAd = {
  lost_person_first_name: string;
  lost_person_second_name: string;
  pictures: string[];
  description: string;
  latitude: number;
  longitude: number;
  location_data: string;
  date_lost: string;
  time_created: string;
};

export type IAllAdsResponse = IAd[];
