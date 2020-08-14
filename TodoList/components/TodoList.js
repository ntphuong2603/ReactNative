import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STATUS, COLOR, MODAL_NAME} from './constants';
import EditTodoItem from './EditTodoItem';

export default class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {editItem:{}};
        this.handleItem = this.handleItem.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
    }

    handleItem = (item_id) => {
        this.props.handleShowModal(MODAL_NAME.EDIT);
        this.setState({editItem: this.props.todoList.filter(todoItem=>todoItem.id===item_id)[0]});
    }

    handleUpdateItem = (key, value) => {
        const {editItem} = this.state;
        if (key.toUpperCase()==='STATUS'){
            this.setState({editItem: {...editItem, status: value}})
        } else if (key.toUpperCase()==='TITLE'){
            this.setState({editItem: {...editItem, title: value}})
        } else if (key.toUpperCase()==='DUEDATE'){
            this.setState({editItem: {...editItem, dueDate: value}})
        }
    }

    handleItemUpdated = () => {
        this.props.handleUpdateTodoList(this.state.editItem);
    }

    render(){
        const {todoList, showModal, handleShowModal, isViewList, handleRemoveItem } = this.props;
        const {editItem} = this.state;

        const statusName = Object.keys(STATUS);
        const renderTodoTitle = (item) => {
            return(
                <TouchableOpacity style={[isViewList?styles.itemContainerList:styles.itemContainerGrid,{backgroundColor:COLOR[item.status]}]} onPress={this.handleItem.bind(this, item.id)}>
                    <Text style={styles.itemTitle}>Tittle: {item.title}</Text>
                    <Text style={styles.itemStatus}>Status: {statusName[item.status]}</Text>
                    <Text style={styles.itemDueDate}>Due date: {item.dueDate}</Text>
                </TouchableOpacity>
            )
        }
        return(
            <View style={styles.container}>
                {isViewList && <FlatList 
                    data={todoList}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>renderTodoTitle(item)}/>}
                {!isViewList && <FlatList 
                    numColumns={2}
                    data={todoList}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>renderTodoTitle(item)}/>}
                <EditTodoItem   showModal={showModal} handleShowModal={handleShowModal} editItem={editItem} 
                                handleUpdateItem={this.handleUpdateItem} handleItemUpdated={this.handleItemUpdated}
                                handleRemoveItem={handleRemoveItem}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingBottom: 10,
        justifyContent: 'center',
    },
    itemContainerList: {
        flex: 1,
        borderColor: '#dcdcdc',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    itemContainerGrid:{
        borderColor: '#dcdcdc',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: '47%',
        
    },
    itemTitle:{
        color: '#1e90ff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    itemStatus:{
        color: 'blue',
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 12,
    },
    itemDueDate: {
        color: 'red',
        paddingTop: 3,
        fontSize: 9,
    },
})