import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`

export const TextNotPublicationsArchiveds = styled.Text`
   color: ${theme.textDark};
   font-size: 12px;
   margin: 10% 35px;
   font-family: ${fontStyle.regular};
`;