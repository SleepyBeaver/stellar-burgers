import { rootReducer } from '../redusers/rootReducer';

describe('rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        items: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      orders: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      modal: {
        currentIngredient: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      auth: {
        user: null,
        isLoading: false,
        error: null,
        isAuthChecked: false,
        isUpdateSuccess: false
      },
      profileOrders: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });
});
