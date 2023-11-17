import { FlatList, StyleSheet } from 'react-native'
import CarouselItem, { ListItemWidth } from '../../components/CarouselItem'
import { useSharedValue } from 'react-native-reanimated'

const data = [
    "https://picsum.photos/id/237/100/100",
    "https://picsum.photos/id/56/100/100",
    "https://picsum.photos/id/32/100/100",
    "https://picsum.photos/id/73/100/100",
    "https://picsum.photos/id/3/100/100",
    "https://picsum.photos/id/2/100/100",
    "https://picsum.photos/id/7/100/100",
    "https://picsum.photos/id/23/100/100",
    "https://picsum.photos/id/37/100/100"
]

const CircularCarousel = () => {
    const contentOffset = useSharedValue(0);

    const renderItem = ({item, index} : {item: string, index: number}) => <CarouselItem imageSrc={item} index={index} contentOffset={contentOffset}/>

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            scrollEventThrottle={16} // 60 fps => 16ms
            onScroll={(event) => {
                contentOffset.value = event.nativeEvent.contentOffset.x;
            }}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ListItemWidth}
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            horizontal
            style={{
                position: 'absolute',
                bottom: 0,
                height: 300,
            }}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 3 * ListItemWidth
            }}
        />
    )
}

export default CircularCarousel;