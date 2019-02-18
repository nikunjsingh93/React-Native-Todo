import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default class Todos extends React.Component {
  render() {
    return this.props.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}/>
    ));
  }
}

//PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

     
