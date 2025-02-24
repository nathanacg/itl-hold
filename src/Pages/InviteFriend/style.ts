import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const TextDescriptionPage = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    margin-top:20px;
`

export const ContainerBoxShare = styled.View`
    width:100%;
    justify-content:center;
    margin-top:40px;
    padding:5px;
`

export const BoxShare = styled.View`
    border-radius:5px;
    padding:10px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

export const TextLinkShare = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const ButtonShare = styled.TouchableOpacity`
    background-color:${theme.primarycolor}
    padding:8px;
    border-radius:5px;
`

export const TextButtonShare = styled.Text`
    font-size:12px;
    color: #fff;
    font-family: ${fontStyle.regular};
    text-align:center;
`

