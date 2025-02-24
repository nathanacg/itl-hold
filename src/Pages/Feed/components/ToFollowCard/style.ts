import styled from "styled-components/native";

import { fontStyle, theme } from '../../../../Theme/theme';

export const Container = styled.View`
    padding: 6px;
    margin: 3px 0px;
    padding-bottom:10px;
    margin-top: 7px;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    border-radius: 4px;
    background-color: ${theme.secondaryColor};
    margin-right: 8px;
    elevation: 4;
    shadow-color: #000000aa;
    shadow-offset: 2px;
    shadow-opacity: 0.1;
    shadow-radius: 6px;
`

export const RemoveButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
    margin-bottom: -3px;
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
    line-height: 22px;
    margin-top: 1px;
    /* margin-bottom: 7.5px; */
`

export const Name = styled.Text`
    font-family: ${fontStyle.regular};
    color: #747474;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    margin-top: 0px;
`

export const Info = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 9px;
    margin-top: 10px;
    margin-bottom: 10px;
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

