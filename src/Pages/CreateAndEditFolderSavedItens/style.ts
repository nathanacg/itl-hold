import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`;

export const TextActionHeader = styled.Text`
   color: ${theme.primarycolor};
   font-size: 16px;
   font-family: ${fontStyle.regular};
   text-align: center;
`

export const ImageFolderContainer = styled.View`
    align-items: center;
    margin-top: 10%;
`

export const Image = styled.Image`
    border-radius: 15px;
`

export const TextInput = styled.TextInput`
    text-align: center;
    font-size:18px;
    font-family: ${fontStyle.semiBold};
    color:${theme.textLight};
    margin-top: 7px;
`