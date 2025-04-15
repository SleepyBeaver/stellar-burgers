import { combineReducers } from 'redux';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { constructorReducer } from '../slices/constructorSlice';
import { ordersReducer } from '../slices/ordersSlice';
import { modalReducer } from '../slices/modalSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orders: ordersReducer,
  modal: modalReducer
});
