import { AddRecipePayload } from '../utils/globalType';
import Api from './Api';
import { recipes } from './Endpoint';
import { RecipesType } from './RecipesType';

export const fetchRecipes = async (): Promise<RecipesType> => {
  try {
    const response = await Api.get(recipes.getAll);
    return response?.data;
  } catch (error) {
    console.error('Error from get data api', error);
    throw error;
  }
};

export const fetchRecipesTags = async (): Promise<RecipesType> => {
  try {
    const response = await Api.get(recipes.getTags);
    return response?.data;
  } catch (error) {
    console.error('error from get tags', error);
    throw error;
  }
};

export const addRecipes = async (payload: AddRecipePayload) => {
  try {
    const response = await Api.post(recipes.add, payload);
    return response.data;
  } catch (error) {
    console.error('error from add data', error);
    throw error;
  }
};
