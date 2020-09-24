import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { RecipePicture } from '../components/componentsIndex';

export default InputRecipe = (props) => {

    const [ingredeint, setIngredeint] = useState('');
    const { recipe, handleRecipe, handleUpdateRecipeList } = props;

    return(
        <View style={styles.inputView}>
            <Text style={{marginBottom: 10}}>Input recipe code and name</Text>
            <View style={{flexDirection: 'row',}}>
                <TextInput
                    style={styles.inputTextCode}
                    onChangeText={(text) => handleRecipe(text, 'code')}
                    value={recipe.code}
                    placeholder='J80'/>
                <TextInput
                    style={styles.inputTextName}
                    value={recipe.name}
                    onChangeText={(text) => handleRecipe(text, 'name')}
                    placeholder='Bulgogi'/>
            </View>
            <Text style={{marginTop: 15, marginBottom: 10}}>Ingredient of : {recipe.code} - {recipe.name}</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.inputTextIngredient}
                    value={ingredeint}
                    onChangeText={(text)=>setIngredeint(text)}
                    placeholder='Input ingredeint'/>
                <TouchableOpacity style={styles.btnAdd} onPress={()=>{handleRecipe(ingredeint, 'list');setIngredeint('')}}>
                    <Text style={{fontWeight:'bold', color:'red'}}>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{height:'80%'}}>
                {recipe.list.map((value,index)=>{
                    return(
                        <View key={index}>
                            <Text style={{marginTop: 5, fontSize: 15}}>{index+1}) {value}</Text>
                        </View>
                    )
                })}
                <Text style={{marginTop: 10, fontSize: 15, fontWeight: 'bold'}}>Illustration</Text>
                <RecipePicture pictUrl={recipe.pict} handleRecipe={handleRecipe} btnView={true}/>
                {recipe.code.length>0 && <TouchableOpacity style={styles.btnDone} onPress={handleUpdateRecipeList}>
                    <Text style={styles.btnDoneText}>F  I  N  I  S  H</Text>
                </TouchableOpacity>}
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    inputView:{
        width: '100%',
        height: '100%',
        padding: 5,
    },
    cameraView:{
        width: "100%",
        height: '100%',
        marginLeft: 10,
        position: 'relative',
        justifyContent: 'center',
    },
    inputTextCode:{
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        fontSize: 15,
        padding: 5,
        width: '18%', 
        marginRight: 8, 
        height: 45,
        textAlign: 'center'
    },
    inputTextName:{
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        fontSize: 15,
        padding: 5,
        width: '80%'
    },
    inputTextIngredient:{
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        fontSize: 15,
        width: '80%',
        height: 35,
        padding: 5,
        height: 45,
    },
    btnAdd:{
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 0.7,
        marginLeft: 5,
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDone:{
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        backgroundColor: '#e6e6fa',
        marginTop: 10,
    },
    btnDoneText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b0082',
    },
    
})