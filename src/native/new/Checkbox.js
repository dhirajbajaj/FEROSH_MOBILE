// @flow
import type { ButtonProps } from '../../common/components/Button';
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text } from '../../common/components';

const colors = {
  checked: 'primary',
  unchecked: 'gray',
};

class TextSelectButton extends Component {
  /*
    Like TouchableOpacity. Pass in a child function that returns a component. Function is invoked
    with a bool that determines whether the Touchable is active or not.
    */
  constructor() {
    super();
    this.state = { active: false };
  }

  render() {
    console.log(this.props);
    const { active } = this.state;
    const { title, onPress, ...props } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('touched');
          this.setState(prevState => ({ active: !prevState.active }));
          onPress();
        }}
      >
        <Text {...props} color={active ? colors.checked : colors.unchecked} alignSelf="center">
          {title}
        </Text>
      </TouchableWithoutFeedback>
    );
  }
}

export default TextSelectButton;
