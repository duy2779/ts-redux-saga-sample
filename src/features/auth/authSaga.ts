import customHistory from 'utils/history';
import { put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, take } from 'redux-saga/effects';
import { login, LoginPayload, logout, loginSuccess, loginFailed } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    console.log('handle login', payload);
    localStorage.setItem('access_token', 'fake_token');
    yield put(loginSuccess({ id: 1, name: 'Duy' }));
    customHistory.push('/admin/dashboard');
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

function* handleLogout() {
  console.log('hanlde logout');
  yield delay(1000);
  localStorage.removeItem('access_token');
  customHistory.push('/login');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = !!localStorage.getItem('access_token');
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
