import {
  profileOrdersReducer,
  fetchUserOrders,
  clearProfileOrders
} from '../slices/profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersReducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  const fakeOrders: TOrder[] = [
    {
      _id: '123',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Test order',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 101
    }
  ];

  it('должен вернуть начальное состояние', () => {
    const state = profileOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить loading=true при fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('должен сохранить заказы при fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: fakeOrders
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: fakeOrders,
      loading: false
    });
  });

  it('должен установить ошибку при fetchUserOrders.rejected', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Ошибка при загрузке заказов' }
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка при загрузке заказов'
    });
  });

  it('должен очистить заказы при clearProfileOrders', () => {
    const stateWithOrders = {
      ...initialState,
      orders: fakeOrders
    };
    const action = clearProfileOrders();
    const state = profileOrdersReducer(stateWithOrders, action);
    expect(state).toEqual(initialState);
  });
});
