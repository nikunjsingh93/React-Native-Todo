import React from 'react'
import { StyleSheet, ScrollView, Platform, Image, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Todos from './Todos';
import AddTodo from './AddTodo';
import uuid from 'uuid';

//var titleArr = [];
var tile;
var UnId;
var Comp;
var MComp;

export default class Main extends React.Component {


  state = {
    todos: [
      // {
      //   id: 1,
      //   title: 'get get',
      //  completed: false
      // }
    ], currentUser: null
  }

 //  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    let my = this;

    const userUid = firebase.auth().currentUser.uid;

    
   firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').on('value', function (snapshot) {
   
    snapshot.forEach(function(snapshot1) {
     console.log("Unique Key: "+snapshot1.key); 
     snapshot1.forEach(function(snapshot2) {
       
       
       //titleArr.push(snapshot2.val());
       UnId = snapshot1.key;

       if(snapshot2.key === 'Task'){

        tile = snapshot2.val();
        console.log("Task: "+snapshot2.val());

       }

       if(snapshot2.key === 'Completed'){

        Comp = snapshot2.val();

        console.log("Completed: "+snapshot2.val());

       }

       
       });

       var newTodo1 = {
        title: tile,
        id: UnId,
        completed: Comp
      }
    
     my.setState({ todos: [...my.state.todos, newTodo1] })

       
     });


   });

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

    // let my1 = this;

    // firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').on('value', function (snapshot) {
   
    //   snapshot.forEach(function(snapshot1) {
    //    console.log("Unique Key: "+snapshot1.key); 

    //    if(id === snapshot1.key) {


    //    snapshot1.forEach(function(snapshot2) {
         
        
    //       if(snapshot2.key === 'Completed'){
  
    //         MComp = snapshot2.val();

    //         firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').child(id).update({

    //           Completed: !MComp

              
              
    //         });

    //         let jasper = {...my1.state.todos};    //creating copy of object

    //         if (jasper.id == id){

    //           console.log("jasper id"+jasper.id)
    //           console.log("jasper completed"+jasper.completed)

    //           jasper.completed = !jasper.completed

    //           my1.setState({ jasper });

    //         }


    //         // jasper.name = 'someothername';                        //updating value
    //         // this.setState({ jasper });
            
            
    //         console.log("Mark Completed: "+snapshot2.val());

    
    //        }

          
         
    //      });
        


    //     }
       
         

  
         
    //    });
       
       
  
  
    //  });
     


    console.log("thisss issss markk idddd:  "+id)

    // this.setState({
    //   todos: this.state.todos.map(todo => {
    //     if (todo.id === id) {
    //       todo.completed = !todo.completed
    //     }
    //     return todo;
    //   })
    // });
  }


  // Delete Item
  delTodo = (id) => {
   // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });

   this.setState({ todos: []})

   const userUid = firebase.auth().currentUser.uid;

    firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').on('value', function (snapshot) {
   
      snapshot.forEach(function(snapshot1) {
       console.log("Unique Key: "+snapshot1.key); 
       snapshot1.forEach(function(snapshot2) {
         console.log("Task: "+snapshot2.val());
         
         //titleArr.push(snapshot2.val());
         UnId = snapshot1.key;
  
         tile = snapshot2.val();

         if(UnId === id) {

          firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').child(UnId).remove();

         }

         
         });
       });
  
  
     });

    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  
  }

  // Add todo
  addTodo = (title) => {

    this.setState({ todos: []})

  //   firebase.database().ref('UsersList/').child(userUid).child('AllTasks/').push({
  //     Task: title
  //    }).then((data)=>{
  //     //success callback
  //     console.log('data ' , data)
  // }).catch((error)=>{
  //     //error callback
  //     console.log('error ' , error)
  // })

    // const newTodo = {
    //   title: title,
    //   id: uuid.v4(),
    //   completed: false
    // }

   // this.setState({ todos: [...this.state.todos, newTodo] })

  //this.setState({ todos: [{ title: titleArr }] })

 // this.setState({ todos: [...titleArr,tile] })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View >
        <View style={styles.butn2}>
        <Button color="#00ADB5" title="Log Out" onPress={this.handleLogout} />
        </View>
        <View style={styles.butn}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        </View>
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
  butn: {
    marginTop:5,
    marginBottom:5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  butn2: {
    marginBottom:5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})