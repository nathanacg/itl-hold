import React, { SetStateAction } from 'react'
import { StyleSheet } from 'react-native'

import { theme, fontStyle } from '../../Theme/theme'

import {
    ContainerSearch,
    Input
} from './styles'

interface inputProps {
    onSetText: React.Dispatch<SetStateAction<string>>
    value: string
    placeholder?: string
    textError?: string
    error?: boolean
    checkSucess?: boolean
    checkError?: boolean
}

export default function InputLink(props: inputProps) {

    const textChange = (text: string) => {
        props.onSetText(text)
    }

    return (
        <ContainerSearch error={props.error}>
            <Input
                keyboardType={'url'}
                value={props.value.toLocaleLowerCase()}
                style={styles.input}
                maxLength={255}
                onChangeText={(text: string) => textChange(text)}
                placeholder={props.placeholder}
                placeholderTextColor={theme.textligthGray}
            />
        </ContainerSearch>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        position: "relative",
        color: theme.textligthGray,
        fontSize: 12,
        fontFamily: fontStyle.regular
    }
})