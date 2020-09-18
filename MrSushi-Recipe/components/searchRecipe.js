import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, TextInput,  TouchableOpacity, ScrollView, Keyboard, Animated, Dimensions, Alert} from 'react-native'
import { MaterialIcons } from 'react-native-vector-icons'
import RecipeItem from './recipeItem'
import DetailRecipe from './detailRecipe'
import EditRecipe from './editRecipe'
import { delete_recipe } from './recipe_io'
import SearchResultBar from './searchResultBar'

export default class SearchRecipe extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            scrollEnabled: true,
            isViewDetail: true,
            recipeItem: null,
            sorting: {
                isCode: true,
                isAsc: true,
            }
        }
        this.handleSearchText = this.handleSearchText.bind(this);
        this.handleScrollEnable = this.handleScrollEnable.bind(this);
        this.handleRecipeItem = this.handleRecipeItem.bind(this);
        this.handleSortResults = this.handleSortResults.bind(this);
        this.position = new Animated.ValueXY(0,0)
    }
    
    componentDidMount(){
        this.handleSortResults()
    }

    moveToItemScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH, y:0},
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    moveToCameraScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: -(SCREEN_WIDTH*2), y:0},
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    backToSearchScreen = () => {
        Animated.spring(this.position, {
            toValue: {x: 0, y:0},
            duration: 450,
            useNativeDriver: false,
        }).start()
    }

    handleSearchText(text){
        this.setState({searchText: text})
    }

    handleScrollEnable(){
        const { scrollEnabled } = this.state;
        this.setState({scrollEnabled: !scrollEnabled})
    }

    handleRecipeItem(index, action){
        const { searchResults }= this.props
        if (action==='delete'){
            const key = searchResults[index].key
            //if (this.deleteRecipe(key)){
            if (delete_recipe(key)){
                searchResults.splice(index, 1)
                this.props.handleSearchResults(searchResults)
                alert('Recipe is deleted successfully!')
            }
            
        } else {
            if (action=='edit'){
                this.setState({recipeItem: searchResults[index], isViewDetail: false})
            } else {
                this.setState({recipeItem: searchResults[index], isViewDetail: true})
            }
            this.moveToItemScreen()
        }
        
    }

    async deleteRecipe(key){
        try {
            await AsyncStorage.removeItem(key, (error)=>{
                if (error){
                    return false
                }
                return true
            })
        } catch(error){
            console.log(error);
        }
    }

    handleUpdateRecipe = async (key, newRecipe) => {
        await AsyncStorage.mergeItem(key, JSON.stringify(newRecipe), (error)=>{
            if (error){
                console.log('MERGE item error:', error);
                return false
            }
        }).then(()=>{
            const newList = this.props.searchResults.filter(result=>result.key !== key)
            newList.push({key: key, ...newRecipe})
            this.props.handleSearchResults(newList)
            return true
        })
        /*
        await AsyncStorage.removeItem(key, (error)=>{
            if (error){
                console.log('Remove item error: ', error);
                return false
            }
        }).then(await AsyncStorage.setItem(key, JSON.stringify(newRecipe), (error)=>{
            if (error){
                console.log('SET item error: ', error);
                return false
            }
        })).then(()=>{
            const newList = this.props.searchResults.filter(result=>result.key !== key)
            newList.push({key: key, ...newRecipe})
            this.props.handleSearchResults(newList)
            return true
        })
        */
    }

    handleSearchResult = async ()=>{
        const { searchText } = this.state
        const { searchResults, recipeList } = this.props
        const recipeSearchList = []
        if (searchResults.length > 0){
            searchResults.forEach(value=>{
                recipeSearchList.push(value.key)
            })
        }
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
                this.props.handleSearchResults(resutlList)
                this.setState({searchText: ''})
            }
        })
        Keyboard.dismiss();
    }

    handleSortResults = (sortType) => {
        const {sorting} = this.state
        if (sortType==='codeName'){
            sorting.isCode = !sorting.isCode;
        } else if (sortType==='AscDesc'){
            sorting.isAsc = !sorting.isAsc
        }
        const {searchResults} = this.props

        const sortField = sorting.isCode ? 0 : 1;
        
        searchResults.sort((a,b)=>{
            const a1 = a.key.split(' - ')[sortField]
            const b1 = b.key.split(' - ')[sortField]
            return (a1 - b1 >= 0)
        })
        this.setState({sortField: {...sorting}})
        this.props.handleSearchResults(searchResults);
    }

    render(){
        const { searchText, scrollEnabled, recipeItem, isViewDetail, sorting } = this.state
        const { searchResults, handleSearchResults } = this.props
        return(
            <Animated.View style={[this.position.getLayout()]}>
                <View style={styles.container}>
                    <View style={styles.searchView}>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchText}
                                value={searchText}
                                placeholder='Code or name of recipe ...'
                                onChangeText={this.handleSearchText}
                                clearButtonMode='while-editing'/>
                            <TouchableOpacity style={styles.btnSearch} onPress={this.handleSearchResult}>
                                <MaterialIcons name='search' color='gray' size={45}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchResults}> 
                            {searchResults.length>0 && <SearchResultBar 
                                handleSearchResults={handleSearchResults} sorting={sorting}
                                handleSortResults={this.handleSortResults}/>}
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
                        {isViewDetail && <DetailRecipe recipe={recipeItem} backToSearch={this.backToSearchScreen}/>}
                        {!isViewDetail && <EditRecipe recipe={recipeItem} 
                            backToSearch={this.backToSearchScreen} 
                            moveToCameraScreen={this.moveToCameraScreen}
                            moveToItemScreen={this.moveToItemScreen}
                            handleUpdateRecipe={this.handleUpdateRecipe}
                            handleUpdateResultList={this.handleUpdateResultList}/>}
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
        position: 'relative',
        marginLeft: 10,
    },
    searchResults: {
        height: '93%'
    },
    cameraView:{
        width: "100%",
        height: '100%',
        position: 'relative',
        marginLeft: 10,
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
})