import {
  modalReducer,
  setCurrentIngredient,
  clearCurrentIngredient
} from '../slices/modalSlice';
import { TIngredient } from '../../utils/types';

describe('modalReducer', () => {
  const initialState = {
    currentIngredient: null
  };

  const fakeIngredient: TIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('должен вернуть начальное состояние', () => {
    const state = modalReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен сохранить ингредиент при setCurrentIngredient', () => {
    const action = setCurrentIngredient(fakeIngredient);
    const state = modalReducer(initialState, action);
    expect(state).toEqual({
      currentIngredient: fakeIngredient
    });
  });

  it('должен очистить ингредиент при clearCurrentIngredient', () => {
    const stateWithIngredient = {
      currentIngredient: fakeIngredient
    };
    const action = clearCurrentIngredient();
    const state = modalReducer(stateWithIngredient, action);
    expect(state).toEqual(initialState);
  });
});
