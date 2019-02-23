import React from 'react'
import { StyleSheet, Text, TextInput, ScrollView, Image, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

handleSignUp = () => {
  firebase
  .auth()
  .createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(() => this.props.navigation.navigate('Main'))
  .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

render() {
    return (
      <View style={styles.container}>
      
      <Image source={require('./logo.png')} />
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.butn}>
        <Button color="#00ADB5" title="Sign Up" onPress={this.handleSignUp} />
        </View>
        <View style={styles.butn}>
        <Button color="#00ADB5"
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  butn :{
    marginTop: 8
  }
})