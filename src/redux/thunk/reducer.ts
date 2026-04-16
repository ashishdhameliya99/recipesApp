import { UserActionTypes, UserState } from '../../utils/globalType';

const initialState: UserState = {
  loading: false,
  users: [],
  error: '',
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.FETCH_SUCCESS:
      return { loading: false, users: action.payload, error: null };
    case UserActionTypes.FETCH_FAILURE:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};
