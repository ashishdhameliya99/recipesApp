import { fetchDataAction } from '../../utils/globalType';
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from './actionType';

export const fetchDataRequest = () => ({
  type: FETCH_REQUEST,
});
export const fetchDataSuccess = (data: string) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};
export const fetchDataFailure = (error: string | Error): fetchDataAction => ({
  type: FETCH_FAILURE,
  payload: error,
});
