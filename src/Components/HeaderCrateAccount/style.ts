import styled from "styled-components/native";

import { fontStyle, theme } from "../../Theme/theme"

export const Container = styled.View`
    background-color: ${theme.secondaryColor};
    flex-direction: row;
    height: 65px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    align-items: center;
    justify-content: center;

    top:0px;
    border-bottom-width: 2px;
    border-bottom-color: #c4c4c459;
    /* shadow-color: #000;
    shadow-offset: {width: 0; height: 4};
    shadow-opacity: 0.18;
    shadow-radius: 4px;
    elevation: 4; */
    
`

export const CentralizeLogo = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
`

export const ActionHeaderContainer = styled.View`
    min-width: 40px;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`

export const Title = styled.Text`
    text-align: center;
    font-size:18px;
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
    margin-top: 4px;
`