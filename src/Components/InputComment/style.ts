import styled from "styled-components/native";

import { fontStyle, theme } from "../../Theme/theme";

export const InputCommentContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    z-index: 10;
    bottom: 0px;
    padding-top: 10px;
    padding-bottom: ${(props: { paddingBottom: string }) => props.paddingBottom ? props.paddingBottom : "27px"};
`

export const Input = styled.View`
    height: 44px;
    gap: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px 14px;
    border: 1px;
    border-color: ${theme.lightGray};
    border-radius: 28px;
    width: 80%;
`

export const ConatinerAudioTime = styled.View`

    gap: 8px;
    flex-direction: row;
    align-items: center;
`

export const InputText = styled.TextInput`
    flex: 1;
    font-size: 13px;
    color: ${theme.textDark};
`

export const CircleButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${theme.primarycolor};
`

export const BlueButtonImage = styled.Image`
    width: 15px;
    object-fit: contain;
`

export const CameraIcon = styled.Image`
    width: 24.5px;
    height: 20px;
    object-fit: contain;
`

export const ClipIcon = styled.Image`
    width: 13px;
    height: 22px;
    object-fit: contain;
`

export const TextTime = styled.Text`
    font-size: 13px;
    color: ${theme.textDark};
`