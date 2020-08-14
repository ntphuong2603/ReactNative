import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTodo from './AddTodo';
import { MODAL_NAME } from './constants';

export default class AppTitle extends Component{
    constructor(props){
        super(props);
    } 

    render(){
        const {showModal, handleShowModal, handleTodoList} = this.props;
        return(
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Todo</Text>
                <TouchableOpacity style={styles.btnContainer} onPress={handleShowModal.bind(this, MODAL_NAME.ADD)}>
                    <MaterialCommunityIcons name='plus-circle-outline' color='#1e90ff' size={45}/>
                </TouchableOpacity>
                <AddTodo showModal={showModal} handleShowModal={handleShowModal} handleTodoList={handleTodoList}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    titleContainer:{
        flexDirection: 'row',
        width: '100%'
    },
    titleText:{
        flex: 1,
        fontSize: 45,
        fontWeight: 'bold',
        color:'#dc143c',
    },
    btnContainer:{
        alignItems:'flex-end',
        justifyContent: 'center',
        width: '15%',
    },
})