import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchRecipe, InputRecipe, EditRecipe, BottomTab} from './components/componentsIndex';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedTab:'search',
      searchResults: [],
    }
    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  componentDidMount(){
    const permissions = Camera.requestPermissionsAsync();
    if (permissions.status === 'granted'){
      console.log('Camear access granted');
    } else {
      console.log('Camear access denied');
    }
  }

  handleSelectTab = (selectedTab) => {
    this.setState({selectedTab: selectedTab})
  }

  handleSearchResults = (searchResults) => {
    this.setState({searchResults: searchResults});
  }

  render(){
    const {selectedTab, viewItem, recipeItem} = this.state;
    const Stack=createStackNavigator();
    
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {selectedTab==='search' && <SearchRecipe searchResults={this.state.searchResults} handleSearchResults={this.handleSearchResults}/>}
          {selectedTab==='input' && <InputRecipe/>}
        </View>
        <BottomTab selectedTab={selectedTab} tabList={['search', 'input']} handleSelectTab={this.handleSelectTab}/>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    marginTop: 30,
  },
  mainContainer:{
    height: '92%',
    margin: 5,
    marginBottom: 0,
  }
})
