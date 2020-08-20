import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Tiles extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {value, tileW, tileH, moveTile, isMenuShow} = this.props;
        return(
            <TouchableOpacity style={[value===0?styles.tileZero:styles.tileNoneZero,styles.tileContainer, {width:tileW, height:tileH}]}
                onPress={isMenuShow?()=>{}:moveTile.bind(this,value)}>
                <Text style={styles.tileText}>{value===0?null:value}</Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    tileContainer:{
        borderWidth: 0.5,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    tileNoneZero:{
        borderColor: '#a52a2a',
        backgroundColor:'#fafad2'
    },
    tileZero:{
        borderColor: '#808080',
        backgroundColor:'#f5fffa'
    },
    tileText:{
        fontSize: 30,
        fontWeight: 'bold',
        color:'#ff4500',
    }
})