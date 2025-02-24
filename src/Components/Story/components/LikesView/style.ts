import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";

export const LeftButtons = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 15px;
`

export const StoryImage = styled.ImageBackground`
    width: 207px;
    height: 300px;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
`

export const CountText = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${theme.secondaryColor};
`

export const CloseIcon = styled.TouchableOpacity`
    width: 100%;
    position: absolute;
    height: 100%;
`

export const TrashIcon = styled.TouchableOpacity`
    position: absolute;
    top: 403px;
    right: 20px;
`