import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { BottomTab} from './components/componentsIndex';
import { OrderRecipe, SearchRecipe, InputRecipe } from './screens/indexMainScreen';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      selectedTab:2,
      searchResults: [],
      orderList: [],
      recipeList: [],
      recipe: {
        code: '',
        name: '',
        list: [],
        pict: {
          dine_in: '',
          take_out: '',
        }
      }
    }
  }

  async componentDidMount(){
    await AsyncStorage.getAllKeys()
      .then(results=>{this.setState({recipeList: results})})
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
    //this.state.recipeList.push(newRecipe)
    //this.forceUpdate();
  }

  handleRecipe = (text, fieldName, subFieldName=null) => {
    const {recipe} = this.state
    switch (fieldName){
      case 'code':
        recipe.code = text;
        break;
      case 'name':
        recipe.name = text;
        break;
      case 'list':
        recipe.list.push(text);
        break;
      case 'pict':
        if (subFieldName==='IN'){
          recipe.pict.dine_in = text;
        } else {
          recipe.pict.take_out = text;
        }
        break;
    }
    this.setState({recipe: recipe})
}

  showScreen(tab){
    const {recipeList, searchResults, orderList, recipe} = this.state;
    const screenList = [
      <OrderRecipe recipeList={recipeList} handleOrderList={this.handleOrderList} orderList={orderList} />,
      <SearchRecipe recipeList={recipeList} searchResults={searchResults} handleSearchResults={this.handleSearchResults} />,
      <InputRecipe recipe={recipe} handleUpdateRecipeList={this.handleUpdateRecipeList} handleRecipe={this.handleRecipe} />
    ]
    return screenList[tab];
  }

  render(){
    const {selectedTab} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {this.showScreen(selectedTab)}
        </View>
        <BottomTab selectedTab={selectedTab} handleSelectTab={this.handleSelectTab}/>
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
