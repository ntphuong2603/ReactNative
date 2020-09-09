import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder } from 'react-native'
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
                if (gesture.dx <= 30){
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
    }

    swiptToLeft(gesture){
        if (gesture.dx <= -70){
            const x = -(65*2+5)
            Animated.timing(this.position, {
                toValue:{x:x, y:0},
                duration: 250,
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
        const marginLeft = this.position.x.interpolate({
            inputRange: [-130,-5],
            outputRange: [-130,5]
        });
        return {
            marginLeft
        };
    }

    render(){
        const {index, recipe, handleRecipeItem } = this.props
        return(
            <View style={styles.itemContainer}>
                <Animated.View style={[this.position.getLayout()]} {...this.panResponder.panHandlers}>
                    <View style={styles.itemView}>
                        <View style={styles.itemText}>
                            <Text style={{fontSize: 20,fontWeight: 'bold'}}>Code: {recipe['key'].split('-')[0].trim()}</Text>
                            <Text style={{fontSize: 18}}>Name: {recipe.key.split('-')[1].trim()}</Text>
                        </View>
                        <Image style={styles.itemImage} source={{uri:recipe.imgPath}}/>
                    </View>
                </Animated.View>
                <Animated.View style={this.getStylesBtnRight()}>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btnStyle, styles.btnView]} onPress={()=>{handleRecipeItem(recipe,true); this.resetPosition()}}>
                            <Text style={styles.btnText}>View</Text>
                            <FontAwesome name='eye' size={35} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, styles.btnEdit]} onPress={()=>{handleRecipeItem(recipe,false); this.resetPosition()}}>
                            <Text style={styles.btnText}>Edit</Text>
                            <FontAwesome name='pencil' size={35} color='white'/>
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
    btnGroup:{
        position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnStyle:{
        height: 100,
        width: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15, 
    },
    btnView:{
        backgroundColor: '#1e90ff',
        marginRight: 5,
    },
    btnEdit:{
        backgroundColor: '#cd5c5c',
    },
    btnText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    }
})