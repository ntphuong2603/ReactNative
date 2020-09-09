import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen, MenuScreen, UserScreen, OrderScreen } from './screens/ScreenIndex';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalOrder: 0,
      totalCost: 0,
      orderList : [],
      data : [
        {
          id: '001',
          name: 'GRILLED MEAT',
          desc: '',
          pric: '5.00',
          pict: require('./assets/menuPicts/A3.jpg'),
        },{
          id: '002',
          name: 'VIETNAMESE SALAD',
          desc: 'Onions, cucumber, tomatoes and Vietnamese dressing',
          pric: '12.50',
          pict: require('./assets/menuPicts/A5.jpg'),
        },{
          id: '003',
          name: 'GRILLED MEAT',
          desc: '',
          pric: '5.00',
          pict: require('./assets/menuPicts/A3.jpg'),
        },{
          id: '004',
          name: 'VIETNAMESE SALAD',
          desc: 'Onions, cucumber, tomatoes and Vietnamese dressing',
          pric: '12.50',
          pict: require('./assets/menuPicts/A5.jpg'),
        },
        {
          id: '005',
          name: 'VIETNAMESE SALAD',
          desc: 'Onions, cucumber, tomatoes and Vietnamese dressing',
          pric: '12.50',
          pict: require('./assets/menuPicts/A5.jpg'),
        },
        {
          id: '006',
          name: 'VIETNAMESE SALAD',
          desc: 'Onions, cucumber, tomatoes and Vietnamese dressing',
          pric: '12.50',
          pict: require('./assets/menuPicts/A5.jpg'),
        },
        {
          id: '007',
          name: 'VIETNAMESE SALAD',
          desc: 'Onions, cucumber, tomatoes and Vietnamese dressing',
          pric: '12.50',
          pict: require('./assets/menuPicts/A5.jpg'),
        },
      ]
    }   
    this.handleOrderList = this.handleOrderList.bind(this);
  }

  handleOrderList = (menuID, action) => {
    const result = this.getMenu(menuID, this.state.orderList);
    let orderList = this.state.orderList.filter(item=>item.menuID!==menuID);
    let {totalOrder, totalCost} = this.state;
    if (action==='add'){
      orderList.push({menuID: result.menuID, qty: result.qty + 1})
      totalOrder += 1
      totalCost += parseFloat(this.getMenuItem(menuID).pric);
    } else {
      orderList.push({menuID: result.menuID, qty: result.qty - 1})
      totalOrder -= 1
      totalCost -= parseFloat(this.getMenuItem(menuID).pric);
      if (result.qty-1===0){
        orderList = orderList.filter(item=>item.menuID!==menuID)
      }
    }
    this.setState({orderList: [...orderList], totalOrder: totalOrder, totalCost: totalCost})
  }

  getMenu = (menuID) => {
    const {orderList} = this.state;
    for (var index=0; index<orderList.length; index++){
        if (orderList[index].menuID===menuID){
            return orderList[index]
        }
    }
    return {menuID: menuID, qty: 0}
  }

  getMenuItem = (menuID) => {
    const {data} = this.state;
    for (var index=0; index<data.length; index++){
      if (data[index].id===menuID){
        //console.log(data[index]);
        return data[index]
      }
    }
  }

  render(){
    const Tab = createBottomTabNavigator();
    const iconSize = 30;
    const {orderList, data, totalCost} = this.state
    return(
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' shifting={true} tabBarOptions={{activeTintColor:'#dc143c'}}>
          <Tab.Screen name='Home' children={()=><HomeScreen data={data} handleOrderList={this.handleOrderList} getMenu={this.getMenu}/>}
            options={{tabBarLabel:'Home', tabBarIcon:({color})=><MaterialCommunityIcons name='home-outline' color={color} size={iconSize}/>}}/>
          <Tab.Screen name='Menu' component={MenuScreen}
            options={{tabBarLabel:'Menu', tabBarIcon:({color})=><MaterialCommunityIcons name='menu' color={color} size={iconSize}/>}}/>
          <Tab.Screen name='Order' children={()=><OrderScreen data={orderList} getMenuItem={this.getMenuItem} totalCost={totalCost}/>} 
            options={{tabBarBadge:this.state.totalOrder, tabBarLabel:'Order', tabBarIcon:({color})=><MaterialCommunityIcons name='cart-outline' color={color} size={iconSize}/>}}/>
          <Tab.Screen name='User' component={UserScreen}
            options={{tabBarLabel:'User', tabBarIcon:({color})=><MaterialCommunityIcons name='account-outline' color={color} size={iconSize}/>}}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}