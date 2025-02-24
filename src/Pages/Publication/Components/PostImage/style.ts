import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";


export const Container = styled.Pressable`
     margin-right: 5px;
`

export const PostImageContainer = styled.View`
    position: relative;
    align-self: center;
    align-items: center;
    margin-top: 20px;
    margin-right: 8px;
    width: 200px;
    height: 200px;
    padding: 0;
`

export const ImagePost = styled.ImageBackground`
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
`

export const TagUser = styled.Text`
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    line-height: 15px;
    color: ${theme.textDark};
    background-color: ${theme.secondaryColor};
    padding: 5px 9px 3px;
    border-radius: 5px;

    position: absolute;
    bottom: 10px;
`
export const UserView = styled.View`
    flex-direction: row;
    align-items: center;
    height: 60px;
    width: 97%;
    background-color: ${theme.secondaryColor};
`

export const UserImage = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 40px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.textDark};
    margin-left: 4px;
    font-size: 12px;
    line-height: 15px;
    margin-top: 5px;
`

export const UserCompletlyName = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    margin-left: 4px;
    font-size: 12px;
    
`