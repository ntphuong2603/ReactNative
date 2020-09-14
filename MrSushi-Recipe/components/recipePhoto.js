import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker'

export default class RecipePhoto extends Component{
    constructor(props){
        super(props)
    }

    getImageFromGallery = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photo,
            allowsEditing: true,
        })
        if (!res.cancelled){
            this.props.setImgUrl(res.uri)
        }
    }


    render(){
        const { imgUrl, moveScreen } = this.props
        return(
            <View style={styles.picView}>
                <Image style={styles.img} 
                    source={imgUrl.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: imgUrl}}/>
                <View style={styles.btnGroup}>
                    <TouchableOpacity style={[styles.btnIll, {borderColor: '#00bfff'}]} onPress={this.getImageFromGallery}>
                        <FontAwesome name='file-picture-o' size={30} color='#00bfff'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnIll,{borderColor: '#daa520'}]} onPress={moveScreen}>
                        <FontAwesome name='camera' size={30} color='#daa520'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const BORDER_RADIUS = 15;

const styles = StyleSheet.create({
    picView:{
        flexDirection: 'column', 
        justifyContent:'space-around',
        borderRadius: BORDER_RADIUS,
    },
    btnGroup:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    },
    btnIll:{
        borderWidth: 1,
        width: '45%',
        borderRadius: BORDER_RADIUS,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderColor: '#4b0082',
        borderRadius: BORDER_RADIUS,
        borderWidth: 0.7,
        marginBottom: 10,
    },
})