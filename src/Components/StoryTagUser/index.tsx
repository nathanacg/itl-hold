import { Container } from './style'

interface StoryTagUserProps {
    user: { 
        userName: string, 
        top: number, 
        left: number, 
        scale: number 
    }
}

export default function StoryTagUser(props: StoryTagUserProps) {

    return (
        <Container 
            top={props.user.top}
            left={props.user.left}
            scale={props.user.scale}
        >
            @{props.user.userName}
        </Container>
    )
}