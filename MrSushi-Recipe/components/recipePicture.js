import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Animated, Text, PanResponder, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { FONT_SIZE_BASE, SCREEN_WIDTH } from './constants';
import { Camera } from 'expo-camera';

export default RecipePicture = (props) => {

    const [takeOut, setTakeOut] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const position = new Animated.ValueXY(0,0)
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
            position.setOffset({x:position.x._value, y:0})
            position.setValue({x:0,y:0})
        },
        onPanResponderMove: (event, gesture) => {
            //position.flattenOffset();
            position.setValue({x:gesture.dx,y:0})
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx < 0){
                Animated.spring(position, {
                    toValue:{x:-(SCREEN_WIDTH*0.95), y:0},
                    duration: 300,
                    useNativeDriver: false,
                }).start(()=>{setTakeOut(true)})
            } else {
                Animated.spring(position, {
                    toValue:{x:0, y:0},
                    duration: 300,
                    useNativeDriver: false,
                }).start(()=>{setTakeOut(false)})
            }
        },
    })
    
    const moveToCamera = () => {
        console.log(isCameraOn);
        if (isCameraOn){
            getPicture()
            
            Animated.spring(position, {
                toValue:{x:(takeOut?-(SCREEN_WIDTH*0.95):0), y:0},
                duration: 300,
                useNativeDriver: false,
            }).start(()=>{setTakeOut(false);setIsCameraOn(false)})
        } else {    
            Animated.spring(position, {
                toValue:{x:-(SCREEN_WIDTH*0.95*2), y:0},
                duration: 300,
                useNativeDriver: false,
            }).start(()=>{setIsCameraOn(true)})
        }
    }

    let camera=null;

    const getPicture = async () => {
        let url = '';
        if (isCameraOn){
            try {
                if (camera){
                    let photo = await camera.takePictureAsync();
                    url = photo.uri
                }
            } catch(error){
                console.log(error);
            }
        } else {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.photo,
                allowsEditing: true,
            })
            if (!res.cancelled){
                url = res.uri
            }
        }
        console.log(url);
        props.handleRecipe(url, 'pict', takeOut?'OUT':'IN')
    }

    const { pictUrl } = props;
    //console.log('is take-out:',takeOut);
    return(
        <View style={styles.containerCol}>
            <Animated.View style={[styles.containerRow, position.getLayout()]} {...panResponder.panHandlers}>
                <View style={styles.subContainer}>
                    <Text style={styles.pictTxt}>Dine - IN</Text>
                    <Image style={styles.img} 
                        source={pictUrl.dine_in.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: pictUrl.dine_in}}/>
                </View>
                <View style={[styles.subContainer, {marginLeft: 1}]}>
                    <Text style={styles.pictTxt}>Take - OUT </Text>
                    <Image style={styles.img} 
                        source={pictUrl.take_out.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: pictUrl.take_out}}/>
                </View>
                <View style={[styles.subContainer, {margin: 5, justifyContent:'center'}]}>
                    <Camera style={{width: '100%', height: 300}} type={Camera.Constants.Type.back} ref={ref=> camera = ref}/>
                </View>
            </Animated.View>
            <View style={[styles.containerRow, { justifyContent: 'space-around',}]}>
                <TouchableOpacity disabled={isCameraOn} style={[styles.btnIll, {borderColor: '#00bfff'}]} onPress={()=>getPicture(false)}>
                    <FontAwesome name='file-picture-o' size={30} color='#00bfff'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnIll,{borderColor: '#daa520'}]} onPress={moveToCamera} >
                    <FontAwesome name='camera' size={30} color='#daa520'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const BORDER_RADIUS = 15;

const styles = StyleSheet.create({
    containerRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    containerCol: {
        flexDirection: 'column',
    },
    subContainer:{
        flexDirection:'column',
        width: '100%',
        alignItems: 'center',
    },
    pictTxt: {
        fontSize: FONT_SIZE_BASE + 5,
        fontWeight: 'bold',
        color: '#ff1493'
    },
    img:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderColor: '#4b0082',
        borderRadius: BORDER_RADIUS,
        borderWidth: 0.7,
        margin: 5,
    },
    btnIll:{
        borderWidth: 1,
        width: '45%',
        borderRadius: BORDER_RADIUS,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})