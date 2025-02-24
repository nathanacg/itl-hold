import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerElementsSections = styled.View`
    gap: 10px;
`

export const ContainerRowOppen = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
`;

export const TextLight = styled.Text`
    color:${theme.textLight};
    font-family: ${fontStyle.regular};
    font-size:14px;
`

export const TextLimitCaracters = styled.Text`
    color: ${theme.textDark};
    text-align:right;
    font-family: ${fontStyle.regular};
    font-size:12px;
    margin-top: 9px;
`

export const Container = styled.View`
    margin-top: 35px;
    margin-bottom: 20px;
`

export const TitleModal = styled.Text`
    font-size:14px;
    text-align:center;
    padding:0 0 10px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark}
`