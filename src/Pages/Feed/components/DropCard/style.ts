import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";

import { fontStyle, theme } from '../../../../Theme/theme';


export const Container = styled(LinearGradient).attrs({
    colors: ['#000', "#0000"],
    start: { x: 0.5, y: 1 },
    end: { x: 0.5, y: 0 },
})`
    width: 150px;
    height: 219px;
    margin-right: 16px;
    border-radius: 6px;
`

export const Title = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    color: ${theme.textDark};
    margin: 20px 0px;
`

export const Infos = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 9px;
    gap: 7px;

`
export const InfoCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3px;
`

export const InfoText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.secondaryColor};
`
export const InfoTextProfile = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.secondaryColor};
`