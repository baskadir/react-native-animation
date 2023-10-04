import { Stack, router } from "expo-router"
import { Ionicons } from '@expo/vector-icons';

export default () => {
    return <Stack screenOptions={{
        headerLeft: () => {
            return <Ionicons name="arrow-back" size={28} color="black" onPress={() => router.back()} />
        },
        headerTitleAlign: 'center'
    }} />
}