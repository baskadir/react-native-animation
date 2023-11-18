import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

type ContactInfo = {
    name: string;
    email: string;
}

type ContactListItemProps = {
    contact?: ContactInfo | null;
}

const SkeletonCommonProps = {
    colorMode: 'light',
    backgroundColor: '#d4d4d4',
    transition: {
        type: 'timing',
        duration: 2000
    }
} as const;

const ContactListItem = ({ contact }: ContactListItemProps) => {
    return (
        <View style={styles.container}>
            <Skeleton.Group show={contact == null}>
                <Skeleton
                    height={70}
                    width={70}
                    radius={'round'}
                    {...SkeletonCommonProps}
                >
                    {contact &&
                        <Animated.View
                            style={styles.circleContainer}
                            layout={Layout}
                            entering={FadeIn.duration(1500)}
                        >
                            <Text style={{ fontSize: 25, color: 'white' }}>{contact.name[0]}</Text>
                        </Animated.View>
                    }
                </Skeleton>
                <View style={{ marginLeft: 15 }}>
                    <Skeleton
                        height={30}
                        width={'80%'}
                        {...SkeletonCommonProps}
                    >
                        {contact &&
                            <Animated.Text
                                style={{ fontSize: 25 }}
                                layout={Layout}
                                entering={FadeIn.duration(1500)}
                            >
                                {contact.name}
                            </Animated.Text>
                        }
                    </Skeleton>
                    <View style={{ height: 5 }} />
                    <Skeleton
                        height={25}
                        width={'70%'}
                        {...SkeletonCommonProps}
                    >
                        {contact &&
                            <Animated.Text
                                style={{ fontSize: 20 }}
                                layout={Layout}
                                entering={FadeIn.duration(1500)}
                            >
                                {contact.email}
                            </Animated.Text>
                        }
                    </Skeleton>
                </View>
            </Skeleton.Group>
        </View>
    )
}

export default ContactListItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    circleContainer: {
        height: 70,
        aspectRatio: 1,
        backgroundColor: '#005cb7',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
})