import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { SearchRecipe, InputRecipe, BottomTab} from './components/componentsIndex';
import { Camera } from 'expo-camera';
import OrderRecipe from './components/orderRecipe';

const TAB_LIST = ['order', 'search', 'input']

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedTab:0,
      searchResults: [],
      orderList: [],
      recipeList: []
    }
    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  async componentDidMount(){
    await AsyncStorage.getAllKeys().then(results=>{
      console.log(results);
      this.setState({recipeList: results})
    })
    
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

  handleOrderList = (orderList) => {
    this.setState({orderList: orderList});
  }

  handleUpdateRecipeList = (newRecipe) => {
    const {recipeList} = this.state
    recipeList.push(newRecipe)
    this.setState({recipeList: recipeList})
  }

  render(){
    const {selectedTab, recipeList, searchResults, orderList} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {selectedTab===0 && <OrderRecipe recipeList={recipeList} handleOrderList={this.handleOrderList} orderList={orderList}/>}
          {selectedTab===1 && <SearchRecipe recipeList={recipeList} searchResults={searchResults} handleSearchResults={this.handleSearchResults}/>}
          {selectedTab===2 && <InputRecipe handleUpdateRecipeList={this.handleUpdateRecipeList}/>}
        </View>
        <BottomTab selectedTab={selectedTab} tabList={TAB_LIST} handleSelectTab={this.handleSelectTab}/>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    marginTop: 30,
  },
  mainContainer:{
    height: '90%',
    margin: 5,
    marginBottom: 0,
  }
})
