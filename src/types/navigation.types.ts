import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: {};
  Cocktail: {id: string};
  Categories: {query: string};
  CocktailsList: {
    query: string;
    info: string;
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type CocktailScreenRouteProp = RouteProp<RootStackParamList, 'Cocktail'>;
export type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Categories'
>;
export type CategoriesScreenRouteProp = RouteProp<
  RootStackParamList,
  'Categories'
>;
export type CocktailsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CocktailsList'
>;
export type CocktailsListScreenRouteProp = RouteProp<
  RootStackParamList,
  'CocktailsList'
>;
