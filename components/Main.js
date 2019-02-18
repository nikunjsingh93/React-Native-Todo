import React from 'react'
import { StyleSheet, ScrollView, Platform, Image, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Todos from './Todos';
import AddTodo from './AddTodo';
import uuid from 'uuid';

export default class Main extends React.Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Get Milk!',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Do Assignment',
        completed: false
      }
    ], currentUser: null
  }

  // state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handlelogout')
  }

  // Toggle complete method
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  // Delete Item
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // Add todo
  addTodo = (title) => {
    const newTodo = {
      title: title,
      id: uuid.v4(),
      completed: false
    }

    this.setState({ todos: [...this.state.todos, newTodo] })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View >
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Log Out" onPress={this.handleLogout} />
        <ScrollView>
          <AddTodo addTodo={this.addTodo} />
          <Todos todos={this.state.todos} markComplete={this.markComplete}
            delTodo={this.delTodo} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})