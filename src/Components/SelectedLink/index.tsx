import { View, Linking, Pressable, Text } from 'react-native'
import { SelectedMovieCard, SelectedMovieText, SelectedMovieTitle } from './styles'

interface SelectedMovieProps {
    name?: string
    description: string
}

export default function SelectedLink(props: SelectedMovieProps) {
    let link = ''
    if (props.description.startsWith('https://')) {
        link = props.description.slice(8)
    } else {
        link = props.description
    }
    return (
        <SelectedMovieCard>
            <View style={{ flexDirection: 'column', gap: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: 300 }}>
                <SelectedMovieTitle>{props.name}</SelectedMovieTitle>
                <Text>
                    <Pressable onPress={() => Linking.openURL(props.description)}>
                        <SelectedMovieText>{link}</SelectedMovieText>
                    </Pressable>
                </Text>
            </View>
        </SelectedMovieCard>
    )
}
