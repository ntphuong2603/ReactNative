export default function getPict(pictName){
    const pathStr = '../assets/menuPicts/' + pictName;
    console.log(pathStr);
    //const pict = require(pathStr);
    return pathStr
}