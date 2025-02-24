import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";


export const Container = styled.ImageBackground`
    padding-top: 17px;
    padding-left: 20px;
    padding-bottom: 25px;
`

export const TopContainer = styled.View`
    flex-direction: row;
    width: 95%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`

export const Title = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 18px;
    font-weight: 700;
    color: ${theme.textDark};
    
`

export const SeeMoreButton = styled.Text`
    color: ${theme.primarycolor};
    font-size: 14px;
    font-weight: 400;
`