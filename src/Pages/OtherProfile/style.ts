import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerButtonOptionModal = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const TextDark = styled.Text`
    font-size:14px;
    color: #000;
    font-family: ${fontStyle.regular};
`

export const TextLight = styled.Text`
    font-size:14px;
    color: ${theme.textligthGray};
    font-family: ${fontStyle.regular};
`