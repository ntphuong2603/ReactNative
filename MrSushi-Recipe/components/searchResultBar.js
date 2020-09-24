import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class SearchResultBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {sorting, handleSortResults,handleSearchResults} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnClear} onPress={()=>handleSearchResults([])}>
                    <Text style={styles.btnText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnName} onPress={handleSortResults.bind(this, 'CodeName')}>
                    <Text style={styles.btnText}>By {sorting.isCode? 'Code' : 'Name'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSort} onPress={handleSortResults.bind(this, 'AscDesc')}>
                    <FontAwesome name={sorting.isAsc? 'sort-alpha-asc':'sort-alpha-desc'} size={25} color='white'/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        height: 40,
    },
    btnText: {
        color: 'white', 
        fontWeight: 'bold',
    },
    btnClear:{
        borderRadius: 10,
        backgroundColor: '#00bfff',
        justifyContent: 'center',
        padding: 10,
    },
    btnName:{
        width: '30%',
        borderRadius: 10,
        backgroundColor: '#00bfff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    btnSort:{
        width: '15%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#00bfff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    }
})