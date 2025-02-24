import styled from "styled-components/native"
import { fontStyle, theme } from "../../../../Theme/theme"

export const UserStory = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.secondaryColor};
    font-size: 18px;
`

export const UserStoryTop = styled.View`
    width: 200px;
    margin-top: 15px;
    margin-left: 14px;
    flex-direction: row;
    align-items: center;
    position: absolute;
    z-index: 999;
    top: 1;
    left: 60;
    z-index: 999;
`

export const StoryTime = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    font-size: 14px;
    margin-left: 10px;
`

export const BackIcon = styled.TouchableOpacity`
    position: absolute;
    top: 22px;
    left: 10px;
    z-index: 999;
`