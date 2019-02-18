import React from 'react';
import { StyleSheet,  Button, TextInput, View } from 'react-native';

export default class AddTodo extends React.Component {
    state = {
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

 onSubmit = (e) => {
     e.preventDefault();
     this.props.addTodo(this.state.title);
     this.setState({ title: '' })
 }


  render() {
    return (
        <View>
         
            <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
            editable = {true}
            maxLength = {40}
            placeholder='Add Todo...'   
            onChangeText={(title) => this.setState({title})}
             />  
  
             <Button 
             title='Submit' onPress={this.onSubmit}
              />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
