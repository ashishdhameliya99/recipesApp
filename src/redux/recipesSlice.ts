import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipesState, RecipesType } from '../utils/globalType';

interface FetchPayload {
  limit: number;
  skip: number;
}

const initialState: RecipesState = {
  data: [],
  loading: false,
  tagsLoading: false,
  tags: [],
  error: null,
  total: 0,
  limit: 30,
  skip: 0,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fetchRecipesRequest: (state, action: PayloadAction<FetchPayload>) => {
      state.loading = true;
      state.skip = action.payload.skip;
    },

    fetchRecipesSuccess: (
      state,
      action: PayloadAction<{ recipes: RecipesType[] }>,
    ) => {
      state.loading = false;

      if (state.skip === 0) {
        state.data = action.payload.recipes;
      } else {
        state.data = [...state.data, ...action.payload.recipes];
      }
    },

    fetchRecipesFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /*------------------------- */
    fetchTagsRequest: state => {
      state.tagsLoading = true;
    },

    fetchTagsSuccess: (state, action: PayloadAction<string[]>) => {
      state.tagsLoading = false;
      state.tags = action.payload;
    },

    fetchTagsFailure: (state, action: PayloadAction<string>) => {
      state.tagsLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRecipesRequest,
  fetchRecipesSuccess,
  fetchRecipesFailed,
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
} = recipesSlice.actions;

export default recipesSlice.reducer;
