import styled from "styled-components/native"
import { theme } from "../../../../Theme/theme"

export const Container = styled.View`
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
    gap: 10px;
`

export const InputStory = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 6px;
    height: 48px;
    border: 1px;
    border-color: ${theme.secondaryColor};
    border-radius: 70px;
`

export const SendStory = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryColor};
    width: 35px;
    height: 35px;
    border-radius: 20px;
`

export const UsersViews = styled.TouchableOpacity`
    align-items: center;
    gap: 9px;
`

export const UserViewImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border-color: ${theme.secondaryColor};
    border-width: 2px;
    border-color: ${theme.secondaryColor};
    margin-left: -8px ;
`

export const ShareImage = styled.Image`
    width: 27px;
    height: 27px;
`