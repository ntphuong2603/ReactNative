import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableWithoutFeedbackComponent, TouchableOpacity } from 'react-native';

export default class Startgame extends Component {
    getTimeString = () => {
        const str = (value) => {
            if (value<10){
            return '0' + value.toString()
            }
            return value.toString();
        }
        const {time} = this.props;
        const min = Math.floor(time/60)
        const sec = time - min*60
        return str(min)+':'+str(sec)
    }

    render(){
        const {time, move, handleWonScreen} = this.props;
        return(
            <TouchableOpacity style={styles.container} onPress={handleWonScreen}>
                <Text style={styles.txtCongrate}>Congratuation!</Text>
                <Image style={styles.img} source={require('../assets/youWin.jpg')}/>
                <View style={styles.text}>
                    <Text style={styles.txtInfo} >Time: {this.getTimeString(time)}</Text>
                    <Text style={styles.txtInfo} >Move: {move}</Text>
                </View>
                <Text style={styles.txtTouch}>Touch to close</Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        height: '97.5%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        backgroundColor: '#add8e6',
        borderColor: '#00008b',
        borderWidth: 3,
        opacity: 0.95,
    },
    txtCongrate:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#c71585',
    },
    txtInfo:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0000cd',
        padding: 10,
    },
    img:{
        height: '50%',
        resizeMode: 'contain',
    },
    txtTouch:{
        color: '#c71585',
    }
})