import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import {FILTER} from './constants';

export default class BottomMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { activeMenu, onMenuSelect } = this.props;
        return(
            <View style={styles.menuContainer}>
                {Object.keys(FILTER).map((eachKey)=>{
                    return(
                        <TouchableOpacity key={FILTER[eachKey]} onPress={onMenuSelect.bind(this,FILTER[eachKey])}
                            style={[styles.menuItem, (activeMenu===FILTER[eachKey]? {backgroundColor:'red'}:null)]}>
                            <Text style={[styles.menuText,(activeMenu===FILTER[eachKey]? {color:'white', fontWeight:'bold'}:null)]}>{eachKey[0].toUpperCase()+eachKey.substr(1,).toLowerCase()}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    menuContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: '100%',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'red',
    },
    menuItem:{
        borderRadius: 10,
        width: '32%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    menuText:{
        fontSize: 15,
        color:'red',
    }
})