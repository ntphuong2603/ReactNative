import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import NYTLogo from '../components/NYTLogo';
import SearchBar from '../components/SearchBar';
import ArticleList from '../components/ArticleList';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            refreshing: false,
            isLoading: true,
            articleList : [],
        }
        this.onRefresh = this.onRefresh.bind(this);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onSearchPress = this.onSearchPress.bind(this);
    }

    componentDidMount(){
        this.getArticleList();
    }

    onSubmit = () => {
        this.getArticleListBySearch();
    }

    onSearchPress = () => {
        this.getArticleListBySearch();
    }

    getArticleListBySearch = () => {
        Keyboard.dismiss();
        this.setState({isLoading:true});
        this.getArticleList();
    }

    onSearchTextChange = (text) => {
        this.setState({searchText: text});
    }

    onRefresh = () => {
        this.getArticleList();
    }

    getArticleList = () => {
        const {searchText} = this.state
        const apiKey = 'api-key=FXzZD0RduuioUWQoQ4FAxhTJpJFN3Bkb';
        const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
        let query = '';
        if (searchText.trim().length > 0){ query = `q=${searchText}&` } 
        const url=`${baseUrl}${query}${apiKey}`
        fetch(url)
            .then(response=>response.json())
            .then(responseJson=>this.setState({isLoading:false,articleList:responseJson.response.docs,searchText:''}))
            .catch(error=>console.log(error))
    }

    showArticlesList = () => {
        const {isLoading} = this.state;
        if (isLoading){
            return(
                <ActivityIndicator size='large' color='black'/>
            )
        } else {
            const {articleList, refreshing} = this.state;
            const { navigation } = this.props
            return(
                <ArticleList data={articleList} navigation={navigation} 
                    refreshing={refreshing} onRefresh={this.onRefresh}/>
            )
        }
    }

    render(){
        const {searchText} = this.state
        return(
            <View style={styles.container}>
                <NYTLogo/>
                <SearchBar 
                    searchText={searchText} onChangeText={this.onSearchTextChange} 
                    onSubmit={this.onSubmit} onSearchPress={this.onSearchPress}/>
                <View style={styles.articleList}>
                    {this.showArticlesList()}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        padding: 7,
        marginTop: 20,
    },
    articleList: {
        marginTop: 5,
        marginBottom: 25,
    }
})