import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, PanResponder, Text, View, TouchableOpacity, Easing } from 'react-native';

export default class Item extends Component{
    constructor(props){
        super(props);
        const position = new Animated.ValueXY(0,0);
        let scrollStopped = false;
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onResponderTerminationRequest: () => false,
            onPanResponderGrant: () => {
                this.position.setOffset({ x: this.position.x._value, y: 0 });
                this.position.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: (event, gesture) => {
                if (gesture.dx >= SCROLL_THRESHOLD) {
                    this.enableScrollView(true);
                    const x = gesture.dx - SCROLL_THRESHOLD;
                    this.position.setValue({x: x, y: 0 });
                }
            },
            onPanResponderRelease: (event, gesture) => {
                this.position.flattenOffset();
                if (gesture.dx > 0) {
                    this.userSwipedRight(gesture);
                } else {
                    this.resetPosition();
                }
            },
            onPanResponderTerminate: () => {
                Animated.spring(this.position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            }
        })
        this.position = position;
        this.panResponder = panResponder;
    }

    enableScrollView(isEnabled) {
        if (this.scrollStopped !== isEnabled) {
            this.props.swipingCheck(isEnabled);
            this.scrollStopped = isEnabled;
        }
    }

    userSwipedRight(gesture) {
        if (gesture.dx >= FORCE_TO_OPEN_THRESHOLD) {
          this.completeSwipe('right', this.props.leftButtonPressed.bind(this));
        } else if (gesture.dx >= LEFT_BUTTONS_THRESHOLD && gesture.dx < FORCE_TO_OPEN_THRESHOLD) {
            this.showButton('right');
        } else {
          this.resetPosition();
        }
    }

    showButton(side) {
        const x = side === 'right' ? SCREEN_WIDTH / 4 : -SCREEN_WIDTH / 2.5;
        console.log(x, side);
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start(() => this.enableScrollView(false));
    }

    resetPosition() {
        Animated.timing(this.position, {
            toValue: { x: 0, y: 0 },
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    getLeftButtonProps() {
        const opacity = this.position.x.interpolate({
            inputRange: [35, 75, 320],
            outputRange: [0, 1, 0.25]
        });
        const width = this.position.x.interpolate({
            inputRange: [0, 70],
            outputRange: [0, 70]
        });
        return {
            opacity,
            width,
        };
    }

    completeSwipe(dim, cb){
        const x = dim === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
            toValue: {x: x, y: 0 },
            duration: FORCING_DURATION,
            useNativeDriver: true,
        }).start(() => this.props.cleanFromScreen(this.props.id));
        cb();
    }

    render(){
        const {message} = this.props
        return(
            <View style={styles.containerStyle}>
                <Animated.View style={[styles.leftButtonContainer, this.getLeftButtonProps()]}>
                    <TouchableOpacity onPress={() => this.completeSwipe('right', () => this.props.leftButtonPressed())}>
                        <Text numberOfLines={1} ellipsizeMode='clip'>Open</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.textContainer, this.position.getLayout()]} {...this.panResponder.panHandlers}>
                    <Text>{message}</Text>
                </Animated.View>
            </View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCROLL_THRESHOLD = SCREEN_WIDTH/15;
const FORCE_TO_OPEN_THRESHOLD = SCREEN_WIDTH / 5;
const LEFT_BUTTONS_THRESHOLD = SCREEN_WIDTH / 7;
const FORCING_DURATION = 350;

const styles=StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 7,
        marginHorizontal: 7,
        marginTop: 10,
    },
    textContainer: {
        width: SCREEN_WIDTH / 1.03,
        paddingHorizontal: 30,
        paddingVertical: 35,
        borderRadius: 7,
        backgroundColor: '#CFD8DC',
        zIndex: 2,
        borderWidth: 1,
        borderColor: 'red',
    },
    rightButtonContainer: {
        position: 'absolute',
        left: SCREEN_WIDTH / 1.24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 7,
        paddingHorizontal: 18,
        paddingVertical: 23,
        backgroundColor: '#D50000',
        zIndex: 1
    },
    leftButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 7,
        paddingHorizontal: 18,
        paddingVertical: 23,
        backgroundColor: '#50f442',
        position: 'absolute',
        height: '100%',
    }
})