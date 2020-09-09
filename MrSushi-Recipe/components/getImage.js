import React, { Component } from 'react'
import { Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import CameraRoll from '@react-native-community/cameraroll'

export default class GetImages extends Component{
    constructor(props){
        super(props)
        this.state={
            imgs: [],
        }
    }

    async componentDidMount(){
        const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        //console.log(permission);
        if (permission.status === 'granted'){
            console.log('Camera access granted');
            this.getImgs()
            console.log(this.state);
        } else {
            console.log('Camera access denied');
        }
    }

    async getImgs(){
        const res = await ImagePicker.launchImageLibraryAsync()
        //const resList = await CameraRoll.getPhotos({first: 30})
        console.log(res);
        //console.log(restList);
        //res.edges.forEach(edge=>imgsList.push(edge.node.image.uri))
        this.setState({imgs: res.uri})
    }

    render(){
        const {imgs} = this.state;
        return(
            <Modal visible={this.props.showModal} animationType='slide'>
                <View style={styles.btnClose}>
                    <TouchableOpacity onPress={this.props.handleShowImageGallery}>
                        <Text style={styles.btnText}>Close</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    {imgs.map((value, index)=>{
                        return(
                            <Image key={index} style={styles.img} source={{uri: value.node.image.uri}}/>
                        )
                    })}
                </ScrollView>
                <Image key={index} style={styles.img} source={{uri: value.node.image.uri}}/>
            </Modal>
        )
    }
}

const styles=StyleSheet.create({
    btnClose:{
        marginRight: 10,
        marginLeft: 10,
        marginTop: 35,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 30,
    },
    btnText:{
        fontWeight:'bold',
        fontSize: 15,
        color: 'red',
    },
    container:{
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
        height: '90%',
        margin: 10,
        marginBottom: 20,
    },
    img:{
        resizeMode: 'contain',
        width: 75,
        height: 75,
    }
})