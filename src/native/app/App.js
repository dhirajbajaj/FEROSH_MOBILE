// @flow
import type { State } from '../../common/types';
import type { Theme } from '../../common/themes/types';
import * as themes from '../themes';

import React from 'react';
import { TabBar } from './router';
import start from '../../common/app/start';
import { Baseline } from '../components';
import { Box } from '../../common/components';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'react-fela';
import { appShowMenu } from '../../common/app/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';

type AppProps = {
  appMenuShown: boolean,
  appShowMenu: typeof appShowMenu,
  appStarted: boolean,
  theme: Theme,
  themeName: string,
};

const App = ({ appMenuShown, appShowMenu, appStarted, theme, themeName }: AppProps) => {
  // TODO: Add splash screen.
  if (!appStarted) return null;

  return (
    <ThemeProvider
      key={themeName} // Enforce rerender.
      theme={theme}
    >
      <Box flex={1}>
        {Platform.OS === 'ios' &&
          <StatusBar
            hidden={
              appMenuShown // Because iOS StatusBar is an overlay.
            }
          />}
        <TabBar />

        <Baseline lineHeight={theme.typography.lineHeight} />
      </Box>
    </ThemeProvider>
  );
};

export default compose(
  connect(
    (state: State) => ({
      appMenuShown: state.app.menuShown,
      appStarted: state.app.started,
      theme: themes[state.app.currentTheme] || themes.defaultTheme,
      themeName: state.app.currentTheme,
    }),
    { appShowMenu },
  ),
  start,
)(App);
