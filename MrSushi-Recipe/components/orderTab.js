import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

export default class OrderTab extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {orderSelected, orderList, handleOrderSelected} = this.props
        return(
            <View style={styles.container}>
                {orderList.map(((value, index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={handleOrderSelected.bind(this,index)}
                            style={[styles.tabItem,orderSelected===index?styles.selectionTouch:null]}>
                            <Text style={[styles.tabText,orderSelected===index?styles.selectionTab:null]}>{value.key.split(' - ')[0].trim()}</Text>
                        </TouchableOpacity>
                        )
                    }))}
            </View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 40,
        width: "100%",
    },
    tabItem:{
        borderRadius: 14,
        height: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 1,
    },
    selectionTouch: {
        borderColor: 'blue',
        borderWidth: 1,
        padding: 3,
    },
    tabText:{
        fontSize: 10,
    },
    selectionTab: {
        textDecorationLine: 'underline',
        textDecorationColor: 'red',
        textDecorationStyle: 'solid',
        textShadowColor: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    }
})