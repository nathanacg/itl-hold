import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../../Theme/theme';

export const Container = styled.View`
   gap: 20px;
   margin-top: 10px;
   margin-bottom: 30px;
`;

export const OptionContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TextOption = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 14px;
`