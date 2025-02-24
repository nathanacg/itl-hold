import { View, Text, TouchableOpacity } from 'react-native'
import { TextRegular12 } from '../configurationsElemetsStyle'

interface DefaultPasteInterface {
    navigator: () => void
}

export default function DefaultPaste({ navigator }: DefaultPasteInterface) {
    return (
        < View style={{ justifyContent: 'center', alignItems: 'center' }
        }>
            <Text>Nenhuma pasta foi criada.</Text>
            <TouchableOpacity onPress={() => navigator()}>
                <TextRegular12>Criar pasta</TextRegular12>
            </TouchableOpacity>
        </View >
    )
}