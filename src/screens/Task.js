import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setTasks } from '../redux/actions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Task = ({ navigation }) => {
    const { tasks, taskID } = useSelector((state) => state.taskReducer)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [done, setDone] = useState(false)
    const [color, setColor] = useState('white')

    useEffect(() => {
        getTask()
    }, [])

    const getTask = () => {
        const Task = tasks.find((task) => task.ID === taskID)
        if (Task) {
            setTitle(Task.Title)
            setDesc(Task.Desc)
            setDone(Task.Done)
            setColor(Task.Color)
        }
    }

    const setTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning', 'Please write your task title!')
        } else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color
                }
                const index = tasks.findIndex((task) => task.ID === taskID)
                let newTasks = []
                if (index > -1) {
                    newTasks = [...tasks]
                    newTasks[index] = Task
                } else {
                    newTasks = [...tasks, Task]
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks))
                        Alert.alert('Successful', 'Lưu công việc thành công')
                        navigation.goBack()
                    })
                    .catch((err) => console.log(err))
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <View style={styles.body}>
            <TextInput
                value={title}
                style={styles.input}
                placeholder={'Tiêu đề'}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                value={desc}
                style={styles.input}
                placeholder={'Mô tả'}
                multiline
                onChangeText={(text) => setDesc(text)}
            />
            <View style={styles.colorBar}>
                <TouchableOpacity
                    style={styles.color_white}
                    onPress={() => {
                        setColor('white')
                    }}
                >
                    {color === 'white' && <FontAwesome5 name="check" size={25} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_red}
                    onPress={() => {
                        setColor('red')
                    }}
                >
                    {color === 'red' && <FontAwesome5 name="check" size={25} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_blue}
                    onPress={() => {
                        setColor('blue')
                    }}
                >
                    {color === 'blue' && <FontAwesome5 name="check" size={25} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_green}
                    onPress={() => {
                        setColor('green')
                    }}
                >
                    {color === 'green' && <FontAwesome5 name="check" size={25} color="black" />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={setTask}>
                <Text style={styles.text}>Lưu công việc</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10
    },
    saveButton: {
        backgroundColor: '#1eb900',
        width: '100%',
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '800'
    },
    extra_button: {
        flex: 1,
        height: 50,
        backgroundColor: '#0080ff',
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorBar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        marginVertical: 10
    },
    color_white: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    color_red: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    color_blue: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    color_green: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})
