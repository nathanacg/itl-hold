import styled from "styled-components/native";

import { fontStyle, theme } from "../../Theme/theme"

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.70);
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 99;
`

export const BackgroundModal = styled.View`
    flex: 1;
    justify-content: center;
    background-color: #000000aa;
`

export const ContentModal = styled.View`
    background-color:#fff;
    padding: 30px 20px 30px;
    border-radius:4px;
  
    align-items:center;
    justify-content:center;
    gap: 10px;
    min-height:20%;
    width: 60%;
    margin:0 auto;
`


export const ContentModal2 = styled.View`
    background-color:#fff;
    padding: 30px 20px 30px;
    border-radius:4px;
  
    align-items:center;
    justify-content:center;
    gap: 10px;
    min-height:20%;
    width: 83%;
    margin:0 auto;
`

export const TextModal = styled.Text`
    color:#231F20;
    font-size:14px;
    font-family: ${fontStyle.regular};
    text-align:${(props: { textAlign: string }) => props.textAlign ? (props.textAlign) : ('auto')};
`

export const TitleModal = styled.Text`
    color: ${theme.textDark};
    font-size: 16px;
    font-family: ${fontStyle.medium};
    text-align: center;
`