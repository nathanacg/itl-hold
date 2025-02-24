import styled from "styled-components/native"
import { fontStyle, theme } from "../../../../Theme/theme"


export const UsersViews = styled.TouchableOpacity`
    align-items: center;
    gap: 0px;
`

export const UserViewImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border-color: ${theme.secondaryColor};
    border-width: 2px;
    border-color: ${theme.secondaryColor};
    margin-left: -12px;
`
export const WhiteText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: ${theme.lightGray};
`