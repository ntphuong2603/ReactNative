import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default class DetailRecipe extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {recipe} = this.props.route.params
        return(
            <View style={styles.containter}>
                <Text style={{fontWeight:'bold', fontSize: 15}}>Ingredient:</Text>
                {recipe.ingredient.map((each,index)=>{
                    return(
                        <View key={index} style={{marginTop:10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
                            <Text style={{textAlign:'center', fontSize: 15, fontWeight: 'bold'}}>{index+1})</Text>
                            <Text style={{fontSize: 15}}> {each} </Text>
                        </View>
                    )
                })}
                <Image style={styles.recipeImage} source={{uri:recipe.imgPath}}/>
                <TouchableOpacity style={styles.btnGoBack} onPress={()=>this.props.navigation.goBack()}>
                    <Text>Back to search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const fontSizeBase = 12;

const styles=StyleSheet.create({
    containter:{
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    recipe: {
        flexDirection: 'column',
        margin: 10,
    },
    styleInputText:{
        borderWidth: 0.5,
        borderRadius: 5,
        height: 40,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        fontSize: fontSizeBase + 3,
    },
    inputTextRecipe:{
        borderWidth: 0.5,
        borderRadius: 5,
        height: 30,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    recipeCode:{
        fontSize: fontSizeBase + 5,
        fontWeight: 'bold',
    },
    recipeName: {
        fontSize: fontSizeBase + 2, 
    },
    recipeIngredient:{
        fontSize: fontSizeBase,
    },
    recipeImage:{
        width: '100%',
        height: 350,
        resizeMode: 'contain',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#b22222'
    },
    btnGoBack:{
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 0.75,
        backgroundColor: '#c0c0c0',
        alignItems: 'center',
        justifyContent: 'center',
    }
})