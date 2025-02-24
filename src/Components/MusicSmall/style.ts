import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";

export const Container = styled.View`
    flex-direction: row;
    /* border: 1px; */
`

export const MusicContainer = styled.TouchableOpacity`
    flex-direction: row;
    gap: 10px;
    height: 59px;
    padding: 6px 12px 6px 6px;
    background-color: ${(props: {background: string}) => props.background};
    border-radius: 10px;
    gap: 10px;
`

export const TextContainer = styled.View`
    justify-content: center;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    color: ${(props: {color: string}) => props.color};
    line-height: 18px;
`


export const LightText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color:  ${(props: {color: string}) => props.color};
    align-items: center;
    line-height: 18px;
`


export const MusicImage = styled.Image`
    width: 47px;
    height: 47px;
`
