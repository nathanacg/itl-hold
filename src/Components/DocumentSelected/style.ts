import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';


export const ContainerElementsSections = styled.View`
    gap: 10px;
`

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`