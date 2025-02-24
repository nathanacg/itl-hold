import { TouchableOpacity } from 'react-native'
import { Container, Title, TopContainer, SeeMoreButton } from './style'

interface ContainerPatternProps {
    title: string
    rigthButton?: string
    marginBottom?: number
    marginTop?: number
    OnButtonPress?: () => void
    children?: React.ReactNode
}


export default function ContainerPattern(props: ContainerPatternProps) {
    return (
        <Container style={{ marginTop: props.marginTop ? props.marginTop : 0, marginBottom: props.marginBottom ? props.marginBottom : 0, resizeMode: 'cover' }} source={require('../../../../Assets/Image/background_app.png')}>
            <TopContainer>
                <Title>{props.title}</Title>
                <TouchableOpacity onPress={props.OnButtonPress}>
                    <SeeMoreButton>{props.rigthButton}</SeeMoreButton>
                </TouchableOpacity>
            </TopContainer>
            {props.children}
        </Container>
    )
}