import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

export const PrivateInfoContainer = styled.View`
   flex: 1;
   align-items: center;
   gap: 6px;
   height: 500px;
   padding: 50px 0px 100px;
`

export const ImageLocker = styled.Image`

`

export const TextPrivate = styled.Text`
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
   font-size: 16px;
   text-align: center;
`

export const TextInstructionsPrivate = styled.Text`
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   font-size: 14px;
   text-align: center;
   width: 50%;
`