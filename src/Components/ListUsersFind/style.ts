import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'

interface UserListProps {
    border: boolean
}


export const CardContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px;
    border-color: ${theme.lightGray};
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    padding: 6px 0px 7px 5px;
    border-bottom-width: ${(props: UserListProps) => props.border ? "0.5" : "0"}px;
    margin-bottom: 1px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
export const UserName = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textDark};
    line-height: 18px;
`
export const UserAddress = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    line-height: 17px;
    color: ${theme.textDark};
`