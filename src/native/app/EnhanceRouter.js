import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import { TabBar } from './router';

const EnhanceRouter = ({ dispatch, nav }) =>
  <TabBar navigation={addNavigationHelpers({ dispatch, state: nav })} />;

EnhanceRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.tabBar,
});

export default connect(mapStateToProps)(EnhanceRouter);
