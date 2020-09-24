import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FONT_SIZE_BASE, SCREEN_WIDTH, TAB_LIST } from './constants';

export default BottomTab = (props)=> {
    const {selectedTab, handleSelectTab} = props
    return(
        <View style={styles.container}>
            {Object.keys(TAB_LIST).map((eachKey, index)=>{
                const tabName = TAB_LIST[eachKey];
                return(
                    <TouchableOpacity key={eachKey} onPress={handleSelectTab.bind(this, index)}
                        style={selectedTab===index? styles.tabItemSelected : styles.tabItem}>
                        <Text style={selectedTab===index? styles.tabTextSelected : styles.tabText}>{tabName[0].toUpperCase()+tabName.substr(1,).toLowerCase()}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
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
        height: 50,
    },
    tabItem:{
        borderRadius: 14,
        height: '95%',
        width: Math.floor(SCREEN_WIDTH/(TAB_LIST.length+1)),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
    },
    tabItemSelected: {
        borderRadius: 14,
        height: '95%',
        width: Math.floor(SCREEN_WIDTH/(TAB_LIST.length+1)),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
        backgroundColor:'red',
    },
    tabText:{
        fontSize: FONT_SIZE_BASE,
    },
    tabTextSelected: {
        fontSize: FONT_SIZE_BASE,
        color:'white', 
        fontWeight:'bold',
    }
})