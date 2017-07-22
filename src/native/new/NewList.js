// @flow
import type { State, Todo } from '../../common/types';
import Checkbox from './Checkbox';
import Footer from './Footer';
import React from 'react';
import todosMessages from '../../common/todos/todosMessages';
import { Box, TextInput } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Image, ScrollView, StyleSheet, ListView, Text, Dimensions } from 'react-native';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { toggleTodoCompleted } from '../../common/todos/actions';

type TodoItemProps = {
  todo: Todo,
  toggleTodoCompleted: typeof toggleTodoCompleted,
};
const screenSize = Dimensions.get('window');
const TodoItem = ({ todo, toggleTodoCompleted }: TodoItemProps) =>
  <Box
    backgroundColor="primary"
    marginTop={0.5}
    // marginHorizontal={0.5}
    height={5}
    style={() => ({
      width: screenSize.width / 2,
    })}
  >
    <Checkbox
      alignItems="center"
      checked={todo.completed}
      height={2}
      marginVertical={0}
      onPress={() => toggleTodoCompleted(todo)}
      width={2}
    />
    <TextInput editable={false} flex={1} height={2} marginHorizontal={0.5} value={todo.title} />
  </Box>;

const IsEmpty = () =>
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Image source={require('./img/EmptyState.png')} />
    <FormattedMessage {...todosMessages.empty}>
      {message =>
        <Text bold color="gray" marginTop={1} size={1}>
          {message}
        </Text>}
    </FormattedMessage>
  </Box>;

type NewListProps = {
  todos: Array<Todo>,
  toggleTodoCompleted: typeof toggleTodoCompleted,
  data: Object,
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const NewList = ({ todos, toggleTodoCompleted, data }: NewListProps) => {
  if (isEmpty(todos)) {
    return <IsEmpty />;
  }

  const sortedTodos = compose(
    reverse,
    sortBy(prop('createdAt')),
    values, // object values to array
  )(todos);

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  const dataSource = ds.cloneWithRows(sortedTodos);

  return (
    <ListView
      contentContainerStyle={styles.list}
      dataSource={dataSource}
      renderRow={todo =>
        <TodoItem todo={todo} toggleTodoCompleted={toggleTodoCompleted} key={todo.id} />}
    />
  );
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { toggleTodoCompleted },
)(NewList);
