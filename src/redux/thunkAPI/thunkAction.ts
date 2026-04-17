import { Dispatch } from '@reduxjs/toolkit';
import Api from '../../API/Api';
import { recipes } from '../../API/Endpoint';
import {
  fetchCartDataFailure,
  fetchCartDataRequest,
  fetchCartDataSuccess,
} from './action';
import { localCartsType } from '../../utils/globalType';

export const fetchData = (page: number = 1, limit: number = 10) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchCartDataRequest());

      const skip = (page - 1) * limit;

      const response = await Api.get(
        `${recipes.carts}?limit=${limit}&skip=${skip}`,
      );

      const allProducts: localCartsType[] = response.data.carts.flatMap(
        (cart: any) => cart.products,
      );
      console.log('api-=', allProducts);
      dispatch(fetchCartDataSuccess(allProducts));
    } catch (error: any) {
      dispatch(fetchCartDataFailure(error.message));
    }
  };
};
