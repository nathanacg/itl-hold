import { useState } from 'react';
import { TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { theme } from '../../Theme/theme';

interface toggleSwitchProps {
    value: boolean
    setValue: () => void
    icon?: boolean | undefined
}

export default function RadioButton(props: toggleSwitchProps) {
    const [active, setActive] = useState<boolean>(props.value)
    return (
        <TouchableOpacity onPress={() => {
            setActive(!active),
                props.setValue()
        }}>
            {props.icon == true ? (
                <MaterialCommunityIcons
                    name={props.value ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
                    size={22}
                    color={props.value ? '#0245F4' : "#5E5E5E"}
                />
            ) : (
                <MaterialCommunityIcons
                    name={props.value ? 'radiobox-marked' : 'radiobox-blank'}
                    size={22}
                    color={theme.primarycolor}
                />
            )}
        </TouchableOpacity>
    );
};
