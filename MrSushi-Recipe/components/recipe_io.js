import { AsyncStorage } from 'react-native'

export const getRecipes = async(keyList) => {
    const results = await AsyncStorage.multiGet(keyList, (error, results)=>{
        if (error){
            console.log(error);
        } else {
            return results;
        }
    })
    const resultList = []
    results.forEach(result=>{
        resultList.push({key: result[0], ...JSON.parse(result[1])})
    })
    return resultList;
}

export const write_recipe = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value),(error)=>{
            if (error){
                console.log('Write Recipe Error:', error);
            } else {
                return true;
            }
        })
    } catch (error) {
        console.log('WRITE Recipe Error: ',error);
        return false
    }
}

export const delete_recipe = async(key) => {
    try {
        await AsyncStorage.removeItem(key, error=>{
            if (error){
                console.log('DELETE Recipe Error: ',error);
                return false;
            }
            else {
                return true;
            }
        })
    } catch (error) {
        console.log('DELETE Recipe Error: ',error);
        return false
    }
    
}

export const update_recipe = async(key, value) => {

}