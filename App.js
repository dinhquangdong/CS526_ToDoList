import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Splash from './src/screens/Splash'
import ToDo from './src/screens/ToDo'
import Link from './src/screens/Link'
import Task from './src/screens/Task'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Provider } from 'react-redux'
import { Store } from './src/redux/store'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName
                    if (route.name === 'ToDo') {
                        iconName = 'clipboard-list'
                        size = focused ? 25 : 20
                    } else if (route.name === 'Link') {
                        iconName = 'bars'
                        size = focused ? 25 : 20
                    }
                    return <FontAwesome5 name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="ToDo" component={ToDo} options={{ headerShown: false }} />
            <Tab.Screen name="Link" component={Link} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#0080ff'
                        },
                        headerTintColor: '#ffffff',
                        headerTitle: {
                            fontSize: 25,
                            fontWeight: 'bold'
                        }
                    }}
                >
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{
                            title: 'Splash',
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="My Tasks"
                        component={HomeTabs}
                        options={{
                            title: 'CS526'
                        }}
                    />
                    <Stack.Screen
                        name="Task"
                        component={Task}
                        options={{
                            title: 'Chỉnh sửa công việc'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
