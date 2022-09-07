import { IUser } from '../api/user/types';

export const isUserExists = (searchKeyword: string, userInfo: IUser): boolean => {
  if (searchKeyword === '') return true;
  const { userId, firstName, lastName, email, status } = userInfo;
  const userIdMatch = userId ? userId.match(new RegExp(searchKeyword, 'i')) !== null : false;
  const firstNameMatch = firstName ? firstName.match(new RegExp(searchKeyword, 'i')) !== null : false;
  const lastNameMatch = lastName ? lastName.match(new RegExp(searchKeyword, 'i')) !== null : false;
  const emailMatch = email ? email.match(new RegExp(searchKeyword, 'i')) !== null : false;
  const statusMatch = status ? status.match(new RegExp(searchKeyword, 'i')) !== null : false;

  return userIdMatch || firstNameMatch || lastNameMatch || emailMatch || statusMatch;
};

export const filterUserList = (searchKeyword: string, users: IUser[]): IUser[] => {
  if (searchKeyword === '') return users;
  return users.filter((u) => isUserExists(searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), u));
};
