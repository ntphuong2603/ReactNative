import React, { Component } from 'react';
import WebView from 'react-native-webview';

export default class DetailScreen extends Component{
    render(){
        const {link} = this.props.route.params;
        return(
            <WebView source={{uri:link}} />
        )
    }
}