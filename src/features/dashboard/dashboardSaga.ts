import cityAPI from 'api/cityAPI';
import studentAPI from 'api/studentAPI';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchData,
  fetchDataFailed,
  fetchDataSuccess,
  RankingByCity,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from './dashboardSlice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentAPI.getAll, { _page: 1, _limit: 1, _order: 'desc', gender: 'male' }),
    call(studentAPI.getAll, { _page: 1, _limit: 1, _order: 'desc', gender: 'female' }),
    call(studentAPI.getAll, { _page: 1, _limit: 1, _order: 'desc', mark_gte: 8 }),
    call(studentAPI.getAll, { _page: 1, _limit: 1, _order: 'desc', mark_lte: 5 }),
  ]);

  const statisticList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentAPI.getAll, {
    _page: 1,
    _limit: 5,
    _order: 'desc',
    _sort: 'mark',
  });

  yield put(setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentAPI.getAll, {
    _page: 1,
    _limit: 5,
    _order: 'asc',
    _sort: 'mark',
  });

  yield put(setLowestStudentList(data));
}

function* fetchRankingByCity() {
  // fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityAPI.getAll);
  // fetch ranking per city
  const callList = cityList.map((city) =>
    call(studentAPI.getAll, {
      _page: 1,
      _limit: 5,
      _order: 'asc',
      _sort: 'mark',
      city: city.code,
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));
  // update state
  yield put(setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCity),
    ]);
    yield put(fetchDataSuccess());
  } catch (error) {
    console.log('failed to fetch dashboard data', error);
    yield put(fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchData.type, fetchDashboardData);
}
