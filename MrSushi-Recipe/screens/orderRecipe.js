import React, { useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { OrderTab } from '../components/componentsIndex'
import { VIEWER } from '../components/constants'
import { getRecipes } from '../components/recipe_io'

export default OrderRecipe = (props)=>{

    const [orderSelected, setOrderSelected] = useState(0);
    const [orderString, setOrderString] = useState('');

    handleSearchResults = async () => {
        if (orderString.trim().length>0){
            const orderList = []
            orderString.trim().toUpperCase().split('.')
                .forEach(order=>{
                    props.recipeList.forEach(recipe=>{
                        if (recipe.toUpperCase().search(order)>=0){
                            orderList.push(recipe)
                        }
                    })
            })
            props.handleOrderList(await getRecipes(orderList))
            setOrderString('')
        }
        Keyboard.dismiss()
    }

    const ViewItem = () => {
        const orderItem = props.orderList[orderSelected]
        if (!orderItem){
            return null
        } else {
            return(
                <View style={styles.orderView}>
                    <Text style={styles.orderName}>{orderItem.key.trim()} - {orderItem.name.trim()}</Text>
                    <View style={styles.orderIngredient}>
                        {orderItem.list.map((value, index)=>{
                            return(
                                <Text key={index} style={styles.textIngredient}>{index+1}) {value}</Text>
                            )
                        })}
                    </View>
                    <Image style={styles.img}
                        source={orderItem.pict.dine_in.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: orderItem.pict.dine_in}}/>
                </View>
            )
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.searchView}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchText}
                        value={orderString}
                        placeholder='Input a list of orders ...'
                        onChangeText={(text)=>setOrderString(text)}
                        keyboardType='numeric'
                        clearButtonMode='always'
                        />
                    <TouchableOpacity style={styles.btnSearch} onPress={handleSearchResults}>
                        <MaterialIcons name='search' color='gray' size={45}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchResults}>
                    <OrderTab orderList={props.orderList} orderSelected={orderSelected} setOrderSelected={setOrderSelected}/>
                    <ViewItem/>
                </View>
            </View>
        </View>
    )
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
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderColor: 'red',
        borderRadius: 10,
        borderWidth: 0.5
    }
})