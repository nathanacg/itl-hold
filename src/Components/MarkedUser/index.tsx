import { Container } from "./style";

interface MarkedUserProps{
    userName: string
    left: number
    top: number
    scale: number
}

export default function MarkedUser(props: MarkedUserProps){
    return(
        <Container left={`${props.left}px`} top={`${props.top}px`} scale={props.scale}>
            {props.userName}
        </Container>
    )
}