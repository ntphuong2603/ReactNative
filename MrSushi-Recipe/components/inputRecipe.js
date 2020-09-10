import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, Animated, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';
import { write_recipe, delete_recipe } from './recipe_io'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class InputRecipe extends Component{
    constructor(props){
        super(props)
        this.state = {
            recipeName: {
                code: '',
                name: '',
                item: '',
            },
            recipeList: [],
            imgUrl: '',
        }
        this.handleRecipeName = this.handleRecipeName.bind(this);
        this.handleRecipeList = this.handleRecipeList.bind(this);
        this.handleRecipe = this.handleRecipe.bind(this);
        this.position = new Animated.ValueXY(0,0)
    }

    handleRecipeName = (text, recipeType) => {
        const {recipeName} = this.state
        if (recipeType==='code'){
            recipeName.code = text
        } else if (recipeType==='name'){
            recipeName.name = text
        } else {
            recipeName.item = text
        }
        this.setState({recipeName: recipeName})
    }

    handleRecipeList = () => {
        const {recipeName, recipeList} = this.state;
        if (recipeName.item.length > 0){
            recipeList.push(recipeName.item)
            recipeName.item = ''
            this.setState({recipeName: recipeName, recipeList: recipeList})
        }
    }

    handleShowImageGallery = () => {
        const {showImageGallary} = this.state;
        this.setState({showImageGallary: !showImageGallary})
    }

    getImageFromGallery = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photo,
            allowsEditing: true,
        })
        if (!res.cancelled){
            this.setState({imgUrl: res.uri})
        }
    }

    takePictureFromCamera = async() => {
        try {
            if (this.camera){
                let photo = await this.camera.takePictureAsync();
                this.setState({imgUrl: photo.uri})
                this.resetScreen();
            }
        } catch(error){
            console.log(error);
        }
    }

    moveScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH, y:0},
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    resetScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: 0, y:0},
            duration: 450,
            useNativeDriver: false,
        }).start()
    }

    resetAllStates = () => {
        this.setState({
            recipeName: {
                code: '',
                name: '',
                item: '',
            },
            recipeList: [],
            imgUrl: '',
        })
    }

    handleRecipe = () => {
        const {recipeName} = this.state
        const key = `${recipeName.code.trim()} - ${recipeName.name.trim()}`;
        const value = {
            ingredient: this.state.recipeList,
            imgPath: this.state.imgUrl,
        }
        if (write_recipe(key, value)){
            this.resetAllStates();
            Alert.alert('ADD recipe','New recipe is added into AsyncStore successfully',[
                {
                    text: 'OK',
                    style: 'default',
                    onPress:()=>{},
                },
            ], { cancelable: true})
        } else {
            Alert.alert('ADD recipe','New recipe is NOT added into AsyncStore',[
                {
                    text: 'OK',
                    style: 'destructive',
                    onPress:()=>{}
                }
            ], { cancelable: true})
        }
    }

    render(){
        const {recipeName, recipeList, imgUrl} = this.state;
        return(
            <Animated.View style={[styles.container, this.position.getLayout()]}>
                <View style={styles.inputView}>
                    <Text style={{marginBottom: 10}}>Input recipe code and name</Text>
                    <View style={{flexDirection: 'row',}}>
                        <TextInput
                            style={styles.inputTextCode}
                            onChangeText={(text) => this.handleRecipeName(text, 'code')}
                            value={recipeName.code}
                            placeholder='J80'/>
                        <TextInput
                            style={styles.inputTextName}
                            value={recipeName.name}
                            onChangeText={(text) => this.handleRecipeName(text, 'name')}
                            placeholder='Bulgogi'/>
                    </View>
                    <Text style={{marginTop: 15, marginBottom: 10}}>Ingredient of : {recipeName.code} - {recipeName.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputTextIngredient}
                            onChangeText={(text)=>this.handleRecipeName(text,'item')}
                            value={recipeName.item}
                            placeholder='Input ingredeint'/>
                        <TouchableOpacity style={styles.btnAdd} onPress={this.handleRecipeList}>
                            <Text style={{fontWeight:'bold', color:'red'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{height:'78%'}}>
                        {recipeList.map((value,index)=>{
                            return(
                                <View key={index}>
                                    <Text style={{marginTop: 5, fontSize: 15}}>{index+1}) {value}</Text>
                                </View>
                            )
                        })}
                        <Text style={{marginTop: 10, fontSize: 15, fontWeight: 'bold'}}>Illustration</Text>
                        <View style={styles.picView}>
                            <View style={styles.btnGroup}>
                                <TouchableOpacity style={[styles.btnIll, {borderColor: '#00bfff'}]} onPress={this.getImageFromGallery}>
                                    <FontAwesome name='file-picture-o' size={30} color='#00bfff'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnIll,{borderColor: '#daa520'}]} onPress={this.moveScreen}>
                                    <FontAwesome name='camera' size={30} color='#daa520'/>
                                </TouchableOpacity>
                            </View>
                            {imgUrl.length>0 && <Image source={{uri: imgUrl}} style={styles.img}/>}
                        </View>
                        {recipeName.code.length>0 && <TouchableOpacity style={styles.btnDone} onPress={this.handleRecipe}>
                            <Text style={styles.btnDoneText}>F * I * N * I * S * H</Text>
                        </TouchableOpacity>}
                    </ScrollView>
                </View>
                <View style={styles.cameraView}>
                    <TouchableOpacity style={styles.btnGoBack} onPress={this.resetScreen}>
                        <FontAwesome name='arrow-circle-left' size={35} color='#6495ed'/>
                        <Text> Go back</Text>
                    </TouchableOpacity>
                    <Camera style={{width: '100%', height: 300}} type={Camera.Constants.Type.back} ref={ref=>this.camera = ref}/>
                    <TouchableOpacity style={styles.btnCamera} onPress={this.takePictureFromCamera}>
                        <FontAwesome name='camera' size={35} color='#daa520'/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles=StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    inputView:{
        width: '100%',
        height: '100%',
    },
    cameraView:{
        width: "100%",
        height: '100%',
        marginLeft: 10,
        position: 'relative',
    },
    inputTextCode:{
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        fontSize: 15,
        padding: 5,
        width: '18%', 
        marginRight: 8, 
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
        padding: 5
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
    picView:{
        flexDirection: 'column', 
        justifyContent:'space-around',
    },
    btnGroup:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginBottom: 10,
    },
    btnIll:{
        borderWidth: 1,
        width: '45%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderColor: '#4b0082',
        borderRadius: 20,
        borderWidth: 0.7,
        marginBottom: 10,
    },
    btnDone:{
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        backgroundColor: '#e6e6fa'
    },
    btnDoneText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b0082',
    },
    btnGoBack:{
        margin: 10,
        height: 50,
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 0.75,
        backgroundColor: '#f0ffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnCamera:{
        margin: 10,
        height: 50,
        borderRadius: 10,
        borderColor: '#ff0000',
        borderWidth: 0.75,
        backgroundColor: '#f5deb3',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})