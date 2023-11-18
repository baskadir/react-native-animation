import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ContactListItem from '../../components/ContactListItem';

type ContactInfo = {
    name: string;
    email: string;
}

const Skeleton = () => {
    const [contacts, setContacts] = useState<ContactInfo[] | undefined>();
    
    const contactsPlaceholderList = useMemo(() => {
        return Array.from({length: 15}).map(_ => null);
    }, [])

    const fetchContacts = useCallback(async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 2000));

        setContacts(data);
    }, []);

    useEffect(() => {
        fetchContacts();
    }, []);

    const renderItem = ({ item, index }: { item: ContactInfo | null, index: number }) => <ContactListItem contact={item} />

    return (
        <View>
            <FlatList
                data={contacts ?? contactsPlaceholderList}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
            />
        </View>
    )
}

export default Skeleton

const styles = StyleSheet.create({
    seperator: {
        height: 1, 
        width: '100%', 
        backgroundColor: '#ced0ce'
    }
})