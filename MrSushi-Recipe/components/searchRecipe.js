import React, { Component, useContext } from 'react'
import { View, Text, StyleSheet, AsyncStorage, TextInput, Image, TouchableOpacity, ScrollView, Keyboard} from 'react-native'
import { MaterialIcons } from 'react-native-vector-icons'
import AppContext from './shareData'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SearchRecipe extends Component{
    static contextType = AppContext;

    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            recipeList: [],
            searchResults: [],
        }
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    async componentDidMount(){
        const list = await AsyncStorage.getAllKeys();
        this.setState({recipeList: list, ...this.context})
        //console.log('Comp Did Mount: ', this.context);
        //console.log('componentDidMoutn: ', useContext(AppContext))
    }

    handleSearchText(text){
        this.setState({searchText: text})
    }

    handleSearchResult = async ()=>{
        const {searchText, recipeList, searchResults} = this.state
        const recipeSearchList = []
        if (searchResults.length > 0){
            searchResults.forEach(value=>{
                recipeSearchList.push(value.key)
            })
        }
        //console.log('1-: ', recipeSearchList);
        if (searchText.length > 0){
            const searchList = []
            searchText.trim().toLowerCase().split(' ').forEach(text=>{
                recipeList.forEach(recipe=>{
                    if (recipe.toLowerCase().search(text)>=0){
                        searchList.push(recipe)
                    }
                })
            })
            const list_2 = searchList.filter(recipe=>!recipeSearchList.includes(recipe))
            recipeSearchList.push(...list_2)
        }
        await AsyncStorage.multiGet(recipeSearchList, (error, results)=>{
            if (error){
                console.log(error);
            } else {
                const resutlList = []
                results.forEach(result=>{
                    resutlList.push({key: result[0], ...JSON.parse(result[1])})
                })
                this.setState({searchResults: resutlList, searchText: ''})
                //console.log(resutlList);
            }
        })
        Keyboard.dismiss();
    }

    componentWillUnmount(){
        const { handleSearchResults } = this.state
        if (handleSearchResults){
            handleSearchResults(this.state.searchResults)
        }
    }

    render(){
        const { searchText, searchResults } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchText}
                        value={searchText}
                        placeholder='Code or name of recipe ...'
                        onChangeText={this.handleSearchText}/>
                    <TouchableOpacity style={styles.btnSearchContainer} onPress={this.handleSearchResult}>
                        <MaterialIcons name='search' color='gray' size={45}/>
                    </TouchableOpacity>
                </View>
                <View>
                    {searchResults.length>0 && <TouchableOpacity style={styles.btnClear} onPress={()=>this.setState({searchResults:[]})}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}> Clear search history</Text>
                    </TouchableOpacity>}
                    <ScrollView>
                        {searchResults.map((recipe, index)=>{
                            return(
                                <View key={index} style={styles.searchView}>
                                    <View style={styles.searchResultContainer} >
                                        <View style={styles.searchResultTextArea}>
                                            <Text style={{fontSize: 18}}>Code: {recipe['key'].split('-')[0].trim()}</Text>
                                            <Text style={{fontSize: 13}}>Name: {recipe.key.split('-')[1].trim()}</Text>
                                            <TouchableOpacity style={styles.btnIngredient} onPress={()=>{this.props.navigation.navigate('DetailRecipe',{'recipe':searchResults[index]})}}>
                                                <Text style={styles.txtIngredient}>Ingredient: ...</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.searchResultImageCon} onPress={()=>{this.props.navigation.navigate('EditRecipe',{'recipe':searchResults[index]})}}>
                                            <Image style={styles.searchResultImage} source={{uri:recipe.imgPath}}/>
                                            <Text style={styles.txtEdit}>Edit recipe</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    searchView:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    searchContainer:{
        height: 40,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 55,
    },
    searchText:{
        fontSize: 15,
        marginLeft: 10,
        width: '82%',
    },
    btnSearchContainer:{
    },
    searchResultContainer:{
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchResultTextArea:{
        width: '65%',
        justifyContent: 'space-evenly',
    },
    searchResultText:{
        fontSize: 20,
    },
    searchResultImageCon:{
        height: 100,
        width: '35%',
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 0.7,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    searchResultImage:{
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
    btnClear:{
        borderRadius: 10,
        backgroundColor: '#00bfff',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    btnIngredient:{
        marginRight: 10,
    },
    txtIngredient:{
        color: '#c0c0c0',
    },
    txtEdit:{
        position: 'absolute',
        fontSize: 10,
        color: 'white',
    }
})