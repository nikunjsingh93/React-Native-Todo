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

     const userUid = firebase.auth().currentUser.uid;
     

     firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').push({
      Task: this.state.title,
      
     // Completed: false
     }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
  

  this.setState({ title: '' })
  this.textInput.clear()
 }


  render() {
    return (
        <View style={styles.container}>
         
            <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
            editable = {true}
            maxLength = {40}
            placeholder='Add Todo...'   
            ref={input => { this.textInput = input }}
            onChangeText={(title) => this.setState({title})}
             />  
  
             <Button  color="#00ADB5"
             title='Add it!' onPress={this.onSubmit}
              />
        </View>
      )
  }
}



const styles = StyleSheet.create({
  container: {
  //  flex: 1,
    marginTop: 8,
    marginBottom: 8
    
   // alignItems: 'center',
   // justifyContent: 'center',
  },
});
