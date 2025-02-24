import styled from "styled-components/native"

import {theme, fontStyle} from "../../../../Theme/theme"

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 65px;
    border-width: 2px;
    border-color: #ddd;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    elevation: 1;
    align-items: center;
    padding:0 20px;
    top:0;
`

export const UserInfos = styled.View`
    flex-direction: row;
    align-items: center;
`

export const HeaderImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 16px;
    margin-right: 17px;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 18px;
    color: ${theme.textDark};
    line-height: 20px;
`

export const HeaderActions = styled.View`
    justify-self: flex-end;
    flex-direction: row;
    gap: 18px;
`

export const GrayText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.lightGray};
`