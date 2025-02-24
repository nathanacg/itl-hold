import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../Theme/theme';

export const OptionModal = styled.Text`
   font-size:14px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`;

export const ContainerOptions = styled.View`
    gap: 12px;
    padding: 7px 0px 15px;
`