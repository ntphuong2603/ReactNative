import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import OrderItem from '../components/orderItem';

export default class OrderScreen extends Component{
    constructor(props){
        super(props);
        this.scrollEnable = true;
    }

    setScrollEnabled(enabled){
        this.scrollEnable = enabled;
    }

    render(){
        /*
        const {getMenuItem, totalCost} = this.props
        const OrderItem = (item) => {
            const menuItem = getMenuItem(item.menuID)
            return(
                <View style={styles.orderContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.menuImage} source={menuItem.pict}/>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.menuPric}>{item.menuID} - {menuItem.name}</Text>
                        <View style={styles.priceDetail}>
                            <Text>$ {menuItem.pric} x</Text>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='arrow-up-bold-circle' size={35} color='blue'/>
                            </TouchableOpacity>
                            <Text>{item.qty}</Text>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name='arrow-down-bold-circle' size={35} color='red'/>
                            </TouchableOpacity>
                            <Text> = {item.qty*menuItem.pric} $</Text>
                        </View>
                    </View>
                </View>
            )
        }
        */
       const {getMenuItem, totalCost} = this.props
       const separator = () => {
           return(
               <View style={styles.separator}/>
           )
       }
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Order detail</Text>
                <View style={[styles.totalContainer, totalCost<=0?{opacity:0.3}:null]}>
                    <TouchableOpacity disabled={totalCost<=0} style={styles.btnPlaceOrder}>
                        <Text style={styles.txtPlaceOrder}>Place order</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtTotal}>Total:  
                        <Text style={{fontSize: 15, fontWeight:'bold', color: 'red'}}> $ {totalCost}</Text>
                    </Text>
                </View>
                <FlatList data={this.props.data}
                    keyExtractor={item=>item.menuID}
                    renderItem={(items)=><OrderItem item={items.item} getMenuItem={getMenuItem} setScrollEnabled={this.setScrollEnabled}/>}
                    scrollEnabled={this.scrollEnable}
                    ItemSeparatorComponent={separator}
                    />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 30,
        flexDirection: 'column',
    },
    textStyle:{
        fontSize: 35,
        color:'#ff1493',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    totalContainer:{
        flexDirection: 'row',
        margin: 10,
        paddingRight: 10,
        borderWidth: 0.5,
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtTotal: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    btnPlaceOrder:{
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'red',
        margin: 5,
        padding: 5,
        backgroundColor: 'red',
        alignItems: 'center',
    },
    txtPlaceOrder:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    separator:{
        borderWidth: 0.5,
        backgroundColor: 'gray',
        margin: 5,
    }
})  