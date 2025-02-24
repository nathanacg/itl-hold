import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerInput = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 10px;
   margin-top: ${(props: { marginTop: string }) => props.marginTop ? (props.marginTop) : ('10px')};
`;

export const Text = styled.Text`
    font-family: ${fontStyle.regular};
    font-size:13px;
    max-width: ${(props: { width: string }) => props.width ? (props.width) : ('25%')};
    margin-bottom: 5px;
`

export const MoreOptionsInput = styled.TouchableOpacity`
     flex-direction: row;
     justify-content: space-between;
     border-bottom-width: 0.4px;
     border-bottom-color: ${theme.textDark};
     padding-bottom: 2px;
     padding-top: 10px;
     padding-left: 10px;
`
