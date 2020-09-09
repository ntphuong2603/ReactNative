import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default class EditRecipe extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {recipe} = this.props.route.params
        return(
            <ScrollView style={styles.containter}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize: 15, textAlign: 'center', marginRight: 10, width: '20%'}}>Code</Text>
                    <TextInput style={[styles.styleInputText, {textAlign: 'center', flex: 1}]}>{recipe['key'].split('-')[0].trim()}</TextInput>
                </View>
                <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight:'bold', fontSize: 15, textAlign: 'center', marginRight: 10, width: '20%'}}>Name</Text>
                    <TextInput style={[styles.styleInputText, {flex: 1}]}>{recipe['key'].split('-')[1].trim()}</TextInput>
                </View>
                <Text style={{fontWeight:'bold', fontSize: 15}}>Ingredient:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                    <TextInput style={[styles.styleInputText, {fontSize: 15, width: '85%'}]}/>
                    <TouchableOpacity style={{width: '13%', borderWidth: 0.5, alignItems: 'center', borderRadius: 15, borderColor: 'red', height: 40, justifyContent: 'center'}} onPress={this.handleRecipeList}>
                        <Text style={{fontWeight:'bold', color:'red'}}>Add</Text>
                    </TouchableOpacity>
                </View>
                {recipe.ingredient.map((each,index)=>{
                    return(
                        <View key={index} style={[styles.styleInputText, {flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}]}>
                            <Text style={{textAlign:'center', fontSize: 15, fontWeight: 'bold'}}>{index+1}) </Text>
                            <TextInput
                                style={{fontSize: 15}}
                                value={each}/>
                        </View>
                    )
                })}
                <Image style={styles.recipeImage} source={{uri:recipe.imgPath}}/>
                <TouchableOpacity style={styles.btnDone} onPress={()=>{}}>
                    <Text style={styles.btnDoneText}>U p d a t e</Text>
                </TouchableOpacity>
            </ScrollView>
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
    },
    btnDone:{
        height: 55,
        backgroundColor: '#f0f8ff',
        borderColor: '#00008b',
        borderRadius: 10,
        borderWidth: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    btnDoneText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00008b'
    }
})