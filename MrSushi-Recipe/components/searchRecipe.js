import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, Animated, PanResponder, Dimensions} from 'react-native'
import { MaterialIcons } from 'react-native-vector-icons'
import AppContext from './shareData'
import RecipeItem from './recipeItem'
import DetailRecipe from './detailRecipe'
import EditRecipe from './editRecipe'

export default class SearchRecipe extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            recipeList: [],
            searchResults: this.props.searchResults,
            handleSearchResults: this.props.handleSearchResults, 
            scrollEnabled: true,
            isViewDetail: true,
            recipeItem: null,
        }
        this.handleSearchText = this.handleSearchText.bind(this);
        this.handleScrollEnable = this.handleScrollEnable.bind(this);
        this.handleRecipeItem = this.handleRecipeItem.bind(this);
        this.position = new Animated.ValueXY(0,0)
    }

    moveScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH, y:0},
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    resetScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: 0, y:0},
            duration: 450,
            useNativeDriver: false,
        }).start()
    }

    async componentDidMount(){
        const list = await AsyncStorage.getAllKeys();
        this.setState({recipeList: list})
    }

    handleSearchText(text){
        this.setState({searchText: text})
    }

    handleScrollEnable(){
        const { scrollEnabled } = this.state;
        this.setState({scrollEnabled: !scrollEnabled})
    }

    handleRecipeItem(recipe,isViewDetail){
        this.setState({recipeItem: recipe, isViewDetail: isViewDetail})
        this.moveScreen()
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
        const { searchText, searchResults, scrollEnabled, recipeItem, isViewDetail } = this.state
        return(
            <Animated.View style={[this.position.getLayout()]}>
                <View style={styles.container}>
                    <View style={styles.searchView}>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchText}
                                value={searchText}
                                placeholder='Code or name of recipe ...'
                                onChangeText={this.handleSearchText}/>
                            <TouchableOpacity style={styles.btnSearch} onPress={this.handleSearchResult}>
                                <MaterialIcons name='search' color='gray' size={45}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {searchResults.length>0 && <TouchableOpacity style={styles.btnClear} onPress={()=>this.setState({searchResults:[]})}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}> Clear search history</Text>
                            </TouchableOpacity>}
                            <ScrollView scrollEnabled={scrollEnabled}>
                                {searchResults.map((recipe, index)=>{
                                    return(
                                        <RecipeItem key={index} recipe={recipe} index={index}
                                            handleScrollEnable={this.handleScrollEnable}
                                            handleRecipeItem={this.handleRecipeItem}/>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        {isViewDetail && <DetailRecipe recipe={recipeItem} backToSearch={this.resetScreen}/>}
                        {!isViewDetail && <EditRecipe recipe={recipeItem} backToSearch={this.resetScreen}/>}
                    </View>
                </View>
            </Animated.View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
//const SCREEN_HEIGHT = Dimensions.get('screen').height;

const styles=StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    searchView:{
        width: '100%',
        height: '100%',
    },
    itemView:{
        width: "100%",
        height: '100%',
        marginLeft: 10,
        position: 'relative',
    },
    searchContainer:{
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
    },
    searchText:{
        fontSize: 20,
        width: '86%',
        marginLeft: 5,
    },
    btnSearch:{
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
})