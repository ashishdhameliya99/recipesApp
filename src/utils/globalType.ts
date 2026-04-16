import { Action } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export interface RecipesState {
  loading: boolean;
  tagsLoading: boolean;
  error: string | null;
  data: RecipesType[];
  total: number;
  limit: number;
  skip?: number;
  tags?: string[];
}

export interface RecipesType {
  id: number;
  tags?: string[];
  recipes: any;
  total: number;
  limit: number;
  skip?: number;
}

export interface RecipesItem {
  id: string | number;
  caloriesPerServing: number;
  recipes: string[];
  tags: string;
}
export interface ProductCardProps {
  item: RecipesType;
}
export interface TagsType {
  id: number;
  tags: string[];
}

export interface AddRecipePayload {
  name: string;
  price: number;
  image: string | null;
}

export interface localRecipesType {
  name: string;
  price: number;
  image: ImageSourcePropType;
  firstName?: string;
  lastName?: string;
}
export interface localCartsType {
  title: string;
  total: number;
  thumbnail: ImageSourcePropType;
}
export interface fetchDataAction {
  payload: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState {
  loading: boolean;
  users: User[];
  error: string | null;
}

export enum UserActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}
export enum CartActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}
export interface CartsState {
  loading: boolean;
  carts: carts[];
  error: string | null;
}

export interface carts {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
}
