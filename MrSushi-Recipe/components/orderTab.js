import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function OrderTab(props){
    const {orderSelected, orderList, setOrderSelected} = props
    return(
        <View style={styles.container}>
            {orderList.map((value, index)=>{
                return(
                    <TouchableOpacity key={index} onPress={setOrderSelected.bind(this,index)}
                        style={[styles.tabItem,orderSelected===index?styles.selectionTouch:null]}>
                        <Text style={[styles.tabText,orderSelected===index?styles.selectionTab:null]}>{value.key.trim()}</Text>
                    </TouchableOpacity>
                    )
                })}
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 40,
        width: "100%",
        marginTop: 10
    },
    tabItem:{
        borderRadius: 15,
        height: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 1,
    },
    selectionTouch: {
        borderColor: '#0000ff',
        borderWidth: 1,
        padding: 3,
    },
    tabText:{
        fontSize: 10,
        color: '#8a2be2'
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