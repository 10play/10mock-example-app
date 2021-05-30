const {IN_TEST} = process.env;

import {Dimensions} from 'react-native';

export const BASE_API_URL = IN_TEST
  ? 'http://localhost:8000'
  : 'https://www.thecocktaildb.com/api/json/v1/1';
export const {width: MAX_WIDTH, height: MAX_HEIGHT} = Dimensions.get('window');
export const LOADING_SKELETONS_NUM = 2;
