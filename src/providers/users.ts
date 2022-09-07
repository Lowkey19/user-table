import { Dispatch, createContext } from 'react';
import { UserState, UserTypes } from '../api/user/types'

interface IUserContext {
  store: UserState;
  dispatch: Dispatch<UserTypes>;
}

export const defaultState: IUserContext = {
  store: {
    userList: [],
    isLoading: false,
    searchKeyword: '',
  },
  dispatch: (user: UserTypes): void => {},
}

const UserContext = createContext(defaultState);

export default UserContext;