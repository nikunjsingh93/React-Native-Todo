import React from 'react';
import { StyleSheet, Button, CheckBox, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class TodoItem extends React.Component {

  constructor(props){
    super(props);
 
    this.state = {
       count: 0,
    }
 }


  render() {
    const { id, title } = this.props.todo;
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
       
     <CheckBox 
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.checked })}
    />

        <Text>{title}</Text>
        <View style={styles.container}>
        <Button  color="#ff0000" title='x' onPress={this.props.delTodo.bind(this, id)} >x</Button>
        </View>
      </View>
    )
  }
}

//PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    flex: 1,
  },
});
