import React, { ReactComponentElement, SetStateAction } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import {
    ContainerInput,
    Text
} from "./style"
import { fontStyle, theme } from '../../Theme/theme';

interface inputProps {
    onSetText: React.Dispatch<SetStateAction<string>>
    value: string
    placeholder?: string,
    label: string
    stylesInput: TextInputProps
    width?: string
    disable?: boolean
    limit?: number
    paddingBottom?: number
}

export default function InputConfiguration(props: inputProps) {
    return (
        <ContainerInput>
            <Text style={props.paddingBottom && { paddingBottom: props.paddingBottom }} width={props.width}>{props.label}</Text>
            <TextInput
                keyboardType={'default'}
                textAlignVertical='bottom'
                style={[styles.input, props.stylesInput.style]}
                value={props.value}
                maxLength={props.limit ? props.limit : 30}
                onChangeText={props.onSetText}
                placeholder={props.placeholder}
                placeholderTextColor="#c6c6c6"
                editable={props.disable ? false : true}

            />
        </ContainerInput>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingRight: 10,

        paddingBottom: 2,
        position: "relative",
        color: theme.textligthGray,
        fontSize: 13,
        fontFamily: fontStyle.regular,
        borderColor: '#5e5e5e',
        borderWidth: 0.3,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 12
    }
});
