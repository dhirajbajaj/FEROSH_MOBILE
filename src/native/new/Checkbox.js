// @flow
import type { ButtonProps } from '../../common/components/Button';
import React from 'react';
import { Text } from '../../common/components';
import { TouchableWithoutFeedback } from 'react-native';

type CheckboxProps = ButtonProps & {
  checked?: boolean,
  title: string,
};

const colors = {
  checked: 'black',
  unchecked: 'gray',
};

const Checkbox = ({ checked, onPress, title, ...props }: CheckboxProps) =>
  <TouchableWithoutFeedback onPress={onPress}>
    <Text color={checked ? colors.checked : colors.unchecked} {...props}>
      {title}
    </Text>
  </TouchableWithoutFeedback>;

export default Checkbox;
