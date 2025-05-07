import {
  ingredientsReducer,
  fetchIngredients
} from '../slices/ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsReducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('должен вернуть начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить loading=true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('должен сохранить данные при fetchIngredients.fulfilled', () => {
    const fakeIngredients: TIngredient[] = [
      {
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
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: fakeIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      items: fakeIngredients,
      loading: false,
      error: null
    });
  });

  it('должен установить ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      items: [],
      loading: false,
      error: 'Ошибка загрузки'
    });
  });
});
