import { ScrollView, View } from 'react-native'


import { RemoveMovie, SelectedMovieCard, SelectedMovieImage, SelectedMovieText, SelectedMovieTitle } from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../Theme/theme'

interface SelectedMovieProps {
    onRemove?: () => void
    ImageUrl?: string
    width?: string
    name: string
    category: string
    description: string
    id: number | string | null
    marginTop?: string
    marginBottom?: string
}

interface TypeCategory {
    [key: string]: string
}

export default function SelectedMoviePublication(props: SelectedMovieProps) {


    const type: TypeCategory = {
        "Música": require('../../Assets/Image/musicCover.png'),
        "Filme": require('../../Assets/Image/movieCover.png'),
        "Série": require('../../Assets/Image/serieCover.png'),
        "Livro": require('../../Assets/Image/bookCover.png'),
        undefined: ""
    }

    return (
        <SelectedMovieCard
            marginBottom={props.marginBottom}
            marginTop={props.marginTop}
            style={{ width: props.width }}>
            {props.onRemove && (
                <RemoveMovie onPress={props.onRemove}>
                    <Ionicons
                        name="close-outline"
                        color={theme.lightGray}
                        size={30}
                    />
                </RemoveMovie>
            )}
            {props.ImageUrl ? (
                <SelectedMovieImage source={{ uri: props.ImageUrl }} resizeMode={'cover'} />
            ) : (
                <>
                    <SelectedMovieImage source={type[props.category]} resizeMode={'cover'} />
                </>
            )}
            <View style={{ flexDirection: 'column', gap: 1, width: 265, height: 80 }}>
                <SelectedMovieTitle numberOfLines={1}>{props.name}</SelectedMovieTitle>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SelectedMovieText numberOfLines={3}>{props.description}</SelectedMovieText>
                </ScrollView>
            </View>

        </SelectedMovieCard>
    )
}