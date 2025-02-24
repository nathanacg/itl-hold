import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerInput = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const FlexContentDateBirthday=styled.View`
    width: 100%;
    display: flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:5px;
    gap:10px;
`

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
    max-width: 25%;
`