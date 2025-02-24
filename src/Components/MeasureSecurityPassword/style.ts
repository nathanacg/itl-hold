import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

interface contentMarkProps {
    backgroundColor: string
}

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items:center;
    gap: 18px;
    margin:7px 0px 6px;
`

export const Text = styled.Text`
    color: ${theme.textDark};
    font-size:14px;
    font-family: ${fontStyle.semiBold};
`

export const ContainerContentMark = styled.View`
    flex-direction: row;
    align-items:center;
    gap: 5px;
`

export const ContentMark = styled.View`
    width: 21.5%;
    height: 9px;
    border: 1px;
    border-color:#ddd;
    border-radius:5px;
    background-color:${(props: contentMarkProps) => props.backgroundColor}
`