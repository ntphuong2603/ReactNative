import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Easing, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {RecipePicture} from '../components/componentsIndex'

export default class EditRecipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipe : this.getNewRecipe(this.props.recipe)
        }
        this.handleEditRecipe = this.handleEditRecipe.bind(this);
    }

    componentDidUpdate(prevProps){
        if (this.props.recipe.key !== prevProps.recipe.key){
            this.setState({recipe: this.getNewRecipe(this.props.recipe)})
        }
    }

    getNewRecipe(recipe){
        const recipeStr = JSON.stringify(recipe)
        const recipeJson = JSON.parse(recipeStr);
        //const key = recipeJson.key
        //recipeJson.code = key.split(' - ')[0].trim();
        //recipeJson.name = key.split(' - ')[1].trim();
        //console.log(recipeJson);
        return recipeJson
    }

    handleEditRecipe(name, value){
        const {recipe} = this.state
        if (name==='code'){
            recipe.code = value
        } else if (name==='name'){
            recipe.name = value
        } else if (name === 'ingredient'){
            recipe.ingredient.push(value)
        } else if (name === 'image'){
            recipe.imgPath = value
        } 
        this.setState({recipe: recipe})
    }

    handleIngredient(action, index, value){
        const {recipe} = this.state
        const {ingredient} = recipe
        if (action === 'del'){
            ingredient.splice(index, 1)
        } else {
            ingredient[index] = value
        }
        this.setState({recipe: recipe})
    }

    handleUpdateRecipe(){
        Alert.alert('Confirm: update recipe', 'All info will be updated into the current recipe, are you sure?', [
            {
                text: 'OK',
                style: 'destructive',
                onPress: ()=>{
                    const {recipe} = this.state
                    const key = recipe.key.trim() + ' - ' + recipe.name.trim()
                    const newRecipe = {
                        imgPath: recipe.imgPath,
                        ingredient: recipe.ingredient.filter(ingre=>ingre.trim().length > 0),
                    }
                    if (this.props.handleUpdateRecipe(key, newRecipe)){
                        Alert.alert('Updated', `Item '${key}' is updated successfully !!!`, [
                            {
                                text: 'OK',
                                onPress: ()=>{
                                    this.props.backToSearch()
                                },
                            }
                        ])
                    } else {
                        Alert.alert('Updated', `Item '${key}' is NOT updated !!!`, [
                            {
                                text: 'OK',
                                onPress: ()=>{
                                    this.props.backToSearch()
                                },
                            }
                        ])
                    }
                }
            }, {
                text: 'Cancel',
                style: 'cancel',
            }
        ], {
            cancelable: false,
        })
    }
    
    render(){
        const {backToSearch, moveToCameraScreen, moveToItemScreen}  = this.props
        const {recipe} = this.state
        return(
            <View style={styles.container}>
                <View style={styles.editView}>
                    <View style={styles.headerTitle}>
                        <TouchableOpacity onPress={backToSearch}>
                            <MaterialIcons name='keyboard-arrow-left' size={45} color='#191970'/>
                        </TouchableOpacity>
                        <Text style={styles.txtRecipe}>{recipe.key}</Text>
                    </View>
                    <ScrollView >
                        <View style={styles.viewRecipe}>
                            <View style={[styles.viewCol, {width: '20%'}]}>
                                <Text style={styles.textCol}>Code</Text>
                                <TextInput style={[styles.styleInputText, {textAlign: 'center'}]}>{recipe.key}</TextInput>
                            </View>
                            <View style={[styles.viewCol, { width: '79%'}]}>
                                <Text style={styles.textCol}>Name</Text>
                                <TextInput style={[styles.styleInputText, {textAlign: 'center'}]}>{recipe.name}</TextInput>
                            </View>
                        </View>
                        <View style={styles.ingredientItem}>
                            <Text style={{fontWeight:'bold', fontSize: 15}}>Ingredient:</Text>
                            <TouchableOpacity style={[styles.ingredientBtn,styles.ingredientBtnAdd]} onPress={()=>{this.handleEditRecipe('ingredient','')}}>
                                <Text style={{fontSize: 10, fontWeight: 'bold'}}> Touch to add more ingredient ... </Text>
                            </TouchableOpacity>
                        </View>
                        {recipe.list.map((each,index)=>{
                            return(
                                <View key={index} style={styles.ingredientItem}>
                                    <View style={[styles.styleInputText, {width: '87%', flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}]}>
                                        <Text style={{textAlign:'center', fontSize: 15, fontWeight: 'bold'}}>{index+1}) </Text>
                                        <TextInput
                                            style={{fontSize: 15, flex: 1}}
                                            value={each}
                                            onChangeText={(text)=>{this.handleIngredient('update',index,text)}}/>
                                    </View>
                                    <TouchableOpacity style={styles.ingredientBtn} onPress={()=>{this.handleIngredient('del',index,'')}}>
                                        <FontAwesome name='trash' size={25} color='white'/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                        <RecipePicture pictUrl={recipe.pict} handleRecipe={this.handleEditRecipe} btnView={true}/>
                        <TouchableOpacity style={styles.btnDone} onPress={()=>this.handleUpdateRecipe()}>
                            <Text style={styles.btnDoneText}>U p d a t e</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const FONT_SIZE_BASE = 12;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        height:'100%',
        padding: 5,
    },
    editView:{
        width: '100%',
        height:'100%',
    },
    cameraView:{
        width: '100%',
        height:'100%',
        marginLeft: 20,
        position: 'relative',
        justifyContent: 'center',
    }, 
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewRecipe: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    viewCol:{
        flexDirection:'column',alignItems:'center',
    },
    textCol:{
        fontWeight:'bold', fontSize: 15, textAlign: 'center'
    },
    ingredientItem:{
        flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'
    },
    ingredientBtn:{
        width: 40, alignItems: 'center', borderRadius: 20, backgroundColor: 'red', height: 40, justifyContent: 'center'
    },
    ingredientBtnAdd:{
        flex: 1, backgroundColor: '#b0e0e6', marginLeft: 10
    },
    txtRecipe:{
        flex:1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#663399',
        textAlign: 'center',
    },
    styleInputText:{
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 5,
        height: 40,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        fontSize: FONT_SIZE_BASE + 3,
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
        fontSize: FONT_SIZE_BASE + 5,
        fontWeight: 'bold',
    },
    recipeName: {
        fontSize: FONT_SIZE_BASE + 2, 
    },
    recipeIngredient:{
        fontSize: FONT_SIZE_BASE,
    },
    recipeImage:{
        width: '100%',
        height: 350,
        resizeMode: 'contain',
        borderRadius: 10,
        borderWidth: 0.5,
    },
    btnDone:{
        height: 55,
        backgroundColor: '#fff5ee',
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
        color: '#ff4500'
    }
})