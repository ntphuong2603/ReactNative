import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class BottomTab extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {selectedTab, tabList, handleSelectTab} = this.props
        return(
            <View style={styles.container}>
                {Object.keys(tabList).map(eachKey=>{
                    const tabName = tabList[eachKey];
                    return(
                        <TouchableOpacity key={eachKey} onPress={handleSelectTab.bind(this, tabList[eachKey])}
                            style={[styles.tabItem, (selectedTab===tabList[eachKey]? {backgroundColor:'red'}:null)]}>
                            <Text style={[styles.tabText,(selectedTab===tabList[eachKey]? {color:'white', fontWeight:'bold'}:null)]}>{tabName[0].toUpperCase()+tabName.substr(1,).toLowerCase()}</Text>
                        </TouchableOpacity>
                        )
                })}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
    },
    tabItem:{
        borderRadius: 14,
        height: '95%',
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
    },
    tabText:{
        fontSize: 15,
    }
})