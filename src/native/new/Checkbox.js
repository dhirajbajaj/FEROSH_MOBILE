// @flow
import type { ButtonProps } from '../../common/components/Button';
import React from 'react';
import { Button } from '../../common/components';

type CheckboxProps = ButtonProps & {
  checked?: boolean,
};

const colors = {
  checked: 'primary',
  unchecked: 'gray',
};

const Checkbox = ({ checked, onPress, ...props }: CheckboxProps) =>
  <Button onPress={onPress} {...props} color={checked ? colors.checked : colors.unchecked} />;

export default Checkbox;
