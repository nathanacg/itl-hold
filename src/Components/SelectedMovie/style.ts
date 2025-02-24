import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"


export const SelectedMovieCard = styled.Pressable`
    width: 100%;
    margin-top: ${(props: { marginTop: number; }) => props.marginTop ? props.marginTop : 20}px;
    margin-bottom: ${(props: { marginBottom: number; }) => props.marginBottom ? props.marginBottom : 10}px;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
`

export const SelectedMovieImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 8px;
`

export const SelectedMovieTitle = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textLight};
    
`

export const SelectedMovieText = styled.Text`
    flex: 1;
    font-family: ${fontStyle.regular};
    font-size: 11px;
    text-align: justify;
    color: #5D5D5D;
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