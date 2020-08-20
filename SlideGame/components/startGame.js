import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class Startgame extends Component {
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnContainer} onPress={this.props.handleGameStart.bind(this,true)}>
                    <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        height: '97.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    btnContainer:{
        borderColor:'#9400d3',
        borderWidth: 2,
        backgroundColor: '#fffff0',
        borderRadius: 15,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        opacity: 1,
    },
    btnText:{
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ff69b4',
    }
})