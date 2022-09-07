export interface Action<T, P extends unknown = undefined> {
  payload: P extends infer Q ? Q : undefined;
  type: T;
}

export enum Actions {
  GET_USERS_START = "@user/GET_USERS_START",
  GET_USERS_FULFILLED = "@user/GET_USERS_FULFILLED",
  GET_USERS_REJECTED = "@user/GET_USERS_REJECTED",
  CREATE_USER_START = "@user/CREATE_USER_START",
  CREATE_USER_FULFILLED = "@user/CREATE_USER_FULFILLED",
  CREATE_USER_REJECTED = "@user/CREATE_USER_REJECTED",
  EDIT_USER_START = "@user/EDIT_USER_START",
  EDIT_USER_FULFILLED = "@user/EDIT_USER_FULFILLED",
  EDIT_USER_REJECTED = "@user/EDIT_USER_REJECTED",
  DELETE_USERS_START = "@user/DELETE_USERS_START",
  DELETE_USERS_FULFILLED = "@user/DELETE_USERS_FULFILLED",
  DELETE_USERS_REJECTED = "@user/DELETE_USERS_REJECTED",
  ASSIGN_SEARCH_KEY_WORD_ACTION = "@user/ASSIGN_SEARCH_KEY_WORD_ACTION",
}

export type ImageType = {
  medium: string;
  original: string;
}

export interface IUser {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdOn: Date;
}

export type UserState = {
  userList: IUser[];
  isLoading: boolean;
  searchKeyword: string;
}

type GetUsersRequest = Action<typeof Actions.GET_USERS_START>;
type GetUsersAction = Action<typeof Actions.GET_USERS_FULFILLED, IUser[]>;
type GetUsersError = Action<typeof Actions.GET_USERS_REJECTED>;

type CreateUserRequest = Action<typeof Actions.CREATE_USER_START>;
type CreateUserAction = Action<typeof Actions.CREATE_USER_FULFILLED, IUser>;
type CreateUserError = Action<typeof Actions.CREATE_USER_REJECTED>;

type EditUserRequest = Action<typeof Actions.EDIT_USER_START>;
type EditUserAction = Action<typeof Actions.EDIT_USER_FULFILLED, IUser>;
type EditUserError = Action<typeof Actions.EDIT_USER_REJECTED>;

type DeleteUserRequest = Action<typeof Actions.DELETE_USERS_START>;
type DeleteUserAction = Action<typeof Actions.DELETE_USERS_FULFILLED, string[]>;
type DeleteUserError = Action<typeof Actions.DELETE_USERS_REJECTED>;

type AssignSearchKeyWordAction = Action<typeof Actions.ASSIGN_SEARCH_KEY_WORD_ACTION, string>;

export type UserTypes = GetUsersRequest | GetUsersAction | GetUsersError | CreateUserRequest | CreateUserAction | CreateUserError | EditUserRequest | EditUserAction | EditUserError | DeleteUserRequest | DeleteUserAction | DeleteUserError | AssignSearchKeyWordAction;