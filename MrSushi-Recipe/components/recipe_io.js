import { AsyncStorage } from 'react-native'

export const getRecipes = async(codes) => {
    const results = await AsyncStorage.multiGet(codes,(error, results)=>{
        if (error){
            return null
        } else {
            
        }
    })
    const list = []
    results.forEach(result=>{
        const value = JSON.parse(result[1])
        const recipe = {
            code: result[0],
            ...value,
        }
        list.push(recipe)
    })
    console.log('Get Recipe list: ', list);
    return list;
}

export const write_recipe = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true
    } catch (error) {
        console.log('Write Reciper Error: ',error);
        return false
    }
}

export const delete_recipe = async(key) => {
    await AsyncStorage.removeItem(key, error=>{
        if (error){
            console.log(error);
            return false;
        }
        else {
            return true;
        }
    })
}

export const update_recipe = async(key, value) => {

}