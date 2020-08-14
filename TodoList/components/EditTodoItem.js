import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUS, MODAL_NAME } from './constants';
import DateTimePicker  from '@react-native-community/datetimepicker';

export default class EditTodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDatetimePicker: false,
            dueDate: null,
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleTitleChange = (text) => {
        this.props.handleUpdateItem('Title', text);
    }

    handleDueDateChange = (event, value) => {
        this.props.handleUpdateItem('DueDate', value.toDateString());
        //if (event.type==='set'){
        //this.setState({showDatetimePicker:Platform==='ios'?true:false});}
        this.setState({showDatetimePicker:Platform==='ios'?true:false});
    }

    handleDeleteItem = () => {
        Alert.alert(
            'Confirmation', 
            'Are you sure to delete this item', 
            [{
                text:'OK',
                style:'destructive',
                onPress:()=>{
                    this.props.handleShowModal(MODAL_NAME.EDIT);
                    this.props.handleRemoveItem(this.props.editItem.id)
                }
            },{
                text:'Cancel',
                style:'cancel',
            }],
            {cancelable: false});
        
    }

    render(){
        const { editItem, showModal, handleShowModal, handleUpdateItem, handleItemUpdated } = this.props;
        return(
            <Modal visible={showModal} transparent={true} animationType='slide'>
                <View style={styles.modalContainer}>
                    <Text style={styles.itemTitle}>Tittle</Text>
                    <TextInput style={[styles.itemInputTitle, {borderWidth: 0.7,}]} 
                        value={editItem.title} onChangeText={this.handleTitleChange}/>
                    <Text style={[styles.itemTitle, {marginTop:20}]}>Status</Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-around', marginBottom: 25, marginTop: 15,}}>
                        {Object.keys(STATUS).map((key)=>{
                            return(
                            <TouchableOpacity key={key} style={{flexDirection: 'row', alignItems:'center'}} onPress={handleUpdateItem.bind(this, 'Status', STATUS[key] )}>
                                <MaterialCommunityIcons name={editItem.status===STATUS[key]? 'check-box-outline' : 'checkbox-blank-outline'} size={25} color='red'/>
                                <Text style={styles.optCheckbox}>{key[0].toUpperCase()+key.substr(1,).toLowerCase()}</Text>
                            </TouchableOpacity>)
                        })}
                    </View>
                    <View style={{flexDirection:'row', paddingTop:10, paddingBottom:10}}>
                        <Text style={[styles.itemTitle, {alignItems:'center'}]}>Due date</Text>
                        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity style={{alignItems:'center',}} onPress={()=>this.setState({showDatetimePicker:!this.state.showDatetimePicker})}>
                                <Text style={{alignItems:'center', fontSize: 18}}>{editItem.dueDate}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.showDatetimePicker && 
                        <DateTimePicker  
                            value={Date.parse(editItem.dueDate)} 
                            mode='date'
                            display='calendar'
                            onChange={(event, value)=>{this.handleDueDateChange(event, value)}
                        }/>
                    }
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btnContainer, {borderColor: '#1e90ff'}]} onPress={handleItemUpdated}>
                            <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={25} color='#1e90ff'/>
                            <Text style={styles.btnText}> Done </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnContainer, {borderColor: 'red'}]} onPress={handleShowModal.bind(this, MODAL_NAME.EDIT)}>
                            <MaterialCommunityIcons name='cancel' size={25} color='red'/>
                            <Text style={styles.btnText}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btnContainer, {flex: 1, marginLeft: 25, marginRight: 25, borderColor: 'red', backgroundColor:'red', justifyContent: 'center'}]} 
                            onPress={this.handleDeleteItem}>
                            <MaterialCommunityIcons name='trash-can-outline' size={25} color='white'/>
                            <Text style={[styles.btnText, {color:'white'}]}> Delete this item </Text>
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
    itemTitle:{
        color: '#ff4500',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemInputTitle: {
        height: 45,
        borderRadius: 5,
        borderColor: '#d3d3d3',
        padding: 5,
        marginTop: 7,
        marginBottom: 10,
        fontSize: 15,
    },
    itemStatus:{
        color: 'blue',
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 15,
    },
    itemDueDate: {
        color: 'red',
        paddingTop: 3,
        fontSize: 10,
    },
    separator:{
        height:10,
    },
    btnGroup:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignContent:'space-around',
        paddingTop: 20,
        paddingBottom: 20,
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
    optCheckbox: {
        fontSize: 15,
    }
})