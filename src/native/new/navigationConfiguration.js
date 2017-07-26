// @flow
import { StackNavigator } from 'react-navigation';

import New from './New';
import FilterScreen from './FilterScreen';

const routeConfiguration = {
  New: {
    screen: New,
    navigationOptions: {
      title: 'New',
    },
  },
  Details: {
    screen: FilterScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  initialRouteName: 'New',
};

const NavigatorTabNew = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
export default NavigatorTabNew;
