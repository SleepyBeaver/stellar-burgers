import { ordersReducer, createOrder, clearOrder } from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersReducer', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const fakeOrder: TOrder = {
    _id: '123',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Order test',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 777
  };

  it('должен вернуть начальное состояние', () => {
    const state = ordersReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить orderRequest=true при createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('должен сохранить заказ при createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: fakeOrder
    };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderModalData: fakeOrder,
      orderRequest: false
    });
  });

  it('должен сохранить ошибку при createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: 'Ошибка создания заказа'
    });
  });

  it('должен очистить orderModalData при clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      orderModalData: fakeOrder
    };
    const action = clearOrder();
    const state = ordersReducer(stateWithOrder, action);
    expect(state).toEqual(initialState);
  });
});
