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
