import React from 'react';
import { StyleSheet,  Button, TextInput, View } from 'react-native';
import firebase from 'react-native-firebase'

export default class AddTodo extends React.Component {
    state = {
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

 onSubmit = (e) => {
     e.preventDefault();
     this.props.addTodo(this.state.title);
     

     firebase.database().ref('UsersList/').child(userUid).push({
      Task: this.state.title
     }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })

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

const userUid = firebase.auth().currentUser.uid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
