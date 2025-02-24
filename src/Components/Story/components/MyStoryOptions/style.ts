import styled from "styled-components/native"
import { fontStyle, theme } from "../../../../Theme/theme"


export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 10px 0;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`
