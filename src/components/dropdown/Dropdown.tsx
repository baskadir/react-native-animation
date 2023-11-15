import DropdornListItem from './DropdornListItem';
import { useSharedValue } from 'react-native-reanimated';

type DropdownItemType = {
    label: string;
    iconName: string;
};

type DropdownProps = {
    header: DropdownItemType;
    options: DropdownItemType[];
}

const Dropdown = ({ header, options }: DropdownProps) => {
    const dropdownItems = [header, ...options];
    const isExpanded = useSharedValue(false);

    return (
        <>
            {dropdownItems.map((item, index) => {
                return <DropdornListItem
                    key={index}
                    index={index}
                    dropdownItemsCount={dropdownItems.length}
                    isExpanded={isExpanded}
                    {...item}
                />
            })}
        </>
    )
}

export default Dropdown