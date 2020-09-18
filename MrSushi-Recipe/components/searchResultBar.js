import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class SearchResultBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnClear} onPress={()=>this.props.handleSearchResults([])}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}> Clear search history</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnName}>
                    <Text>By {isCode? 'Code' : 'Name'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSort}>
                    <FontAwesome name={isAsc? 'sort-alpha-asc':'sort-alpha-desc'} size={30} color='red'/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
    },
    btnClear:{
        borderRadius: 10,
        backgroundColor: '#00bfff',
        justifyContent: 'center',
        padding: 10,
    },
    btnName:{

    },
    btnSort:{

    }
})