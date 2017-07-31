// @flow weak
import type { Action, State } from './types';
import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import users from './users/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';
import client from './apolloClient';
import newFilter from './new/reducer';
import data from './data/reducer';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state: State, action: Action) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' && state.users.viewer && !action.payload.firebaseUser;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer(
    {
      app: state.app,
      config: initialState.config,
      device: initialState.device,
      intl: initialState.intl,
    },
    action,
  );
};
const apollo = client.reducer();
const configureReducer = (initialState: Object) =>
  // The power of higher-order reducers, http://slides.com/omnidan/hor
  resetStateOnSignOutReducer(
    combineReducers({
      app,
      auth,
      config,
      device,
      fields,
      intl,
      todos,
      users,
      apollo,
      newFilter,
      data,
    }),
    initialState,
  );

export default configureReducer;
