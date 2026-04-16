import { Dispatch } from '@reduxjs/toolkit';
import Api from '../../API/Api';
import { recipes } from '../../API/Endpoint';
import {
  fetchCartDataFailure,
  fetchCartDataRequest,
  fetchCartDataSuccess,
} from './action';

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchCartDataRequest());
    try {
      const response = await Api.get(recipes.carts);
      const allProducts = response.data.carts.flatMap(
        (cart: any) => cart.products,
      );
      dispatch(fetchCartDataSuccess(allProducts));
    } catch (error: any) {
      dispatch(fetchCartDataFailure(error.message));
    }
  };
};
