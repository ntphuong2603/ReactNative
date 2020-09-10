import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class DetailRecipe extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {recipe, backToSearch} = this.props
        return(
            <View style={styles.containter}>
                {recipe !== null && <View>
                    <View style={styles.headerTitle}>
                        <TouchableOpacity onPress={backToSearch}>
                            <MaterialIcons name='keyboard-arrow-left' size={45} color='#191970'/>
                        </TouchableOpacity>
                        <View style={styles.headerStyle}>
                            <Text style={styles.txtRecipe}>Ingredient</Text>
                            <Text style={{fontSize: 18,color:'#6a5acd'}}>{recipe.key}</Text>
                        </View>
                    </View>
                    {recipe.ingredient.map((each,index)=>{
                        return(
                            <View key={index} style={styles.recipeIngredient}>
                                <Text style={{textAlign:'center', fontSize: 15, fontWeight: 'bold'}}>{index+1})</Text>
                                <Text style={{fontSize: 15}}> {each} </Text>
                            </View>
                        )
                    })}
                    <Image style={styles.recipeImage} source={{uri:recipe.imgPath}}/>
                    <TouchableOpacity style={styles.btnGoBack} onPress={backToSearch}>
                        <Text>Back to search</Text>
                    </TouchableOpacity>
                </View>}
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
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerStyle:{
        flexDirection: 'column', 
        height: 55, 
        alignItems: 'center', 
        flex: 1,
    },
    txtRecipe:{
        flex:1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#663399',
    },
    recipeIngredient: {
        marginTop:10, 
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start'
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