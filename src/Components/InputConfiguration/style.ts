import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerInput = styled.View`
   flex-direction: row;
   align-items:  flex-end;
   justify-content: space-between;
`;

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:13px;
    line-height: 21px;
    max-width: ${(props: { width: string }) => props.width ? (props.width) : ('25%')};
    margin-bottom: 0px;
`

