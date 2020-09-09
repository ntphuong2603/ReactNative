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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        })
        if (!res.cancelled){
            this.setState({imgUrl: res.uri})
        }
    }

    takePictureFromCamera = async () => {

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

    takePicture = async() => {
        try {
            if (this.camera){
                let photo = await this.camera.takePictureAsync();
                //console.log(photo);
                this.setState({imgUrl: photo.uri})
                this.resetScreen();
            }
        } catch(error){
            console.log(error);
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
                    <View>
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
                            <View style={{flexDirection: 'column', justifyContent:'space-around'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={this.getImageFromGallery}>
                                        <FontAwesome name='file-picture-o' size={30} color='#00bfff'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.moveScreen}>
                                        <FontAwesome name='camera' size={30} color='#00ced1'/>
                                    </TouchableOpacity>
                                </View>
                                {imgUrl.length>0 && <Image source={{uri: imgUrl}} style={styles.img}/>}
                            </View>
                            {recipeName.code.length>0 && <TouchableOpacity style={styles.btnDone} onPress={this.handleRecipe}>
                                <Text style={styles.btnDoneText}>F * I * N * I * S * H</Text>
                            </TouchableOpacity>}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.cameraView}>
                    <Camera style={{width: '100%', height: 300}} type={Camera.Constants.Type.back} ref={ref=>this.camera = ref}/>
                    <TouchableOpacity style={styles.btnGoBack} onPress={this.takePicture}>
                    <FontAwesome name='camera' size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnGoBack} onPress={this.resetScreen}>
                    <FontAwesome name='arrow-circle-left' size={35}/>
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
        borderEndWidth: 1,
        borderColor: 'blue',
    },
    cameraView:{
        width: "100%",
        height: '100%',
        marginLeft: 10,
        borderColor: 'red',
        borderWidth: 1,
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
    imgContainer:{
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 0.5,
        width: '45%'
    },
    img:{
        height: 300, 
        resizeMode:'contain', 
        marginTop: 5,
    },
    btnDone:{
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 0.5,
        backgroundColor: 'green',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    btnDoneText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    btnImg: {
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 7,
    },
    btnImgText:{
        color: 'gray',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
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