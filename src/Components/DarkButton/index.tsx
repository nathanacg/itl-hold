
import { SmallText, 
        SmallButton, 
        LargeButton, 
        LargeText } from "./style"


interface FollowButtonProps{
    title: string
    onPress?: () => void
    size: 'sm' | 'lg'
}

export default function DarkButton(props: FollowButtonProps){

    return(
        props.size == 'lg'? (
            <LargeButton onPress={props.onPress}>
                <LargeText>{props.title}</LargeText>
            </LargeButton>
        ) : (
            <SmallButton onPress={props.onPress}>
                <SmallText>{props.title}</SmallText>
             </SmallButton>
        )
      
    )
}