// @flow
import { StackNavigator } from 'react-navigation';

import New from './New';
import FilterScreen from './FilterScreen';

const routeConfiguration = {
  New: {
    screen: New,
    navigationOptions: {
      title: 'HÀNG MỚI',
    },
  },
  FilterScreen: {
    screen: FilterScreen,
    navigationOptions: {
      title: 'TÌM KIẾM',
    },
  },
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  initialRouteName: 'New',
  mode: 'modal',
};

const NavigatorTabNew = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
export default NavigatorTabNew;
