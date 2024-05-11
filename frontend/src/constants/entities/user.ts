export enum UserTypes {
  Volunteer = 'volunteer',
  MissedRelative = 'missed',
}

export const ReadableUserTypes = {
  [UserTypes.Volunteer]: 'Волонтер',
  [UserTypes.MissedRelative]: 'Шукаю людину',
};
