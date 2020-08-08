import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import ArticleItem from './ArticleItem';

export default class ArticleList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { data, navigation, refreshing, onRefresh} = this.props;
        return(
            <FlatList
                data={data}
                keyExtractor={item=>item._id}
                renderItem={renderItems=><ArticleItem item={renderItems.item} navigation={navigation}/>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>
        )
    }
}
