// @flow
import React from 'react';
import NewListWithData from './NewListWithData';
import { Box, Button } from '../../common/components';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const New = () =>
  <Box flex={1}>
    <NewListWithData />
  </Box>;

New.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <Box flexDirection="row">
      <Button marginRight={0.5} onPress={() => navigation.navigate('FilterScreen')}>
        <Icon name="ios-search" size={20} color="black" />
      </Button>
      <Button marginRight={0.5}>
        <FontAwesome name="shopping-bag" size={15} color="black" />
      </Button>
    </Box>
  ),
});
export default New;
