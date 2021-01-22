import { takeEvery, call, put } from  'redux-saga/effects';

import {
  getPageData,
  addEntry, deleteItem
} from './api';

import {
  REQUEST_ADD_ITEM,
  REQUEST_PAGE_DATA,

  receiveAddItem,
  receivePageData, receiveDeleteItem, REQUEST_DELETE_ITEM,
} from './actions';

//ADD ITEM
function* callRequestAddItem(action){
  let results = yield call (addEntry, action.payload);
  yield put(receiveAddItem(results));
  action.payload.fun();
}

export function* requestAddItemSaga() {
  yield takeEvery(REQUEST_ADD_ITEM, callRequestAddItem);
}

//GET ITEMS
function* callRequestPageData(action){
  let results = yield call (getPageData, action.payload);
  yield put(receivePageData(results));

}
export function* requestPageDataSaga(){
  yield takeEvery(REQUEST_PAGE_DATA, callRequestPageData);
}

//DELETE ITEM
function* callRequestDeleteItem(action){
  let results = yield call (deleteItem, action.payload);
  yield put(receiveDeleteItem(results));
}
export function* requestDeleteItemSaga(){
  yield takeEvery(REQUEST_DELETE_ITEM, callRequestDeleteItem);
}