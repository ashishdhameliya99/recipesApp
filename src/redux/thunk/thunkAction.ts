import { Dispatch } from 'redux';
import { recipes } from '../../API/Endpoint';
import Api from '../../API/Api';
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './action';

export const fetchUsers = (page: number = 1, limit: number = 30) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());

    const skip = (page - 1) * limit;
    try {
      const response = await Api.get(
        `${recipes.users}?limit=${limit}&skip=${skip}`,
      );
      dispatch(fetchDataSuccess(response.data.users));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
