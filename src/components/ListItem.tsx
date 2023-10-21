import { Dimensions, StyleSheet, Text } from 'react-native'
import { TaskInterface } from '../app/(sample)/swipe-delete';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    task: TaskInterface;
    onDismiss?: (task: TaskInterface) => void;
}

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .3;

const ListItem = ({ task, onDismiss, simultaneousHandlers }: ListItemProps) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDismiss) {
                        runOnJS(onDismiss)(task);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    const iconAnimatedStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
        return {
            opacity
        }
    });

    const taskContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value
        }
    });

    return (
        <Animated.View style={[styles.container, taskContainerAnimatedStyle]}>
            <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
                <Ionicons name="trash-outline" size={LIST_ITEM_HEIGHT * 0.5} color="red" />
            </Animated.View>
            <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.task, animatedStyle]}>
                    <Text>{task.title}</Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

export default ListItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        width: '90%',
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 16
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})