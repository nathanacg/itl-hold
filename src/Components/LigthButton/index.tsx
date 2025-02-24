

import {
    SmallText,
    SmallButton,
    LargeButton,
    LargeText
} from "./style";


interface LigthButtonProps {
    title: string
    size: 'sm' | 'lg'
    disabled?: boolean
    onPress?: () => void
}

export default function LigthButton(props: LigthButtonProps) {
    return (
        props.size == 'lg' ? (
            <LargeButton onPress={props.onPress} disable={props.disabled}>
                <LargeText>{props.title}</LargeText>
            </LargeButton>
        ) : (
            <SmallButton onPress={props.onPress}>
                <SmallText>{props.title}</SmallText>
            </SmallButton>
        )

    )
}