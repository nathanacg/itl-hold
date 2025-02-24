import styled from "styled-components/native";
import { fontStyle } from "../../Theme/theme";

export const CardContainer = styled.TouchableOpacity`
    padding: 10px;
    gap: 20px;
    height: 173px;
    border-radius: 4px;
    border: 1px;
    border-color: rgba(0,0,0,0.2);
`

export const CardName = styled.Text`
    text-align:center;
    color:#081B74;
    font-size: 16px;
    font-family: ${fontStyle.regular};
    margin-top:10px;
`

export const RightCheckBox = styled.View`
    flex-direction:row;
    justify-content: flex-end;
`


export const CenterImage = styled.View`
    justify-content:center;
    margin-top: -15px;
    width: 85px;
    height: 62px;
    align-items:center;
`
