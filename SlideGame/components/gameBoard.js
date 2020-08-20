import React, { Component } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import Tiles from './tiles';

export default class GameBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            tileW:0,
            tileH:0,
            tileList : [],
            posTile : '',
            goalList : [],
        }
        this.moveTile = this.moveTile.bind(this);
    }

    componentDidMount(){
        this.getTileList(this.props.tiles);
    }

    componentDidUpdate(preProps){
        const oldTiles = preProps.tiles;
        const newTiles = this.props.tiles;
        if (oldTiles.row !== newTiles.row || oldTiles.col !== newTiles.col){
            this.getTileList(newTiles);
        }
    }

    getTileList = (tiles) => {
        const statusBar = Platform.OS==='ios'?Constants.statusBarHeight:0;
        this.setState({
            tileW: Math.floor((Dimensions.get('window').width-(tiles.row*10+20))/(tiles.row)),
            tileH: Math.floor((Dimensions.get('window').height-(tiles.col*10+statusBar*2+20))/(tiles.col)),
        })
        const list = [];
        const goal = [];
        const tileList = [];
        const maxNumber = tiles.row * tiles.col;
        let randNumber = Math.floor(Math.random()*maxNumber);
        for (let rowIndex = 0; rowIndex < tiles.row; rowIndex++) {
            for (let colIndex = 0; colIndex < tiles.col; colIndex++) {
                while (list.includes(randNumber)){
                    randNumber = Math.floor(Math.random()*(maxNumber)); 
                 }
                list.push(randNumber);
                tileList.push({value: randNumber, 
                    pos: JSON.stringify({row: rowIndex, col: colIndex}),
                    move: JSON.stringify([  {row:rowIndex, col:colIndex+1},
                                            {row:rowIndex+1, col:colIndex},
                                            {row:rowIndex, col:colIndex-1},
                                            {row:rowIndex-1, col:colIndex}])});
                goal.push(goal.length+1);
                if (randNumber===0){
                    this.setState({posTile:JSON.stringify({row: rowIndex, col: colIndex})});
                }
            }
        }
        console.log(list, goal);
        goal.pop();
        goal.push(0);
        this.setState({tileList: tileList, goalList: goal})
    }

    moveTile = (value) => {
        const {tileList} = this.state;
        const tileZero = tileList.filter(each=>each.value===0)[0]
        const tileMove = tileList.filter(each=>each.value===value)[0];
        if (tileMove.move.includes(this.state.posTile)){
            tileZero.value = tileMove.value;
            tileMove.value = 0;
            this.setState({posTile:tileMove.pos, tileList: tileList});
            this.props.handleMoveCount();
            if (this.isGoal()) {
                this.props.handleGameWon(true);
            }
        }
    }

    isGoal = () => {
        let index = 0;
        while (index<this.state.tileList.length){
            if (this.state.tileList[index].value!==this.state.goalList[index]){
                return false
            }
            index++;
        }
        return true;
    }

    render(){   
        const {tileList, tileH, tileW} = this.state;
        return(
            <View style={styles.container}>
                {tileList.map(each=>{
                    return(
                        <Tiles key={each.value} value={each.value} 
                            tileH={tileH} tileW={tileW} moveTile={this.moveTile}
                            isMenuShow={this.props.isMenuShow}/>
                    )
                })}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        height: '100%',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
})