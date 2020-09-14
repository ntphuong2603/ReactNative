import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Camera } from 'expo-camera';

export default class RecipeCamera extends Component{
    constructor(props){
        super(props)
    }

    takePictureFromCamera = async() => {
        try {
            if (this.camera){
                let photo = await this.camera.takePictureAsync();
                this.props.setImgUrl(photo.uri)
                this.props.resetScreen();
            }
        } catch(error){
            console.log(error);
        }
    }

    render(){
        const {resetScreen}=this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnGoBack} onPress={resetScreen}>
                    <FontAwesome name='arrow-circle-left' size={35} color='#6495ed'/>
                    <Text> Go back</Text>
                </TouchableOpacity>
                <Camera style={{width: '100%', height: 300}} type={Camera.Constants.Type.back} ref={ref=>this.camera = ref}/>
                <TouchableOpacity style={styles.btnCamera} onPress={this.takePictureFromCamera}>
                    <FontAwesome name='camera' size={35} color='#daa520'/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent: 'space-between',
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
    },
})