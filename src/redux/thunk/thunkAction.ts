import { Dispatch } from 'redux';
import { recipes } from '../../API/Endpoint';
import Api from '../../API/Api';
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './action';

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await Api.get(recipes.users);
      dispatch(fetchDataSuccess(response.data.users));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
