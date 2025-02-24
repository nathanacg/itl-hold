import { SetStateAction } from 'react'
import { TextInput } from 'react-native'

import { Box, Container, Label } from './style'
import { theme } from '../../Theme/theme'

interface RoomNameInput {
    textValue: string
    setText: React.Dispatch<SetStateAction<string>>

}

export default function RoomNameInput(props: RoomNameInput) {
    return (
        <Container>
            <Label>Nome da sala</Label>
            <Box>
                <TextInput
                    placeholder={props.textValue}
                    textAlignVertical="top"
                    multiline
                    maxLength={50}
                    value={props.textValue}
                    onChangeText={props.setText}
                    style={{ fontSize: 13, color: theme.inputTextColor }}
                />
            </Box>
        </Container>
    )
}