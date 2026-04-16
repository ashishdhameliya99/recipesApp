import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from './actionType';

export const fetchCartDataRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchCartDataSuccess = (carts: string[]) => {
  return {
    type: FETCH_SUCCESS,
    payload: carts,
  };
};

export const fetchCartDataFailure = (error: any): any => ({
  type: FETCH_FAILURE,
  payload: error,
});
