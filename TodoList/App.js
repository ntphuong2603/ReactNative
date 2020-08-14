import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import BottomMenu from './components/BottomMenu';
import AppTitle from './components/AppTitle';
import TodoList from './components/TodoList';
import {FILTER, MODAL_NAME} from './components/constants';
import SortTodo from './components/SortTodo';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      activeMenu: FILTER.ALL,
      todoList: [],
      showModal:{ Add:false,
                  Edit:false,
      },
      isViewList: true,
      sortOption: {
        sortObj: 'title',
        isAscending: true,
      }
    }

    this.handleActiveMenu = this.handleActiveMenu.bind(this);
    this.handleTodoList = this.handleTodoList.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleUpdateTodoList = this.handleUpdateTodoList.bind(this);
    this.handleSortOption = this.handleSortOption.bind(this);
    this.handleViewList = this.handleViewList.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind();
  }

  async componentDidMount(){
    const keyList = await AsyncStorage.getAllKeys();
    let todoList = [];
    await AsyncStorage.multiGet(keyList,(error,results)=>{
      if (error){
        console.log(error);
        return
      }
      results.forEach(result=>{
        todoList = [...todoList, {id:result[0], ...JSON.parse(result[1])}]
      })
    })
    if (todoList.length > 0){
      this.setState({todoList: [...todoList, ...this.state.todoList]})
    }
  }

  async componentWillUnmount(){
    console.log('Component will unmount');
  }

  handleActiveMenu = (menuIndex) => {
    this.setState({activeMenu:menuIndex})
  }

  handleShowModal = (modalName) => {
    const { showModal } = this.state;
      if (modalName===MODAL_NAME.ADD){
        this.setState({showModal:{...showModal, Add:!showModal.Add}})
      } 
      if (modalName===MODAL_NAME.EDIT){
        this.setState({showModal:{...showModal, Edit:!showModal.Edit}})
      } 
  }

  handleTodoList = (todoItem) => {
    this.handleShowModal(MODAL_NAME.ADD);
    this.setState({todoList: [todoItem, ...this.state.todoList]});
    this.updateFile(todoItem);
    //this.setState({todoList: [todoItem, ...this.state.todoList]});
  }

  handleSortOption = (sortObj, isAscending) => {
    this.setState({sortOption:{sortObj: sortObj, isAscending: isAscending}})
  }

  handleViewList = () => {
    this.setState({isViewList: !this.state.isViewList})
  }

  handleRemoveItem = (itemID) => {
    const todoList = this.state.todoList.filter(todoItem=>todoItem.id!==itemID);
    this.setState({todoList:todoList});
    this.removeItem(itemID);
  }

  getTodoListByFilter = ()=>{
    const {activeMenu, sortOption} = this.state;
    let newList = this.state.todoList;
    
    if (activeMenu!==FILTER.ALL){
      newList = newList.filter(todoItem=>todoItem.status===activeMenu);
    } 

    const sortStr = sortOption.sortObj.toLowerCase();
    if (sortStr!=='unsorting'){
      if (sortStr==='title'){
        newList = newList.sort((a,b)=> (a.title>b.title)? 1:-1);
      } else if (sortStr === 'status'){
        newList = newList.sort((a,b) => (a.status>b.status?1:-1))
      } else if (sortStr === 'duedate'){
        newList = newList.sort((a,b) => (Date.parse(a.dueDate)>Date.parse(b.dueDate))?1:-1)
      }
      if (!sortOption.isAscending){
        newList.reverse();
      }
    }

    return newList;
  }

  updateFile = async (item) => {
    const key = item.id;
    const value = {
      title: item.title,
      status: item.status,
      dueDate: item.dueDate,
    }
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error){
      console.log(error);
    }
  }

  removeItem = async (itemID) => {
    await AsyncStorage.removeItem(itemID,(error)=>{
      if (error){
        console.log('App-RemoveItem:', error);
      }
    })
  }

  handleUpdateTodoList = (item) => {
    this.handleShowModal(MODAL_NAME.EDIT);
    const {todoList} = this.state;
    todoList.forEach(todoItem=>{
      if (todoItem.id===item.id){
        todoItem.title = item.title;
        todoItem.status = item.status;
        todoItem.dueDate = item.dueDate;
        return
      }
    })
    this.setState({todoList: todoList});
    this.removeItem(item.id);
    this.updateFile(item);
  }

  render(){
    const { activeMenu, showModal, sortOption, isViewList } = this.state;
    const displayList = this.getTodoListByFilter();
    return (
      <View style={styles.container}>
        <AppTitle showModal={showModal.Add} handleShowModal={this.handleShowModal} handleTodoList={this.handleTodoList} />
        {displayList.length>0 && <SortTodo sortStr={sortOption.sortObj} sortAsc={sortOption.isAscending}
          handleSortOption={this.handleSortOption} handleViewList={this.handleViewList} isViewList={isViewList}/>}
        <TodoList 
          isViewList={isViewList}
          todoList={displayList} showModal={showModal.Edit} 
          handleShowModal={this.handleShowModal} handleUpdateTodoList={this.handleUpdateTodoList} handleRemoveItem={this.handleRemoveItem}/>
        <BottomMenu activeMenu={activeMenu} onMenuSelect={this.handleActiveMenu}/>
      </View>
    );
  }
}

const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: statusBarHeight,
    marginBottom: Math.round(statusBarHeight*0.75),
    margin: Math.round(statusBarHeight*0.15),
  },
});
