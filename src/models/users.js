import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: 100,
    page: null,
  },
  reducers: {
    save(state, { payload: { list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, total=100 } }, { call, put }) {
      
      const { data, headers } = yield call(usersService.fetch, { page, total });
      yield put({
        type: 'save',
        payload: {
          list:data,
          total:data.length,
        },
      });
    },
    *search({ payload: id }, { call, put }){
      const { data, headers } = yield call(usersService.search, id );
      yield put({
        type: 'save',
        payload: {
          list:data,
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
