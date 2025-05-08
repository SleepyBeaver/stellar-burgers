import { authReducer } from '../slices/authSlice';
import {
  checkUserAuth,
  login,
  logout,
  register,
  updateUser
} from '../slices/authSlice';
import { TUser } from '../../utils/types';

describe('Редьюсер authReducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: false,
    isUpdateSuccess: false
  };

  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('должен вернуть начальное состояние', () => {
    expect(authReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать fulfilled экшен login', () => {
    const action = { type: login.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
  });

  it('должен обрабатывать fulfilled экшен register', () => {
    const action = { type: register.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
  });

  it('должен обрабатывать fulfilled экшен updateUser', () => {
    const action = { type: updateUser.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isUpdateSuccess).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен обрабатывать fulfilled экшен checkUserAuth', () => {
    const action = { type: checkUserAuth.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен обрабатывать rejected экшен checkUserAuth', () => {
    const action = { type: checkUserAuth.rejected.type };
    const state = authReducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать fulfilled экшен logout', () => {
    const loggedInState = { ...initialState, user };
    const action = { type: logout.fulfilled.type };
    const state = authReducer(loggedInState, action);
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isUpdateSuccess).toBe(false);
  });

  it('должен обрабатывать pending экшены', () => {
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isUpdateSuccess).toBe(false);
  });

  it('должен обрабатывать rejected экшены', () => {
    const action = {
      type: login.rejected.type,
      payload: 'Ошибка входа',
      meta: { rejectedWithValue: true }
    };

    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  it('должен обрабатывать rejected экшены без payload', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Ошибка авторизации' },
      meta: { rejectedWithValue: false }
    };

    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });
});
