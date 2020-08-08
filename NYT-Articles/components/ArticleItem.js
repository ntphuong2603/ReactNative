import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Image, Text } from 'react-native';

export default class ArticleItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {item, navigation} = this.props
        return(
            <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('Detail',{link:item.web_url})}}>
                <Text style={styles.headline}>{item.headline.main}</Text>
                <Text style={styles.abstract}>{item.abstract}</Text>
                <Text style={styles.author}>{item.byline.original}</Text>
                <Text style={styles.pubDate}>{item.pub_date}</Text>
            </TouchableOpacity>
        )
    }
}

const baseFontSize = 12;

const styles=StyleSheet.create({
    container:{
        flexDirection: 'column',
        marginTop: 10,
    },
    headline: {
        fontSize: baseFontSize + 5,
        fontWeight: 'bold',
        color: 'black',
    },
    abstract:{
        fontSize: baseFontSize + 2,
        color: '#696969',
        marginTop:5,
    },
    author: {
        fontSize: baseFontSize,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#808080',
    },
    pubDate:{
        fontSize: baseFontSize - 2,
        color: '#a9a9a9'
    }
})