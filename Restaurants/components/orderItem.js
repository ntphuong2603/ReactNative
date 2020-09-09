import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Image, Text, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';

export default class OrderItem extends Component{
    constructor(props){
        super(props);
        this.gestureDelay = -30;
        const position = new Animated.ValueXY(0,0);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 0){
                    this.props.setScrollEnabled(false);
                    let newX = gestureState.dx + this.gestureDelay;
                    position.setValue({x: newX, y:0})
                } else if (gestureState.dx < 0){
                    this.props.setScrollEnabled(false);
                    let newX = gestureState.dx + this.gestureDelay;
                    position.setValue({x: newX, y: 0})
                } 
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 75){
                    this.userSwipToRight(gestureState);
                    Animated.timing(this.state.position, {
                        toValue: {x:75, y:0},
                        duration: 100,
                    }).start(()=>{
                        this.props.setScrollEnabled(true);
                    })
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x:0, y:0},
                        duration: 100,
                    }).start(()=>{
                        this.props.setScrollEnabled(true);
                    })
                }
            }
        })
        this.panResponder = panResponder;
        this.state = {position}
    }

    userSwipToRight(ges){
        if (ges.dx > 55){

        }
    }

    getLeftBtnGroupProps(){
        const opacity = this.state.position.x.interpolate({
            inputRange:[0,70],
            outputRange:[0,1]
        })
        const width = this.state.position.x.interpolate({
            inputRange:[0,75],
            outputRange:[0,75],
        })
        //console.log(this.state.position, opacity, width);
        return {opacity: opacity, width: width};
    }

    getRightBtnGroupProps(){
        const opacity = this.state.position.x.interpolate({
            inputRange:[0,75],
            outputRange:[0,1]
        })
        const width = this.state.position.x.interpolate({
            inputRange:[0,75],
            outputRange:[0,75],
        })
        //console.log(this.state.position, opacity, width);
        return {opacity: opacity, width: width};
    }

    render(){
        const {getMenuItem, item} = this.props;
        const menuItem = getMenuItem(item.menuID)
        return(
            <View style={styles.containter}>
                <Animated.View style={this.getLeftBtnGroupProps()}>
                    <TouchableOpacity style={styles.btnRemove}>
                        <MaterialCommunityIcons name='trash-can-outline' size={30} color='white'/>
                        <Text style={{color:'white', fontWeight:'bold', fontSize: 10}}
                            numberOfLines={1} ellipsizeMode='clip'>Remove</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.orderContainer, this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.menuImage} source={menuItem.pict}/>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.menuPric}>{item.menuID} - {menuItem.name}</Text>
                        <View style={styles.priceDetail}>
                            <Text>$ {menuItem.pric} x</Text>
                            <Text> {item.qty} </Text>
                            <Text> = {item.qty*menuItem.pric} $</Text>
                        </View>
                    </View>
                </Animated.View>
                <Animated.View style={this.getRightBtnGroupProps()}>
                    <View style={styles.leftBtnGroup}>
                        <TouchableOpacity style={styles.btnRemove}>
                            <MaterialCommunityIcons name='plus-circle-outline' size={30} color='white'/>
                            <Text style={{color:'white', fontWeight:'bold', fontSize: 10}}
                                numberOfLines={1} ellipsizeMode='clip'>More</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRemove}>
                            <MaterialCommunityIcons name='minus-circle-outline' size={30} color='white'/>
                            <Text style={{color:'white', fontWeight:'bold', fontSize: 10}}
                                numberOfLines={1} ellipsizeMode='clip'>Less</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    containter:{
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
    },
    btnRemove: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
    },
    orderContainer: {
        width:'100%',
        height:'100%',
        flexDirection: 'row',
    },
    imageContainer:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    menuImage:{
        height: '100%',
        resizeMode: 'contain',
        borderColor: 'red',
    },
    priceContainer:{
        flex: 5,
        flexDirection: 'column',
    },
    menuPric: {
        fontSize: 12,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    priceDetail: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    leftBtnGroup:{
        flexDirection: 'row',
        backgroundColor: 'yellow',
    }
})