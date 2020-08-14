import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Platform, Keyboard } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker  from '@react-native-community/datetimepicker';
import {STATUS, MODAL_NAME} from './constants';

export default class AddTodo extends Component{
    constructor(props){
        super(props);
        this.state = { title: '', status: false, dueDate: new Date(), showDatetimePicker: false}
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
    }

    handleTitleChange = (text) => {
        this.setState({title:text})
    }

    handleStatusChange = () => {
        this.setState({status:!this.state.status})
    }

    handleDueDateChange = (dueDate) => {
        this.handleDueDateChange({dueDate:dueDate})
    }

    handleTodoItem = () => {
        const { title, status, dueDate } = this.state;
        if (title.trim().length > 0){
            const newTodo = {
              id: Math.random().toString(),
              title: title.trim(),
              status: status?STATUS.ACTIVE:STATUS.INACTIVE,
              dueDate: dueDate.toDateString(),
            }
            this.setState({...this.state, title: '', status: false, dueDate: new Date()});
            this.props.handleTodoList(newTodo);
        }
        this.props.handleShowModal(MODAL_NAME.ADD);
    }

    render(){
        const { showModal, handleShowModal } = this.props;
        const { title, status, dueDate } = this.state;
        return(
            <Modal visible={showModal} animationType='slide' transparent={true}>
                <View style={styles.modalContainer} >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            value={title}
                            onChangeText={this.handleTitleChange}
                            onSubmitEditing={()=>Keyboard.dismiss()}
                            placeholder='Todo Title ...'/>
                    </View>
                    <View style={styles.optContainer}>
                        <View style={styles.optItem}>
                            <Text style={styles.optTitle}>Status</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={this.handleStatusChange}>
                                <MaterialCommunityIcons name={status? 'check-box-outline' : 'checkbox-blank-outline'} size={25} color='#1e90ff'/>
                                <Text style={styles.optCheckbox}>{!status? 'Inactive':'Active'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.optItem}>
                            <Text style={styles.optTitle}>Due date</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={()=>this.setState({showDatetimePicker: !this.state.showDatetimePicker})}>
                                <Text style={styles.optCheckbox}>{dueDate.toDateString()}</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.showDatetimePicker && <DateTimePicker  
                            value={dueDate} 
                            mode='date'
                            display='calendar'
                            onChange={(event,value)=>{
                                this.setState({dueDate:value, showDatetimePicker:Platform.OS==='ios'?true:false})
                            }}/>}
                    </View>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btnContainer, {borderColor: '#1e90ff'}]} onPress={this.handleTodoItem}>
                            <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={25} color='#1e90ff'/>
                            <Text style={styles.btnText}> Done </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnContainer, {borderColor: 'red'}]} onPress={handleShowModal.bind(this, MODAL_NAME.ADD)}>
                            <MaterialCommunityIcons name='cancel' size={25} color='red'/>
                            <Text style={styles.btnText}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles=StyleSheet.create({
    modalContainer:{
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 115,
        margin: 10,
        padding: 10,
        justifyContent:'center',
        borderColor: '#00bfff',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    inputContainer:{
        padding: 10,
        margin: 10,
        borderColor: '#00bfff',
        borderWidth: 0.75,
        borderRadius: 7,
    },
    inputText:{
        fontSize: 15,
    },
    btnGroup:{
        flexDirection:'row',
        justifyContent: 'space-around',
    },
    btnContainer:{  
        flexDirection: 'row', 
        alignItems:'center',
        borderRadius:5,
        borderWidth: 1.25,
        padding: 10,
    },
    btnText:{
        fontSize:15,
    },
    optContainer: {
        padding: 10,
        flexDirection: 'column',
    },
    optItem:{
        flexDirection: 'row',
        padding: 5,
    },
    optTitle: {
        flex:1,
        fontWeight: 'bold',
    }
})