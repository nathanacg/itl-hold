import styled from "styled-components/native";

import { fontStyle, theme } from '../../../../Theme/theme';

export const Container = styled.View`
    padding: 6px;
    margin-left: 3px;
    padding-bottom: 15px;
    margin-top: 7px;
    margin-bottom: 2px;
    align-items: center;
    justify-content: space-between;
    width: 144px;
    border-radius: 4px;

    background-color: ${theme.secondaryColor};
    margin-right: 8px;
    
    elevation: 3;
    shadow-color: #e1e1e1;
    shadow-opacity: 1;
    shadow-radius:5px;
`

export const RemoveButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
`

export const UserImage = styled.Image`
    width: 86px;
    height: 86px;
    border-radius: 86px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.primarycolor};
    font-size: 13px;
    text-align: center;
    margin-top: 8px;
    margin-bottom: -4px;
    /* margin-bottom: 7.5px; */
`

export const Name = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: #747474;
    font-size: 11px;
    text-align: center;
    margin-top: 3px;
    margin-bottom: 7px;
`

export const Info = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 9px;
    margin-bottom: 6px;
    color: #747474;
    text-align: center;
`
export const FollowButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 109px;
    height: 25px;
    border: 1px;
    border-radius: 6px;
    border-color: ${theme.primarycolor};
    margin-top: 7px;
`

export const FollowButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.primarycolor} ;
    line-height: 16px;
`

export const UserImageContainer = styled.View`
    width: 86px;
    height: 86px;
    border-radius: 86px;
    justify-content: center;
    align-items: center;
`

export const OnIcon = styled.View`
    position: absolute;
    top: 5px;
    left: 5px;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: ${theme.green};
    border: 1px;
    border-color: ${theme.secondaryColor};
`

