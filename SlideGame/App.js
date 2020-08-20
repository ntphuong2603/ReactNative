import React, { Component } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Platform, Button, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WonScreen from './components/wonScreen';
import MenuControl from './components/menuControl';
import GameBoard from './components/gameBoard';
import Startgame from './components/startGame';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isMenuShow:false,
      tiles: {
        row: 3,
        col: 3,
      },
      time: 0,
      move: 0,
      gameStart : false,
      gameWon : false,
      interval: null,
    }
    this.updateTiles = this.updateTiles.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
    this.handleGameWon = this.handleGameWon.bind(this);
  }

  updateTiles = (tiles)=>{ 
    this.setState({tiles:{...tiles}});
    this.handleShowMenu();
    this.handleGameStart();
  }

  handleGameStart = () => {
    const {gameStart} = this.state;
    this.setState({gameStart: !gameStart})
    clearInterval(this.state.interval);
    if (!gameStart){
      this.setupInterval()
    }
  }

  handleGameWon = () => {
    const {gameWon} = this.state;
    this.setState({gameWon: !gameWon})
    if (!gameWon){
      clearInterval(this.state.interval);
    } 
  }

  handleShowMenu = () => {
    const {isMenuShow, gameStart} = this.state;
    clearInterval(this.state.interval);
    //console.log('Outside: ', gameStart, isMenuShow);
    this.setState({isMenuShow: !isMenuShow})
    if (gameStart && isMenuShow){
      //console.log('Inside: ',gameStart, isMenuShow)
      this.resumeInterval();
    }
  }

  setupInterval = () => {
    this.setState({interval:setInterval(this.setTime,1000), time: 0, move: 0});
  }

  resumeInterval = () => {
    const {time, move} = this.state;
    this.setState({interval:setInterval(this.setTime,1000), time: time, move: move});
  }
  
  setTime = () => { this.setState({time: this.state.time + 1})}

  getTimeString = () => {
    const str = (value) => {
      if (value<10){
        return '0' + value.toString()
      }
      return value.toString();
    }
    const {time} = this.state;
    const min = Math.floor(time/60)
    const sec = time - min*60
    return str(min)+':'+str(sec)
  }

  render(){
    const { isMenuShow, tiles, gameStart, gameWon, time, move} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Text style={styles.timeContainer}>Time: {this.getTimeString()} </Text>
          <Text style={styles.moveContainer}>Move: {move}</Text>
          <TouchableOpacity style={styles.menuIcon} onPress={this.handleShowMenu}>
            <MaterialCommunityIcons name={isMenuShow?'close':'menu'} color={isMenuShow?'#ff4500':'#1e90ff'} size={30}/>
          </TouchableOpacity>
        </View>
        {isMenuShow && 
          <MenuControl tiles={tiles} updateTitles={this.updateTiles} handleShowMenu={this.handleShowMenu}/>}
        <GameBoard tiles={tiles} 
          isMenuShow={isMenuShow} handleGameWon={this.handleGameWon}
          handleMoveCount={()=>{this.setState({move: this.state.move+1})}}/>
        {!gameStart && <Startgame handleGameStart={this.handleGameStart}/>}
        {gameWon && <WonScreen time={time} move={move} handleWonScreen={this.handleGameWon}/>}
      </View>
    );
  }
}

const iosStatusBas = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    marginTop: Platform.OS==='ios'?iosStatusBas:0,
    marginBottom: Platform.OS==='ios'?iosStatusBas:0,
    margin: 7,
  },
  menuContainer:{
    height: 30,
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon:{
    alignItems:'center',
  },
  timeContainer: {
  },
  moveContainer:{
  },
  menuText:{
  }
});