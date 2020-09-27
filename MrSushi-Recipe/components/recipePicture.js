import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Animated, Text, PanResponder, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { FONT_SIZE_BASE, SCREEN_WIDTH } from './constants';
import { Camera } from 'expo-camera';

export default RecipePicture = (props) => {

    const OFFSET_VALUE = SCREEN_WIDTH - (props.btnView? 20: 30);
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
            position.setValue({x:gesture.dx,y:0})
        },
        onPanResponderRelease: (event, gesture) => {
            //position.flattenOffset();
            if (gesture.dx >= 30){
                goToDine_IN()
            } else if (gesture.dx < -30){
                goToTake_OUT()
            }
        },
    })
    
    const goToDine_IN = () => {
        Animated.spring(position, {
            toValue:{x:0, y:0},
            duration: 300,
            useNativeDriver: false,
        }).start(()=>{
            setTakeOut(false);
            setIsCameraOn(false);
        })
    }

    const goToTake_OUT = () => {
        Animated.spring(position, {
            toValue:{x:-OFFSET_VALUE, y:0},
            duration: 300,
            useNativeDriver: false,
        }).start(()=>{
            setTakeOut(true);
            setIsCameraOn(false);
        })
    }

    const goToCamera = () => {
        Animated.spring(position, {
            toValue:{x:-(OFFSET_VALUE*2), y:0},
            duration: 100,
            useNativeDriver: false,
        }).start(()=>
            setIsCameraOn(true)
        )
    }

    const leftFunc = () => {
        if (isCameraOn){
            takeOut ? goToTake_OUT() : goToDine_IN()
        } else {
            getPicture(false)
        }
    }

    const rightFunc = () => {
        if (isCameraOn){
            getPicture(true)
            takeOut ? goToTake_OUT() : goToDine_IN()
        } else {
            goToCamera();
        }
    }

    let camera=null;

    const getPicture = async (frCamera) => {
        let url = '';
        if (frCamera){
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
        props.handleRecipe(url, 'pict', takeOut?'OUT':'IN')
    }

    const { pictUrl, btnView } = props;

    return(
        <View style={styles.containerCol}>
            <Animated.View style={[styles.containerRow, position.getLayout()]} {...panResponder.panHandlers}>
                <View style={styles.subContainer}>
                    <Text style={styles.pictTxt}>Dine - <Text style={{color:'#ff1493'}}>IN</Text></Text>
                    <Image style={styles.img} 
                        source={pictUrl.dine_in.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: pictUrl.dine_in}}/>
                </View>
                <View style={[styles.subContainer]}>
                    <Text style={styles.pictTxt}>Take - <Text style={{color:'#ff1493'}}>OUT</Text></Text>
                    <Image style={styles.img} 
                        source={pictUrl.take_out.length===0 ? require('../assets/MrSushi_Food_Image.jpg') : {uri: pictUrl.take_out}}/>
                </View>
                <View style={[styles.subContainer]}>
                    <Camera style={{width: '100%', height: 320}} type={Camera.Constants.Type.back} ref={ref=> camera = ref}/>
                </View>
            </Animated.View>
            {btnView && <View style={[styles.containerRow, { justifyContent: 'space-around',}]}>
                <TouchableOpacity style={[styles.btnIll, {borderColor: !isCameraOn?'#00bfff':'#dc143c',}]} onPress={leftFunc}>
                    {!isCameraOn ? 
                    <FontAwesome name={'file-picture-o'} size={30} color={'#00bfff'}/>:
                    <FontAwesome name={'arrow-circle-o-left'} size={30} color={'#dc143c'}/>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnIll,{borderColor: '#daa520'}]} onPress={rightFunc} >
                    <FontAwesome name='camera' size={30} color='#daa520'/>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const BORDER_RADIUS = 15;

const styles = StyleSheet.create({
    containerCol: {
        flexDirection: 'column',
    },
    containerRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subContainer:{
        flexDirection:'column',
        alignItems: 'center',
        width: '100%',
        
    },
    pictTxt: {
        fontSize: FONT_SIZE_BASE + 5,
        fontWeight: 'bold',
    },
    img:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderColor: '#4b0082',
        borderRadius: BORDER_RADIUS,
        borderWidth: 0.5,
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