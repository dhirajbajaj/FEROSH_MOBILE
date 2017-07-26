// @flow
import type { State } from '../../common/types';
import React from 'react';

// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabNew } from './navigationConfiguration';

// Redux
import { connect } from 'react-redux';

const TabNewNavigation = ({ navigationState, dispatch }) =>
  <NavigatorTabNew
    navigation={addNavigationHelpers({
      dispatch,
      state: navigationState,
    })}
  />;

export default connect((state: State) => ({
  navigationState: state.tabNew,
}))(TabNewNavigation);
