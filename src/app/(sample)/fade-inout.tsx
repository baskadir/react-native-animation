import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const LIST_ITEM_COLOR = 'dodgerblue';

interface IItem {
    id: number;
}



const FadeInOut = () => {
    const initialMode = useRef<boolean>(true);

    useEffect(() => {
        initialMode.current = false;
    })

    const [items, setItems] = useState<IItem[]>(
        new Array(5).fill(0).map((_, index) => ({ id: index }))
    );

    const onAdd = useCallback(() => {
        setItems((currentItems) => {
            const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
            return [...currentItems, { id: nextItemId }]
        })
    }, []);

    const onDelete = useCallback((itemId: number) => {
        setItems((currentItems) => {
            return currentItems.filter(item => item.id !== itemId);
        });
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                {items.map((item, index) => {
                    return <Animated.View
                        key={item.id}
                        style={styles.item}
                        entering={initialMode.current ? FadeIn.delay(100*index) : FadeIn}
                        exiting={FadeOut}
                        layout={Layout.delay(100)}
                        onTouchEnd={() => onDelete(item.id)}
                    />
                })}
            </ScrollView>
        </View>
    )
}

export default FadeInOut

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        height: 100,
        backgroundColor: LIST_ITEM_COLOR,
        width: '90%',
        marginVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20
    },
    floatingButton: {
        width: 70,
        aspectRatio: 1,
        backgroundColor: '#000',
        borderRadius: 35,
        position: 'absolute',
        bottom: 50,
        right: '5%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 40
    }
})