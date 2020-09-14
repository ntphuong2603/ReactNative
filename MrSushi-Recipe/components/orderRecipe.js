import React, { Component } from 'react'
import { AsyncStorage, Image, Keyboard, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import OrderTab from './orderTab'

export default class OrderRecipe extends Component{
    constructor(props){
        super(props)
        this.state={
            orderSelected: 0,
            orderListText : '',
        }
        this.handleOrderListText = this.handleOrderListText.bind(this);
        this.handleOrderSelected = this.handleOrderSelected.bind(this);
    }

    handleOrderListText(text){
        this.setState({orderListText: text})
    }

    handleSearchResults = async () => {
        const {orderListText} = this.state
        const {recipeList} = this.props
        const orderList = orderListText.trim().toUpperCase().split('.')
        const resultList = []
        
        if (orderListText.length > 0){
            orderList.forEach(order=>{
                recipeList.forEach(recipe=>{
                    if (recipe.toUpperCase().search(order)>=0){
                        resultList.push(recipe)
                    }
                })
            })
            await AsyncStorage.multiGet(resultList, (errors, results) => {
                if (errors){
                    console.log(errors);
                } else {
                    const ordersList = []
                    results.forEach(result=>{
                        ordersList.push({key: result[0], ...JSON.parse(result[1])})
                    })
                    this.props.handleOrderList(ordersList)
                    this.setState({orderListText: '' })
                }
            })
            Keyboard.dismiss()
        } else {
            this.props.handleOrderList([])
        }
    }

    handleOrderSelected = (orderSelected) => {
        this.setState({orderSelected:orderSelected})
    }

    render(){
        const { orderListText, orderSelected } = this.state
        const { orderList } = this.props
        const orderItem = orderList[orderSelected]
        return(
            <View style={styles.container}>
                <View style={styles.searchView}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchText}
                            value={orderListText}
                            placeholder='Input order list ...'
                            onChangeText={this.handleOrderListText}
                            keyboardType='numeric'/>
                        <TouchableOpacity style={styles.btnSearch} onPress={this.handleSearchResults}>
                            <MaterialIcons name='search' color='gray' size={45}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchResults}>
                        <OrderTab orderList={orderList} orderSelected={orderSelected} handleOrderSelected={this.handleOrderSelected}/>
                        {orderItem && <View style={styles.orderView}>
                            <Text style={styles.orderName}>{orderItem.key.split(' - ')[1].trim()}</Text>
                            <View style={styles.orderIngredient}>
                                {orderItem.ingredient.map((value, index)=>{
                                    return(
                                        <Text style={styles.textIngredient}>{index+1}) {value}</Text>
                                    )
                                })}
                            </View>
                            <Image style={styles.img}
                                source={orderItem.imgPath.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: orderItem.imgPath}}/>
                        </View>}
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    searchView:{
        width: '100%',
        height: '100%',
    },
    itemView:{
        width: "100%",
        height: '100%',
        position: 'relative',
        marginLeft: 10,
    },
    searchResults: {
        height: '93%',
        width: '100%',
    },
    searchContainer:{
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
    },
    searchText:{
        fontSize: 20,
        width: '86%',
        marginLeft: 5,
    },
    orderView:{
        alignItems: 'center',
        margin: 10,
    },
    orderName: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    orderIngredient: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    textIngredient:{
        margin: 5,
    },
    img:{
        width: '80%',
        height: 300,
        resizeMode: 'contain',
        borderColor: 'red',
        borderRadius: 10,
        borderWidth: 0.5
    }
})