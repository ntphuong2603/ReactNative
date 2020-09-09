import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default class UserScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.logo}>My AHA</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
            placeholder='Username ...'
            placeholderTextColor='white'
            placeholderTextColor='#f8f8f8'
            onChangeText={text=>this.setState({username:text})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
            placeholder='Password ...'
            placeholderTextColor='#f8f8f8'
            secureTextEntry={true}
            onChangeText={text=>this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signup}>Sign in</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  logo:{
    fontWeight:'bold',
    fontSize:55,
    marginBottom: 45,
    color:'#fb5b5a',
  },
  inputView:{
    width:'85%',
    backgroundColor:'#465881',
    borderRadius:22,
    height:55,
    marginBottom:25,
    justifyContent:'center',
    padding:20,
  },
  inputText:{
    height:50,
    color:'white',
  },
  forgot:{
    color:'#003f5c',
    fontSize:12,
    fontWeight: '700',
  },
  signup:{
    color: '#003f5c',
    fontSize:20,
  },
  loginBtn:{
    backgroundColor:'#fb5b5a',
    width:'85%',
    borderRadius:25,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:40,
    marginBottom:10,
  },
  loginText:{
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
  }
})