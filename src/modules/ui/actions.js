import { createAction } from 'redux-actions';

export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const RECEIVE_ADD_ITEM = 'RECEIVE_ADD_ITEM'; 

export const REQUEST_PAGE_DATA = 'REQUEST_PAGE_DATA';
export const RECEIVE_PAGE_DATA = 'RECEIVE_PAGE_DATA';

export const REQUEST_DELETE_ITEM = 'REQUEST_DELETE_ITEM';
export const RECEIVE_DELETE_ITEM = 'RECEIVE_DELETE_ITEM';

export const requestDeleteItem = createAction(REQUEST_DELETE_ITEM);
export const receiveDeleteItem = createAction(RECEIVE_DELETE_ITEM);

export const requestAddItem = createAction(REQUEST_ADD_ITEM);
export const receiveAddItem = createAction(RECEIVE_ADD_ITEM);

export const requestPageData = createAction(REQUEST_PAGE_DATA);
export const receivePageData = createAction(RECEIVE_PAGE_DATA);
