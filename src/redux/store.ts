import recipesSlice from './recipesSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { recipesSaga } from './saga';
import { userReducer } from './thunk/reducer';
import { cartsReducer } from './thunkAPI/reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  recipes: recipesSlice,
  apiReducer: userReducer,
  apiCarts: cartsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(recipesSaga);

export type RootState = ReturnType<typeof store.getState>;
