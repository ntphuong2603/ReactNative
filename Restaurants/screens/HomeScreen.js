import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends Component{

    render(){
        const MenuItem = (item) => {
            const {handleOrderList, getMenu} = this.props
            const btnSize = 40;
            const itemQty = getMenu(item.id).qty
            
            return(
                <TouchableOpacity style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.menuName}>{item.name}</Text>
                        <Text style={styles.menuDesc}>{item.desc}</Text>
                        <View style={styles.btnGroup}>
                            <TouchableOpacity onPress={handleOrderList.bind(this, item.id, 'add')}>
                                <MaterialCommunityIcons name='plus-circle' size={btnSize} color='red'/>
                            </TouchableOpacity>
                            <Text style={styles.qtyNumber}>{itemQty}</Text>
                            <TouchableOpacity disabled={itemQty<=0} onPress={handleOrderList.bind(this, item.id, 'minus')}>
                                <MaterialCommunityIcons style={itemQty<=0?styles.btnDisable:{}} name='minus-circle' size={btnSize} color='blue'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pictContainer}>
                        <Image style={styles.menuPict} source={item.pict}/>
                        <Text style={styles.menuPric}>$ {item.pric}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Home screen</Text>
                <FlatList data={this.props.data}
                    keyExtractor={item=>item.id}
                    renderItem={items=>MenuItem(items.item)}/>
            </View>
        )
    }
}
const fontSizeBase = 10;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
    },
    textStyle:{
        fontSize: 45,
        color:'tomato',
        fontWeight: 'bold',
        alignSelf:'center',
    },
    itemContainer:{
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        flexDirection: 'row',
    },
    textContainer:{
        flex:3,
        flexDirection: 'column',
    },
    menuName: {
        fontWeight: 'bold',
        fontSize: fontSizeBase + 5,
    },
    menuDesc: {
        fontSize: fontSizeBase,
        margin: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    btnGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    qtyNumber: {
        fontSize: fontSizeBase + 10,
    },
    btnDisable: {
        opacity: 0.2,
    },
    pictContainer:{
        flex:2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    menuPict:{
        width: '100%',
        height: 90,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    menuPric:{
        fontSize: fontSizeBase + 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 5,
    }
})