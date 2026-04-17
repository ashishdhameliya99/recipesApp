import { UserActionTypes, UserState } from '../../utils/globalType';

const initialState: UserState = {
  loading: false,
  users: [],
  error: '',
};
type UserAction =
  | { type: typeof UserActionTypes.FETCH_REQUEST }
  | { type: typeof UserActionTypes.FETCH_SUCCESS; payload: any[] }
  | { type: typeof UserActionTypes.FETCH_FAILURE; payload: string };
export const userReducer = (
  state = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.FETCH_SUCCESS:
      return {
        loading: false,
        users: [...state.users, ...action.payload],
        error: null,
      };
    case UserActionTypes.FETCH_FAILURE:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};
