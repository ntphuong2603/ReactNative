import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class MenuScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Menu screen</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize: 35,
        color:'#dc143c',
        fontWeight: 'bold',
    },
})