import styled from "styled-components/native"

import { theme, fontStyle } from "../../Theme/theme"

interface containerInputProps {
    error?: boolean
}

export const Container = styled.View`
    margin: 7px 0px;
`

export const ContainerInput = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-radius:10px;
    width: 100%;
    border:1px;
    border-color:${(props: containerInputProps) => props.error ? "#F40202" : "#C4C4C4"};
    margin-top:4px;
    padding-right:22px;
`
export const ContainerInputNumber = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-radius:10px;
    height: 52px;
    width: 71%;
    border:1px;
    border-color:${(props: containerInputProps) => props.error ? "#F40202" : "#C4C4C4"};
    margin-top:7px;
    padding-top: 5px;
    padding-right:22px;
    margin-right: 100px;
`

export const ContainerInputCountry = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-radius:10px;
    max-width: 60px;
    border:1px;
    border-color:${(props: containerInputProps) => props.error ? "#F40202" : "#C4C4C4"};
    margin-top:7px;
    padding-right:22px;
    margin-right: 5px;
`

export const TextInput = styled.TextInput`
    padding: 10px;
    width: auto;
    position: relative;
`

export const TextLabel = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;

`

export const TextLabelAccess = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
    margin-top: 30px;
    margin-bottom: -50px;
    text-align: center;

`
export const LabelContentSelect = styled.View`
    flex-direction:row;
    margin-top: 12px;
    align-items:center;
`

export const TextLabelDropDown = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
`

export const TextError = styled.Text`
    color: ${theme.dangerColor};
    font-family: ${fontStyle.regular};
    font-size:12px;
    text-align:right;
    position: absolute;
    right: 0px;
    width: 230px;
`

export const TextErrorUsername = styled.Text`
    color: ${theme.dangerColor};
    font-family: ${fontStyle.regular};
    font-size:12px;
    text-align:right;
    position: absolute;
    right: 0px;
    top: 24px;
    width: 230px;
`

export const TextErrorPhoto = styled.Text`
    color: ${theme.dangerColor};
    font-family: ${fontStyle.regular};
    font-size:12px;
    text-align:center;
    margin-top: -15px;
    margin-bottom: 10px;
`

export const ContainerIcons = styled.View`
    flex-direction:row;
    gap:4px;
    align-items:center;
    justify-content:center;
`


export const ContainerSearch = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-radius:8px;
    width: 100%;
    background-color: #C4C4C433;
    margin: ${(props: { marginTop: string }) => props.marginTop ? (props.marginTop) : ('5.6%')} 0 ${(props: { marginBottom: string }) => props.marginBottom ? (props.marginBottom) : ('5%')};
    padding: 0 10px;
    height: 40px;
`

export const Input = styled.TextInput`
    background-color: transparent;
    width: 90%;
    font-size: 12px;
    height: 100%;
    
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`