import { StyleSheet } from 'react-native'
import CustomView from '../../components/CustomView'
import Square from '../../components/Square';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

const ClockLoader = () => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(4 * Math.PI, { duration: 8000, easing: Easing.linear }), -1);
    }, [])
    return (
        <CustomView>
            {new Array(12).fill(0).map((_, index) => {
                return <Square key={index} index={index} progress={progress} />
            })}
        </CustomView>
    )
}

export default ClockLoader