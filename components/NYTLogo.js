import React from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';

export default function NYTLogo(ratio){

    const screenWidth = Math.round(Dimensions.get('window').width*(ratio.ratio?ratio.ratio/100:1));

    const styles=StyleSheet.create({
        imageContainer:{
            width: screenWidth,
            height: screenWidth*0.2,
            resizeMode: 'cover',
        }
    })

    return(
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={require('../assets/NYTLogo.png')}/>
        </View>
    )
}