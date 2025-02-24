import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../Theme/theme';

export const LocationContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`

export const CityName = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.medium};
    font-size:14px;
`

export const OnlineText = styled.Text`
    color:#049908;
    font-family: ${fontStyle.regular};
    font-size:12px;
`

export const TimerText = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
`

export const DeviceText = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
`