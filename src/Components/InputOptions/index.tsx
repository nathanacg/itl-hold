import { SetStateAction } from "react";
import { ContainerInput, LabelContainer, OptionContainer, RowDirection } from "./style";
import { TextSimple } from "../elementsComponents";
import RadioButton from "../RadioButton";


interface InputOptionsProps {
    label: string
    options: string[]
    setOption: React.Dispatch<SetStateAction<any>>
    selectedOption: string
    labelStyle: any
}

export default function InputOptions(props: InputOptionsProps) {

    return (
        <ContainerInput>
            <LabelContainer style={props.labelStyle}>
                <TextSimple>{props.label}</TextSimple>
            </LabelContainer>
            <OptionContainer>
                {props.options.map(opt => (
                    <RowDirection key={opt}>
                        <RadioButton value={props.selectedOption == opt} setValue={() => props.setOption(opt)} />
                        <TextSimple>{opt}</TextSimple>
                    </RowDirection>
                ))}
            </OptionContainer>
        </ContainerInput>
    )
}