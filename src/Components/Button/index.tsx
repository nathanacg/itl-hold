import React from "react"
import { ButtonContent, TextButton } from "./style"

interface buttonProps {
    textButton: string
    typebutton: string
    pressFunction?: () => void
}

export default function Button(props: buttonProps) {
    return (
        <ButtonContent optionButton={props.typebutton} onPress={props.pressFunction}>
            <TextButton optionButton={props.typebutton}>{props.textButton}</TextButton>
        </ButtonContent>
    )
}
