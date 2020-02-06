export interface UserRegister {
  email: string;
  username: string;
  password: string;
}

export interface UserAuth {
  id: number;
  userName: string;
  bearerToken: string;
  role: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface PasswordChange {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

export interface InfoChange {
  firstName: string;
  lastName: string;
}

export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: any;
  recipes?: Recipe[];
}

export interface UserPage {
  content: User[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface UserProfile {
  user: User;
  recipePage: RecipePage;
}

export interface RecipeIngredient {
  id?: number;
  name: string;
  amount: string;
}

export interface Comment {
  comment: string;
  createdDate: Date;
  username: string;
  avatar?: any;
}

export interface Category {
  name: string;
}

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  preparation: string;
  preparationTime: any;
  difficulty: any;
  rating?: number;
  userRate?: number;
  createdDate?: Date;
  username?: string;
  avatar?: any;
  recipeIngredients?: RecipeIngredient[];
  comments?: Comment[];
  picture?: any;
  categories?: Category[];
  inCookbook?: boolean;
}

export interface RecipeResolved {
  recipe: Recipe;
  errorMessage?: string;
}

export interface RecipePage {
  content: Recipe[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface Fridge {
  id: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id?: number;
  name: string;
}

export interface IngredientPage {
  content: Ingredient[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
