import { SetStateAction } from "react";

import {
    ContainerInput,
    InputBox,
    LabelContainer,
    TextInputBox
} from "./style";

import { TextSimple } from "../elementsComponents";
import { GrayText, LimitText } from "../Informationsform";


interface InputDescProps {
    label: string
    placeholder: string
    value: string
    setValue: React.Dispatch<SetStateAction<string>>
    labelStyle: any
    boxStyle: any
    disable?: boolean
    maxLength?: number
}

export default function InputDesc(props: InputDescProps) {

    return (
        <ContainerInput>
            <LabelContainer style={props.labelStyle}>
                <TextSimple>{props.label}</TextSimple>
            </LabelContainer>
            <InputBox style={props.boxStyle}>
                <TextInputBox
                    value={props.value}
                    keyboardType={'default'}
                    onChangeText={props.setValue}
                    placeholder={props.placeholder}
                    placeholderTextColor="#c6c6c6"
                    multiline={true}
                    maxLength={props.maxLength}
                    textAlignVertical='top'
                    editable={props.disable ? false : true}
                />
                <LimitText>
                    {300 - props.value.length}
                </LimitText>
            </InputBox>

        </ContainerInput>
    )
}