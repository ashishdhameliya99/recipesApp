import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchRecipesRequest,
  fetchRecipesSuccess,
  fetchRecipesFailed,
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
} from './recipesSlice';

import { recipes } from '../API/Endpoint';
import Api from '../API/Api';

function* workGetRecipes(action: ReturnType<typeof fetchRecipesRequest>): any {
  try {
    const { limit, skip } = action.payload;

    const response = yield call(() =>
      Api.get(`${recipes.getAll}?limit=${limit}&skip=${skip}`),
    );

    yield put(
      fetchRecipesSuccess({
        recipes: response.data.recipes,
      }),
    );
  } catch (error: any) {
    yield put(fetchRecipesFailed(error.message));
  }
}

function* workGetTags(): any {
  try {
    const response = yield call(() => Api.get(recipes.getTags));
    yield put(fetchTagsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchTagsFailure(error.message));
  }
}

export function* recipesSaga() {
  yield takeLatest(fetchRecipesRequest.type, workGetRecipes);
  yield takeLatest(fetchTagsRequest.type, workGetTags);
}
