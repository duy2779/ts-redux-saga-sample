import { cityActions } from './citySlice';
import { takeLatest, call, put } from 'redux-saga/effects';
import cityAPI from 'api/cityAPI';
import { City, ListResponse } from 'models';
function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityAPI.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('failed to fetch city list', error);
    yield put(cityActions.fetchCityListFailed());
  }
}

export function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
