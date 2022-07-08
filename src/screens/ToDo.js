import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setTasks, setTaskID } from '../redux/actions'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const ToDo = ({ navigation }) => {
    const { tasks } = useSelector((state) => state.taskReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        AsyncStorage.getItem('Tasks')
            .then((tasks) => {
                const parsedTasks = JSON.parse(tasks)
                if (parsedTasks && typeof parsedTasks === 'object') {
                    dispatch(setTasks(parsedTasks))
                }
            })
            .catch((err) => console.log(err))
    }

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter((task) => task.ID !== id)
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks))
                Alert.alert('Success!', 'Xoá công việc thành công!')
            })
            .catch((err) => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex((task) => task.ID === id)
        if (index > -1) {
            let newTasks = [...tasks]
            newTasks[index].Done = newValue
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks))
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTaskID(item.ID))
                            navigation.navigate('Task')
                        }}
                    >
                        <View style={styles.itemRow}>
                            <View
                                style={[
                                    styles.color,
                                    {
                                        backgroundColor:
                                            item.Color === 'red'
                                                ? 'red'
                                                : item.Color === 'blue'
                                                ? 'blue'
                                                : item.Color === 'green'
                                                ? 'green'
                                                : 'white'
                                    }
                                ]}
                            />
                            <BouncyCheckbox
                                size={30}
                                fillColor="blue"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: 'blue' }}
                                isChecked={item.Done}
                                onPress={(newValue) => {
                                    checkTask(item.ID, newValue)
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.title,
                                        item.Done === true
                                            ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }
                                            : {}
                                    ]}
                                >
                                    {item.Title}
                                </Text>
                                <Text style={styles.desc}>{item.Desc}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => {
                                    deleteTask(item.ID)
                                }}
                            >
                                <FontAwesome5 name="trash" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setTaskID(tasks.length + 1))
                    navigation.navigate('Task')
                }}
            >
                {/* dấu cộng thêm công việc */}
                <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default ToDo

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        elevation: 5
    },
    title: {
        margin: 5,
        fontSize: 25
    },
    desc: {
        fontSize: 15,
        margin: 5,
        color: '#999999'
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    delete: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50
    },
    color: {
        width: 25,
        height: 100,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    }
})
