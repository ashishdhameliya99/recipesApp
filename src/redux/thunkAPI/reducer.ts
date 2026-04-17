import { CartActionTypes, CartsState } from '../../utils/globalType';

const initialState: CartsState = {
  loading: false,
  carts: [],
  error: '',
};
type CartAction =
  | { type: typeof CartActionTypes.FETCH_REQUEST }
  | { type: typeof CartActionTypes.FETCH_SUCCESS; payload: any[] }
  | { type: typeof CartActionTypes.FETCH_FAILURE; payload: string };

export const cartsReducer = (
  state = initialState,
  action: CartAction,
): CartsState => {
  switch (action.type) {
    case CartActionTypes.FETCH_REQUEST:
      return { ...state, loading: true };

    case CartActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        carts: [...state.carts, ...action.payload],
        error: '',
      };

    case CartActionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
