import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Color from "color";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

type DropdownItemType = {
    label: string;
    iconName: string;
};

type DropdornListItemProps = DropdownItemType & {
    index: number;
    dropdownItemsCount: number;
    isExpanded: Animated.SharedValue<boolean>;
}


const DropdornListItem = ({ label, iconName, index, dropdownItemsCount, isExpanded }: DropdornListItemProps) => {
    const { width: windowWidth } = useWindowDimensions();
    const DropdownListItemHeight = 80;
    const Margin = 10;
    const fullDropdownHeight = dropdownItemsCount * (DropdownListItemHeight + Margin);

    const collapsedTop = fullDropdownHeight / 2 - DropdownListItemHeight;
    const expandedTop = (DropdownListItemHeight + Margin) * index;

    const expandedScale = 1;
    const collapsedScale = 1 - index * 0.075;

    const expandedBgColor = '#1b1b1b';
    const collapsedBgColor = Color(expandedBgColor)
        .lighten(index * 0.25)
        .hex();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(isExpanded.value ? expandedBgColor : collapsedBgColor),
            top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
            transform: [
                { scale: withSpring(isExpanded.value ? expandedScale : collapsedScale) },
                { translateY: fullDropdownHeight / 2 }
            ]
        }
    }, [])

    const isHeader = index === 0;

    const animatedLeftIconStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0)
        }
    }, [])

    const animatedHeaderArrowIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: withTiming(isHeader && isExpanded.value ? '90deg' : '0deg') }
            ]
        }
    }, [])


    return (
        <Animated.View
            onTouchEnd={() => {
                if (isHeader)
                    isExpanded.value = !isExpanded.value
            }}
            style={[
                {
                    zIndex: dropdownItemsCount - index,
                    position: 'absolute',
                    width: windowWidth * 0.95,
                    height: DropdownListItemHeight,
                    borderRadius: 10
                },
                animatedStyle
            ]}
        >
            <View style={styles.container}>
                <Animated.View style={[styles.iconContainer, animatedLeftIconStyle, { left: 15 }]}>
                    <AntDesign name={iconName as any} size={25} color="#d4d4d4" />
                </Animated.View>
                <Text style={styles.label}>
                    {label}
                </Text>
                <Animated.View style={[styles.iconContainer, animatedHeaderArrowIconStyle, { right: 15, backgroundColor: 'transparent' }]}>
                    <MaterialIcons name={isHeader ? 'arrow-forward-ios' : 'arrow-forward'} size={25} color="#d4d4d4" />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default DropdornListItem

export type { DropdownItemType };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#d4d4d4',
        fontSize: 22,
        textTransform: 'uppercase',
        letterSpacing: 1.2
    },
    iconContainer: {
        position: 'absolute',
        width: 45,
        aspectRatio: 1,
        backgroundColor: '#111',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})