import {
  constructorReducer,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

describe('Редьюсер constructorReducer', () => {
  const bun: TIngredient = {
    _id: 'bun1',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredient1: TConstructorIngredient = {
    id: 'ing1',
    _id: '1',
    name: 'Ингредиент 1',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredient2: TConstructorIngredient = {
    id: 'ing2',
    _id: '2',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 60,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('должен вернуть начальное состояние', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен обработать добавление булки', () => {
    const state = constructorReducer(undefined, addBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('должен обработать добавление ингредиента', () => {
    const state = constructorReducer(undefined, addIngredient(ingredient1));
    expect(state.ingredients).toEqual([ingredient1]);
  });

  it('должен обработать удаление ингредиента', () => {
    const startState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = constructorReducer(
      startState,
      removeIngredient(ingredient1.id)
    );
    expect(state.ingredients).toEqual([ingredient2]);
  });

  it('должен обработать перемещение ингредиента', () => {
    const startState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = constructorReducer(
      startState,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('должен очистить конструктор', () => {
    const startState = {
      bun: bun,
      ingredients: [ingredient1]
    };
    const state = constructorReducer(startState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
