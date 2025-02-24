import styled from "styled-components/native";

import { fontStyle, theme } from '../../../../Theme/theme';


interface UserListProps {
    border: boolean
}

export const Container = styled.View.attrs({
    styles: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: 3,
        shadowOpacity: 0.1,
        shadowRadius: 6,
    }
})`
   padding: 6px;
    margin-left: 3px;
    padding-bottom: 15px;
    margin-top: 7px;
    margin-bottom: 1px;
    align-items: center;
    justify-content: space-between;
    width: 144px;
    border-radius: 4px;
    background-color: ${theme.secondaryColor};
    margin-right: 8px;
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



export const CardContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 0.5px;
    border-color: ${theme.lightGray};
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    padding: 6px 27px 7px 25px;
    border-bottom-width: ${(props: UserListProps) => props.border ? "0.5px" : "0"};
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