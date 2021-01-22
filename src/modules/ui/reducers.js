import { handleAction, combineActions } from 'redux-actions';

import {
  RECEIVE_ADD_ITEM,
  RECEIVE_PAGE_DATA,
  RECEIVE_DELETE_ITEM,

  receiveAddItem,
  receivePageData,
  receiveDeleteItem

} from './actions';


let defaultState = {
  data: []
};

export const ui = handleAction(combineActions(
  receiveAddItem,
  receivePageData,
  receiveDeleteItem
), {
    next(state, action) {
      let newState = {};
      switch (action.type) {
        case RECEIVE_ADD_ITEM:
          newState = {
            ...state
          };
          newState.data = action.payload.data;
          return newState;

        case RECEIVE_PAGE_DATA:
          newState = {
            ...state
          };
          newState.data = action.payload.data;
          return newState;

        case RECEIVE_DELETE_ITEM:
          newState = {
            ...state
          };
          newState.data = action.payload.data;
          return newState;

        default:
          return state;
      }
    },
    throw(state, action) {
      let newState = {};
      switch (action.type) {
        case RECEIVE_ADD_ITEM:
          newState = {
            ...state
          };

          newState.itemsError = action.payload;

          return newState;
        case RECEIVE_PAGE_DATA:
          newState = {
            ...state
          };

          newState.pageDataError = action.payload;

          return newState;

        default:
          return state;
      }
    }
  }, defaultState
)