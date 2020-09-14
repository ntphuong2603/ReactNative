import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class RecipeItem extends Component{
    constructor(props){
        super(props)
        const position = new Animated.ValueXY(0,0);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderGrant: () => {
                this.position.setOffset({x:this.position.x._value, y:0})
                this.position.setValue({x:0,y:0})
            },
            onPanResponderMove: (event, gesture) => {
                const movement = Math.abs(gesture.dx)
                if (movement >= 30){
                    this.props.handleScrollEnable();
                    const x = gesture.dx
                    this.position.setValue({x:x,y:0})
                } 
            },
            onPanResponderRelease: (event, gesture) => {
                this.position.flattenOffset();
                if (gesture.dx < 0){
                    this.swiptToLeft(gesture);
                } else {
                    this.resetPosition();
                }
            },
            onPanResponderTerminate: () => {
                Animated.spring(this.position, {
                    toValue: {x:0, y:0},
                    duration: 200,
                    useNativeDriver: false,
                }).start();
            }
        })
        this.position = position;
        this.panResponder = panResponder;
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    swiptToLeft(gesture){
        if (gesture.dx <= -70){
            const x = -(70*2+15)
            Animated.timing(this.position, {
                toValue:{x:x, y:0},
                duration: 300,
                useNativeDriver: false,
            }).start()
        } else {
            this.resetPosition();
        }
    }

    resetPosition() {
        Animated.timing(this.position, {
            toValue: { x: 0, y: 0 },
            duration: 250,
            useNativeDriver: false,
        }).start();
        this.props.handleScrollEnable(true);
    }

    getStylesBtnRight(){
        const leftMargin = - (70*3)
        const marginLeft = this.position.x.interpolate({
            inputRange: [leftMargin,-5],
            outputRange: [leftMargin,5]
        });
        return {
            marginLeft
        };
    }

    handleEditViewItem(index, action){
        this.props.handleRecipeItem(index, action)
        if (action === 'edit'){
            this.resetPosition();
        }
    }

    handleDeleteRecipe(index){
        Alert.alert('Delete confirm', 'This action will not recoveried, are you to delete this recipe ?', [
            {
                text: 'Affirm',
                style:'destructive',
                onPress: () => {
                    this.resetPosition();
                    this.props.handleRecipeItem(index, 'delete');
                }
            },
            {
                text: 'Cancel',
                style: 'cancel',
            }
        ], {
            cancelable: true,
        })
    }

    render(){
        const {index, recipe } = this.props
        return(
            <View style={styles.itemContainer}>
                <View style={styles.itemView} onPress={()=>{alert('Press !!!')}}>
                    <TouchableOpacity style={styles.itemText} onPress={()=>this.handleEditViewItem(index, 'view')}>
                        <Text style={{fontSize: 20,fontWeight: 'bold'}}>Code: {recipe['key'].split('-')[0].trim()}</Text>
                        <Text style={{fontSize: 18}}>Name: {recipe.key.split('-')[1].trim()}</Text>
                    </TouchableOpacity>
                    <Animated.View style={[styles.itemImage, this.position.getLayout()]} {...this.panResponder.panHandlers}>
                        <Image style={styles.imgView} 
                            source={recipe.imgPath.length===0?require('../assets/MrSushi_Food_Image.jpg'):{uri:recipe.imgPath}}/>
                    </Animated.View>
                </View>
                <Animated.View style={this.getStylesBtnRight()}>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btnStyle, styles.btnEdit]} onPress={()=>{this.handleEditViewItem(index,'edit')}}>
                            <Text style={styles.btnText}>Edit</Text>
                            <FontAwesome name='pencil'size={35} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, styles.btnDelete]} onPress={()=>this.handleDeleteRecipe(index)}>
                            <Text style={styles.btnText}>Delete</Text>
                            <FontAwesome name='trash' size={35} color='white'/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    itemView:{
        flexDirection: 'row',
        width: '100%',
    },
    itemText:{
        justifyContent: 'space-evenly',
        width: '65%'
    },
    itemImage:{
        height: 100,
        width: '35%',
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 0.7,
    },
    imgView: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    btnGroup:{
        position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnStyle:{
        height: 100,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15, 
    },
    btnEdit:{
        backgroundColor: '#6495ed',
        marginRight: 5,
    },
    btnDelete:{
        backgroundColor: 'red'
    },
    btnText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    }
})