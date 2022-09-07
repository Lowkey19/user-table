import { Actions, UserState, UserTypes } from "./types";

export function user(state: UserState, action: UserTypes): UserState {
  switch (action.type) {
    case Actions.GET_USERS_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.GET_USERS_FULFILLED: {
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
      }
    }
    case Actions.GET_USERS_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.CREATE_USER_FULFILLED: {
      return {
        ...state,
        userList: [ ...state.userList, action.payload ],
      }
    }
    case Actions.EDIT_USER_FULFILLED: {
      const { id } = action.payload;
      const userIdx = state.userList.findIndex((user) => user.id === id);
      if (userIdx !== -1) state.userList[userIdx] = action.payload;
      return {
        ...state,
        userList: [ ...state.userList ],
      }
    }
    case Actions.DELETE_USERS_FULFILLED: {
      const ids = action.payload;

      ids.forEach(id => {
        const userIdx = state.userList.findIndex((user) => user.id === id);
        if (userIdx !== -1) state.userList.splice(userIdx, 1);
      })

      return {
        ...state,
        userList: [ ...state.userList ],
      }
    }
    case Actions.ASSIGN_SEARCH_KEY_WORD_ACTION: {
      return {
        ...state,
        searchKeyword: action.payload,
      }
    }
    default:
      return state;
  }
}