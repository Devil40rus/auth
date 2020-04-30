import * as React from 'react';
import {connect} from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import NewsScreen from '../screens/NewsScreen';
import TrainingScreen from '../screens/TrainingScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ChatScreen from '../screens/ChatScreen';
import PersonScreen from '../screens/PersonScreen';

import {logoutUser} from "../actions/auth.actions";

const Tab = createMaterialBottomTabNavigator();

class Navigator extends React.Component {
    logoutUser = () => {
        this.props.dispatch(logoutUser());
    }
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    barStyle={{ backgroundColor: '#F4CB43' }}
                    tabBarLabel={false}
                >
                    <Tab.Screen
                        name="Главная"
                        component={PersonScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon size={25} name={'ios-person'} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Чат"
                        component={ChatScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon size={25} name={'ios-send'} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Календарь"
                        component={CalendarScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon size={25} name={'md-calendar'} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Событие"
                        component={TrainingScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon size={25} name={'md-school'} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Новости"
                        component={NewsScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon size={25} name={'md-home'} />
                            ),
                        }}
                        headerMode="none"
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);