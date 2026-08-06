import { feedReducer, fetchFeeds } from '../slices/feedSlice';
import { TOrder } from '../../utils/types';

describe('feedReducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен вернуть начальное состояние', () => {
    const state = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить loading=true при fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('должен сохранить данные при fetchFeeds.fulfilled', () => {
    const fakeOrders: TOrder[] = [
      {
        _id: '123',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Тестовый заказ',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        number: 42
      }
    ];

    const payload = {
      orders: fakeOrders,
      total: 100,
      totalToday: 10
    };

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload
    };

    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: fakeOrders,
      total: 100,
      totalToday: 10,
      loading: false
    });
  });

  it('должен установить ошибку при fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка при загрузке ленты' }
    };

    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка при загрузке ленты'
    });
  });
});
