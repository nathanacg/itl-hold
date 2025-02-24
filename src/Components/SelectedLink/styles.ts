import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"


export const SelectedMovieCard = styled.View`
    position: relative;
    width: 100%;
    margin-top: -5px;
    margin-bottom: -10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const SelectedMovieImage = styled.Image`
    width: 113px;
    height: 113px;
    border-radius: 8px;
`

export const SelectedMovieTitle = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: center;
    color: ${theme.textLight};
    
    margin-bottom:1px;
`

export const SelectedMovieText = styled.Text`
    flex: 1;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    color: #5D5D5D;
    margin-top: 7px;
`

export const RemoveMovie = styled.TouchableOpacity`
    position: absolute;
    top: -5px;
    right: 0px;
`
export const TextLightGray = styled.Text`
     font-family: ${fontStyle.regular};
     color: ${theme.textligthGray};
     font-size: 13px;
     top: 60px;
    right: 265px;
`