import { Dispatch, useReducer } from 'react';

import { defaultState } from '../../providers/users';
import { user } from './reducers';
import { Actions, UserTypes, UserState, IUser } from './types';

const initialState: UserState = defaultState.store;

export const useUser = (): [UserState, Dispatch<UserTypes>] => {
  const [state, dispatch] = useReducer(user, initialState);
  return [state, dispatch];
}

export async function getUserList(dispatch: Dispatch<UserTypes>): Promise<void> {
  dispatch({ type: Actions.GET_USERS_START, payload: undefined });
  try {
    const data = localStorage.getItem("userState") || '';
    const userState: UserState = JSON.parse(data);

    dispatch({ type: Actions.GET_USERS_FULFILLED, payload: userState.userList });
  } catch (e) {
    dispatch({ type: Actions.GET_USERS_REJECTED, payload: undefined });
  }
}

export async function createUser(param: IUser, dispatch: Dispatch<UserTypes>): Promise<void> {
  dispatch({ type: Actions.CREATE_USER_START, payload: undefined });
  try {
    const data = localStorage.getItem("userState") || JSON.stringify(defaultState.store);
    const userState: UserState = JSON.parse(data);
    userState.userList.push(param);
    localStorage.setItem("userState", JSON.stringify(userState));

    console.log(param);

    console.log(localStorage.getItem("userState"));

    dispatch({ type: Actions.CREATE_USER_FULFILLED, payload: param });
  } catch (e) {
    dispatch({ type: Actions.CREATE_USER_REJECTED, payload: undefined });
  }
}

export async function editUser(param: IUser, dispatch: Dispatch<UserTypes>): Promise<void> {
  dispatch({ type: Actions.EDIT_USER_START, payload: undefined });
  try {
    const data = localStorage.getItem("userState") || JSON.stringify(defaultState.store);
    const userState: UserState = JSON.parse(data);

    const { id } = param;
    const userIdx = userState.userList.findIndex((user) => user.id === id);
    if (userIdx !== -1) userState.userList[userIdx] = param;

    localStorage.setItem("userState", JSON.stringify(userState));

    dispatch({ type: Actions.EDIT_USER_FULFILLED, payload: param });
  } catch (e) {
    dispatch({ type: Actions.EDIT_USER_REJECTED, payload: undefined });
  }
}

export async function deleteUsers(param: string[], dispatch: Dispatch<UserTypes>): Promise<void> {
  dispatch({ type: Actions.DELETE_USERS_START, payload: undefined });
  try {
    const data = localStorage.getItem("userState") || JSON.stringify(defaultState.store);
    const userState: UserState = JSON.parse(data);

    param.forEach(id => {
      const userIdx = userState.userList.findIndex((user) => user.id === id);
      if (userIdx !== -1) userState.userList.splice(userIdx, 1);
    })

    localStorage.setItem("userState", JSON.stringify(userState));

    dispatch({ type: Actions.DELETE_USERS_FULFILLED, payload: param });
  } catch (e) {
    dispatch({ type: Actions.DELETE_USERS_REJECTED, payload: undefined });
  }
}

export function assignSearchKeyWord(s: string, dispatch: Dispatch<UserTypes>): void {
  dispatch({ type: Actions.ASSIGN_SEARCH_KEY_WORD_ACTION, payload: s });
}
