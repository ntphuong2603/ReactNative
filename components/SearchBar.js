import React, { Component } from 'react';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, Image, View } from 'react-native';

export default class SearchBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {searchText, onChangeText, onSubmit, onSearchPress} = this.props
        return(
            <View style={styles.containter}>
                <TextInput style={styles.textInput} 
                    placeholder='Search news ...'
                    value={searchText}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}/>
                <TouchableOpacity style={styles.containter} onPress={onSearchPress}>
                    <Image style={styles.iconContainer} source={require('../assets/search-icon.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    containter:{
        borderRadius: 7,
        backgroundColor: '#dcdcdc',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    textInput:{
        padding: 7,
        fontSize: 15,
        flex: 1,
    },
    iconContainer: {
        resizeMode: 'contain',
        height: 35,
        width: 35,
        margin: 5
    }
})