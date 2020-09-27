import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import { BottomTab} from './components/componentsIndex';
import { OrderRecipe, SearchRecipe, InputRecipe } from './screens/indexMainScreen';
import { delete_recipe, getRecipe, getRecipes, write_recipe } from './components/recipe_io';

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
      .then(results=>{
        console.log('Keylist: ',results);
        this.setState({recipeList: results})
        /*
        const newRecipe = {}
        results.forEach(async (key)=>{
          //delete_recipe(key);
          newRecipe['key'] = key.split(' - ')[0].trim();
          newRecipe['name'] = key.split(' - ')[1].trim();
          newRecipe['list'] = []
          newRecipe['pict'] = {}
          newRecipe.pict['take_out'] = ''
          const oldRecipe = new  Promise(getRecipe(key))
          newRecipe.list = oldRecipe.ingredient
          newRecipe.pict['dine_in'] = oldRecipe['imgPath']
          console.log(oldRecipe, newRecipe);
        })
        console.log(newRecipe);
        */
      })
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

  handleUpdateRecipeList = () => {
    const {recipeList, recipe, searchResults} = this.state
    const key = `${recipe.code.trim()} - ${recipe.name.trim()}`
    //delete recipe.code
    //const value = {...recipe}
    console.log(key,recipe);
    if (write_recipe(key, recipe)){
      //const obj = {}
      //obj[key] = value;
      recipeList.push(key)
      searchResults.push(recipe)
      this.setState({ recipeList: recipeList, 
                      recipe: {...this.resetRecipe()}, 
                      searchResults: searchResults})
      Alert.alert('Create','New recipe is created successfully',[
        {
          text: 'OK',
          style: 'default'
        }
      ])
    }
  }

  resetRecipe(){
    return {
      code: '',
      name: '',
      list: [],
      pict: {
        dine_in: '',
        take_out: '',
      }
    }
  }

  handleRecipe = (fieldValue, fieldName, subFieldName=null) => {
    const {recipe} = this.state
    if (fieldName==='pict'){
      if (subFieldName==='IN'){
        recipe.pict.dine_in = fieldValue;
      } else {
        recipe.pict.take_out = fieldValue;
      }
    } else if (fieldName==='list'){
      recipe.list.push(fieldValue)
    } else {
      recipe[fieldName] = fieldValue
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
