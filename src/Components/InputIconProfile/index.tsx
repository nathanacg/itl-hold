import { TextInputProps } from 'react-native';
import {
    ContainerInput,
    MoreOptionsInput,
    Text
} from "./styles"

import { GrayText } from '../Informationsform';

interface inputProps extends TextInputProps {
    placeholder?: any,
    label: string
    stylesInput: any
    width?: string
    onPress: () => void
    icon: React.ReactNode
    marginTop?: string
}

export default function InputIconProfile(props: inputProps) {
    return (
        <ContainerInput marginTop={props.marginTop}>
            <Text width={props.width}>{props.label}</Text>
            <MoreOptionsInput
                style={props.stylesInput}
                onPress={props.onPress}>
                <GrayText>{props.placeholder}</GrayText>
                {props.icon}
            </MoreOptionsInput>
        </ContainerInput>
    );
};