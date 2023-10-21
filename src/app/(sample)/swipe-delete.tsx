import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import ListItem from '../../components/ListItem';
import { ScrollView } from 'react-native-gesture-handler';

const TITLES = [
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.'
]

export interface TaskInterface {
    title: string;
    index: number;
}

const TASKS: Array<TaskInterface> = TITLES.map((title, index) => ({ title, index }));

const BG_COLOR = '#FAFBFF';

const Swipe = () => {
    const [tasks, setTasks] = useState(TASKS);

    const scrollRef = useRef(null);

    const onDismiss = useCallback((task: TaskInterface) => {
        setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tasks</Text>
            <ScrollView style={{ flex: 1 }} ref={scrollRef}>
                {tasks.map((task) => (
                    <ListItem key={task.index} task={task} onDismiss={onDismiss} simultaneousHandlers={scrollRef} />
                ))}
            </ScrollView>
        </View>
    )
}

export default Swipe

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    title: {
        fontSize: 50,
        marginVertical: 10,
        paddingLeft: '5%'
    }
})