import { Text, TextInput, View } from "react-native";
import { Box, Container, Label } from "./style";
import { SetStateAction } from "react";
import { theme } from "../../Theme/theme";
import { GrayText } from "../Informationsform";

interface RoomNameInput {
    textValue: string
    setText: React.Dispatch<SetStateAction<string>>
    disable?: boolean
    maxLength?: number
}

export default function NewRoomNameInput(props: RoomNameInput) {
    return (
        <Container>
            <Label>Descrição</Label>
            <Box>
                <TextInput
                    placeholder="Descreva mais informações sobre a sua sala."
                    textAlignVertical="top"
                    multiline
                    maxLength={props.maxLength}
                    value={props.textValue}
                    onChangeText={props.setText}
                    style={{ fontSize: 13, height: 100, color: theme.inputTextColor }}
                    editable={props.disable ? false : true}
                />
                {!props.disable && (
                    <View style={{ alignSelf: 'flex-end' }}>
                        <GrayText>
                            {300 - props.textValue.length}
                        </GrayText>
                    </View>
                )}
            </Box>
        </Container>
    )
}