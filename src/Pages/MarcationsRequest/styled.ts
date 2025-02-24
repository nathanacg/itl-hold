import styled from "styled-components/native";
import { theme, fontStyle } from "../../Theme/theme"
import { Dimensions } from "react-native";

const height = Dimensions.get('screen').height
export const ActivitiesContainer = styled.View`
    background-color: ${theme.secondaryColor};
    width: 100%;
`

export const ActivitiesTime = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 16px;
    color: ${theme.textDark};
`


export const ContainerPage = styled.View`
   padding:  0px 23px;
   flex:1;
`;