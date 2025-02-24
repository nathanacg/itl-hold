import { TouchableOpacity } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../../Theme/theme';

interface toggleSwitchProps {
    value?: boolean
    setValue?: () => void
}

export default function ToggleSwitch(props: toggleSwitchProps) {

    return (
        <TouchableOpacity onPress={props.setValue}>
            <MaterialCommunityIcons
                name={props.value == true ? 'toggle-switch' : 'toggle-switch-off'}
                size={35}
                color={props.value == true ? theme.primarycolor : "#a3a3a3"}
            />
        </TouchableOpacity>
    );
};
