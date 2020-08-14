import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SortTodo extends Component{
    constructor(props){
        super(props);
        this.state={
            pickerValue: '',
            showPicker: false,
        }
    }

    render(){
        const { showPicker } = this.state;
        const { sortStr, sortAsc, handleSortOption, isViewList, handleViewList } = this.props;
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.viewContainer}>
                        <TouchableOpacity style={styles.viewElement} onPress={handleViewList}>
                            <Text style={{paddingRight: 5}}>{isViewList?'List view':'Grid view'}</Text>
                            <MaterialCommunityIcons name={isViewList?'view-list':'view-grid'} color='#1e90ff' size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sortContainer}>
                        <Text>Sort by: </Text>
                        <TouchableOpacity style={styles.sortText} onPress={()=>{this.setState({showPicker:!this.state.showPicker})}}>
                            <Text>{sortStr[0].toUpperCase() + sortStr.substr(1,)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sortItem} onPress={handleSortOption.bind(this,sortStr,!sortAsc)}>
                            <FontAwesome name={sortAsc?'sort-amount-asc':'sort-amount-desc'} color='#1e90ff' size={22}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {showPicker && 
                        <Picker selectedValue={sortStr} 
                            onValueChange={(itemValue, itemPosition)=>{
                                this.props.handleSortOption(itemValue, sortAsc)
                                this.setState({pickerValue: itemValue})}}
                            >
                            <Picker.Item label='Unsorting' value='unsorting'/>
                            <Picker.Item label='Title' value='title'/>
                            <Picker.Item label='Status' value='status'/>
                            <Picker.Item label='Due date' value='dueDate'/>
                        </Picker>
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding: 10,
        flexDirection: 'column',
    },
    viewContainer: {
        flex: 1,
    },
    viewElement:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortContainer:{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortText: {
        width: '50%', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortItem:{
        flexDirection: 'row',
        paddingLeft: 15,
    },
})