import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Slider } from 'react-native';

export default class MenuControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            row: this.props.tiles.row,
            col: this.props.tiles.col,
            maxTileNumber: 7,
            minTileNumber: 2,
        }
    }

    render(){
        const {row, col, minTileNumber, maxTileNumber} = this.state;
        const { updateTitles } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.menuName}>CONTROL MENU</Text>
                <View style={styles.slider}>
                    <Text>Number of row: {row}</Text>
                    <Slider
                        minimumValue={minTileNumber}
                        maximumValue={maxTileNumber-2}
                        step={1}
                        value={row}
                        onValueChange={value=>this.setState({row:value})}/>
                </View>
                <View style={styles.slider}>
                    <Text>Number of column: {col}</Text>
                    <Slider
                        minimumValue={minTileNumber}
                        maximumValue={maxTileNumber}
                        step={1}
                        value={col}
                        onValueChange={value=>this.setState({col:value})}/>
                </View>
                <Text style={styles.warningContent}>
                    <Text style={styles.warningTitle}>Warning: </Text>
                    changing the grid size will automatically begin a new game
                </Text>
                <TouchableOpacity style={styles.menuTouch} onPress={updateTitles.bind(this,{row:row,col:col})}>
                    <Text style={styles.menuDone}>DONE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        position: 'absolute',
        zIndex: 999,
        margin: 30,
        padding:15,
        flex: 1,
        width: '85%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'blue',
        backgroundColor: '#b0e0e6',
        opacity: 0.95,
    },
    menuName:{
        fontSize:20,
        fontWeight:'bold',
        color:'#800000',
    },
    menuTouch:{
        borderRadius:7,
        borderWidth: 0.75,
        padding: 10,
        margin: 30,
        backgroundColor:'#40e0d0',
        borderColor: '#ff4500',
        borderWidth: 0.75,
    },
    menuStart:{
        fontSize: 15,
        fontWeight:'bold',
        color:'#6a5acd',
    },
    menuDone:{
        fontWeight: 'bold',
        fontSize: 18,
        color:'#4682b4',
    },
    slider:{
        width:'100%',
        margin: 10,
    },
    warningTitle:{
        fontSize:15,
        fontWeight:'bold',
        color:'tomato',
    },
    warningContent:{
        fontSize: 13,
        color: 'red',
    }
})