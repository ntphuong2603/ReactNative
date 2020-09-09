import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchRecipe, InputRecipe, EditRecipe, BottomTab} from './components/componentsIndex';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppContext from './components/shareData'
import DetailRecipe from './components/detailRecipe';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedTab:'search',
      searchResults: [],
    }
    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  handleSelectTab = (selectedTab) => {
    this.setState({selectedTab: selectedTab})
  }

  handleSearchResults = (searchResults) => {
    this.setState({searchResults: searchResults});
  }

  render(){
    const {selectedTab} = this.state;
    const Stack=createStackNavigator();
    
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {selectedTab==='search' && 
            <NavigationContainer>
              <AppContext.Provider value={{searchResults: this.state.searchResults, handleSearchResults: this.handleSearchResults}}>
                <Stack.Navigator headerMode='screen'>
                  <Stack.Screen name='SearchRecipe' component={SearchRecipe} options={{title: null}}/>
                  <Stack.Screen name='EditRecipe' options={({route})=>({title: route.params.titleName})} component={EditRecipe}/>
                  <Stack.Screen name='DetailRecipe' options={({route})=>({title: route.params.recipe.key})} component={DetailRecipe}/>
                </Stack.Navigator>
              </AppContext.Provider>
            </NavigationContainer>
          }
          {selectedTab==='input' && <InputRecipe/>}
        </View>
        <BottomTab selectedTab={selectedTab} tabList={['search', 'input']} handleSelectTab={this.handleSelectTab}/>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    marginTop: 35,
  },
  mainContainer:{
    height: '90%',
    margin: 5,
    backgroundColor: 'white',
  }
})
