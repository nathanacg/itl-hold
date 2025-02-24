import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'

interface UserListProps {
    border: boolean
}


export const CardContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px;
    border-color: ${theme.lightGray};
    /* border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent; */
    padding: 10px 10px 10px 5px; 
    border-bottom-width: ${(props: UserListProps) => props.border ? "0.5px" : "0"}; 
   
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 0px;
`
export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.textDark};
    line-height: 13px;
    margin-left: 5px;
`

export const UserFollowers = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: ${theme.textDark};
    
    margin-top: 0px;
    margin-left: 5px;
    letter-spacing: -0.2px;
`
export const Circle = styled.Text`
    
    font-family: ${fontStyle.regular};
    font-size: 9px;
    color: ${theme.lightGray};
    line-height: 18px;
    margin-top: 1px;
    margin-left: 2px;
    letter-spacing: -0.8px;
`
export const UserAddress = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    color: ${theme.textDark};
`